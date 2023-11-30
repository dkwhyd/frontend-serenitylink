import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCalendar } from 'react-icons/fa';

export default function ListReport() {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5500/report');
        console.log(response.data);
        setReportData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='py-12 min-h-screen md:pt-24 heroBack'>
        <h1 className='text-center text-2xl md:text-5xl out text-slate-900 font-extrabold mb-8 md:mb-16 uppercase'>list report</h1>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-left mx-5'>
          {reportData.map((report) => (
            <div key={report._id} className=' bg-white p-0 rounded-lg box-border drop-shadow'>
              <div className='relative h-48'>
                <img
                  src={`http://localhost:5500/public/image/${report.imageReport[0]}`}
                  alt={report.title}
                  className='mb-2 w-full h-48 object-fit rounded-md'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
                <div className='absolute bottom-0 right-0 bg-green-500 text-white text-xs p-1  rounded-l-lg'>{report.status}</div>
              </div>

              <div className='p-3'>
                <h3 className='text-l font-semibold mb-1'>{report.title}</h3>
                <div className='flex items-center text-xs text-gray-500 bottom-0 left-0 mb-1 rounded-r-lg'>
                  <FaLocationDot className='mr-1' />
                  {report.address}
                </div>
                <p className='text-sm text-gray-600 mb-1 line-clamp-3'>{report.description}</p>

                <div className='flex items-center text-xs text-gray-400 bottom-0 left-0 mb-1 rounded-r-lg'>
                  <FaCalendar className='mr-1' />
                  {new Date(report.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
