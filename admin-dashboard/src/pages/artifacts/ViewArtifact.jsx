/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Box, Grid, TextField, Button, Typography, IconButton, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import ReactPlayer from 'react-player';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This is important to include for the lightbox styles

const ViewArtifactModal = ({ open, handleClose, artifact }) => {
  const [isImageLightboxOpen, setIsImageLightboxOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isQrCodeLightboxOpen, setIsQrCodeLightboxOpen] = React.useState(false);

  const safeArtifact = artifact || {};

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

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth sx={{ '& .MuiPaper-root': { borderRadius: '10px' } }}>
      <DialogTitle sx={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #ccc' }}>
        <Typography variant="h6" sx={{ color: 'black' }}>
          View Artifact
        </Typography>
        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" style={{ color: 'black' }}>
              Details:
            </Typography>
            {['name', 'itemNo', 'serialNo', 'description', 'madeOf', 'age', 'shelfNo', 'hallNo'].map((field) => (
              <TextField
                key={field}
                fullWidth
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={safeArtifact[field] || ''}
                margin="normal"
                variant="outlined"
                style={{ color: 'black' }}
                disabled
                sx={{ borderRadius: '8px' }}
              />
            ))}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" style={{ color: 'black' }}>
              Particulars:
            </Typography>
            {['width', 'depth', 'circumference', 'diameters', 'weight'].map((field) => (
              <TextField
                key={field}
                fullWidth
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={safeArtifact.particulars?.[field] || ''}
                margin="normal"
                variant="outlined"
                InputProps={{ style: { color: 'black' } }}
                disabled
                sx={{ borderRadius: '8px' }}
              />
            ))}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" style={{ color: 'black' }}>
              Media:
            </Typography>
            <Grid container spacing={2} alignItems="center">
              {safeArtifact.images && safeArtifact.images.length > 0 && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" style={{ color: 'black' }}>
                    Images:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {safeArtifact.images.map((image, index) => (
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
              {safeArtifact.qrCode && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" style={{ color: 'black' }}>
                    QR Code:
                  </Typography>
                  <Box sx={{ maxWidth: 200, mt: 1 }}>
                    <img
                      src={safeArtifact.qrCode}
                      alt="QR Code"
                      style={{ width: '100%', maxHeight: '150px', cursor: 'pointer', borderRadius: '8px' }}
                      onClick={() => setIsQrCodeLightboxOpen(true)}
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
            {safeArtifact.audio && (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <Typography variant="h6" style={{ color: 'black' }}>
                    Audio File:
                  </Typography>
                  <Box>
                    <ReactPlayer url={safeArtifact.audio} controls height="0%" width="100%" />
                  </Box>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      {isImageLightboxOpen && (
        <Lightbox
          mainSrc={safeArtifact.images[currentImageIndex]}
          nextSrc={safeArtifact.images[(currentImageIndex + 1) % safeArtifact.images.length]}
          prevSrc={safeArtifact.images[(currentImageIndex + safeArtifact.images.length - 1) % safeArtifact.images.length]}
          onCloseRequest={() => setIsImageLightboxOpen(false)}
          onMovePrevRequest={() => setCurrentImageIndex((currentImageIndex + safeArtifact.images.length - 1) % safeArtifact.images.length)}
          onMoveNextRequest={() => setCurrentImageIndex((currentImageIndex + 1) % safeArtifact.images.length)}
          imageTitle={
            <Button
              onClick={() => downloadImage(safeArtifact.images[currentImageIndex])}
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
      {isQrCodeLightboxOpen && (
        <Lightbox
          mainSrc={safeArtifact.qrCode}
          onCloseRequest={() => setIsQrCodeLightboxOpen(false)}
          imageTitle={
            <Button
              onClick={() => downloadImage(safeArtifact.qrCode)}
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
    </Dialog>
  );
};

export default ViewArtifactModal;
