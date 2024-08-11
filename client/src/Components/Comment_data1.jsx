import React from 'react'

function Comment_data1(props) {

     const note_id = {
          id : props.id,
     }

     const [comments , setComments] = useState([]);
     const fetchComments = async () => {
       try {
         const response = await axios.post('http://localhost:8080/allcomments', note_id);
         setComments(response.data);
       } catch (error) {
         console.log("error in getting " + error);
       }
     };
     useEffect(()=>{
       fetchComments();
     },[])


  return (
    <div>

      
    </div>
  )
}

export default Comment_data1
