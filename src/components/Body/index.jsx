import { Link } from 'react-router-dom';
import Category from '../Category';
import Hero from '../Hero';
import ListReport from '../ListReport';
import ReportFlow from '../ReportFlow';

export default function Body() {
  return (
    <div className="text-center mb-3">
      <Hero />
      <section className="mb-8 ">
        <h4 className="text-2xl font-bold mb-4">Alur Laporan</h4>
        <ReportFlow />
      </section>
      <section className="mb-8 bg-gray-100 p-4">
        <h4 className="text-2xl font-bold mb-4">Kategori</h4>
        <Category />
      </section>
      <section>
        <h4 className="text-2xl font-bold mb-4">Laporan</h4>
        <div className="">
          <button className="bg-green-500 text-white p-2 rounded  ">
            + Buat Laporan
          </button>
        </div>
        <ListReport />
        <Link to="/dashboard" className="underline hover:underline-offset-4">
          Selengkapnya
        </Link>
      </section>
    </div>
  );
}
