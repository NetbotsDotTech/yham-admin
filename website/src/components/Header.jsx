import  { useState , useEffect, useRef } from 'react';
import { Box, Typography, Button, Container, Modal, IconButton } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

import { Link, useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode'; // Importing the QR code scanner


const slides = [
  {
    title: 'Ancient Tools and Weapons',
    image: './public/img/slider/hero_1.jpeg',
    description: 'A glimpse into the tools and weapons used by ancient civilizations in Gilgit-Baltistan.',
    link: '/artifact/tools-weapons',
  },
  {
    title: 'Traditional Clothing and Textiles',
    image: 'https://images.unsplash.com/photo-1529761430595-036b79cb9d5e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=700',
    description: 'Discover the rich textile heritage of the region through clothing and fabrics used over centuries.',
    link: '/artifact/textiles',
  },
  {
    title: 'Historical Manuscripts',
    image: 'https://images.unsplash.com/photo-1518805629729-3e55b81b2393?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=700',
    description: 'Explore rare and ancient manuscripts that document the rich history of Skardu and beyond.',
    link: '/artifact/manuscripts',
  },
  {
    title: 'Artifacts of Daily Life',
    image: 'https://images.unsplash.com/photo-1488831948116-38bc1351c6d6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=700',
    description: 'Artifacts that reveal the daily life and culture of the people in Gilgit-Baltistan over time.',
    link: '/artifact/daily-life',
  },
];

const HeroSlider = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal for scanning
    const [scanner, setScanner] = useState(null); // QR code scanner instance
    const qrReaderRef = useRef(null); // Ref for QR reader container
    const navigate = useNavigate(); // For navigation
  
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
          .catch((err) => {
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
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Carousel
          autoPlay={true}
          animation="slide"
          duration={600}
          interval={4000}
          indicators={false}
          navButtonsAlwaysVisible={true}
        >
          {slides.map((slide, index) => (
            <Box key={index} sx={{ position: 'relative', height: '500px', width: '100%', overflow: 'hidden' }}>
              {/* Full width image */}
              <Box
                component="img"
                src={slide.image}
                alt={slide.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              />
              {/* Overlay content positioned bottom-left */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  p: 4,
                  width: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)', // Optional dark overlay for contrast
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: 'Arial, sans-serif', // Change the font style here
                    mb: 2,
                    fontWeight: 'bold',
                    letterSpacing: 1,
                    color: '#fff',
                  }}
                >
                  Yousuf Hussain Abadi Museum
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: 'Georgia, serif', // Change font style for title
                    mb: 2,
                    fontWeight: '700',
                    color: '#fff',
                    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)', // Add text shadow for visibility
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: 'Verdana, sans-serif', // Change font style for description
                    mb: 3,
                    fontSize: '1.2rem',
                    lineHeight: 1.5,
                    color: '#f5f5f5',
                  }}
                >
                  {slide.description}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#ff9800',
                    '&:hover': {
                      backgroundColor: '#e68900',
                    },
                  }}
                  onClick={handleOpenModal} // Open the modal when clicked
                >
                                                <QrCodeScannerIcon sx={{ mr: 1 }} />

                  Scan Artifact QR Code
                </Button>
              </Box>
            </Box>
          ))}
        </Carousel>
  
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

            <Typography id="qr-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
              Scan the QR Code
            </Typography>
            <Box
              id="qr-reader"
              ref={qrReaderRef}
              sx={{ mt: 2, mb: 2, height: 250, width: 250 }} // Size for the QR reader
            ></Box>
            <Button onClick={handleCloseModal} variant="outlined">
              Cancel
            </Button>
          </Box>
        </Modal>
      </Container>
    );
  };
  
  export default HeroSlider;