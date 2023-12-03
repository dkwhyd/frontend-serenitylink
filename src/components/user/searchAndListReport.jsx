import { useState } from 'react';
import ListReport from '../ListReport';
import { Link } from 'react-router-dom';

export default function SearchAndListReport() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <div className="flex items-center">
        <div className="mx-5 h-[0.15rem] w-16 bg-slate-900"></div>
        <h2 className="md:text-2xl text-xl  font-semibold text-slate-900">
          Daftar Laporan
        </h2>
      </div>

      <div className="mx-5 mt-4 flex">
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="block w-[95%] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="ketik laporan atau detail laporan"
          />
        </div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-4 me-2 mb-2  focus:outline-none"
        >
          <Link to="/dashboard/report/new" className="text-white">
            Buat Laporan
          </Link>
        </button>
      </div>
      <ListReport searchTerm={searchTerm} numReports={8} url={`${import.meta.env.VITE_HOST_API}/report`} />
    </div>
  );
}
