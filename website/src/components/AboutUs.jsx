
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "magnific-popup/dist/magnific-popup.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "odometer/themes/odometer-theme-default.css";
import "../style.css";

export default function AboutUs() {
  return (
    <div>
      {/* 
      <!--==============================
          About Us Section  
          ==============================--> */}
      <div className="team-details-area space">
        <div className="container"
        style={{maxWidth: "100%"}}
        >
          <div className="single-team-details">
            <h3 className="page-subtitle">About Yousuf Hussainabadi Museum</h3>
            <p className="fw-light">
              Situated between the two mountain ranges of the Himalaya and the Karakoram, the geographic isolation of Baltistan preserved its centuries-old culture from being affected by surrounding cultures. With the construction of a jeep road in 1968 and a truck road in 1980, Baltistan was finally linked with the outside world by an all-weather road. This newfound connectivity brought Baltistan into contact with different cultures, sparking a significant cultural revolution in the 1970s and 1980s. During this time, many traditional tools, clothing, and artifacts were abandoned, and precious antiques were rapidly taken away by traders. Despite this cultural upheaval, no efforts were made to preserve these artifacts.
            </p>
            <p className="fw-light">
              In this context, Yousuf Hussainabadi stepped forward with personal resources to preserve Baltistan's antiquities. Through tireless effort, he established the Yousuf Hussainabadi Museum Skardu, which houses over 6,500 artifacts of Baltistan's history and culture. The museum also includes a research library with books, manuscripts, historic documents, and recordings of folk songs and tales. It stands as the largest collection of artifacts in Gilgit-Baltistan and plays a vital role in cultural tourism and research.
            </p>

            <div className="team-about-card">
              <div className="row g-0">
                <div className="col-lg-5">
                  <div className="team-about-card_img">
                    <img className="w-100" src="/img/team/yousuf.png" alt="team image" />
                  </div>
                </div>
                <div className="col-lg-7 align-self-center">
                  <div className="team-about-card_box p-3 p-lg-4">
                    <h2 className="team-about-card_title">Yousuf Hussainabadi</h2>
                    <h6 className="team-about-card_desig">Historian and Founder</h6>
                    <p className="team-about-card_text">
                      Yousuf Hussainabadi is a historian, linguist, and educationist who has significantly contributed to the preservation and promotion of Baltistan's culture. His achievements include translating the Holy Quran into Balti, compiling the history of the liberation war of Baltistan, and reviving the old Yige script of the Balti language.
                    </p>
                    <div className="social-btn mt-3">
                      <a href="https://facebook.com/" className="me-3"><i className="fab fa-facebook-f"></i></a>
                      <a href="https://twitter.com/" className="me-3"><i className="fab fa-twitter"></i></a>
                      <a href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <div className="row gy-2 mt-4">
                      <div className="col-12 col-md-6">
                        <div className="team-about-card_info">
                          <span className="icon"><i className="fas fa-user"></i></span>
                          <p><span>Experience </span> Over 50 Years</p>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="team-about-card_info">
                          <span className="icon"><i className="fas fa-phone-alt"></i></span>
                          <p><span>Phone </span> 0300-5290548</p>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="team-about-card_info">
                          <span className="icon"><i className="fas fa-envelope"></i></span>
                          <p><span>Email </span> yousufhussainabadi@yahoo.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="page-subtitle mt-5">Awards & Recognitions</h3>
            <ul className="fw-light">
              <li>President’s Award for Pride of Performance (Literature-History)</li>
              <li>Honorary Professor Emeritus, University of Baltistan Skardu</li>
            </ul>

            <h3 className="page-subtitle mt-4">Literary Works</h3>
            <p className="fw-light">
              Mr. Hussainabadi's notable works include the translation of the Holy Quran into Balti, his book “Tareekh-e-Baltistan,” and the revival of the old Yige script of Balti. His research has significantly contributed to the understanding and preservation of Baltistan's history and language.
            </p>

            <h3 className="page-subtitle mt-4">Education & Experience</h3>
            <p className="fw-light">
              He has studied Islamic Studies at Punjab University Lahore and obtained Al-Shahadatul Alamia from Wifaqul Madaris Pakistan. His professional experience includes roles as Lecturer, Project Manager, District Project Manager, Assistant Regional Director, and Professor of Islamic Studies and Principal at Jinnah College Skardu.
            </p>

            <h3 className="page-subtitle mt-4">Other Activities</h3>
            <p className="fw-light">
              Mr. Hussainabadi has established various educational institutions and cultural initiatives, including Jinnah Public School, Jinnah College, Balti Museum Skardu, and Jinnah Park Skardu. His efforts have positively impacted education and tourism in Baltistan.
            </p>

            <h3 className="page-subtitle mt-4">Languages</h3>
            <p className="fw-light">
              Mr. Hussainabadi is fluent in English, Arabic, Persian, Urdu, and Balti.
            </p>

            <h3 className="page-subtitle mt-4">Board/Committee Memberships</h3>
            <p className="fw-light">
              He is a member of the Board of Directors, Aga Khan Cultural Service Pakistan, and the Gilgit Baltistan Provincial Managing Committee of Pakistan Red Crescent Society.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
