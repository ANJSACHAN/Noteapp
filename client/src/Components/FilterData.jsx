import React, { useEffect, useState ,useContext  } from 'react';
import { Link } from 'react-router-dom';
import Context from './Context';

function FilterData({ item }) {
  const {login} = useContext(Context);

  
  return (
    <div>
  
  <div className="flex flex-col items-center">
  {item.map((i, key) => {
    return (
      (i.category === "Public" || i.creator === localStorage.getItem('email')) && (
        <div key={key} className="border border-gray-300 rounded-md p-4 my-4 max-w-md flex items-center">
                  <img src={i.image} className="rounded-md w-1/3 h-auto mr-4" alt={i.title} />
                  <div className="flex-1">
                   <div className="text-lg font-bold mb-2">{i.title}</div>
                   <div className="text-gray-700 mb-4">{i.desc}</div>
                   <div className="text-center">
                        <button onClick={() => handleShowFull(i)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                          {login ? (
                            <Link to={"/show"} state={{ item: i}}>Show</Link>
                          ) : (
                            <Link to="/login">Show</Link>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
      )
    );
  })}
</div>

    </div>
  );
}

export default FilterData;
