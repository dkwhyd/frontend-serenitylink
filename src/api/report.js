import axios from 'axios';

export async function getReport() {
  return await axios.get(`${import.meta.env.VITE_HOST_API}/report`);
}
