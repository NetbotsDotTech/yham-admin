import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "magnific-popup/dist/magnific-popup.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "odometer/themes/odometer-theme-default.css";
import "../style.css";
// import LOGO from "../assets/img/logo.svg";

const menuItems = [
  {
    title: "Home",
    subMenu: [
      { name: "Overview of the Museum", href: "overview.html" },
      { name: "Featured Artifacts or Exhibitions", href: "featured.html" },
    ],
  },
  {
    title: "Artifacts",
    subMenu: [
      { name: "Categories", href: "categories.html" },
      { name: "Search Functionality", href: "search.html" },
    ],
  },
  {
    title: "Exhibitions",
    subMenu: [
      { name: "Current Exhibitions", href: "current.html" },
      { name: "Upcoming Exhibitions", href: "upcoming.html" },
    ],
  },
  {
    title: "About Us",
    subMenu: [
      { name: "Museum History", href: "history.html" },
      { name: "Mission & Vision", href: "mission-vision.html" },
      { name: "Team", href: "team.html" },
    ],
  },
  {
    title: "Visit Us",
    subMenu: [
      { name: "Location & Hours", href: "location-hours.html" },
      { name: "Ticket Information", href: "ticket-info.html" },
      { name: "Directions", href: "directions.html" },
    ],
  },
  {
    title: "Contact",
    subMenu: [
      { name: "Contact Form", href: "contact-form.html" },
      { name: "Social Media Links", href: "social-media.html" },
    ],
  },
];

const MainMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handler function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <>
      {/* Main Menu Area */}
      <div className="sticky-wrapper">
        <div className="menu-area">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="header-logo">
                  <a href="index.html">
                    <img src="/img/logo.svg" alt="logo" />
                  </a>
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
                        <a href={item.href || "#"}>{item.title}</a>
                        {item.subMenu && (
                          <ul className="sub-menu">
                            {item.subMenu.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <a href={subItem.href}>{subItem.name}</a>
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
                  <a href="contact.html" className="btn d-none d-xl-block">
                    Scan Artifact QR Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      {isSidebarOpen && (
        <div className="mobile-menu-wrapper">
          <div className="mobile-menu-area text-center">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <i className="fas fa-times"></i>
            </button>
            <div className="mobile-logo">
              <a href="index.html">
                <img src={LOGO} alt="Artvista" />
              </a>
            </div>
            <div className="mobile-menu">
              <ul>
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className={item.subMenu ? "menu-item-has-children" : ""}
                  >
                    <a href={item.href || "#"}>{item.title}</a>
                    {item.subMenu && (
                      <ul className="sub-menu">
                        {item.subMenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <a href={subItem.href}>{subItem.name}</a>
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
