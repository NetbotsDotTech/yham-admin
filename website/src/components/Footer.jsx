import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "magnific-popup/dist/magnific-popup.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "odometer/themes/odometer-theme-default.css";
import "../style.css";

const socialLinks = [
  { href: "#", icon: "fab fa-facebook-f" },
  { href: "#", icon: "fab fa-twitter" },
  { href: "#", icon: "fab fa-pinterest" },
  { href: "#", icon: "fab fa-instagram" }
];

const contactInfo = [
  { text: "Reception: 03005290548" },
  { text: "Office: 03469555195" },
  { text: "E-mail: info@yousufhussainabadimuseum.pk" },
  { text: "Alternate E-mail: yousufhussainabadi@yahoo.com" }
];

const infoMenuItems = [
  { href: "#", text: "Our Team" },
  { href: "#", text: "Faq’s" },
  { href: "#", text: "Contact" },
  { href: "#", text: "What we do" }
];

const visitorInfoMenuItems = [
  { href: "#", text: "How To Find Us" },
  { href: "#", text: "Get Ticket" },
  { href: "#", text: "Join Events" },
  { href: "#", text: "Tours" }
];

const footerMenuItems = [
  { href: "#", text: "HOME" },
  { href: "#", text: "EXHIBITIONS" },
  { href: "#", text: "EVENTS" },
  { href: "#", text: "ABOUT" },
  { href: "#", text: "SHOP" }
];

export default function Footer() {
  return (
    <div>
      {/* Footer Area */}
      <footer className="footer-wrapper footer-layout1 overflow-hidden">    
        <div className="shape-mockup footer1-shape1 jump" data-top="20%" data-left="-2%">
          <img src="/img/logo.svg" alt="img"/>
        </div>
        <div className="container">
          <div className="footer-top">
            <div className="row align-items-center justify-content-between">
              <div className="col-sm-auto">
                <div className="footer-logo mb-40 mb-sm-0">
                  <a href="index.html"><img src="/img/logo.svg" alt="logo"/></a>
                </div>
              </div>
              <div className="col-sm-auto">
                <div className="social-btn style2">
                  {socialLinks.map(link => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                      <i className={link.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="widget-area">
            <div className="row justify-content-between">
            <div className="col-md-6 col-xl-auto col-lg-4">
                <div className="widget widget_nav_menu footer-widget">
                  <h3 className="widget_title">Information</h3>
                  <div className="menu-all-pages-container">
                    <ul className="menu">
                      {infoMenuItems.map(item => (
                        <li key={item.href}><a href={item.href}>{item.text}</a></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3 col-lg-4">
                <div className="widget footer-widget">
                  <div className="widget-contact">
                    <h3 className="widget_title">Contact Info</h3>
                    <ul className="contact-info-list">
                      {contactInfo.map(info => (
                        <li key={info.text}>{info.text}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            
              <div className="col-md-6 col-lg-4">
      <div className="widget footer-widget">
        <h3 className="widget_title">Our Location</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1098.556407319599!2d75.7062818!3d35.3010608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e463000ab4e56b%3A0x7dd5b6d04f1dad88!2sYousuf%20Hussainabadi%20Museum!5e0!3m2!1sen!2s!4v1692540489873!5m2!1sen!2s"
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Yousuf Hussainabadi Museum Location"
        ></iframe>
      </div>
    </div>             
            </div>
          </div>
          <div className="footer-menu-area">
          <span 
          className="copyright-text text-white"
          style={{paddingRight: "60px"}}
          >© 2024  <span className="copyright-text text-white">
                  YOUSUF HUSSAINABADI MUSEUM SKARDU. All Rights Reserved.
                </span></span>
                <span className="copyright-text text-white">
  Developed By    {"  "}
  <span 
    className="copyright-text text-white"
    style={{ 
      fontWeight: 'normal', 
      fontSize: 'inherit' 
    }}
  >
    <a 
      href="https://netbots.tech/" 
      style={{
        fontWeight: 'normal', 
        fontSize: 'inherit',
        textDecoration: 'none'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.fontWeight = 'bold';
        e.currentTarget.style.fontSize = '1.1em';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.fontWeight = 'normal';
        e.currentTarget.style.fontSize = 'inherit';
      }}
    >
      NetBots
    </a>
  </span>
</span>
          </div>
        </div>
     
      </footer>
    </div>
  );
}
