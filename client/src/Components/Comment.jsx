import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Comment_data1 from './Comment_data1';

const Comment = (props) => {
    console.log(props.id)

  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
const data  = {
    userId :  localStorage.getItem('id'),
    comment : newComment,
    noteId : props.id
}
console.log(data);

  const handleAddComment = async(e) => {
    e.preventDefault();    
        try{
            if (newComment.trim() !== '') {
            const res2 = await axios.post('http://localhost:8080/comment', data);
            console.log(res2);
            setNewComment("");}
          } catch (err) {
            console.log('error in uploading', err);
          }
    }   
    
    


  return (
    
      <section class="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
  <div class="max-w-2xl mx-auto px-4">
      
    <div class="mb-6">
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label for="comment" class="sr-only">Your comment</label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              id="comment" rows="5"
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." required
                ></textarea>
        </div>
        <button onClick={handleAddComment}
            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Post comment
        </button>
    </div>

    {/* <Comment_data1 id = {props.id}/> */}
    <div className = " h-96 overflow-y-scroll">


    <article class="p-6 text-base bg-white rounded-lg dark:bg-gray-900  ">
        <footer class="flex justify-between items-center mb-2 ">
            <div class="flex items-center">
                <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                        class="mr-2 w-6 h-6 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Michael Gough"/>Michael Gough</p>
                <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                        title="February 8th, 2022">Feb. 8, 2022</time></p>
            </div>
        </footer>
        <p class="text-gray-500 dark:text-gray-400">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
            instruments for the UX designers. The knowledge of the design tools are as important as the
            creation of the design strategy.</p>
        <div class="flex items-center mt-4 space-x-4">
            <button type="button"
                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                </svg>
                Reply
            </button>
        </div>
    </article>
   
    </div>
  </div>
</section>
    
  );
};

export default Comment;
