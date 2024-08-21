import { useState, useEffect } from 'react';

export default function Testimonials() {
    const testimonials = [
        {
            id: 1,
            name: "David Smith",
            date: "July 21, 2024",
            feedback: "Lorem ipsum dolor sit amet consectetur adipiscing elit, felis blandit vehicula fusce proin primis, malesuada ante tincidunt",
            image: "/img/testimonial/testi_2_quote.png",
        },
        {
            id: 2,
            name: "Sarah Johnson",
            date: "August 5, 2024",
            feedback: "Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
            image: "/img/testimonial/testi_2_quote.png",
        },
        {
            id: 3,
            name: "Michael Brown",
            date: "August 10, 2024",
            feedback: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
            image: "/img/testimonial/testi_2_quote.png",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handlePrevClick = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? testimonials.length - 1 : prevSlide - 1));
    };

    const handleNextClick = () => {
        setCurrentSlide((prevSlide) => (prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1));
    };

    const inlineStyle = {
        margin: '50px',
        fontWeight: 600,
        lineHeight: '1.2916em',
        overflow: 'hidden',
        textAlign: 'center',
        gap: '30px',
    };

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">
                <div
                    className="testimonial-area-2 space overflow-hidden"
                    data-bg-src="/img/bg/testimonial2-bg.png"
                    style={{
                        padding: "30px 0",
                        display: "flex",
                        flexDirection: isMobile ? "column-reverse" : "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div className="container">
                        <div className="position-relative gtop">
                            <div
                                className="row global-carousel testi-slider2"
                                data-slide-show="1"
                                data-arrows="false"
                                style={{
                                    display: "flex",
                                    flexDirection: isMobile ? "row" : "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <div className="col-lg-12">
                                    <h2 style={inlineStyle}>
                                        Testimonials
                                    </h2>
                                    <div className="testi-box2">
                                        <div className="testi-box2_icon">
                                            <img src={testimonials[currentSlide].image} alt="img" />
                                        </div>
                                        <p className="testi-box2_text">“{testimonials[currentSlide].feedback}”</p>
                                        <div className="testi-box2_profile">
                                            <h4 className="testi-box2_name">By {testimonials[currentSlide].name}</h4>
                                            <p className="testi-box2_date">{testimonials[currentSlide].date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="icon-box"
                                style={{
                                    display: "flex",
                                    justifyContent: isMobile ? "space-between" : "center",
                                    marginTop: isMobile ? "20px" : "0",
                                    width: isMobile ? "100%" : "auto",
                                    position: "relative",
                                }}
                            >
                                <button
                                    onClick={handlePrevClick}
                                    className="slick-arrow"
                                    style={{
                                        display: isMobile ? "block" : "inline-block",
                                        position: isMobile ? "static" : "absolute",
                                        left: !isMobile && "0",
                                    }}
                                >
                                    <img src="/img/icon/arrow-left.svg" alt="icon" />
                                </button>
                                <button
                                    onClick={handleNextClick}
                                    className="slick-arrow"
                                    style={{
                                        display: isMobile ? "block" : "inline-block",
                                        position: isMobile ? "static" : "absolute",
                                        right: !isMobile && "0",
                                    }}
                                >
                                    <img src="/img/icon/arrow-right.svg" alt="icon" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
