import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Category() {
  const [categoryData, setCateogoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5500/category');
        setCateogoryData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-row flex-wrap justify-center w-full  md:3/6 lg:w-4/6 ">
        {categoryData.map((category, index) => (
          <div
            key={index}
            className="flex flex-col w-16 items-center justify-center m-5 text-center"
          >
            <img
              src={`http://localhost:5500/public/image/${category.image}`}
              alt={category.name}
              className="h-16 w-16"
            />
            <h6>{category.name}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}
