import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "magnific-popup/dist/magnific-popup.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "odometer/themes/odometer-theme-default.css";
import "../style.css";

const menuItems = [
  {
    title: "Home",
    subMenu: [
      { name: "Overview of the Museum", path: "/" },
      { name: "Featured Artifacts or Exhibitions", path: "/artifacts" },
    ],
  },
  {
    title: "Artifacts",
    subMenu: [
      { name: "Categories", path: "/artifacts" },
      { name: "Search Functionality", path: "/items" },
    ],
  },
  {
    title: "Exhibitions",
    subMenu: [
      { name: "Current Exhibitions", path: "/exhibitions/current" },
      { name: "Upcoming Exhibitions", path: "/exhibitions/upcoming" },
    ],
  },
  {
    title: "About Us",
    subMenu: [
      { name: "Museum History", path: "/about-us" },
      { name: "Mission & Vision", path: "/about-us#mission-vision" },
      { name: "Team", path: "/about-us#team" },
    ],
  },
  {
    title: "Visit Us",
    subMenu: [
      { name: "Location & Hours", path: "/visit/location-hours" },
      { name: "Ticket Information", path: "/visit/ticket-info" },
      { name: "Directions", path: "/visit/directions" },
    ],
  },
  {
    title: "Contact",
    subMenu: [
      { name: "Contact Form", path: "/contact-us" },
      { name: "Social Media Links", path: "/contact-us#social-media" },
    ],
  },
];

const MainMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="sticky-wrapper">
        <div className="menu-area">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="header-logo">
                  <Link to="/">
                    <img src="/img/logo.svg" alt="logo" />
                  </Link>
                </div>
              </div>
              <div className="col-auto">
                <nav className="main-menu d-none d-lg-inline-block">
                  <ul>
                    {menuItems.map((item, index) => (
                      <li
                        key={index}
                        className={item.subMenu ? "menu-item-has-children" : ""}
                      >
                        <Link to={item.path || "#"}>{item.title}</Link>
                        {item.subMenu && (
                          <ul className="sub-menu">
                            {item.subMenu.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link to={subItem.path}>{subItem.name}</Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="navbar-right d-inline-flex d-lg-none">
                  <button
                    type="button"
                    className="menu-toggle icon-btn"
                    onClick={toggleSidebar}
                  >
                    <i className="fas fa-bars"></i>
                  </button>
                </div>
              </div>
              <div className="col-auto d-none d-xl-block">
                <div className="header-button">
                  <Link to="/scan-qr" className="btn d-none d-xl-block">
                    Scan Artifact QR Code
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="mobile-menu-wrapper">
          <div className="mobile-menu-area text-center">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <i className="fas fa-times"></i>
            </button>
            <div className="mobile-logo">
              <Link to="/">
                <img src="/img/logo.svg" alt="Artvista" />
              </Link>
            </div>
            <div className="mobile-menu">
              <ul>
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className={item.subMenu ? "menu-item-has-children" : ""}
                  >
                    <Link to={item.path || "#"}>{item.title}</Link>
                    {item.subMenu && (
                      <ul className="sub-menu">
                        {item.subMenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link to={subItem.path}>{subItem.name}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainMenu;
