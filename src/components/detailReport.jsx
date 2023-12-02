/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';

export default function DetailReport() {
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      const { data } = await axios.get('http://localhost:5500/report/' + id, {
        headers: {
          Authorization: `Bearer ${auth.user ? auth.token : ''}`,
        },
      });
      setReport(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id, auth.token]);

  function SetViewOnClick() {
    const map = useMapEvent('click', () => {
      map.setView({ lat: report.latitude, lng: report.longitude }, map.getZoom(), {
        duration: 1,
        animate: true,
      });
    });

    return null;
  }

  const sendComment = async (e) => {
    e.preventDefault();
    console.log(message);
    const { data } = await axios.post(
      `http://localhost:5500/comment/${id}`,
      { message },
      {
        headers: {
          Authorization: `Bearer ${auth.user ? auth.token : ''}`,
        },
      }
    );
    console.log(data);
    if (data.status === 'ok') {
      fetchData();
    }
  };

  return (
    <div className='animate__fadeIn animate__animated animate__delay-1s box-border rounded-3xl bg-white px-4 py-8 drop-shadow md:p-12'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className='flex flex-col mb-4'>
            <img
              src={report.imageReport[0] ? `http://localhost:5500/public/image/${report.imageReport[0]}` : 'https://via.placeholder.com/150'}
              alt={report.title}
              className='h-36 w-fit mr-4 my-4'
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='col-span-1'>
                <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center '>
                  <div className='flex flex-col'>
                    <label className='font-semibold text-gray-900'>Nomor Laporan:</label>
                    <p className='mb-4'>{report._id}</p>
                  </div>
                  <div className='flex flex-col'>
                    <label className='font-semibold text-gray-900'>Status:</label>
                    <p className='mb-4'>{report.status}</p>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <label className='font-semibold text-gray-900'>Tanggal Laporan:</label>
                  <p className='mb-4'>{new Date(report.createdAt).toLocaleDateString()}</p>
                </div>
                <div className='flex flex-col'>
                  <label className='font-semibold text-gray-900'>Kategori Laporan:</label>
                  <p className='mb-4'>{report.category}</p>
                </div>
                <div className='flex flex-col'>
                  <label className='font-semibold text-gray-900'>Judul Laporan:</label>
                  <p className='mb-4'>{report.title}</p>
                </div>
                <div className='flex flex-col'>
                  <label className='font-semibold text-gray-900'>Dekripsi Laporan:</label>
                  <p className='mb-4'>{report.description}</p>
                </div>
              </div>
              <div className='col-span-1'>
                <MapContainer center={[report.latitude, report.longitude]} zoom={13} scrollWheelZoom={true} className='h-full w-full'>
                  <TileLayer attribution='&copy; <a n href="http://osm.org/copyright">OpenStreetMap</a>' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                  <Marker position={[report.latitude, report.longitude]}>
                    <Popup>
                      {`Lat :${report.latitude} 
                         Long :${report.longitude}`}
                    </Popup>
                    <SetViewOnClick />
                  </Marker>
                </MapContainer>
              </div>
            </div>

            <div className='w-full'>
              <h3 className='font-bold text-primary-600 mb-4'>Komentar ({report.comment.length})</h3>
              <div className='border border-gray-200 p-2 md:p-4'>
                {report.comment.map((comment, index) => (
                  <article key={comment._id} className={`p-6 text-base bg-white ${index === report.comment.length - 1 ? '' : 'border-b border-gray-200'}`}>
                    <footer className='flex justify-between items-center mb-2'>
                      <div className='flex items-center'>
                        <p className='inline-flex items-center mr-3 text-xs md:text-sm text-gray-900 font-semibold'>
                          <img className='mr-2 w-6 h-6 rounded-full' src={comment.image ? `http://localhost:5500/public/image/${comment.image}` : 'https://via.placeholder.com/150'} alt={comment.name} />
                          {comment.name}
                        </p>
                        <p className='text-xs md:text-sm text-gray-600'>
                          <time title={new Date(comment.createdAt).toLocaleDateString()}>{new Date(comment.createdAt).toLocaleDateString()}</time>
                        </p>
                      </div>
                    </footer>
                    <p className='text-gray-500'>{comment.message}</p>
                  </article>
                ))}
              </div>

              <form onSubmit={sendComment} className='my-5'>
                <div className='flex flex-col'>
                  <label className='font-bold'>Pesan:</label>
                  <textarea
                    type='text'
                    name='title'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    minLength='5'
                    maxLength='250'
                    required
                    className='bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  />
                </div>
                <button className='bg-blue-600 mt-4 float-right py-2 px-6 rounded-lg focus:outline-none transition-all ease-out text-white hover:bg-blue-700 focus:bg-blue-900'>Kirim</button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
