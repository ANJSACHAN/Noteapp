import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LikeButton(props) {
  const userId = localStorage.getItem("id");
  const [buttonClicked, setButtonClicked] = useState(props.id.likes || 0);
  const [liked, setLiked] = useState(props.id.likeUser.includes(userId));

  const onHandleLike = async (id) => {
    try {
      const res2 = await axios.put(`http://localhost:8080/like/${id}`, { id: userId });
      console.log(res2.data.msg);
      if (res2.data.msg === "dislike") {
        setButtonClicked(buttonClicked - 1);
        setLiked(false);
      } else {
        setButtonClicked(buttonClicked + 1);
        setLiked(true);
      }
    } catch (err) {
      console.log('error in uploading', err);
    }
  };

  return (
    <div>
      <button
        onClick={() => onHandleLike(props.id._id)}
        className="bg-blue-500 m-2 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        {liked ? `Liked ❤️${buttonClicked}` : `Like 👍${buttonClicked}`}
      </button>
    </div>
  );
}

export default LikeButton;
