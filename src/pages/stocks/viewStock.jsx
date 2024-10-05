/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Box, Grid, Typography, IconButton, Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ViewStock = ({ open, handleClose, stock }) => {
  const [isImageLightboxOpen, setIsImageLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isQrCodeLightboxOpen, setIsQrCodeLightboxOpen] = useState(false);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsImageLightboxOpen(true);
  };

  const downloadImage = (src) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = src.split('/').pop();
    link.click();
  };

  const safeStock = stock || {}; // Fallback in case stock is not provided

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth sx={{ '& .MuiPaper-root': { borderRadius: '10px' } }}>
      <DialogTitle sx={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #ccc' }}>
        <Typography variant="h6" sx={{ color: 'black' }}>
          View Stock
        </Typography>
        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: 3 }}>
        {stock ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" sx={{ color: 'black', mb: 2 }}>
                Details:
              </Typography>
              <Box>
                {['shelfNo', 'hallNo', 'numberOfArtifacts'].map((field) => (
                  <Typography key={field} variant="body1" sx={{ color: 'black', mb: 1 }}>
                    <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {safeStock[field] || 'N/A'}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" sx={{ color: 'black', mb: 2 }}>
                Shelf Image:
              </Typography>
              {safeStock.shelfImage && (
                <Box>
                  <img
                    src={safeStock.shelfImage}
                    alt="Shelf"
                    style={{ width: '100%', maxHeight: '200px', borderRadius: '8px', cursor: 'pointer' }}
                    onClick={() => downloadImage(safeStock.shelfImage)}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ color: 'black', mb: 2 }}>
                Media:
              </Typography>
              <Grid container spacing={2} alignItems="center">
                {safeStock.images && safeStock.images.length > 0 && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ color: 'black', mb: 2 }}>
                      Images:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {safeStock.images.map((image, index) => (
                        <Box key={index} sx={{ position: 'relative', maxWidth: 200 }}>
                          <img
                            src={image}
                            alt={`Image ${index + 1}`}
                            style={{ width: '100%', maxHeight: '150px', cursor: 'pointer', borderRadius: '8px' }}
                            onClick={() => handleImageClick(index)}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                )}
          
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h6" sx={{ color: 'black' }}>
            Loading stock details...
          </Typography>
        )}
      </DialogContent>

      {isImageLightboxOpen && safeStock.images && (
        <Lightbox
          mainSrc={safeStock.images[currentImageIndex]}
          nextSrc={safeStock.images[(currentImageIndex + 1) % safeStock.images.length]}
          prevSrc={safeStock.images[(currentImageIndex + safeStock.images.length - 1) % safeStock.images.length]}
          onCloseRequest={() => setIsImageLightboxOpen(false)}
          onMovePrevRequest={() => setCurrentImageIndex((currentImageIndex + safeStock.images.length - 1) % safeStock.images.length)}
          onMoveNextRequest={() => setCurrentImageIndex((currentImageIndex + 1) % safeStock.images.length)}
          imageTitle={
            <Button
              onClick={() => downloadImage(safeStock.images[currentImageIndex])}
              style={{ color: 'white', backgroundColor: 'black', padding: '6px 12px', margin: '10px', borderRadius: '4px' }}
            >
              Download
            </Button>
          }
          reactModalStyle={{
            overlay: {
              zIndex: 2000,
              backgroundColor: 'rgba(0, 0, 0, 0.85)'
            },
            content: {
              inset: '10%'
            }
          }}
        />
      )}
    \
    </Dialog>
  );
};

export default ViewStock;
