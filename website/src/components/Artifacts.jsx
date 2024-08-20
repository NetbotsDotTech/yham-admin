import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "magnific-popup/dist/magnific-popup.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "odometer/themes/odometer-theme-default.css";
import "../style.css";

export default function Artifacts() {
  return (
    <div id="smooth-wrapper">
    <div id="smooth-content">

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


    </div>
</div>
  )
}
