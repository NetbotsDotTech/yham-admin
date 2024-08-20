
export default function Testimonials() {
  return (
    <div id="smooth-wrapper">
    <div id="smooth-content">


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
    </div>
    </div>
  )
}
