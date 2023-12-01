import {useState,useEffect} from 'react'
import axios from 'axios';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function DashboardUser() {
    const [reportData, setReportData] = useState([]);
    const [query,setQuery] =useState('')

    const fetchData = async () => {
        try {
          const {data} = await axios.get(`http://localhost:5500/report?q=${query}`);
          console.log(query)
          console.log(data)
          setReportData(data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    useEffect(() => {
        fetchData();
      }, [query]);
    
      const search = async (query) => {
        fetchData(query);
      };
      return (
        <>
          <div className='py-12 min-h-screen  heroBack'>
            <h2 className='text-left text-2xl md:text-5xl out text-slate-900 font-extrabold uppercase'>list report</h2>
            <div className='flex flex-row justify-around'>
                <div className='flex flex-row'>
                    <input type="text" className='border p-3 mx-1'  value={query} onChange={(e)=>setQuery(e.target.value)}/>
                    <button className='bg-green-500 px-2' onClick={()=>search()}>Cari</button>
                </div>
                <div>
                <Link to="report" className='bg-blue-500 p-2'>Buat Laporan</Link>
            </div>
            </div>
          
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
        </>)
}