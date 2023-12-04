/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportCard = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:5500/report');
      setReports(result.data.data);
    };
    fetchData();
  }, []);

  const statusCount = reports.reduce((acc, report) => {
    acc[report.status] = (acc[report.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className=' mx-auto md:px-4'>
      <div className='animate__fadeIn animate__animated animate__delay-0.5s box-border rounded-3xl bg-white px-4 py-8 drop-shadow md:p-12'>
        <div className=''>
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl capitalize'>Our service statistics</h2>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-4 mt-4'>
            {Object.entries(statusCount).map(([status, count]) => (
              <div key={status} className='group bg-white hover:bg-indigo-600 overflow-hidden shadow sm:rounded-lg cursor-pointer transition-all duration-100 ease-in'>
                <div className='px-4 py-5 sm:p-6'>
                  <dl>
                    <dt className='text-sm leading-5 font-medium text-gray-500 group-hover:text-white truncate'>{status}</dt>
                    <dd className='mt-1 text-3xl leading-9 font-semibold text-indigo-600 group-hover:text-white'>{count}</dd>
                  </dl>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
