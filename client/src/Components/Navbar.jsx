import React, {  useContext,useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Context from "./Context";






export default function Navbar() {
	
const {login, setLogin} = useContext(Context);
  
	const navigate = useNavigate();


  return (
     <header className="p-4 dark:bg-gray-800 dark:text-gray-100">
	<div className="container flex justify-between h-16 mx-auto">
		<ul className="items-stretch hidden space-x-3 md:flex">
			<li className="flex">
				<div rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent"><Link to="/">Home</Link></div>
			</li>
			{login ? 
				<>
				<li className="flex">
				<div className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent"><Link to="/add">Add</Link></div>
			</li>
			<li className="flex">
				<div className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent"><Link to="/personal">Personal</Link></div>
			</li>
				</>:
				<>
			
				</>
				}
			
			
		</ul>

		{login ? (
			<>
			<div className="flex ">
			<button className="flex items-center m-4 px-4 -mb-1 border-b-2 dark:border-transparent" 
			><Link to="/saved">Saved_Card</Link></button>

			
			<button className="flex items-center m-4 px-4 -mb-1 border-b-2 dark:border-transparent"onClick={() => { localStorage.clear(); 
			setLogin(false);
			navigate('/login'); }}>Logout</button>

			
		</div>
		</> ): (
			<>
			<button className="flex justify-end p-4 ">
			<button className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent"><Link to="/login">Login</Link></button>
               
               <button className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent"><Link to="/signup">Signup</Link></button>
		</button>
            </>
          )}
			

	</div>
</header>
  );
}

