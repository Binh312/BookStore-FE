import Footer from '../../layout/user/footer/footer'
import sliceBanner from '../../assest/images/sliceBanner.webp'
import sliceBanner2 from '../../assest/images/sliceBanner2.webp'
import sliceBanner3 from '../../assest/images/sliceBanner3.webp'
import banner from '../../assest/images/banner.webp'
import banner2 from '../../assest/images/banner2.webp'
import banner3 from '../../assest/images/banner3.webp'
import banner4 from '../../assest/images/banner4.webp'
import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { getMethod, deleteMethod } from '../../services/request'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatMoney } from '../../services/money'


var url = '';
function Home() {
  const [items, setItems] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const getBook = async () => {
      var response = await getMethod(`/api/book/get-all-book?size=10&page=${0}`);
      var result = await response.json();
      console.log(result);
      setItems(result.content)
      setTotalPage(result.totalPages)
      url = '/api/book/get-all-book?size=10&page=';
    };
    getBook();
  }, []);

  var settingSlider = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  const handlePageClick = async (data) => {
    var currentPage = data.selected
    var response = await getMethod(url + currentPage)
    var result = await response.json();
    setItems(result.content)
    setTotalPage(result.totalPages)
    setCurrentPage(currentPage)
  }

  return (
    <div className='contentweb'>
      {/* Slider */}
      <div className="slider-container">
        <Slider {...settingSlider}>
          <div>
            <img src={sliceBanner} alt="slice-banner" />
          </div>
          <div>
            <img src={sliceBanner2} alt="slice-banner" />
          </div>
          <div>
            <img src={sliceBanner3} alt="slice-banner" />
          </div>
        </Slider>
      </div>
      <br></br>
      <div className="homebanner">
        <div className="banner-image-blocks">
          <div className="col-sm-3 col-md-3 image-block">
            <img src={banner} alt="banner-image" className="img-banner" />
          </div>
          <div className="col-sm-3 col-md-3 image-block">
            <img src={banner2} alt="banner-image " className="img-banner" />
          </div>
          <div className="col-sm-3 col-md-3 image-block">
            <img src={banner3} alt="banner-image" className="img-banner" />
          </div>
          <div className="col-sm-3 col-md-3 image-block">
            <img src={banner4} alt="banner-image" className="img-banner" />
          </div>
        </div>
      </div>
      {/* trend */}
      {/* top */}
      {/* product */}
      <div className="product-container">
        <div className='row'>
          {items.map((item => {
            return <div className='col-lg-20p col-md-3 col-sm-6 col-12'>
              <div className="box-content-item">
                <a href={`bookDetail?id=${item.id}`} className='content-product'>
                  <img src={item.image} className="imgproductindex" alt='' />
                  <span className='tenspindex'>{item.title}</span>
                  <div class="priceproduct">
                    <strong className='newprice'>{formatMoney(item.price)}</strong>
                    <span class="oldprice">{item.oldPrice == null ? '' : formatMoney(item.oldPrice)}</span>
                  </div>
                </a>
              </div>
            </div>
          }))}
        </div>
      </div>
      <div className="tab-page-index">
        <ReactPaginate
          marginPagesDisplayed={2}
          pageCount={totalPage}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          previousLabel='Trang trước'
          nextLabel='Trang sau'
          activeClassName='active' />
      </div>
    </div>
  );
}

export default Home;
