import React, { useRef } from 'react';
import Slider from 'react-slick';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "magnific-popup/dist/magnific-popup.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "odometer/themes/odometer-theme-default.css";
import "../style.css";

const portfolioItems = [
  {
    id: 1,
    imgSrc: '/img/portfolio/portfolio1_1.png',
    title: 'Sculpting Dreams into Reality',
    link: 'project-details.html',
  },
  {
    id: 2,
    imgSrc: '/img/portfolio/portfolio1_2.png',
    title: 'Echoes of Genius Hues of Heritage',
    link: 'project-details.html',
  },
  {
    id: 3,
    imgSrc: '/img/portfolio/portfolio1_3.png',
    title: 'Carving Moments, Capturing Emotic',
    link: 'project-details.html',
  },
  {
    id: 4,
    imgSrc: '/img/portfolio/portfolio1_1.png',
    title: 'Sculpting Dreams into Reality',
    link: 'project-details.html',
  },
  {
    id: 5,
    imgSrc: '/img/portfolio/portfolio1_2.png',
    title: 'Echoes of Genius Hues of Heritage',
    link: 'project-details.html',
  },
  {
    id: 6,
    imgSrc: '/img/portfolio/portfolio1_3.png',
    title: 'Carving Moments, Capturing Emotic',
    link: 'project-details.html',
  },
];

export default function Items() {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // We'll use custom arrows
    responsive: [
      {
        breakpoint: 1024, // for tablets and larger screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // for small tablets
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 576, // for mobile screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      {/* Portfolio Area */}
      <div className="portfolio-area-1 space overflow-hidden bg-title">           
        <div className="container">
          <div className="row justify-content-between text-lg-start text-center">
            <div className="col-lg-8">
              <div className="title-area wow custom-anim-left" data-wow-duration="1.5s" data-wow-delay="0.1s">
                <h2 className="sec-title text-white">Explore the Collection</h2>
              </div>
            </div>
            <div className="col-lg-auto">
              <div className="icon-box mb-40">
                <button 
                  onClick={() => sliderRef.current.slickPrev()} 
                  className="slick-arrow default"
                >
                  PREV
                </button>
                <button 
                  onClick={() => sliderRef.current.slickNext()} 
                  className="slick-arrow default"
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>                
        </div>
        <div className="container-fluid wow custom-anim-top" data-wow-duration="1.5s" data-wow-delay="0.1s">
          <Slider ref={sliderRef} {...settings} className="global-carousel portfolio-slider1 gx-20">
            {portfolioItems.map(item => (
              <div key={item.id} className="portfolio-card">
                <div className="portfolio-thumb">
                  <a className="popup-image icon-btn" href={item.imgSrc}>
                    <i className="far fa-eye"></i>
                  </a>
                  <img 
                  src={item.imgSrc} 
                  alt="portfolio"
                  style={{border: "3px solid #fff" , borderRadius: "20px" , margin: "10px"}}
                  />
                </div>
                <div className="portfolio-details">
                  <h3 className="portfilio-card-title">
                    <a href={item.link}>{item.title}</a>
                  </h3>
                  <a href={item.link} className="btn btn-border btn-radius">
                    View Details of This Collection
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
