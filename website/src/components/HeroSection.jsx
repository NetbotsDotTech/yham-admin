import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "magnific-popup/dist/magnific-popup.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "odometer/themes/odometer-theme-default.css";
import "../style.css";

const HeroSection = () => {
  return (
    <div id="smooth-wrapper">
    <div id="smooth-content">
    {/* <!--==============================
    Hero Area
    ==============================--> */}
    <div className="hero-wrapper hero-1" id="hero-sec">
        <div className="global-carousel hero-slider1" id="heroSlider1" data-fade="true" data-slide-show="1" data-lg-slide-show="1" data-md-slide-show="1" data-sm-slide-show="1" data-xs-slide-show="1" data-arrows="false" data-asnavfor=".hero-custom-dots">
            <div className="hero-slider">
                <div className="hero-thumb1" data-ani="slider-custom-anim-left" data-ani-delay="0.1s">
                    <img src="/img/hero/hero_1_1.png" alt="img"/>
                </div>
                <div className="hero-thumb2" data-ani="slider-custom-anim-right" data-ani-delay="0.1s">
                    <img src="/img/hero/hero_1_2.png" alt="img"/>
                </div>
                <div className="container">
                    <div className="row justify-content-center">                        
                        <div className="col-lg-8 col-md-12">
                            <div className="hero-style1">
                                <h1 className="hero-title" data-ani="slider-custom-anim-right" data-ani-delay="0.15s">YOUSUF HUSSAINABADI </h1>
                                {/* <h1 className="hero-social-wrap" data-ani="slider-custom-anim-left" data-ani-delay="0.2s">MUSEUM SKARDU</h1> */}
                            <h2 className="hero-title" data-ani="slider-custom-anim-right" data-ani-delay="0.15s"><span className="text-stroke">MUSEUM SKARDU</span></h2>
                            
                            </div>
                        </div>
                    </div>                
                </div>
            </div>
        
        </div> 
        <div className="container text-end">
            <div className="hero-slider1-controller-wrap">
                <div className="slides-numbers">
                    <span className="active">01</span> <span className="total"></span>
                </div>
                <div className="hero-custom-dots" data-asnavfor=".hero-slider1">
                    <button className="tab-btn active" type="button">
                        <span className="slide-dot"></span>
                    </button>
                    <button className="tab-btn" type="button">
                        <span className="slide-dot"></span>
                    </button>
                    <button className="tab-btn" type="button">
                        <span className="slide-dot"></span>
                    </button>
                    <button className="tab-btn" type="button">
                        <span className="slide-dot"></span>
                    </button>
                </div>
                <div className="icon-box">
                    <button data-slick-prev=".hero-slider1" className="icon-btn">
                        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.74198 0L0 7L6.74198 14L7.87513 12.8234L3.06758 7.83189L24 7.83189V6.168L3.06773 6.168L7.87513 1.17658L6.74198 0Z" fill="inherit"/>
                        </svg>    
                    </button>
                    <button data-slick-next=".hero-slider1" className="icon-btn"><svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.258 14L24 7L17.258 0L16.1249 1.17658L20.9324 6.16811L2.45808e-07 6.16811V7.832L20.9323 7.832L16.1249 12.8234L17.258 14Z" fill="inherit"/>
                        </svg>
                    </button>
                </div>
                
            </div>
        </div>
    </div>


    </div>
</div>
  );
};

export default HeroSection;
