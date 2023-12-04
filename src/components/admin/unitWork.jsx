import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UnitWork = () => {
  const [unitWorkData, setUnitWorkData] = useState([]);
  const [reload, setReload] = useState(false);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5500/officer/unitwork`,
          {
            headers: {
              Authorization: `Bearer ${auth.user ? auth.token : ''}`,
            },
          },
        );
        console.log(data);
        setUnitWorkData([
          { name: 'Tambah Unit Kerja', isButton: true },
          ...data.data,
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [reload]);

  const handleDelete = async (unitWorkId, unitWorkName) => {
    const userConfirmation = window.confirm(
      `Apakah kamu yakin ingin menghapus Unit Kerja: ${unitWorkName}?`,
    );
    if (!userConfirmation) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5500/officer/unitwork/${unitWorkId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user ? auth.token : ''}`,
          },
        },
      );

      if (response.data.status === 'ok') {
        alert('Unit kerja berhasil dihapus!');
        setReload(!reload);
      } else {
        alert('Gagal menghapus unit kerja: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error deleting unirwork:', error);
    }
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
          <h1 className="text-center text-2xl md:text-5xl out text-primary-600 font-extrabold mb-8 uppercase">
            Unit Kerja
          </h1>
          <div className="flex flex-wrap justify-start ">
            {unitWorkData.map((unitwork, index) => (
              <div
                key={index}
                className="w-1/2 sm:w-1/5 md:w-1/5 lg:w-[14.2857%] group p-4 text-center mb-8 relative"
              >
                {unitwork.isButton ? (
                  <Link to="/dashboard/unitworks/new">
                    <button className="mx-auto bg-[#CCCCCC] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full group-hover:outline group-hover:outline-1 group-hover:outline-primary-600 duration-100 ease-out">
                      +
                    </button>
                  </Link>
                ) : (
                  <>
                    <img
                      className="mx-auto w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full group-hover:outline group-hover:outline-1 group-hover:outline-primary-600 duration-100 ease-out"
                      src={`${
                        import.meta.env.VITE_HOST_SERENITY
                      }/public/image/${unitwork.image}`}
                      alt={unitwork.name}
                    />
                    <button
                      onClick={() => handleDelete(unitwork._id, unitwork.name)}
                      className="absolute -top-1 -right-1 bg-transparent rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                      X
                    </button>
                  </>
                )}
                <p className="mt-2 text-base text-[#64748BBF] group-hover:text-primary-600 group-hover:font-semibold">
                  {unitwork.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitWork;
