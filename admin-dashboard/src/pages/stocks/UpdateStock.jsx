/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Typography, IconButton, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateStockRegistry({ open, handleClose, stockId }) {
  const [formData, setFormData] = useState({
    shelfNo: '',
    shelfDetails: '',
    artifactTypes: '',
    numberOfArtifacts: '',
    shelfPhoto: null
  });

  // Fetch existing stock data for the provided stockId
  useEffect(() => {
    if (stockId) {
      axios
        .get(`http://localhost:5000/api/stock/${stockId}`)
        .then((response) => {
          setFormData({
            shelfNo: response.data.shelfNo,
            shelfDetails: response.data.shelfDetails,
            artifactTypes: response.data.artifactTypes,
            numberOfArtifacts: response.data.numberOfArtifacts,
            shelfPhoto: null // Keep current photo logic as needed
          });
        })
        .catch(() => {
          toast.error('Failed to fetch stock data. Please try again.');
        });
    }
  }, [stockId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePhotoUpload = (acceptedFiles) => {
    setFormData((prevData) => ({
      ...prevData,
      shelfPhoto: acceptedFiles[0]
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: handlePhotoUpload
  });

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'shelfPhoto' && formData.shelfPhoto) {
        formDataToSend.append('shelfPhoto', formData.shelfPhoto, `shelf-${Date.now()}.jpg`);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      await axios
        .put(`http://localhost:5000/api/stock/${stockId}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          toast.success('Stock registry updated successfully!');
          setFormData({
            shelfNo: '',
            shelfDetails: '',
            artifactTypes: '',
            numberOfArtifacts: '',
            shelfPhoto: null
          });
          handleClose();
        });
    } catch (error) {
      toast.error('Failed to update stock registry. Please try again.');
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          style: {
            width: '90%',
            height: '95%',
            maxWidth: 'none',
            maxHeight: 'none'
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h6">Update Stock Registry</Typography>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ height: 'calc(95% - 64px)', overflowY: 'auto' }}>
          <Grid container spacing={2}>
            {/* Shelf No */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Shelf No"
                name="shelfNo"
                value={formData.shelfNo}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>

            {/* Shelf Details */}
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Shelf Details"
                name="shelfDetails"
                value={formData.shelfDetails}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>

            {/* Types of Artifacts */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Types of Artifacts"
                name="artifactTypes"
                value={formData.artifactTypes}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>

            {/* Number of Artifacts */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Number of Artifacts"
                name="numberOfArtifacts"
                value={formData.numberOfArtifacts}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>

            {/* Shelf Photo */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Upload Shelf Photo
              </Typography>
              <div
                {...getRootProps({ className: 'dropzone' })}
                style={{ padding: '10px', border: '2px dashed #ccc', borderRadius: '8px', textAlign: 'center', marginBottom: '20px' }}
              >
                <input {...getInputProps()} />
                <Typography variant="body1">Drag & drop a photo here, or click to select a photo</Typography>
              </div>
              {formData.shelfPhoto && (
                <img
                  src={URL.createObjectURL(formData.shelfPhoto)}
                  alt="shelf-photo"
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }}
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
}
