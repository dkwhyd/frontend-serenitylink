import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Category() {
  const [categoryData, setCateogoryData] = useState([]);

  useEffect(() => {
    // Fungsi untuk melakukan permintaan GET ke endpoint tertentu
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5500/category');
        console.log(response.data);
        setCateogoryData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Panggil fungsi fetchData saat komponen dipasang (mounted)
    fetchData();
    console.log(categoryData);
  }, []);
  return (
    <div className="bg-blue-100 h-64">
      <div className="flex flex-row item-center justify-center ">
        {categoryData.map((category, index) => (
          <div key={index} className="m-2">
            <img
              src={`http://localhost:5500/public/image/${category.image}`}
              alt={category.name}
              className="h-12 w-12 rounded-full shadow-md p-1"
            />
            <h6>{category.name}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}
