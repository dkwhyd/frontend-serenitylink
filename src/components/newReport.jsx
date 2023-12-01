import { useState,useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent,useMapEvents } from "react-leaflet";

// import SimpleImageUpload from "./simpleuploadimage";

const Report = () => {
  const auth = useSelector((state) => state.auth);
  // Get coordinate

  const [defaultCoord, setDefaultCoord] = useState({
    latitude:'1.7575368113083125',
    longitude: '115.65804619654459',
    zoom:'3'
  });

  const { latitude, longitude } = defaultCoord;

// Get cateogory
const [categoryData, setCateogoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get('http://localhost:5500/category');
        console.log(data)
        setCateogoryData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  let imageData = new FormData();

  const [report, setReport] = useState({
    title: '',
    description: '',
    address: '',
    category: '',
    latitude: '',
    longitude: '',
    imageReport: [],
  });

  const [preview, setPreview] = useState([]);

  const onDrop = async (acceptedFiles) => {
    console.log(report.imageReport.length)
    if(report.imageReport.length>2){
      window.alert('maksimal bukti 3 foto')
    }else{
    acceptedFiles.forEach((file) => {
      imageData.append('image', file);
    });
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user ? auth.token : ''}`,
      },
    };
    const uploadImage = await axios.post(
      'http://localhost:5500/upload/image',
      imageData,
      config,
    );
    const getImage = uploadImage.data.image;
    setReport({
      ...report,
      imageReport: [...report.imageReport, uploadImage.data.image],
    });

    const newUpload = {
      image: [
        getImage,
        ...acceptedFiles.map((file) => URL.createObjectURL(file)),
      ],
    };
    setPreview((prevUpload) => [...prevUpload, newUpload]);
  }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    }, 
    multiple: true, 
    maxFiles:3,
    maxSize: 2097152
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Data yang akan dikirim:', JSON.stringify(report));

    if(report)

    try {
      // Kirim formulir ke server menggunakan Axios
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.user ? auth.token : ''}`,
        },
      };
    await axios.post(
        'http://localhost:5500/report',
        report,
        config,
      ).then(response=>{
        window.alert(response.data.message)
        console.log(response)})


      setReport({
        title: "",
        description: "",
        address: "",
        category:'',
        latitude: "",
        longitude: "",
        imageReport: [],
      });
      
      setPreview([])

      document.getElementById('image-dropzone').value = '';
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  const handleChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value,
    });
  };
  const config = {
    headers: {
      Authorization: `Bearer ${auth.user ? auth.token : ''}`,
    },
  };

  const cancelUploadImage =async (itemIndex) => {
    console.log(preview[itemIndex].image[0])
    const imageName = preview[itemIndex].image[0]
    await axios.delete(`http://localhost:5500/delete/image/${imageName}`,config)
    const updatedUpload = preview.filter((item, index) => index !== itemIndex);
    setPreview(updatedUpload);

    const updatedImageReport = [...report.imageReport];
    updatedImageReport.splice(itemIndex, 1);

    setReport({
      ...report,
      imageReport: updatedImageReport,
    });
  };
  // Map

  function SetViewOnClick( ) {
    const map = useMapEvent("click", (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true
      });
    });
  
    return null;
  }
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        console.log(e.latlng.lat);
        console.log(e.latlng.lng);
        setReport((prev) => ({
          ...prev,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        }));
      },
    });
    return false;
  };

    const onMutate = async (e) => {
      console.log(e.latlng);
      //this will not work if you have more other object in your form
      if (typeof e.latlng === "object") {
        setDefaultCoord((prev) => ({
          ...prev,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        }));
        setReport((prev) => ({
          ...prev,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        }));
      }
};

// show category
const [showCategory,setShowCategory] =useState(false)

  return (
    <div className=" mx-auto p-4 ">
    <h2 className="text-2xl font-bold">Create Report</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <div className="col-span-1">
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label className="font-bold">Judul Laporan:</label>
        <input
          type="text"
          name="title"
          value={report.title}
          onChange={handleChange}
          minLength="5"
          maxLength="50"
          required
          className="border p-2"
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold">Deskripsi Laporan:</label>
        <textarea
          name="description"
          value={report.description}
          onChange={handleChange}
          minLength="5"
          maxLength="250"
          required
          className="border p-2"
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold">Lokasi Kejadian:</label>
        <input
          type="text"
          name="address"
          value={report.address}
          onChange={handleChange}
          minLength="10"
          placeholder="nama jalan atau tempat"
          required
          className="border p-2"
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold">Titik Kejadian:</label>
        <MapContainer
        center={[latitude, longitude]}
        zoom={defaultCoord.zoom}
        scrollWheelZoom={true}
        style={{ height: "200px" }}
      >
        <TileLayer
          attribution='&copy; <a n href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          draggable
          position={[report.latitude, report.longitude]}
          eventHandlers={{
            click: (e) => onMutate(e),
          }}
        >
          <Popup>
           Titik Kejadian
          </Popup>
          <MapEvents/>
          <SetViewOnClick/>
        </Marker>
      </MapContainer>
      </div>
      </form>
   
    </div>

    <div className="col-span-1">
    <div className="">
      <label className="font-bold">Bukti Laporan:</label>
      <div
        {...getRootProps()}
        id="image-dropzone"
        className="border-2 border-dashed border-black p-4 mt-2"
      >
        <input {...getInputProps()}/>
        <p>Drag n drop some files here, or click to select files</p>
        <p>Ukuran maksimal per file:  2MB</p>
        <p>Bukti maskimal 3 foto</p>

      </div>
    </div>

    <div className="mt-4  mb-3 h-48">
    <label className="font-bold">Preview:</label>
      <div className='flex flex-row'>
      {preview &&
        preview.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-x-2">
            <img
              src={item.image[1]}
              alt={`Image ${index + 1}`}
              className="w-32 h-32 "
            />
            <button
              onClick={() => cancelUploadImage(index)}
              className="bg-red-500  text-white rounded"
            >
              Hapus
            </button>
          </div>
        ))}
        </div>
    </div>
    <div className="flex flex-col">
      <label className="font-bold">Category:</label>
      <div className='bg-white p-4 relative cursor-pointer' onClick={()=>setShowCategory(!showCategory)}>
        {report.category}
      </div>
          {showCategory? 

        <div className='flex flex-wrap justify-center bg-gray-100  bottom-0'>
          {categoryData.map((category,index) => (
            <div key={index} className='w-4/6 sm:w-1/5 md:w-1/5 lg:w-[14.2857%] group p-4 text-center' onClick={()=>{setReport({...report, category: category.name})}} >
              <img className='mx-auto w-5 h-5 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full group-hover:outline group-hover:outline-1 group-hover:outline-primary-600 duration-100 ease-out' src={`http://localhost:5500/public/image/${category.image}`} alt={category.name} />
              <p className='mt-2 text-base text-[#64748BBF] group-hover:text-primary-600 group-hover:font-semibold'>{category.name}</p>
            </div>
          ))}
      </div>
       :null }
    </div>
    </div>

    </div>
    <div className='text-center mt-2'>

    <button className='bg-blue-600 w-24 text-white p-2 rounded' onClick={(e)=>handleSubmit(e)}>Kirim</button>

    </div>
  </div>
  );
};

export default Report;
