import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "magnific-popup/dist/magnific-popup.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "odometer/themes/odometer-theme-default.css";
import "../style.css";


import React from 'react';
import { Link, Navigate } from 'react-router-dom'; // Import as needed



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
                                <h1 className="hero-title" data-ani="slider-custom-anim-right" data-ani-delay="0.15s">Art Vista <span className="text-stroke">Artvista</span></h1>
                                <h1 className="hero-title" data-ani="slider-custom-anim-left" data-ani-delay="0.2s">History World</h1>
                                <h1 className="hero-title title-bg-thumb" data-bg-src="/img/hero/hero_1_text-bg.png" data-ani="slider-custom-anim-right" data-ani-delay="0.25s">Museum</h1>
                                <div className="hero-social-wrap" data-ani="slider-custom-anim-left" data-ani-delay="0.3s">
                                    <span>Follow Us On: </span>
                                    <a href="https://facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                    <a href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                                    <a href="https://behance.com/"><i className="fab fa-behance"></i></a>
                                    <a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
                                </div>
                                
                            </div>
                        </div>
                    </div>                
                </div>
            </div>
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
                                <h1 className="hero-title" data-ani="slider-custom-anim-right" data-ani-delay="0.15s">Art Vista <span className="text-stroke">Artvista</span></h1>
                                <h1 className="hero-title" data-ani="slider-custom-anim-left" data-ani-delay="0.2s">History World</h1>
                                <h1 className="hero-title title-bg-thumb" data-bg-src="/img/hero/hero_1_text-bg.png" data-ani="slider-custom-anim-right" data-ani-delay="0.25s">Museum</h1>
                                <div className="hero-social-wrap" data-ani="slider-custom-anim-left" data-ani-delay="0.3s">
                                    <span>Follow Us On: </span>
                                    <a href="https://facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                    <a href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                                    <a href="https://behance.com/"><i className="fab fa-behance"></i></a>
                                    <a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
                                </div>
                                
                            </div>
                        </div>
                    </div>                
                </div>
            </div>
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
                                <h1 className="hero-title" data-ani="slider-custom-anim-right" data-ani-delay="0.15s">Art Vista <span className="text-stroke">Artvista</span></h1>
                                <h1 className="hero-title" data-ani="slider-custom-anim-left" data-ani-delay="0.2s">History World</h1>
                                <h1 className="hero-title title-bg-thumb" data-bg-src="/img/hero/hero_1_text-bg.png" data-ani="slider-custom-anim-right" data-ani-delay="0.25s">Museum</h1>
                                <div className="hero-social-wrap" data-ani="slider-custom-anim-left" data-ani-delay="0.3s">
                                    <span>Follow Us On: </span>
                                    <a href="https://facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                    <a href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                                    <a href="https://behance.com/"><i className="fab fa-behance"></i></a>
                                    <a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
                                </div>
                                
                            </div>
                        </div>
                    </div>                
                </div>
            </div>
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
                                <h1 className="hero-title" data-ani="slider-custom-anim-right" data-ani-delay="0.15s">Art Vista <span className="text-stroke">Artvista</span></h1>
                                <h1 className="hero-title" data-ani="slider-custom-anim-left" data-ani-delay="0.2s">History World</h1>
                                <h1 className="hero-title title-bg-thumb" data-bg-src="/img/hero/hero_1_text-bg.png" data-ani="slider-custom-anim-right" data-ani-delay="0.25s">Museum</h1>
                                <div className="hero-social-wrap" data-ani="slider-custom-anim-left" data-ani-delay="0.3s">
                                    <span>Follow Us On: </span>
                                    <a href="https://facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                    <a href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                                    <a href="https://behance.com/"><i className="fab fa-behance"></i></a>
                                    <a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
                                </div>
                                
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

    {/* <!--==============================
    Exhibition Area  
    ==============================--> */}
    <div className="space bg-title">
        <div className="container">
            <div className="row justify-content-between align-items-center">
                <div className="col-lg-8">
                    <div className="title-area wow custom-anim-left" data-wow-duration="1.5s" data-wow-delay="0.1s">
                        <h2 className="sec-title text-white">Trending Exhibitions</h2>
                    </div>
                </div>
                <div className="col-lg-auto">
                    <div className="sec-btn wow custom-anim-right" data-wow-duration="1.5s" data-wow-delay="0.1s">
                        <a className="btn style2" href="event.html">VIEW ALL EXHIBITIONS</a>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center exhibition-wrap-1 gy-40 gx-30">
                <div className="col-lg-4 col-md-6 exhibition-card-wrap">
                    <div className="exhibition-card gtop">
                        <div className="exhibition-card-thumb">
                            <img src="/img/exhibition/1-1.png" alt="img"/>
                            <div className="shadow-text">Sculptor</div>
                        </div>
                        <div className="exhibition-card-details">
                            <div className="post-meta-item blog-meta">
                                <a href="blog.html">14 MAY, 2024 - 10 APRIL, 2024</a>
                                <a href="blog.html">09PM - 14AM</a>
                            </div>
                            <h3 className="event-card-title"><a href="event.html">Capturing Essence in Art</a></h3>
                            <a className="btn style2" href="event.html">SCULPTOR</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 exhibition-card-wrap">
                    <div className="exhibition-card gtop">
                        <div className="exhibition-card-thumb">
                            <img src="/img/exhibition/1-2.png" alt="img"/>
                            <div className="shadow-text">Sculptor</div>
                        </div>
                        <div className="exhibition-card-details">
                            <div className="post-meta-item blog-meta">
                                <a href="blog.html">14 MAY, 2024 - 10 APRIL, 2024</a>
                                <a href="blog.html">09PM - 14AM</a>
                            </div>
                            <h3 className="event-card-title"><a href="event.html">Transforming Ideas into</a></h3>
                            <a className="btn style2" href="event.html">SCULPTOR</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 exhibition-card-wrap">
                    <div className="exhibition-card gtop">
                        <div className="exhibition-card-thumb">
                            <img src="/img/exhibition/1-3.png" alt="img"/>
                            <div className="shadow-text">Sculptor</div>
                        </div>
                        <div className="exhibition-card-details">
                            <div className="post-meta-item blog-meta">
                                <a href="blog.html">14 MAY, 2024 - 10 APRIL, 2024</a>
                                <a href="blog.html">09PM - 14AM</a>
                            </div>
                            <h3 className="event-card-title"><a href="event.html">Sculpting the Landscape </a></h3>
                            <a className="btn style2" href="event.html">SCULPTOR</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!--==============================
    Testimonial Area  
    ==============================--> */}
    <div className="testimonial-area-2 space overflow-hidden" data-bg-src="/img/bg/testimonial2-bg.png">
        <div className="container">
            <div className="position-relative gtop">
                <div className="row global-carousel testi-slider2" data-slide-show="1" data-arrows="false">
                    <div className="col-lg-12">
                        <div className="testi-box2">
                            <div className="testi-box2_icon">
                                <img src="/img/testimonial/testi_2_quote.png" alt="img"/>
                            </div> 
                            <p className="testi-box2_text">“Lorem ipsum dolor sit amet consectetur adipiscing elit, felis blandit vehicula fusce proin primis, malesuada ante tincidunt”</p>                        
                            <div className="testi-box2_profile">
                                <h4 className="testi-box2_name">By David Smith</h4>                    
                            </div>                       
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="testi-box2">
                            <div className="testi-box2_icon">
                                <img src="/img/testimonial/testi_2_quote.png" alt="img"/>
                            </div> 
                            <p className="testi-box2_text">“Lorem ipsum dolor sit amet consectetur adipiscing elit, felis blandit vehicula fusce proin primis, malesuada ante tincidunt”</p>                        
                            <div className="testi-box2_profile">
                                <h4 className="testi-box2_name">By David Smith</h4>                    
                            </div>                       
                        </div>
                    </div>
                </div> 
                <div className="icon-box">
                    <button data-slick-prev=".testi-slider2" className="slick-arrow"><img src="/img/icon/arrow-left.svg" alt="icon"/></button>
                    <button data-slick-next=".testi-slider2" className="slick-arrow"><img src="/img/icon/arrow-right.svg" alt="icon"/></button>
                </div>
            </div>
        </div>
    </div>
{/* 
    <!--==============================
    Cta Area  
    ==============================--> */}
    <div className="overflow-hidden">
        <div className="container-fluid p-0">
            <div className="cta-area-1 space gtop" data-bg-src="/img/bg/cta-1-bg.png">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7">
                        <div className="title-area text-center mb-0 wow custom-anim-top" data-wow-duration="1.5s" data-wow-delay="0.1s">
                            <h2 className="sec-title mb-0 text-white fw-medium">Let’s book an event for your awesome
                                Museum destination</h2>
                            <a href="contact.html" className="btn">
                                Ticket & Admission
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!--==============================
        Portfolio Area  
    ==============================--> */}
    <div className="portfolio-area-1 space overflow-hidden bg-title">           
        <div className="container">
            <div className="row justify-content-between text-lg-start text-center">
                <div className="col-lg-8">
                    <div className="title-area wow custom-anim-left" data-wow-duration="1.5s" data-wow-delay="0.1s">
                        <h2 className="sec-title text-white">Our Lets Stories</h2>
                    </div>
                </div>
                <div className="col-lg-auto">
                    <div className="icon-box mb-40">
                        <button data-slick-prev=".portfolio-slider1" className="slick-arrow default">PREV</button>
                        <button data-slick-next=".portfolio-slider1" className="slick-arrow default">NEXT</button>
                    </div>
                </div>
            </div>                
        </div>
        <div className="container-fluid wow custom-anim-top" data-wow-duration="1.5s" data-wow-delay="0.1s">
            <div className="row global-carousel portfolio-slider1 gx-20" data-slide-show="3" >
                <div className="col-lg-4">
                    <div className="portfolio-card ">
                        <div className="portfolio-thumb">
                            <a className="popup-image icon-btn" href="/img/portfolio/portfolio1_1.png"><i className="far fa-eye"></i></a>
                            <img src="/img/portfolio/portfolio1_1.png" alt="portfolio"/>
                        </div>
                        <div className="portfolio-details">
                            <h3 className="portfilio-card-title"><a href="project-details.html">Sculpting Dreams into Reality</a></h3>
                            <a href="project-details.html" className="btn btn-border btn-radius">
                                CARVER IN STONE
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="portfolio-card ">
                        <div className="portfolio-thumb">
                            <a className="popup-image icon-btn" href="/img/portfolio/portfolio1_2.png"><i className="far fa-eye"></i></a>
                            <img src="/img/portfolio/portfolio1_2.png" alt="portfolio"/>
                        </div>
                        <div className="portfolio-details">
                            <h3 className="portfilio-card-title"><a href="project-details.html">Echoes of Genius Hues of Heritage</a></h3>
                            <a href="project-details.html" className="btn btn-border btn-radius">
                                CARVER IN STONE
                            </a>
                        </div>
                    </div>
                </div>    
                <div className="col-lg-4">
                    <div className="portfolio-card ">
                        <div className="portfolio-thumb">
                            <a className="popup-image icon-btn" href="/img/portfolio/portfolio1_3.png"><i className="far fa-eye"></i></a>
                            <img src="/img/portfolio/portfolio1_3.png" alt="portfolio"/>
                        </div>
                        <div className="portfolio-details">
                            <h3 className="portfilio-card-title"><a href="project-details.html">Carving Moments, Capturing Emotic</a></h3>
                            <a href="project-details.html" className="btn btn-border btn-radius">
                                CARVER IN STONE
                            </a>
                        </div>
                    </div>                        
                </div> 
                <div className="col-lg-4">
                    <div className="portfolio-card ">
                        <div className="portfolio-thumb">
                            <a className="popup-image icon-btn" href="/img/portfolio/portfolio1_1.png"><i className="far fa-eye"></i></a>
                            <img src="/img/portfolio/portfolio1_1.png" alt="portfolio"/>
                        </div>
                        <div className="portfolio-details">
                            <h3 className="portfilio-card-title"><a href="project-details.html">Sculpting Dreams into Reality</a></h3>
                            <a href="project-details.html" className="btn btn-border btn-radius">
                                CARVER IN STONE
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="portfolio-card ">
                        <div className="portfolio-thumb">
                            <a className="popup-image icon-btn" href="/img/portfolio/portfolio1_2.png"><i className="far fa-eye"></i></a>
                            <img src="/img/portfolio/portfolio1_2.png" alt="portfolio"/>
                        </div>
                        <div className="portfolio-details">
                            <h3 className="portfilio-card-title"><a href="project-details.html">Echoes of Genius Hues of Heritage</a></h3>
                            <a href="project-details.html" className="btn btn-border btn-radius">
                                CARVER IN STONE
                            </a>
                        </div>
                    </div>
                </div>    
                <div className="col-lg-4">
                    <div className="portfolio-card ">
                        <div className="portfolio-thumb">
                            <a className="popup-image icon-btn" href="/img/portfolio/portfolio1_3.png"><i className="far fa-eye"></i></a>
                            <img src="/img/portfolio/portfolio1_3.png" alt="portfolio"/>
                        </div>
                        <div className="portfolio-details">
                            <h3 className="portfilio-card-title"><a href="project-details.html">Carving Moments, Capturing Emotic</a></h3>
                            <a href="project-details.html" className="btn btn-border btn-radius">
                                CARVER IN STONE
                            </a>
                        </div>
                    </div>                        
                </div>                 
            </div>
        </div>
    </div>
{/* 
    <!--==============================
    Event Area  
    ==============================--> */}
    <div className="event-area-1 space overflow-hidden bg-smoke">
        <div className="container">
            <div className="row justify-content-lg-between justify-content-center text-lg-start text-center">
                <div className="col-lg-7">
                    <div className="title-area wow custom-anim-left" data-wow-duration="1.5s" data-wow-delay="0.1s">
                        <h2 className="sec-title">Join Now Upcoming Events </h2>
                    </div>
                </div>
                <div className="col-lg-auto">
                    <div className="sec-btn wow custom-anim-right" data-wow-duration="1.5s" data-wow-delay="0.1s">
                        <a href="event.html" className="btn">
                            VIEW ALL EVENTS   
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row gy-30">
                <div className="col-lg-12">
                    <div className="event-card wow custom-anim-left" data-wow-duration="1.5s" data-wow-delay="0.1s">
                        <div className="event-card-date">
                            <span className="date">08</span>
                            June, 2024
                        </div>
                        <div className="event-card-details">
                            <h3 className="event-card-title"><a href="event-details.html">Are There Specific Unique Events We Thats</a></h3>
                            <span className="event-card-location">New York, Rodices120/32</span>
                            <a href="event.html" className="btn">
                                GET TICKET 
                            </a>
                        </div>
                        <div className="event-card-thumb">
                            <img src="/img/event/event-thumb-1-1.png" alt="img"/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="event-card wow custom-anim-left" data-wow-duration="1.5s" data-wow-delay="0.1s">
                        <div className="event-card-date">
                            <span className="date">09</span>
                            June, 2024
                        </div>
                        <div className="event-card-details">
                            <h3 className="event-card-title"><a href="event-details.html">Carving Moment Capturing Emotions Nies</a></h3>
                            <span className="event-card-location">New York, Rodices120/32</span>
                            <a href="event.html" className="btn">
                                GET TICKET 
                            </a>
                        </div>
                        <div className="event-card-thumb">
                            <img src="/img/event/event-thumb-1-2.png" alt="img"/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="event-card wow custom-anim-left" data-wow-duration="1.5s" data-wow-delay="0.1s">
                        <div className="event-card-date">
                            <span className="date">18</span>
                            June, 2024
                        </div>
                        <div className="event-card-details">
                            <h3 className="event-card-title"><a href="event-details.html">Where Vision Meets Line Craftsmanship</a></h3>
                            <span className="event-card-location">New York, Rodices120/32</span>
                            <a href="event.html" className="btn">
                                GET TICKET 
                            </a>
                        </div>
                        <div className="event-card-thumb">
                            <img src="/img/event/event-thumb-1-3.png" alt="img"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!--==============================
        Contact Area  
    ==============================--> */}
    <div className="contact-area-1 space overflow-hidden" data-bg-src="/img/bg/contact-1-bg.png">
        <div className="container">
            <div className="row gy-40 gx-80 align-items-center">
                <div className="col-lg-6">
                    <div className="title-area wow custom-anim-left" data-wow-duration="1.5s" data-wow-delay="0.1s">
                        <h2 className="sec-title text-white">Visit Yor Plan & Event date</h2>
                        <p className="sec-text text-gray">Discover a wealth of educational resources curated to meet the diverse needs of learners at every stage of  the museum</p>
                    </div>
                    <div className="countdown-wrap wow custom-anim-left"  data-wow-duration="1.5s" data-wow-delay="0.1s" data-bg-src="/img/bg/contact-countdown-bg.png">
                        <ul className="countdown-list cta-countdown " data-offer-date="10/24/2024">
                            <li>
                                <div className="day count-number">00</div>
                                <span className="count-name">Days</span>
                            </li>
                            <li>
                                <div className="hour count-number">00</div>
                                <span className="count-name">Hours</span>
                            </li>
                            <li>
                                <div className="minute count-number">00</div>
                                <span className="count-name">Mins</span>
                            </li>
                            <li>
                                <div className="seconds count-number">00</div>
                                <span className="count-name">Secs</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="contact-form-area wow custom-anim-right" data-wow-duration="1.5s" data-wow-delay="0.1s">                    
                        <div className="row">
                            <div className="col-lg-12">
                                <h3 className="from-title text-white mb-35">BOOK YOUR SEAT:</h3>
                                <form action="https://tfhtml.themepul.com/artvista/demo/mail.php" method="POST" className="contact-form ajax-contact">
                                    <div className="row gx-20">
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control style-border" name="number" id="number" placeholder="Number of guest"/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <input type="date" className="form-control style-border" name="date" id="date" required="required"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input type="time" value='12:00' className="form-control style-border" name="time" id="time" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <select name="subject" id="subject" className="form-select style-border">
                                                    <option value="" disabled selected hidden>Sex</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input type="number" className="form-control style-border" name="phone" id="phone" placeholder="Phone No"/>
                                            </div>
                                        </div>
                                
                                    </div>
    
                                    <div className="form-btn col-12">
                                        <button type="submit" className="btn">MAKE ADMISSION</button>
                                    </div>
                                </form>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
{/* 
    <!--==============================
    Product Area  
    ==============================--> */}
    <div className="product-area-1 space overflow-hidden">          
        <div className="container">
            <div className="title-area text-center wow custom-anim-top" data-wow-duration="1.5s" data-wow-delay="0.1s">
                <span className="sub-title">OUR ONLINE SHOP</span>
                <h2 className="sec-title">Our Online Products</h2>
            </div>
            <div className="row gy-4">
                <div className="col-lg-3 col-md-6">
                    <div className="product-card wow custom-anim-top" data-wow-duration="1.5s" data-wow-delay="0.1s">
                        <div className="product-img">
                            <span className="tag">Sculptor</span>
                            <img src="/img/product/1-1.png" alt="Product Image"/>
                            <div className="actions">
                                <a href="cart.html" className="icon-btn"><i className="fas fa-shopping-cart"></i></a>
                                <a href="wishlist.html" className="icon-btn"><i className="far fa-heart"></i></a>
                                <a href="#QuickView" className="icon-btn popup-content"><i className="far fa-eye"></i></a>
                            </div>
                        </div>
                        <div className="product-content">
                            <span className="price">$250.00 <del>$550.00</del></span>
                            <h3 className="product-title"><a href="shop-details.html">Lady Seraphina</a></h3>
                            <div className="star-rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                </div>    
                <div className="col-lg-3 col-md-6">
                    <div className="product-card wow custom-anim-top" data-wow-duration="1.5s" data-wow-delay="0.1s">
                        <div className="product-img">
                            <span className="tag">Sculptor</span>
                            <img src="/img/product/1-2.png" alt="Product Image"/>
                            <div className="actions">
                                <a href="cart.html" className="icon-btn"><i className="fas fa-shopping-cart"></i></a>
                                <a href="wishlist.html" className="icon-btn"><i className="far fa-heart"></i></a>
                                <a href="#QuickView" className="icon-btn popup-content"><i className="far fa-eye"></i></a>
                            </div>
                        </div>
                        <div className="product-content">
                            <span className="price">$150.00 <del>$550.00</del></span>
                            <h3 className="product-title"><a href="shop-details.html">Nova Byte</a></h3>
                            <div className="star-rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="product-card wow custom-anim-top" data-wow-duration="1.5s" data-wow-delay="0.1s">
                        <div className="product-img">
                            <span className="tag">Sculptor</span>
                            <img src="/img/product/1-3.png" alt="Product Image"/>
                            <div className="actions">
                                <a href="cart.html" className="icon-btn"><i className="fas fa-shopping-cart"></i></a>
                                <a href="wishlist.html" className="icon-btn"><i className="far fa-heart"></i></a>
                                <a href="#QuickView" className="icon-btn popup-content"><i className="far fa-eye"></i></a>
                            </div>
                        </div>
                        <div className="product-content">
                            <span className="price">$260.00 <del>$550.00</del></span>
                            <h3 className="product-title"><a href="shop-details.html">Synth Sphere</a></h3>
                            <div className="star-rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                </div>    
                <div className="col-lg-3 col-md-6">
                    <div className="product-card wow custom-anim-top" data-wow-duration="1.5s" data-wow-delay="0.1s">
                        <div className="product-img">
                            <span className="tag">Sculptor</span>
                            <img src="/img/product/1-4.png" alt="Product Image"/>
                            <div className="actions">
                                <a href="cart.html" className="icon-btn"><i className="fas fa-shopping-cart"></i></a>
                                <a href="wishlist.html" className="icon-btn"><i className="far fa-heart"></i></a>
                                <a href="#QuickView" className="icon-btn popup-content"><i className="far fa-eye"></i></a>
                            </div>
                        </div>
                        <div className="product-content">
                            <span className="price">$250.00 <del>$550.00</del></span>
                            <h3 className="product-title"><a href="shop-details.html">NeoGlow Ahe</a></h3>
                            <div className="star-rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                </div>                  
            </div>
        </div>
    </div>  
{/* 
    <!--==============================
        Footer Area
    ==============================--> */}
    <footer className="footer-wrapper footer-layout1 overflow-hidden">    
        <div className="shape-mockup footer1-shape1 jump" data-top="20%" data-left="-2%">
            <img src="/img/normal/footer-1-shape1.png" alt="img"/>
        </div>
        <div className="container">
            <div className="footer-top">
                <div className="row align-items-center justify-content-between">
                    <div className="col-sm-auto">
                        <div className="footer-logo mb-40 mb-sm-0">
                            <a href="index.html"><img src="/img/logo-white.svg" alt="logo"/></a>
                        </div>
                    </div>
                    <div className="col-sm-auto">
                        <div className="social-btn style2">
                            <a href="https://facebook.com/"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                            <a href="https://behance.com/"><i className="fab fa-behance"></i></a>
                            <a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="widget-area">
                <div className="row justify-content-between">
                    <div className="col-md-6 col-xl-3 col-lg-4">
                        <div className="widget footer-widget">
                            <div className="widget-contact">
                                <h3 className="widget_title">Contact Info</h3>
                                <ul className="contact-info-list">
                                    <li>Reception: + 99 76 486 856</li>
                                    <li>Office: + 99 7 66 486 856</li>
                                    <li>E-mail: Artvista@wedding.com</li>
                                    <li>Address: Moran Street, Berlin</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-auto col-lg-4">
                        <div className="widget widget_nav_menu footer-widget">
                            <h3 className="widget_title">Information</h3>
                            <div className="menu-all-pages-container">
                                <ul className="menu">
                                    <li><a href="team.html">Our Team</a></li>
                                    <li><a href="contact.html">Faq’s</a></li>
                                    <li><a href="contact.html">Contact</a></li>
                                    <li><a href="project.html">What we do</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-auto col-lg-4">
                        <div className="widget widget_nav_menu footer-widget">
                            <h3 className="widget_title">Visitor Info </h3>
                            <div className="menu-all-pages-container">
                                <ul className="menu">
                                    <li><a href="contact.html">How To Find Us</a></li>
                                    <li><a href="contact.html">Get Ticket</a></li>
                                    <li><a href="event.html">Join Events</a></li>
                                    <li><a href="event.html">Tours</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="widget footer-widget">
                            <h3 className="widget_title">Subscribe Now</h3>
                            <p className="footer-text">Don’t worry we don’t spam your email</p>
                    
                        </div>
                    </div>                    
                </div>
            </div>
            <div className="footer-menu-area">
                <ul className="footer-menu-list">
                    <li>
                        <a href="index.html">HOME</a>
                    </li>
                    <li>
                        <a href="project.html">EXHIBITIONS</a>
                    </li>
                    <li>
                        <a href="event.html">EVENTS</a>
                    </li>
                    <li>
                        <a href="about.html">ABOUT</a>
                    </li>
                    <li>
                        <a href="shop.html">SHOP</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="copyright-wrap text-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-auto align-self-center">
                        <p className="copyright-text text-white">© 2023 </p>
                        <p className="copyright-text text-white"><a href="#">Artvista.</a> All Rights Reserved.</p></div>
                </div>                
            </div>
        </div>
    </footer>

    </div>
</div>
  );
};

export default HeroSection;
