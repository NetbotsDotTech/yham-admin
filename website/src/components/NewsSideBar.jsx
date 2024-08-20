import React from "react";
export default function NewsSideBar() {
  return (
    <React.Fragment>
      <div className="sidemenu-wrapper">
        <div className="sidemenu-content">
          <button className="closeButton sideMenuCls">
            <i className="fas fa-times"></i>
          </button>
          <div className="widget footer-widget">
            <div className="widget widget-about footer-widget">
              <div className="footer-logo">
                <a href="index.html">
                  <img src="assets/img/logo-white.svg" alt="logo" />
                </a>
              </div>
              <p className="about-text mb-4 text-white">
                A small business can be better than a big business because of
                agility and adaptability due to their size and scale.
              </p>

              <p className="footer-text text-white">
                <a href="tel:851555961658">
                  <i className="fas fa-phone-alt me-2"></i>+85 155 596 1658
                </a>
              </p>
              <p className="contact-text text-white">
                <i className="fa fa-map-marker-alt me-2"></i> Losangle, Street
                Road 24, NewYork, USA - 67452
              </p>
              <p className="footer-text text-white">
                <a href="mailto:support@gmail.com">
                  <i className="fas fa-envelope me-2"></i>support@gmail.com
                </a>
              </p>
              <div className="social-btn style2 mt-30">
                <a href="https://facebook.com/">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.twitter.com/">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://linkedin.com/">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://instagram.com/">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <div className="recent-post-wrap mt-40">
                <div className="recent-post">
                  <div className="media-img">
                    <a href="blog-details.html">
                      <img
                        src="assets/img/widget/widget1-1.png"
                        alt="Blog Image"
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <div className="recent-post-meta">
                      <a href="blog.html">
                        <i className="far fa-clock"></i> 15 Jan, 2024
                      </a>
                    </div>
                    <h4 className="post-title">
                      <a className="text-inherit" href="blog-details.html">
                        Education is at the heart of everything we do, and
                      </a>
                    </h4>
                  </div>
                </div>
                <div className="recent-post">
                  <div className="media-img">
                    <a href="blog-details.html">
                      <img
                        src="assets/img/widget/widget1-2.png"
                        alt="Blog Image"
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <div className="recent-post-meta">
                      <a href="blog.html">
                        <i className="far fa-clock"></i> 05 Jul, 2024
                      </a>
                    </div>
                    <h4 className="post-title">
                      <a className="text-inherit" href="blog-details.html">
                        Exploring A Journey Through Egyptian Artifacts
                      </a>
                    </h4>
                  </div>
                </div>
                <div className="recent-post">
                  <div className="media-img">
                    <a href="blog-details.html">
                      <img
                        src="assets/img/widget/widget1-3.png"
                        alt="Blog Image"
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <div className="recent-post-meta">
                      <a href="blog.html">
                        <i className="far fa-clock"></i> 14 Sep, 2024
                      </a>
                    </div>
                    <h4 className="post-title">
                      <a className="text-inherit" href="blog-details.html">
                        Whether you're a seasoned or a curious{" "}
                      </a>
                    </h4>
                  </div>
                </div>
              </div>
              <form className="newsletter-form mt-40">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email Address"
                    required=""
                  />
                </div>
                <button type="submit" className="btn">
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
