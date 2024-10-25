import Footer from '../../layout/user/footer/footer'
import banner from '../../assest/images/banner.jpg'
import banner1 from '../../assest/images/banner1.png'
import banner2 from '../../assest/images/banner2.jpg'
import { getMethod, getMethodPostByToken, getMethodByToken } from '../../services/request'
import { formatMoney } from '../../services/money'
import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

function Home() {
  useEffect(() => {

  }, []);

  return (
    <div className='contentweb'>
      {/* banner */}
      <div className="banner">
        <img src={banner} alt="banner" />
      </div>
      {/* trend */}
      {/* top */}
      {/* product */}
      <h1>Day la trang chu update</h1>

    </div>
  );
}

export default Home;
