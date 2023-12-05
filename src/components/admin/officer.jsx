import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Officer() {
  const auth = useSelector((state) => state.auth);
  const [officerData, setOfficerData] = useState([]);
  const [unitWorkData, setUnitWorkData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5500/admin/officer?unitwork=${filter}`,
          {
            headers: {
              Authorization: `Bearer ${auth.user ? auth.token : ''}`,
            },
          },
        );
        setOfficerData(data.data);

        const dataUnitWork = await axios.get(
          `http://localhost:5500/officer/unitwork`,
          {
            headers: {
              Authorization: `Bearer ${auth.user ? auth.token : ''}`,
            },
          },
        );
        setUnitWorkData(dataUnitWork.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [filter]);

  const handleSelectChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="mx-auto">
      <div className="animate__fadeIn animate__animated animate__delay-0.5s box-border rounded-3xl bg-white px-4 py-8 drop-shadow md:p-12 capitalize">
        <div
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-duration="1000"
          data-aos-delay="200"
          data-aos-offset="0"
        >
          <div className="flex items-center animate__fadeIn animate__animated animate__delay-0.5s">
            <div className="mx-5 h-[0.15rem] w-8 md:w-16 bg-slate-900"></div>
            <h2 className="md:text-2xl text-lg font-semibold text-slate-900">
              Daftar Petugas
            </h2>
          </div>

          <div className="flex flex-row text-left ">
            <div className="flex flex-row mx-2">
              <select
                id="selectOption"
                onChange={handleSelectChange}
                value={filter || ''}
              >
                <option value="" disabled>
                  Pilih unit kerja
                </option>
                {unitWorkData.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 md:px-3 md:py-2 me-2 focus:outline-none"
            >
              <Link
                to="/dashboard/officer/new"
                className="text-white text-xs md:text-base"
              >
                Tambah Petugas
              </Link>
            </button>
          </div>
          <div className="container mx-auto mt-8 text-left">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">No</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Level</th>
                  <th className="py-2 px-4 border-b">Unit Kerja</th>
                </tr>
              </thead>

              <tbody>
                {officerData &&
                  officerData.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{index + 1}</td>
                      <td className="py-2 px-4 border-b">{item.name}</td>
                      <td className="py-2 px-4 border-b">{item.role}</td>
                      <td className="py-2 px-4 border-b">
                        {unitWorkData &&
                          unitWorkData
                            .filter((unit) => item.unitWork.includes(unit._id))
                            .map((unit) => (
                              <div key={unit._id}>{unit.name}</div>
                            ))}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
