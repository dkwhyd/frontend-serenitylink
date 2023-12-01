/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const useToggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', useToggleVisibility);

    return () => window.removeEventListener('scroll', useToggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <footer className='bottom-0 left-0 flex h-[7vh] w-full items-center bg-white shadow-lg shadow-slate-300'>
        <p className='ml-4 text-xs font-semibold text-black'>
          Developed by{' '}
          <a className='text-blue-500' href='#'>
            C523-PRO86
          </a>{' '}
          2023 v1.0 © SERENITY_LINK
        </p>
      </footer>
    </>
  );
}

export default Footer;
