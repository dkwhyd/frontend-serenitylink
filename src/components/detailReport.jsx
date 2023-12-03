/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from 'react-leaflet';
import { useDropzone } from 'react-dropzone';

export default function DetailReport() {
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [reportOfficer, setReportOfficer] = useState({
    message: '',
    imageReport: [],
  });
  const [preview, setPreview] = useState([]);
  let imageData = new FormData();

  // console.log(report);

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
  // console.log(report);

  function SetViewOnClick() {
    const map = useMapEvent('click', () => {
      map.setView(
        { lat: report.latitude, lng: report.longitude },
        map.getZoom(),
        {
          duration: 1,
          animate: true,
        },
      );
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
      },
    );
    console.log(data);
    if (data.status === 'ok') {
      fetchData();
    }
  };

  const onDrop = async (acceptedFiles) => {
    console.log(reportOfficer.imageReport.length);
    if (reportOfficer.imageReport.length > 2) {
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
      setReportOfficer({
        ...reportOfficer,
        imageReport: [...reportOfficer.imageReport, uploadImage.data.image],
      });

      const newUpload = {
        image: [
          getImage,
          ...acceptedFiles.map((file) => URL.createObjectURL(file)),
        ],
      };
      setPreview((prevUpload) => [...prevUpload, newUpload]);

      console.log(reportOfficer);
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

  // Upload
  const cancelUploadImage = async (itemIndex) => {
    const imageName = preview[itemIndex].image[0];
    console.log(reportOfficer);
    const { data } = await axios.delete(
      `http://localhost:5500/delete/image/${imageName}`,
      {
        headers: {
          Authorization: `Bearer ${auth.user ? auth.token : ''}`,
        },
      },
    );
    console.log(data);
    if (data.status === 'ok') {
      const updatedUpload = preview.filter(
        (item, index) => index !== itemIndex,
      );
      setPreview(updatedUpload);
    } else {
      window.alert('cancel upload image failed');
    }

    const updatedImageReport = [...report.imageReport];
    updatedImageReport.splice(itemIndex, 1);

    setReportOfficer({
      ...reportOfficer,
      imageReport: updatedImageReport,
    });
  };

  const handleSubmit = async (e) => {
    console.log(auth?.token);
    console.log(reportOfficer);
    e.preventDefault();
    const { data } = await axios.post(
      `http://localhost:5500/officer/report/${report._id}`,
      { reportOfficer },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      },
    );
    console.log(data);
  };

  return (
    <div className="animate__fadeIn animate__animated animate__delay-1s box-border rounded-3xl bg-white px-4 py-8 drop-shadow md:p-12">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex flex-col mb-4">
            <div className="flex flex-col md:flex-row mb-4">
              {report.imageReport &&
                report.imageReport.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5500/public/image/${image}`}
                    alt={report.title}
                    className="h-36 w-fit mr-4 my-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center ">
                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-900">
                      Nomor Laporan:
                    </label>
                    <p className="mb-4">{report._id}</p>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-900">
                      Status:
                    </label>
                    <p className="mb-4">{report.status}</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-900">
                    Tanggal Laporan:
                  </label>
                  <p className="mb-4">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-900">
                    Kategori Laporan:
                  </label>
                  <p className="mb-4">{report.category}</p>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-900">
                    Judul Laporan:
                  </label>
                  <p className="mb-4">{report.title}</p>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-900">
                    Dekripsi Laporan:
                  </label>
                  <p className="mb-4">{report.description}</p>
                </div>
              </div>
              <div className="col-span-1">
                <MapContainer
                  center={[report.latitude, report.longitude]}
                  zoom={13}
                  scrollWheelZoom={true}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a n href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
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

            {report.unitWorks ? (
              <div className="flex flex-col">
                <label className="font-semibold text-gray-900">
                  Unit Kerja:
                </label>
                <div>
                  <img
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full group-hover:outline "
                    src={`http://localhost:5500/public/image/${report.unitWorks.image}`}
                    alt={report.unitWorks.name}
                  />
                  <p className="mb-4">{report.unitWorks.name}</p>
                </div>
              </div>
            ) : null}

            {report.officerReport ? (
              <div>
                <label className="font-semibold text-gray-900">
                  Laporan Petugas:
                </label>
                <div>{report.officerReport.message}</div>
                {report.officerReport.imageReport &&
                  report.officerReport.imageReport.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5500/public/image/${image}`}
                      alt="laporan petugas"
                      className="h-36 w-fit mr-4 my-4"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                  ))}
              </div>
            ) : null}
            {/* Form Officer Report */}
            {report.officerReport ? null : (
              <div className="">
                Buat Laporan
                <div className="flex flex-col">
                  <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
                    Pesan:
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={reportOfficer.message}
                    onChange={(e) =>
                      setReportOfficer({
                        ...reportOfficer,
                        message: e.target.value,
                      })
                    }
                    minLength="5"
                    maxLength="50"
                    required
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
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
                      <p className="text-center">
                        Ukuran maksimal per file: 2MB
                      </p>
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
            )}
            <div className="w-full">
              <h3 className="font-bold text-primary-600 mb-4">
                Komentar ({report.comment.length})
              </h3>
              <div className="border border-gray-200 p-2 md:p-4">
                {report.comment.map((comment, index) => (
                  <article
                    key={comment._id}
                    className={`p-6 text-base bg-white ${
                      index === report.comment.length - 1
                        ? ''
                        : 'border-b border-gray-200'
                    }`}
                  >
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-xs md:text-sm text-gray-900 font-semibold">
                          <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={
                              comment.image
                                ? `http://localhost:5500/public/image/${comment.image}`
                                : 'https://via.placeholder.com/150'
                            }
                            alt={comment.name}
                          />
                          {comment.name}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600">
                          <time
                            title={new Date(
                              comment.createdAt,
                            ).toLocaleDateString()}
                          >
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </time>
                        </p>
                      </div>
                    </footer>
                    <p className="text-gray-500">{comment.message}</p>
                  </article>
                ))}
              </div>

              <form onSubmit={sendComment} className="my-5">
                <div className="flex flex-col">
                  <label className="font-bold">Pesan:</label>
                  <textarea
                    type="text"
                    name="title"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    minLength="5"
                    maxLength="250"
                    required
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <button className="bg-blue-600 mt-4 float-right py-2 px-6 rounded-lg focus:outline-none transition-all ease-out text-white hover:bg-blue-700 focus:bg-blue-900">
                  Kirim
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
