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

const ViewArtifactModal = ({ open, handleClose, artifact }) => {
  const [isImageLightboxOpen, setIsImageLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isQrCodeLightboxOpen, setIsQrCodeLightboxOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = React.useRef(null);

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

  const handleAudioPlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsAudioPlaying(true);
    }
  };

  const handleAudioStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsAudioPlaying(false);
    }
  };

  const safeArtifact = artifact || {}; // Fallback in case artifact is not provided


  console.log("artifact Detail in the view modal ", artifact)
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
        {artifact ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" sx={{ color: 'black', mb: 2 }}>
                Details:
              </Typography>
              <Box>
                {['name', 'itemNo', 'serialNo', 'description', 'madeOf', 'age', 'shelfNo', 'hallNo'].map((field) => (
                  <Typography key={field} variant="body1" sx={{ color: 'black', mb: 1 }}>
                    <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {safeArtifact[field] || 'N/A'}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" sx={{ color: 'black', mb: 2 }}>
                Particulars:
              </Typography>
              <Box>
                {['width', 'depth', 'circumference', 'diameters', 'weight'].map((field) => (
                  <Typography key={field} variant="body1" sx={{ color: 'black', mb: 1 }}>
                    <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {safeArtifact.particulars?.[field] || 'N/A'}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ color: 'black', mb: 2 }}>
                Media:
              </Typography>
              <Grid container spacing={2} alignItems="center">
                {safeArtifact.images && safeArtifact.images.length > 0 && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ color: 'black', mb: 2 }}>
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
                    <Typography variant="h6" sx={{ color: 'black', mb: 2 }}>
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
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: 'black', mb: 2 }}>
                  Audio File:
                </Typography>
                <Box>
                  <Button onClick={isAudioPlaying ? handleAudioStop : handleAudioPlay} variant="contained" sx={{ mr: 1 }} fullWidth>
                    {isAudioPlaying ? 'Stop' : 'Play'}
                  </Button>
                  <audio ref={audioRef} src={safeArtifact.audio} style={{ width: '100%' }} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h6" sx={{ color: 'black' }}>
            Loading artifact details...
          </Typography>
        )}
      </DialogContent>

      {isImageLightboxOpen && safeArtifact.images && (
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
      {isQrCodeLightboxOpen && safeArtifact.qrCode && (
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
