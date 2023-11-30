import { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
// import SimpleImageUpload from "./simpleuploadimage";

const Report = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth.token);
  let imageData = new FormData();

  const [report, setReport] = useState({
    title: 'asdasdas',
    description: 'asdasdasdas',
    address: 'asdasdasd',
    category: 'sampah',
    latitude: '12312312312',
    longitude: '12312312312',
    imageReport: [],
  });

  const [preview, setPreview] = useState({
    imagePreview: [],
  });

  const [upload, setUpload] = useState([]);
  const { imagePreview } = preview;

  const {
    title,
    description,
    address,
    latitude,
    longitude,
    imageReport,
    category,
  } = report;

  const onDrop = async (acceptedFiles) => {
    // console.log(acceptedFiles);
    acceptedFiles.forEach((file) => {
      imageData.append('image', file);
    });
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user ? auth.token : ''}`,
        // Tambahkan header lain jika diperlukan
      },
    };
    const uploadImage = await axios.post(
      'http://localhost:5500/upload/image',
      imageData,
      config,
    );
    const getImage = uploadImage.data.image;
    console.log(uploadImage);
    setReport({
      ...report,
      imageReport: [...imageReport, getImage],
    });
    setPreview({
      ...preview,
      imagePreview: [
        ...imagePreview,
        ...acceptedFiles.map((file) => URL.createObjectURL(file)),
      ],
    });
    const newUpload = {
      image: [
        getImage,
        ...acceptedFiles.map((file) => URL.createObjectURL(file)),
      ],
    };
    setUpload((prevUpload) => [...prevUpload, newUpload]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    }, // Hanya menerima file gambar
    multiple: true, // Mengizinkan pengguna memilih beberapa file
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(upload);
    console.log('Data yang akan dikirim:', report);

    try {
      // Kirim formulir ke server menggunakan Axios
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.user ? auth.token : ''}`,
        },
      };
      const send = await axios.post(
        'http://localhost:5500/report',
        report,
        config,
      );

      console.log(send.data);

      // Atur state formData kembali ke nilai awal
      // setFormData({
      //   title: "",
      //   description: "",
      //   address: "",
      //   latitude: "",
      //   longitude: "",
      //   // status: "accepted",
      //   imageReport: [],
      // });

      // Atur kembali tampilan gambar di dropzone
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

  const cancelImageReport = (image) => {
    console.log(image);
    // console.log(report.imageReport);
    // setPreview((prevPreview) => ({
    //   ...prevPreview,
    //   imagePreview: prevPreview.imagePreview.filter((data) => data !== image),
    // }));

    setUpload((image) => {
      image.filter((item, index) => !index !== image);
    });
    console.log(upload);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            minLength="5"
            maxLength="50"
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            minLength="5"
            maxLength="250"
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="address"
            value={category}
            onChange={handleChange}
            minLength="10"
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
            minLength="10"
            required
          />
        </div>
        <div>{/* <MapLeaflet /> */}</div>
        <div>
          <label>Latitude:</label>
          <input
            type="text"
            name="latitude"
            value={latitude}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="text"
            name="longitude"
            value={longitude}
            onChange={handleChange}
          />
        </div>

        <input type="submit" className="bg-green-500 p-2" />
      </form>

      {/* pisahkan upload gambar dengan form */}

      <div>
        <label>Image Report:</label>
        <div
          {...getRootProps()}
          id="image-dropzone"
          style={{
            border: '2px dashed #ccc',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <input {...getInputProps()} />
          <p>Drag n drop some files here, or click to select files</p>
        </div>
      </div>
      <div>
        {upload &&
          upload.map((item, index) => (
            <div key={index}>
              {/* <strong>
                Image {index + 1}: {item.image[1]}{" "}
              </strong> */}
              <img
                src={item.image[1]}
                alt={`Image ${index + 1}`}
                style={{ width: '200px', height: '200px' }}
              />
              <button
                onClick={() => cancelImageReport(item)}
                className="bg-green-500"
              >
                hapus
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Report;
