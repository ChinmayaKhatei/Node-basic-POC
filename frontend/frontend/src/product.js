import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Validation from './ProductValidation';
import axios from 'axios';

function Product() {
    const [values, setValues] = useState({
      name: '',
      price: '',
      description: '',
      image: null,  // Use null to initialize the file state
      pdf: null,
      videos: null,
      youtubelink: ''
    });
  
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
  
    const handleInput = (event) => {
      setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };
  
    const handleFileInput = (event) => {
      setValues((prev) => ({ ...prev, [event.target.name]: event.target.files[0] }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setErrors(Validation(values));
  
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('price', values.price);
        formData.append('description', values.description);
        formData.append('image', values.image);
        formData.append('pdf', values.pdf);
        formData.append('videos', values.videos);
        formData.append('youtubelink', values.youtubelink);
  
        const response = await axios.post('http://localhost:8081/product', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
          },
        });
        
        console.log(response.data);
        navigate('/');
        // window.location.href = '/';
      } catch (error) {
        console.log(error.response.data);
      }
    };


        return (
            <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
                <div className='bg-white p-3 rounded w-25'>
                    <form action='' onSubmit={handleSubmit}>
                        <h5><center><b>Create Product</b></center></h5>

                        <div className='mb-3'>
                            <label htmlFor='name'><strong>Product Name</strong></label>
                            <input type='text' name='name' onChange={handleInput} placeholder='Enter name' className='form-control rounded-0' />
                            {errors.name && <span className='text-danger'>{errors.name}</span>}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='price'><strong>Product price</strong></label>
                            <input type='number' name='price' onChange={handleInput}  placeholder='Enter price' className='form-control rounded-0' />
                            {errors.price && <span className='text-danger'>{errors.price}</span>}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='description'><strong>Product Description</strong></label>
                            <textarea name='description' onChange={handleInput} placeholder='Enter description' className='form-control rounded-0' />
                            {errors.description && <span className='text-danger'>{errors.description}</span>}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='image'><strong>Upload Product Image:</strong></label>
                            <input type='file' name='image' onChange={handleFileInput} placeholder='Enter image' className='form-control rounded-0' />
                            {errors.image && <span className='text-danger'>{errors.image}</span>}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='pdf'><strong>Upload Product PDF:</strong></label>
                            <input type='file' name='pdf' onChange={handleFileInput} placeholder='Enter pdf' className='form-control rounded-0' />
                            {errors.pdf && <span className='text-danger'>{errors.pdf}</span>}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='videos'><strong>Upload Product videos:</strong></label>
                            <input type='file' name='videos' onChange={handleFileInput} placeholder='Enter videos' className='form-control rounded-0' />
                            {errors.videos && <span className='text-danger'>{errors.videos}</span>}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='youtubelink'><strong>YouTube Link:</strong></label>
                            <input type='url' name='youtubelink' onChange={handleInput} placeholder='https://www.youtube.com/watch?v=your_videoss_id' className='form-control rounded-0' />
                            {errors.youtubelink && <span className='text-danger'>{errors.youtubelink}</span>}
                        </div>

                        <button className='btn btn-success w-100 rounded-0'><strong>Create</strong></button>
                    </form>
                </div>
            </div>
        );
    }

    export default Product;
