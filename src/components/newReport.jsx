import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMapEvents,
} from 'react-leaflet';

const NewReport = () => {
  const auth = useSelector((state) => state.auth);
  // Get coordinate

  const [defaultCoord, setDefaultCoord] = useState({
    latitude: '1.7575368113083125',
    longitude: '115.65804619654459',
    zoom: '3',
  });

  const { latitude, longitude } = defaultCoord;

  // Get cateogory
  const [categoryData, setCateogoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:5500/category');
        // console.log(data);
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
    // console.log(report.imageReport.length);
    if (report.imageReport.length > 2) {
      window.alert('maksimal bukti 3 foto');
    } else {
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
    maxFiles: 3,
    maxSize: 2097152,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Data yang akan dikirim:', JSON.stringify(report));

    if (report)
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.user ? auth.token : ''}`,
          },
        };
        await axios
          .post('http://localhost:5500/report', report, config)
          .then((response) => {
            window.alert(response.data.message);
            console.log(response);
          });

        setReport({
          title: '',
          description: '',
          address: '',
          category: '',
          latitude: '',
          longitude: '',
          imageReport: [],
        });

        setPreview([]);

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

  const cancelUploadImage = async (itemIndex) => {
    const imageName = preview[itemIndex].image[0];
    await axios.delete(
      `http://localhost:5500/delete/image/${imageName}`,
      config,
    );
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

  function SetViewOnClick() {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      });
    });

    return null;
  }
  const MapEvents = () => {
    useMapEvents({
      click(e) {

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
    if (typeof e.latlng === 'object') {
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
  const [showCategory, setShowCategory] = useState(false);

  return (
    <div className=" mx-auto md:px-4">
      <div className="animate__fadeIn animate__animated animate__delay-1s box-border rounded-3xl bg-white px-4 py-8 drop-shadow md:p-12">
        <div className="flex items-center mb-2 md:mb-4 mx-auto">
          <h2 className="md:text-4xl ml-4 text-lg font-semibold text-primary-600">
            Buat Laporan
          </h2>
        </div>
        <hr className="bg-black p-[0.025rem] mb-8 md:mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="col-span-1">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
                  Judul Laporan:
                </label>
                <input
                  type="text"
                  name="title"
                  value={report.title}
                  onChange={handleChange}
                  minLength="5"
                  maxLength="50"
                  required
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="flex flex-col">
                <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
                  Deskripsi Laporan:
                </label>
                <textarea
                  name="description"
                  value={report.description}
                  onChange={handleChange}
                  minLength="5"
                  maxLength="250"
                  required
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="flex flex-col">
                <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
                  Lokasi Kejadian:
                </label>
                <input
                  type="text"
                  name="address"
                  value={report.address}
                  onChange={handleChange}
                  minLength="10"
                  placeholder="nama jalan atau tempat"
                  required
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="flex flex-col">
                <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
                  Titik Kejadian:
                </label>
                <MapContainer
                  center={[latitude, longitude]}
                  zoom={defaultCoord.zoom}
                  scrollWheelZoom={true}
                  // style={{ height: '200px' }}
                  className="h-48 min-h-full"
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
                    <Popup>Titik Kejadian</Popup>
                    <MapEvents />
                    <SetViewOnClick />
                  </Marker>
                </MapContainer>
              </div>
            </form>
          </div>

          <div className="col-span-1">
            <div className="">
              <label className="block mb-2.5 text-xs md:text-base text-gray-900 font-semibold">
                Bukti Laporan:
              </label>
              <div
                {...getRootProps()}
                id="image-dropzone"
                className="border-2 border-dashed bg-gray-200 border-black p-5 mt-2"
              >
                <input {...getInputProps()} />
                <p className="text-center">
                  Drag n drop some files here, or click to select files
                </p>
                <p className="text-center">Ukuran maksimal per file: 2MB</p>
                <p className="text-center">Bukti maskimal 3 foto</p>
              </div>
            </div>

            <div className="mt-4  mb-3 min-h-[11rem] h-fit">
              <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold ">
                Preview:
              </label>
              <div className="flex flex-col flex-wrap sm:flex-row">
                {preview &&
                  preview.map((item, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col items-center space-x-2"
                    >
                      <img
                        src={item.image[1]}
                        alt={`Image ${index + 1}`}
                        className="max-w-24 h-32 mx-4 my-2"
                      />
                      <button
                        onClick={() => cancelUploadImage(index)}
                        className="absolute -top-4 -right-4 bg-transparent rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover: hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      >
                        <span className="sr-only">Hapus</span>
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col my-4">
          <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
            Kategori Laporan:
          </label>
          <div
            className="bg-gray-200 p-2 rounded-md relative cursor-pointer"
            onClick={() => setShowCategory(!showCategory)}
          >
            {report.category ? report.category : 'Pilih kategori'}
          </div>
          {showCategory ? (
            <div className="flex flex-wrap justify-center bg-gray-100">
              {categoryData.map((category, index) => (
                <div
                  key={index}
                  className="w-3/6  md:w-2/5 lg:w-[14.2857%] group p-4 text-center"
                  onClick={() => {
                    setReport({ ...report, category: category.name });
                  }}
                >
                  <img
                    className="mx-auto w-5 h-5 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full group-hover:outline group-hover:outline-1 group-hover:outline-primary-600 duration-100 ease-out"
                    src={`http://localhost:5500/public/image/${category.image}`}
                    alt={category.name}
                  />
                  <p className="mt-2 text-base text-[#64748BBF] group-hover:text-primary-600 group-hover:font-semibold">
                    {category.name}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="text-center mt:4 md:mt-8 w-full">
          <button
            className="bg-blue-600 text-white w-full p-2 rounded"
            onClick={(e) => handleSubmit(e)}
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewReport;
