import React, { useEffect, useState,useContext  } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


function Saved() {

     const [saved, setSaved] = useState([]);

     const id = localStorage.getItem('id');
     const detail = {
      Id : id
     }

     const fetchSaved = async () => {
       try {
         const response = await axios.post('http://localhost:8080/allsaved' , {detail});
         // Assuming the products array is stored in the response.data property
         setSaved(response.data);
       } catch (error) {
         console.log("error in getting " + error);
       }
     };
     useEffect(()=>{
       fetchSaved();
     },[])


  return (
    <div>
    <div className="flex flex-col items-center">
        {saved.map((item, key) => {
          return (
               <div key={key} className="border border-gray-300 rounded-md p-4 my-4 max-w-md flex items-center">
    <img src={item.image} className="rounded-md w-1/3 h-auto mr-4" alt={item.title} />
    <div className="flex-1">
        <div className="text-lg font-bold mb-2">{item.title}</div>
        <div className="text-gray-700 mb-4">{item.desc}</div>
        <div className="text-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                <Link to="/show" state={{ item: item }}>Show</Link>
            </button>
        </div>
    </div>
</div>
          );
        })}
      </div>

      
    </div>
  )
}

export default Saved
