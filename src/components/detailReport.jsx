import {useState,useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";

export default function DetailReport() {
    const auth = useSelector((state) => state.auth);
    const {id} = useParams()
    const [report,setReport] = useState([])
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('')


    const fetchData = async () => {
      try {
        const {data} = await axios.get('http://localhost:5500/report/'+id ,{
            headers: {
               Authorization: `Bearer ${auth.user ? auth.token : ''}`,
            }
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
      }, [id,auth.token]);

      
      function SetViewOnClick( ) {
        const map = useMapEvent("click", () => {
          map.setView({lat: report.latitude, lng: report.longitude }, map.getZoom(), {
            duration:1 ,
            animate: true,
          });
        });
      
        return null;
      }

      const sendComment =async (e)=>{
        e.preventDefault()
        console.log(message)
        const {data} = await axios.post(`http://localhost:5500/comment/${id}`,{message},{
          headers: {
             Authorization: `Bearer ${auth.user ? auth.token : ''}`,
          }
      })
        console.log(data)
        if(data.status==='ok'){
          fetchData()
        }
      }
  
    return (
        <div className="w-4/6 items-center mx-auto mt-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
          <div className="flex flex-col mb-4">
              <img
                src={`http://localhost:5500/public/image/${report.imageReport[0]}`}
                alt={report.title}
                className=" h-36 w-2/6 mr-4"
              />
  
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4' >
                <div  className="col-span-1">
                  <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center '>
                      <div className="flex flex-col">
                        <label className="font-bold">Nomor Laporan:</label>
                        <p className="mb-4">{report._id}</p>
                      </div>
                      <div className="flex flex-col">
                        <label className="font-bold">Status:</label>
                        <p className="mb-4">{report.status}</p>
                      </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold">Tanggal Laporan:</label>
                    <p className="mb-4">{new Date(report.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold">Kategori Laporan:</label>
                    <p className="mb-4">{report.category}</p>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold">Judul Laporan:</label>
                    <p className="mb-4">{report.title}</p>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold">Dekripsi Laporan:</label>
                    <p className="mb-4">{report.description}</p>
                  </div>
                </div>
              <div  className="col-span-1" >
                <MapContainer
                  center={[report.latitude, report.longitude]}
                  zoom={13}
                  scrollWheelZoom={true}
                  className='h-48 w-4/6'>
                    <TileLayer
                    attribution='&copy; <a n href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                      <Marker
                        position={[report.latitude, report.longitude]}
                        >
                        <Popup>
                         {`Lat :${ report.latitude} 
                         Long :${ report.longitude}`}
                         </Popup>
                         <SetViewOnClick/>
                      </Marker>
                 </MapContainer>
                </div>
              </div>

              <div className='w-5/6'>
                <h3 className='font-bold underline'>Komentar</h3>
                <form onSubmit={sendComment} className="mb-5">
                <div className="flex flex-col">
                  <label className="font-bold">Pesan:</label>
                  <textarea
                    type="text"
                    name="title"
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                    minLength="5"
                    maxLength="250"
                    required
                    className="border p-2 mb-5"
                  />
                </div>
                <button className='bg-blue-700 p-2 text-white '>Kirim</button>
                </form>

                <div className='boder-t-4 border-indigo-500'>
                 {report.comment.map((comment) => (
                  <div key={comment._id} className="flex items-center border-b mb-4 pb-2">
                  <img
                    src="https://via.placeholder.com/50" // Ganti dengan sumber gambar yang sesuai
                    alt={comment.name}
                    className="w-16 h-16 object-cover rounded-full bg-gray-200 mr-4"
                  />
                  <div>
                    <p className="text-gray-600 font-semibold">{comment.name}</p>
                    <p className="text-gray-400 text-xs">{new Date(comment.createdAt).toLocaleDateString()}</p>
                    <p className="text-gray-800">{comment.message}</p>
                  </div>
                </div>
              ))}
           </div>
              </div>
            </div>
          </>
        )}
      </div>
    )
}