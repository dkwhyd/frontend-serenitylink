# Frontend SerenityLink

> Capstone Project C523-PR086

<p align="center">
  <img src="https://github.com/dkwhyd/frontend-serenitylink/blob/main/dist/logo2-nobg.png" width="250" title="hover text">
</p>

SerenityLink adalah aplikasi yang berfungsi sebagai platform pengaduan masyarakat Aplikasi ini memfasilitasi komunikasi antara masyarakat dan pihak berwenang, dengan tujuan menciptakan lingkungan yang lebih baik dan lebih adil untuk semua orang.

Dengan aplikasi ini, pengguna dapat dengan mudah melaporkan masalah atau kejadian yang mereka alami atau saksikan, yang kemudian dapat ditindaklanjuti oleh pihak yang berwenang.


## Instalasi

1. Clone repositori ini.
2. Buat file .env pada root folder
3. Tambahkan VITE_HOST_SERENITY = <alamat server>, misal http://localhost:5500
4. Jalankan perintah `npm install` untuk menginstal dependensi. 

## Cara Menggunakan

1. Jalankan proyek dengan perintah `npm run dev`.
2. Buka browser dan akses `http://localhost:5173`.

## Cara Build

1. Sesuaikan config cache dengan servermu pada vite.config.js
2. Build proyek dengan perintah `npm run build`.
3. Hasil build berada pada folder dist

## Aktor:

1. Tamu
2. Warga
3. Pihak Terkait
4. Admin
## Use Case:

1. **Tamu:**
   - Tamu dapat melihat kategori apa saja yang tersedia.
   - Tamu dapat melihat sebagian laporan pada halaman utama.

2. **Pelapor:**
   - Warga dapat membuat laporan baru.
   - Warga wajib masuk sebelum membuat laporan.
   - Warga dapat mendaftar jika tidak memiliki akun.
   - Warga dapat melihat laporan yang telah ia buat.
   - Warga dapat mencari laporan berdasarkan judul.
   - Warga dapat memfilter laporan berdasarkan statusnya.

3. **Pihak Terkait:**
   - Pihak terkait dapat melihat laporan yang sudah dikirimkan ke unit kerja pihak terkait.
   - Pihak terkait dapat melaporkan hasil kerjanya.
   - Pihak terkait dapat melihat laporan yang telah ia kirimkan.

4. **Admin:**
   - Admin dapat melihat jumlah laporan per status.
   - Admin dapat melihat lokasi laporan pada map.
   - Admin dapat meneruskan laporan ke pihak terkait.
   - Admin dapat menghapus laporan.
   - Admin dapat melihat kategori pada halaman dasbor.
   - Admin dapat menambahkan kategori laporan.
   - Admin dapat menghapus kategori laporan.
   - Admin dapat melihat unit kerja pada halaman dasbor.
   - Admin dapat menambahkan unit kerja.
   - Admin dapat menghapus unit kerja.
   - Admin dapat melihat daftar petugas pada halaman dasbor.
   - Admin dapat menambahkan petugas.
   - Admin dapat menghapus petugas.

## Proses Pengembangan:

1. Menentukan spesifikasi sistem aduan.
2. Desain UI/UX sistem.
3. Membuat Frontend & Backend.
4. Deploy.

## Teknologi yang digunakan :

1. React + Vite
2. Tailwind CSS
3. Leaflet
## Backend SerenityLink
[Backend SerenityLink](https://github.com/dkwhyd/backend-serenitylink)

## Link Deploy
**[SerenityLink Website](https://serenitylink.live)**
