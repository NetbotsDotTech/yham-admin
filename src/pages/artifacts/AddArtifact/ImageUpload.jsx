/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import {
  Grid,
  Typography,
  IconButton,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Close as CloseIcon, PhotoCamera, Upload as UploadIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';

const ImageUpload = ({ images, onImageUpload, onImageRemove }) => {
  const [uploadMethod, setUploadMethod] = useState('upload'); // 'upload' or 'camera'
  const [mediaDevices, setMediaDevices] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [stream, setStream] = useState(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const videoRef = useRef(null);

  const handleUploadMethodChange = (event, newMethod) => {
    if (newMethod !== null) {
      setUploadMethod(newMethod);
      if (newMethod === 'camera' && selectedCamera) {
        startVideoStream(selectedCamera); // Start video stream for camera
      }
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: 'image/*',
    noClick: true,
    noKeyboard: true,
    onDrop: async (acceptedFiles) => {
      const avifImages = await Promise.all(
        acceptedFiles.map(async (file) => {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            fileType: 'image/avif',
          };
          const compressedFile = await imageCompression(file, options);
          return compressedFile;
        })
      );
      onImageUpload([...images, ...avifImages]);
    },
  });

  const handleCapture = async () => {
    if (!selectedCamera || capturedImages.length >= 3) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const video = videoRef.current;

    // Set the canvas size to the video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to the canvas
    context.drawImage(video, 0, 0);
    canvas.toBlob(async (blob) => {
      if (blob) {
        const compressedFile = await imageCompression(blob, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/avif',
        });
        setCapturedImages([...capturedImages, compressedFile]);
        if (capturedImages.length === 2) {
          setShowReview(true); // Show review dialog after 3 images
        }
      }
    }, 'image/avif');
  };

  const handleCameraChange = (event) => {
    const cameraId = event.target.value;
    setSelectedCamera(cameraId);
    startVideoStream(cameraId);
  };

  const startVideoStream = async (cameraId) => {
    try {
      const constraints = {
        video: {
          deviceId: cameraId ? { exact: cameraId } : undefined,
        },
      };
      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);
      videoRef.current.srcObject = newStream;
    } catch (error) {
      console.error('Error accessing camera: ', error);
    }
  };

  const stopVideoStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleKeyDown = (event) => {
    // Handle arrow key navigation and keyboard shortcuts
    if (event.key === 'ArrowRight') {
      // Move focus to the next field (you can implement the logic here)
    } else if (event.key === 'ArrowLeft') {
      // Move focus to the previous field
    } else if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
      // Save action
      event.preventDefault();
      // Implement save logic
    } else if (event.key === 'Escape') {
      // Cancel action
      // Implement cancel logic
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = capturedImages.filter((_, i) => i !== index);
    setCapturedImages(updatedImages);
  };

  const handleRetake = () => {
    setCapturedImages([]);
    setShowReview(false);
    if (selectedCamera) {
      startVideoStream(selectedCamera); // Restart the video stream for retake
    }
  };

  const handleFinalSave = () => {
    onImageUpload([...images, ...capturedImages]);
    setCapturedImages([]);
    setShowReview(false);
    stopVideoStream(); // Stop the video stream after saving
  };

  useEffect(() => {
    const fetchMediaDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      setMediaDevices(videoDevices);
    };

    fetchMediaDevices();

    // Clean up the video stream on unmount
    return () => {
      stopVideoStream();
    };
  }, []);

  return (
    <Grid item xs={12} onKeyDown={handleKeyDown} tabIndex={0}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Upload Images
      </Typography>
      <ToggleButtonGroup
        value={uploadMethod}
        exclusive
        onChange={handleUploadMethodChange}
        aria-label="upload method"
        sx={{ mb: 2 }}
      >
        <ToggleButton value="upload" aria-label="upload images">
          <UploadIcon sx={{ mr: 1 }} /> Upload
        </ToggleButton>
        <ToggleButton value="camera" aria-label="use camera">
          <PhotoCamera sx={{ mr: 1 }} /> Camera
        </ToggleButton>
      </ToggleButtonGroup>

      {uploadMethod === 'upload' ? (
        <div
          {...getRootProps({ className: 'dropzone' })}
          style={{
            padding: '10px',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '20px',
            cursor: 'pointer',
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="body1">
            Drag & drop some images here, or click the button to select images
          </Typography>
          <Button variant="contained" onClick={open} sx={{ mt: 2 }}>
            Select Images
          </Button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="camera-select-label">Select Camera</InputLabel>
            <Select
              labelId="camera-select-label"
              value={selectedCamera || ''}
              onChange={handleCameraChange}
              displayEmpty
            >
              <MenuItem value="" disabled>Select a camera</MenuItem>
              {mediaDevices.map((device) => (
                <MenuItem key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div style={{ margin: '20px 0', maxWidth: '320px', marginLeft: 'auto', marginRight: 'auto' }}>
            <video ref={videoRef} autoPlay style={{ width: '100%', borderRadius: '8px' }} />
          </div>
          <Button variant="contained" color="primary" onClick={handleCapture}>
            Capture Image
          </Button>
          {capturedImages.length > 0 && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              You have captured {capturedImages.length} image(s).
            </Typography>
          )}
        </div>
      )}

      <Grid container spacing={2}>
        {images.map((file, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden', borderRadius: '8px', marginBottom: '10px' }}>
              <img
                src={URL.createObjectURL(file)}
                alt={`uploaded-img-${index}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <IconButton
                onClick={() => onImageRemove(index)}
                style={{ position: 'absolute', top: 8, right: 8, backgroundColor: '#fff' }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </Grid>
        ))}
      </Grid>

  {/* Review Dialog */}
  <Dialog open={showReview} onClose={() => setShowReview(false)}>
        <DialogTitle>Review Captured Images</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {capturedImages.map((file, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden', borderRadius: '8px', marginBottom: '10px' }}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`captured-img-${index}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <IconButton
                    onClick={() => handleDeleteImage(index)}
                    style={{ position: 'absolute', top: 8, right: 8, backgroundColor: '#fff' }}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRetake} color="primary">Retake</Button>
          <Button onClick={handleFinalSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>    
      </Grid>




  );
};

export default ImageUpload;
