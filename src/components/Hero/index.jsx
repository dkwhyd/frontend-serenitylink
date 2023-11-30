export default function Hero() {
  return (
    <div
      className="relative h-96 bg-cover bg-center h-screen"
      style={{ backgroundImage: 'url(https://placehold.co/600x400)' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center tex-white">
          <h1 className="text-4xl font-bold mb-4">
            {' '}
            Laporkan Masalahmu Sekarang
          </h1>
          <p className="text-lg mb-8 ">
            Adukan masalah atau kejadian yang perlu perhatian segera. Kami di
            sini untuk membantu
          </p>
          <button className="text-white bg-blue-600 px-6 py-2 rounded-full font-semibold">
            Buat Laporan
          </button>
        </div>
      </div>
    </div>
  );
}
