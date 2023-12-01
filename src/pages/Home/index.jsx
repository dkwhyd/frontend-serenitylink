import Header from '../../components/Header';
import ListReport from '../../components/ListReport';
import TimeLine from '../../components/timeline';
import Categories from '../../components/kategori';
import Footer from '../../components/footer';
import Hero from '../../components/hero';

export default function Home() {
  return (
    <>
        <Header />
          <Hero/>
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
