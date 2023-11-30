import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ListReport() {
  const [reportData, setReportData] = useState([]);

  const checkStatus = (status) => {
    if (status === 'waiting') {
      return 'bg-orange-600';
    } else if (status === 'process') {
      return 'bg-blue-600';
    } else if (status === 'rejected') {
      return 'bg-yellow-600';
    }
  };

  useEffect(() => {
    // Fungsi untuk melakukan permintaan GET ke endpoint tertentu
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5500/report');
        // console.log(response.data);
        setReportData(response.data.data);
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };

    // Panggil fungsi fetchData saat komponen dipasang (mounted)
    fetchData();
  }, []);

  return (
    <div className="w-full text-center">
      <div className="">
        <button className="bg-green-500 text-white p-2 rounded  ">
          + Buat Laporan
        </button>
      </div>

      <div className=" item-center justify-center flex flex-row flex-wrap text-left h-auto">
        {reportData.map((report) => (
          <div
            key={report._id}
            className=" bg-white p-0 rounded-lg shadow-md m-3 w-64"
          >
            <div className="relative h-36 ">
              <img
                src={`http://localhost:5500/public/image/${report.imageReport[0]}`}
                alt={report.title}
                className="mb-2 h-36 w-full object-fit rounded-md"
              />
              <div className="absolute flex items-center text-xs text-gray-500 bottom-0 left-1 bg-gray-200 p-1 mb-1 rounded-lg line-clamp-1">
                <FaLocationDot className="mr-1" />
                {report.address}
              </div>
              <div
                className={`absolute top-0 right-0  text-white text-xs p-1  rounded-l-lg ${checkStatus(
                  report.status,
                )}`}
              >
                {report.status}
              </div>
            </div>

            <div className="p-3">
              <h3 className="text-l font-semibold mb-1">{report.title}</h3>

              <p className="text-xs text-gray-600 mb-1 line-clamp-2">
                {report.description}
              </p>

              <div className="flex items-center text-xs text-gray-400 bottom-0 left-0 mb-1 rounded-r-lg">
                <FaCalendar className="mr-1" />
                {new Date(report.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/dashboard" className="underline hover:underline-offset-4">
        Selengkapnya
      </Link>
    </div>
  );
}
