import ListReport from './ListReport';

export default function Body() {
  return (
    <div className="p-5 text-center">
      <section className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Alur Laporan</h3>
      </section>
      <section className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Kategori</h3>
      </section>
      <section>
        <h3 className="text-2xl font-bold mb-4">Daftar Laporan</h3>

        <ListReport />
      </section>
    </div>
  );
}
