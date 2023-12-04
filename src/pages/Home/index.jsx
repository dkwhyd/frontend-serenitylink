/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import ListReport from '../../components/ListReport';
import TimeLine from '../../components/timeline'; 
import Categories from '../../components/kategori';
import Footer from '../../components/footer';
import Hero from '../../components/hero';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 8;

  return (
    <>
      <Header />
      <Hero />
      <section id="alurAduan">
        <TimeLine />
      </section>
      <section id="kategori">
        <Categories />
      </section>
      <section id='laporan'>
        <div className='py-12 min-h-screen md:pt-24 heroBack'>
          <h1 className='text-center text-2xl md:text-5xl out text-slate-900 font-extrabold mb-8 md:mb-16 uppercase'>list report</h1>
          <ListReport searchTerm={searchTerm} currentPage={currentPage} reportsPerPage={reportsPerPage} url="http://localhost:5500/report"/>
        </div>
      </section>
      <Footer />
    </>
  );
}
