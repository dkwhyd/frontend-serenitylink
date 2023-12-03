/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ListReport({ searchTerm, numReports, url }) {
  const [reportData, setReportData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}?q=${searchTerm}`);
        // console.log(response.data);
        setReportData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const filteredReports = reportData
    .filter(
      (report) =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(0, numReports);

  return (
    <div
      className={`overflow-hidden ${
        isSidebarOpen ? 'translate-x-16' : '  translate-x-0'
      } transition-all duration-500`}
    >
      <div className="py-4 md:py-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-left mx-5">
          {filteredReports.map((report) => (
            <Link
              to={`/dashboard/report/detail/${report._id}`}
              key={report._id}
            >
              <div className=" bg-white p-0 rounded-lg box-border drop-shadow">
                <div className="relative h-48">
                  <img
                    src={`http://localhost:5500/public/image/${report.imageReport[0]}`}
                    alt={report.title}
                    className="mb-2 w-full h-48 object-fit rounded-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                  <div
                    className={`${
                      isSidebarOpen ? 'hidden' : 'absolute'
                    } transition-none duration-0 bottom-0 right-0 bg-green-500 text-white text-xs p-1 rounded-l-lg`}
                  >
                    {report.status}
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="text-l font-semibold mb-1">{report.title}</h3>
                  <div className="flex items-center text-xs text-gray-500 bottom-0 left-0 mb-1 rounded-r-lg">
                    <FaLocationDot className="mr-1" />
                    {report.address}
                  </div>
                  <p className="text-sm text-gray-600 mb-1 line-clamp-3">
                    {report.description}
                  </p>

                  <div className="flex items-center text-xs text-gray-400 bottom-0 left-0 mb-1 rounded-r-lg">
                    <FaCalendar className="mr-1" />
                    {new Date(report.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

ListReport.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  numReports: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

export default ListReport;
