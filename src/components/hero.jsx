import { Link } from 'react-router-dom';
function Hero() {
  return (
    <>
      <section
        className='
grid grid-cols-1 items-center px-4 pb-20 pt-5 md:px-20 lg:grid-cols-2'
      >
        <div className='animate__fadeIn animate__animated animate__delay-1s order-last py-4 md:order-first md:py-0 lg:pr-8'>
          <div className='flex items-center'>
            <div className='h-[0.15rem] w-16 bg-blue-600'></div>
            <div className='ml-4 md:text-2xl text-xl  font-semibold text-blue-600'>Selamat Datang Di</div>
          </div>
          <h1 className='mt-0 text-2xl font-semibold tracking-wider text-slate-900 md:mt-4 md:text-5xl'>Aplikasi SerenityLink</h1>
          <p className='mt-4 text-[1rem] leading-6 text-[#64748BBF] text-opacity-100'>
            {' '}
            <span className='font-medium text-blue-600'>SerenityLink</span> adalah aplikasi yang berfungsi sebagai <span>platform pengaduan masyarakat</span>. Aplikasi ini memfasilitasi komunikasi antara{' '}
            <span className='font-medium text-blue-600'>masyarakat</span> dan <span className='font-medium text-blue-600'>pihak berwenang</span>, dengan tujuan menciptakan <span className='font-medium text-blue-600'>lingkungan</span> yang
            lebih <span className='font-medium text-blue-600'>baik </span>dan lebih <span className='font-medium text-blue-600'>adil</span> untuk semua orang.
          </p>
          <p className='mt-4 text-[1rem] leading-6 text-[#64748BBF] text-opacity-100'>
            Dengan aplikasi ini, pengguna dapat dengan mudah melaporkan masalah atau kejadian yang mereka alami atau saksikan, yang kemudian dapat ditindaklanjuti oleh pihak yang berwenang.
          </p>
          <p className='mt-6 text-[1rem] leading-6 text-[#64748BBF] text-opacity-100'>
            Jika Anda melihat atau mengalami sesuatu yang perlu dilaporkan, gunakan aplikasi ini dan tekan tombol <span className='font-medium text-blue-600'>Buat Laporan</span>. Mari kita bersama-sama{' '}
            <span className='font-medium text-blue-600'>bertanggung jawab</span> dalam menciptakan lingkungan yang lebih baik.
          </p>
          <Link href='#' target='_blank'>
            <div className='mt-8 inline-flex items-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600'>
              <svg xmlns='http://www.w3.org/2000/svg' className='mr-2 h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                <path fillRule='evenodd' d='M13 3H7a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V5a2 2 0 00-2-2zm-1 10H8a1 1 0 110-2h4a1 1 0 110 2zm0-4H8a1 1 0 110-2h4a1 1 0 110 2z' clipRule='evenodd' />
              </svg>
              Buat Laporan
            </div>
          </Link>
        </div>
        <div className='animate__fadeIn animate__animated animate__delay-2s group order-first mx-auto max-w-md pb-12 pt-24 md:order-last lg:pl-20'>
          <div className='relative' style={{ transform: 'perspective(1000px) rotate(0deg) rotateY(0deg) scale3d(1,1,1)', willChange: 'transform' }}>
            <div className='flex h-60 w-60 items-center justify-center overflow-hidden rounded-full bg-transparent md:h-[28rem] md:w-[28rem]'>
              <img className='' src='/heros2.jpg' alt='hero' />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
