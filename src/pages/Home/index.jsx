import Header from '../../components/Header';
import Body from '../../components/Body';
import ListReport from '../../components/ListReport';
import TimeLine from '../../components/timeline';
import Categories from '../../components/kategori';
import Footer from '../../components/footer';

export default function Home() {
  return (
    <>
      <div className='heroBack flex min-h-screen flex-col'>
        <Header />
        <div className='flex flex-1 items-center justify-center'>
          <Body />
          <Footer />
    </div>
      </div>
      <section id='alurAduan'>
        <TimeLine />
      </section>
      <section id='kategori'>
        <Categories />
      </section>
      <section id='laporan'>
        <ListReport />
      </section>
      <Footer />
    </>
  );
}
