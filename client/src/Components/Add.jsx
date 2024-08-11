import React, { useState,useContext  } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useNavigate } from 'react-router-dom'

function Add() {

  const notify1 = () => toast.success('Added successfully');
    const navigate = useNavigate();
     const initial = {
      title :"",
      desc : "",
      category :"Public",
      note : "",
      author:"",
      creator : localStorage.getItem('email'),
      image : "",
     }

     const [image, setImage] = useState(false);
   
     const [productDetails, setProductDetails] = useState(initial);
   
     const imageHandler = (e) =>{
      console.log(e.target.files)
               setImage(e.target.files[0]);
     }
   
     const changeHandler = (e) => {
      setProductDetails({
        ...productDetails,
        [e.target.name]: e.target.value // Remove the square brackets wrapping the value
      });
    };
    
   
    const addProduct = async (e) => {
      e.preventDefault();
      let response;
      let product = productDetails;
    
      try {
        const formData = new FormData();
        formData.append('product', image);
    
        if (image) {
          const res1 = await axios.post('http://localhost:8080/upload', formData);
          response = res1.data.image_url;
          product.image = response;
        }
    
        console.log(product);
        const res2 = await axios.post('http://localhost:8080/addnotes', product);
        console.log(res2);
        notify1();
        navigate('/');
      } catch (err) {
        console.log('error in uploading', err);
      }
    };
    
   



  return (
    <div>

<div>
      <div class="flex items-center justify-center p-12">
        <div class="mx-auto w-full max-w-[550px] bg-white">
            <div class="mb-5">
              <label
                for="title"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Note Title:
              </label>
              <input
              value ={productDetails.title}
              onChange={changeHandler}
                type="text"
                name="title"
                id="title"
                placeholder="ABC"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div class="mb-5">
            <label
                for="desc"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Note Desc:
              </label>
              <input
              value ={productDetails.desc}
              onChange={changeHandler}
                type="text"
                name="desc"
                id="desc"
                placeholder="ABC"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div class="mb-5">
            <label
                for="note"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Note:
              </label>
              <input
              value ={productDetails.note}
              onChange={changeHandler}
                type="text"
                name="note"
                id="note"
                placeholder="ABC"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div class="mb-5">
              <label
                for="category"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Choose Category
              </label>
              <select
              onChange={changeHandler}
              value ={productDetails.category}
                name="category"
                id="category"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                <option value="">--Please choose an option--</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div class="mb-5">
            <label
                for="author"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Author:
              </label>
              <input
              value ={productDetails.author}
              onChange={changeHandler}
                type="text"
                name="author"
                id="auhtor"
                placeholder="ABC"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
               </div>

               <div class="mb-6 pt-4">
              <label class="mb-5 block text-xl font-semibold text-[#07074D]">
                Upload File
              </label>

              <div className="mb-8">
    <input onChange={imageHandler} type="file" name="file" id="file" className="sr-only" />
    <label
      htmlFor="file"
      className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
    >
      {image ? (
        <div>
          <img src={URL.createObjectURL(image)} alt="Preview" className="max-h-full max-w-full" />
        </div>
      ) : (
        <div>
          <span className="mb-2 block text-xl font-semibold text-[#07074D]">Drop files here</span>
          <span className="mb-2 block text-base font-medium text-[#6B7280]">Or</span>
          <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">Browse</span>
        </div>
      )}
    </label>
  </div>
            </div>



          

            <div>
              <button  onClick={addProduct} class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Add Note
              </button>
            </div>
        </div>
      </div>
    </div>
      
    </div>
  )
}

export default Add
