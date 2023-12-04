import { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';

const NewCategory = () => {
  const auth = useSelector((state) => state.auth);

  const [reportOfficer, setReportOfficer] = useState({
    message: '',
    imageReport: [],
  });
  const [preview, setPreview] = useState([]);
  let imageData = new FormData();

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
        `${import.meta.env.VITE_HOST_SERENITY}/upload/image`,
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
    maxFiles: 1,
    maxSize: 2097152,
  });

  // Upload
  const cancelUploadImage = async (itemIndex) => {
    const imageName = preview[itemIndex].image[0];
    console.log(reportOfficer);
    const { data } = await axios.delete(
      `${import.meta.env.VITE_HOST_SERENITY}/delete/image/${imageName}`,
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

  return (
    <div>
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
          <div className="text-center mt:4 md:mt-8 w-full">
            <button
              className="bg-blue-600 mt-4 float-right py-2 px-6 rounded-lg focus:outline-none transition-all ease-out text-white hover:bg-blue-700 focus:bg-blue-900"
              //   onClick={(e) => sendOfficeReport(e)}
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
