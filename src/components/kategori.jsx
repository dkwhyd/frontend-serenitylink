/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react';
import data from '../api/json/kategori-example.json';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState(data.categories);

  const [categoryData, setCateogoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get('http://localhost:5500/category');
        console.log(data)
        setCateogoryData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='py-12 min-h-screen md:pt-24 bg-[#F7F7F7]'>
        <h1 className='text-center text-2xl md:text-5xl out text-primary-600 font-extrabold mb-8 uppercase'>kategori</h1>
        <div className='flex flex-wrap justify-center '>
          {categoryData.map((category) => (
            <div key={category.id} className='w-1/2 sm:w-1/5 md:w-1/5 lg:w-[14.2857%] group p-4 text-center mb-8'>
              <img className='mx-auto w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full group-hover:outline group-hover:outline-1 group-hover:outline-primary-600 duration-100 ease-out' src={'https://via.placeholder.com/150?text=image'} alt={category.name} />
              <p className='mt-2 text-base text-[#64748BBF] group-hover:text-primary-600 group-hover:font-semibold'>{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
