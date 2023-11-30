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
      <section className="mb-8 bg-blue-100">
        <h4 className="text-2xl font-bold mb-4">Kategori</h4>
        <Category />
      </section>
      <section>
        <h4 className="text-2xl font-bold mb-4">Laporan</h4>
        <ListReport />
      </section>
    </div>
  );
}
