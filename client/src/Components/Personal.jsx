import React, { useEffect, useState ,useContext  } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import FilterData from './FilterData';
import Context from './Context';

function Personal() {
  
  const {login} = useContext(Context);


  //-----------------Fetching of data----------------------------------------
  const [privateNotes , setprivateNotes] = useState([]);
  const fetchPrivate = async () => {
    try {
      const response = await axios.get('http://localhost:8080/allprivate');
      setprivateNotes(response.data);
    } catch (error) {
      console.log("error in getting " + error);
    }
  };
  useEffect(()=>{
    fetchPrivate();
  },[])
  
   
  // ----------------------sorting---------------------------------------------------------------------
  const [sort, setSort] = useState('Recent');
  const changeHandler = (e) => {
    setSort(e.target.value);
  };
  const [sortArray, setSortArray] = useState([]);
  useEffect(() => {
    if (sort === 'Old') setSortArray([...privateNotes].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
    else if (sort === 'Recent') setSortArray([...privateNotes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  }, [privateNotes, sort]);
   
     

  // -----------------------Searching----------------------------------------------------
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  
  const onValueChange = (e) => {
    const query = e.target.value; // Change made here
    setSearchQuery(query);
    setFilteredItems(() =>
      sortArray.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };
  
   
 
   
   
     return (
    
      <div className="flex flex-col items-center">
      <div className='flex'>
    <div className="m-3 max-w-sm"> 
      <label htmlFor="category" className="mb-3 block text-base font-medium text-[#07074D]">
        Sort the card
      </label>
      <select
        onChange={changeHandler}
        value={sort}
        name="category"
        id="category"
        className="w-full px-3 py-2 mb-3 text-normal rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
      >
        <option value="">--Sorted by--</option>
        <option value="Recent">Recent</option>
        <option value="Old">Old</option>
      </select>
    </div>
  
    <div className="m-3 max-w-sm">
    <label htmlFor="search" className="mb-3 block text-base font-medium text-[#07074D]">
        Search by title
      </label>
      <input
        type="text"
        value={searchQuery}
        id = "search"
        onChange={onValueChange}
        placeholder="Search by title..."
        className="w-full px-3 py-2 mb-3 text-normal rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
      />
    </div>
    </div>
    
        {searchQuery === "" || filteredItems.length === 0 ? (
          <>
            {sortArray.map((item, key) => {
              if (item.creator === localStorage.getItem("email")) {
                return (
                  <div key={key} className="border border-gray-300 rounded-md p-4 my-4 max-w-md flex items-center">
                  <img src={item.image} className="rounded-md w-1/3 h-auto mr-4" alt={item.title} />
                  <div className="flex-1">
                   <div className="text-lg font-bold mb-2">{item.title}</div>
                   <div className="text-gray-700 mb-4">{item.desc}</div>
                   <div className="text-center">
                        <button onClick={() => handleShowFull(item)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                          {login ? (
                            <Link to={"/show"} state={{ item: item }}>Show</Link>
                          ) : (
                            <Link to="/login">Show</Link>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null; 
              }
            })}
            </>
        ) : (
          <FilterData item={filteredItems} />
        )}
      </div>
    
    );
    
}

export default Personal
