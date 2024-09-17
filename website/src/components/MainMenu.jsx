import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Html5Qrcode } from "html5-qrcode";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "magnific-popup/dist/magnific-popup.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "odometer/themes/odometer-theme-default.css";
import "../style.css"; // Import the updated CSS
import "../custom.css"; // Import the responsive CSS

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
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal for scanning
  const [scanner, setScanner] = useState(null); // QR code scanner instance
  const qrReaderRef = useRef(null); // Ref for QR reader container


  const navigate = useNavigate(); // For navigation

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    stopQrScanner(); // Stop the scanner when modal is closed
  };

  const startQrScanner = () => {
    if (qrReaderRef.current) {
      const html5QrCode = new Html5Qrcode(qrReaderRef.current.id);

      html5QrCode
        .start(
          { facingMode: "environment" }, // Scan from rear camera
          {
            fps: 10, // frames per second
            qrbox: { width: 250, height: 250 }, // Scanning box size
          },
          (decodedText) => {
            const result = JSON.parse(decodedText);
            const itemNo = result.itemNo;
            console.log(`Scanned itemNo: ${itemNo}`); // Log the itemNo
            navigate(`/artifacts-details/${itemNo}`); // Navigate to Artifacts Details with itemNo
            handleCloseModal(); // Close modal after successful scan
          },
          (error) => {
            console.warn(`QR Code scanning error: ${error}`);
          }
        )
        .then(() => {
          setScanner(html5QrCode); // Store scanner instance to stop later
        })
        .catch(err => {
          console.error("Error starting QR scanner:", err);
        });
    } else {
      console.error("QR reader container not found");
    }
  };

  const stopQrScanner = () => {
    if (scanner) {
      scanner.stop().then(() => {
        scanner.clear(); // Clear the scanner's region
      }).catch(err => {
        console.error("Error stopping QR scanner:", err);
      });
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      // Ensure QR reader element is rendered before initializing
      const timer = setTimeout(() => {
        startQrScanner(); // Start scanner when modal opens
      }, 300); // Delay to ensure rendering is complete

      return () => {
        clearTimeout(timer);
        stopQrScanner(); // Stop scanner when modal closes
      };
    } else {
      stopQrScanner(); // Stop scanner when modal closes
    }
  }, [isModalOpen]);

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
                                <Link to={subItem.path} onClick={closeSidebar}>
                                  {subItem.name}
                                </Link>
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
                    className="menu-toggle-icon-btn"
                    onClick={toggleSidebar}
                  >
                    <FaBars />
                  </button>
                </div>
              </div>
              <div className="col-auto d-none d-xl-block">
                <div className="header-button">
                  <Button
                    variant="contained"
                    onClick={handleOpenModal}
                    className="btn d-none d-xl-block"
                  >
                    Scan Artifact QR Code
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu code remains unchanged */}

      {/* Modal for QR code scanning */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="qr-modal-title"
        aria-describedby="qr-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography id="qr-modal-title" variant="h6" component="h2">
            Scan the QR Code
          </Typography>
          <Box
            id="qr-reader"
            ref={qrReaderRef}
            sx={{ mt: 2, mb: 2, height: 250, width: 250 }}
          ></Box>
          <Button onClick={handleCloseModal} variant="outlined">
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default MainMenu;
