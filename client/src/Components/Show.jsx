import React, { useEffect,useContext,useState  } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Comment from './Comment';


function Show() {

     const navigate = useNavigate();
     const removeNotes = async(item) => {
          console.log("id "+item );
         
             try{

               const res = await axios.post("http://localhost:8080/removeNote",item );
              
               console.log(res);
               navigate("/");

             }
             catch(e){
               console.log("error in removing "+e);
             }
           }

       
     

     const email = localStorage.getItem('email');


     const location = useLocation()
     const item = location.state.item;

     
     console.log(item);
   
     const user = localStorage.getItem('email');

     const data = {
        email :user
     }
     const a =  item.savedId;
     
     console.log(a); 
    const value =  a == null ? false : a.includes(localStorage.getItem('id')) ? true :false;
    console.log(value);
     const [showNote, setShowNote] = useState(value);
          
     const onClickSave = async(item) =>{
      console.log(user);
      try {
        const res2 = await axios.post('http://localhost:8080/save', {item, data});
        console.log(res2.data.msg);
        navigate('/');
        
       } catch (err) {
         console.log('error in uploading', err);
       }
     }


     const [partion, setPartition] = useState(false)
 
  return (
    <div className="flex">
    <div className="w-1/2 pr-4">
      <div className="max-w-xl mx-auto mt-8 p-8 bg-white rounded shadow-md">
    <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
    <div className="mb-4">
      <img src={item.image} alt={item.title} className="rounded-lg w-full" />
    </div>
    <p className="text-gray-700 mb-4"><span className="font-bold">Description:</span> {item.desc}</p>
    <p className="text-gray-700 mb-4"><span className="font-bold">Note:</span> {item.note}</p>
    <p className="text-gray-700 mb-4"><span className="font-bold">Author:</span> {item.author}</p>

    <div>
    <div>
      <button onClick={() => { onClickSave(item) }} className="bg-green-500 text-white px-3 py-1 m-3 rounded hover:bg-green-600 focus:outline-none focus:bg-green-600">{
        showNote ? "Unsave" : "Save"
      }</button>

      {
        partion ? (
          <>
          <button  onClick={() =>{setPartition(false)}} className="bg-blue-500 text-white px-3 py-1 m-3 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Close </button>
          </>
        ):(
          <>
          <button  onClick={() =>{setPartition(true)}} className="bg-blue-500 text-white px-3 py-1 m-3 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Comment </button>
          </>
        )
      }
</div>

      {(email === item.creator) && (
        <div>
          <button onClick={() => { editNote(item._id) }} className="bg-blue-500 text-white px-3 py-1 m-3 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"><Link to={"/edit"} state={{ item: item }}>Edit</Link> </button>
          <button onClick={() => { removeNotes(item) }} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:bg-blue-600">Remove</button>
        </div>
      )}
    </div>

   
  </div>
  </div>

  {partion && (
    <div className="w-1/2 pl-4">
      <div>
        <Comment  id = {item._id} />
      </div>
    </div>
  )}
  </div>
  )
}

export default Show
