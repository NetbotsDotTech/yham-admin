/* eslint-disable react/no-unescaped-entities */

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "magnific-popup/dist/magnific-popup.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "odometer/themes/odometer-theme-default.css";
import "../style.css";
export default function PageNotFound() {
  return (
    <div>
{/*         
        <!--==============================
        Error Area  
        ==============================--> */}
        <div className="error-area space text-center">
            <div className="container">
                <div className="error-thumb mb-60">
                    <img src="/img/normal/error.svg" alt="img" />
                </div>
                <div className="title-area text-center mb-0">
                    <h2 className="sec-title mb-0">PAGE NOT FOUND</h2>
                    <p className="mb-0 mt-3">Sorry, The Page You are looking for doesn't exists or has been removed.
                    </p>
                    <a href="/" className="btn">
                        GO BACK HOME
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}
