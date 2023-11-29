import ListReport from './ListReport';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <div>
      <section className='min-h-[90vh]'>
        <div className='relative w-full max-w-7xl items-center px-5 py-12 md:px-12 lg:px-16 lg:py-24'>
          <div className='mx-auto flex w-full text-left'>
            <div className='relative mx-auto inline-flex items-center align-middle'>
              <div className='text-center'>
                <h1 className='max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:max-w-7xl lg:text-6xl'>
                  {' '}
                  Penilaian Kinerja Guru <br className='hidden lg:block' />
                  Guru Penggerak
                </h1>
                <p className='mx-auto mt-8 max-w-xl text-base leading-relaxed text-gray-500'></p>

                <div className='mx-auto mt-6 flex w-full max-w-2xl justify-center gap-2'>
                  <div className='mt-3 rounded-lg sm:mt-0'>
                    <Link href='/login'>
                      <button className='transform rounded-xl bg-blue-600 px-5 py-4 text-center text-base font-medium text-white transition duration-500 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-10'>
                        Login
                      </button>
                    </Link>
                  </div>
                  <div className='mt-3 rounded-lg sm:ml-3 sm:mt-0'>
                    <Link href='/SignUp'>
                      <button className='block transform items-center rounded-xl border-2 border-white px-5 py-3.5 text-center text-base font-medium text-blue-600 shadow-md transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 lg:px-10'>
                        Daftar
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h3 className='text-2xl font-bold mb-4'>Daftar Laporan</h3>

        <ListReport />
      </section>
    </div>
  );
}
