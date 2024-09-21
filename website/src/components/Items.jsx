import { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "magnific-popup/dist/magnific-popup.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "odometer/themes/odometer-theme-default.css";
import "../style.css";

export default function Items() {
  const sliderRef = useRef(null);
  const [artifacts, setArtifacts] = useState([]);
  const navigate = useNavigate();

  // Fetch data from backend
  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/artifacts');
        console.log('Artifacts data:', response.data);
        setArtifacts(response.data.data); // Assuming response.data is an array of artifacts
      } catch (error) {
        console.error('Error fetching artifacts data:', error);
      }
    };

    fetchArtifacts();
  }, []);

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
            {artifacts.map(item => (
              <div key={item._id} className="portfolio-card">
                <div className="portfolio-thumb">
                
                  <img 
                    src={item.images[0]} 
                    alt={item.name}
                    style={
                      { border: "3px solid #fff",
                         borderRadius: "20px", 
                         margin: "10px" ,
                         width: "100%", 
                         height: "100%", 
                         objectFit: "cover" 
                        }}
                  />
                </div>
                <div className="portfolio-details">
                  <h3 className="portfolio-card-title">
                    <a 
                      href="#" 
                      onClick={() => navigate(`/artifacts-details/${item.itemNo}`)}
                    >
                      {item.name}
                    </a>
                  </h3>
                  <a 
                    href="#" 
                    onClick={() => navigate(`/artifacts-details/${item.itemNo}`)} 
                    className="btn btn-border btn-radius"
                  >
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
