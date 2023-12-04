import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewKategori = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5500/officer/category',
        {
          name,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.user ? auth.token : ''}`,
          },
        }
      );

      if (response.data.status === 'ok') {
        alert('Kategori berhasil ditambahkan!');
        navigate('/dashboard/category');
      } else {
        alert('Gagal menambahkan kategori');
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nama Kategori:
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Gambar Kategori:
        <input type='text' value={image} onChange={(e) => setImage(e.target.value)} />
      </label>
      <button type='submit'>Tambah Kategori</button>
    </form>
  );
};

export default NewKategori;
