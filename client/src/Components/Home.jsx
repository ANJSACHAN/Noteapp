import React, { useEffect, useState,useContext  } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import FilterData from './FilterData';
import LikeButton from '../LikeButton';




function Home() {

  const navigate = useNavigate();

  //------------------------fetching of public notes --------------------------------------
  const [allnotes, setAllNotes] = useState([]);
  const fetchInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8080/allpublic');
      setAllNotes(response.data);
    } catch (error) {
      console.log("error in getting " + error);
    }
  };
  useEffect(()=>{
    fetchInfo();
  },[])


  //-------------------sorting of notes according title ---------------------------------------
  const [sort, setSort] = useState('Recent');
  const changeHandler = (e) => {
    setSort(e.target.value);
  };
  const [sortArray, setSortArray] = useState([]);
  useEffect(() => {
    if (sort === 'Old')  setSortArray([...allnotes].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
    else if (sort === 'Recent') setSortArray([...allnotes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  }, [allnotes, sort]);



  // ------------------Searching---------------------------------------------------------------
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

    {
      filteredItems.length === 0 && searchQuery !== "" ? (
        <>
        <div className="border border-gray-300 rounded-md p-4 my-4 max-w-md flex items-center">
       <div>No item</div>
        </div>
        </>
      ):(
        <>
        {searchQuery === "" ? (
      sortArray.map((item, key) => (
        <div key={key} className="border border-gray-300 rounded-md p-4 my-4 max-w-md flex items-center">
          <img src={item.image} className="rounded-md w-1/3 h-auto mr-4" alt={item.title} />
          <div className="flex-1">
            <div className="text-lg font-bold mb-2">{item.title}</div>
            <div className="text-gray-700 mb-4">{item.desc}</div>
            <div className="text-center flex">
              <button className="bg-pink-500 m-2 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                <Link to="/show" state={{ item: item }}>Show</Link>
              </button>
              <div>
              <LikeButton id = {item}/>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <FilterData item={filteredItems} />
    )}

        </>

      )
    }
   

    
  </div>
  
  );
}

export default Home;