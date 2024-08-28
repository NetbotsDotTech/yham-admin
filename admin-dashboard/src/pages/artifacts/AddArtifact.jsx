/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { Box, Grid, TextField, Button, Typography, IconButton, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Recorder from 'recorder-js';
import { Uploader } from 'react-uploader';
import 'react-image-lightbox/style.css'; // This is important to include for the lightbox styles

const AddArtifactModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    itemNo: '',
    serialNo: '',
    description: '',
    madeOf: '',
    age: '',
    shelfNo: '',
    hallNo: '',
    particulars: {
      width: '',
      depth: '',
      circumference: '',
      diameters: '',
      weight: ''
    },
    images: [],
    audio: null
  });

  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleParticularsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      particulars: {
        ...prevData.particulars,
        [name]: value
      }
    }));
  };

  const handleImageUpload = (files) => {
    const uploadedFiles = Array.from(files).map((file) => URL.createObjectURL(file));
    setFormData((prevData) => ({
      ...prevData,
      images: uploadedFiles
    }));
  };

  const handleAudioRecording = () => {
    if (isRecording) {
      recorder.current.stop().then(({ blob }) => {
        const audioUrl = URL.createObjectURL(blob);
        setFormData((prevData) => ({
          ...prevData,
          audio: audioUrl
        }));
        setIsRecording(false);
      });
    } else {
      recorder.current.start().then(() => setIsRecording(true));
    }
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log(formData);
    handleClose();
  };

  React.useEffect(() => {
    if (recorder.current === null) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      recorder.current = new Recorder(audioContext);
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => recorder.current.init(stream))
        .catch((err) => console.error('Failed to initialize recorder:', err));
    }
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth sx={{ '& .MuiPaper-root': { borderRadius: '10px' } }}>
      <DialogTitle sx={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #ccc' }}>
        <Typography variant="h6" sx={{ color: 'black' }}>
          Add New Artifact
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
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                style={{ color: 'black' }}
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
                name={field}
                value={formData.particulars[field]}
                onChange={handleParticularsChange}
                margin="normal"
                variant="outlined"
                InputProps={{ style: { color: 'black' } }}
                sx={{ borderRadius: '8px' }}
              />
            ))}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" style={{ color: 'black' }}>
              Media:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" style={{ color: 'black' }}>
                  Upload Images:
                </Typography>
                <Uploader
                  multiple
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', width: '100%', cursor: 'pointer' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" style={{ color: 'black' }}>
                  Record Audio:
                </Typography>
                <Button
                  variant="contained"
                  color={isRecording ? 'secondary' : 'primary'}
                  onClick={handleAudioRecording}
                  sx={{ mt: 1, borderRadius: '8px' }}
                >
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Button>
                {formData.audio && <audio controls src={formData.audio} style={{ marginTop: '10px', width: '100%' }} />}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained" sx={{ borderRadius: '8px' }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" sx={{ borderRadius: '8px' }}>
          Save Artifact
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { AddArtifactModal };
