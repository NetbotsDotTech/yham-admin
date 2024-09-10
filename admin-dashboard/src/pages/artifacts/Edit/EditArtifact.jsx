/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Typography, IconButton, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import VoiceRecording from './VoiceRecording';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function EditArtifact({ open, handleClose, artifact, onSave }) {
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

  useEffect(() => {
    if (artifact) {
      setFormData({
        name: artifact.name || '',
        itemNo: artifact.itemNo || '',
        serialNo: artifact.serialNo || '',
        description: artifact.description || '',
        madeOf: artifact.madeOf || '',
        age: artifact.age || '',
        shelfNo: artifact.shelfNo || '',
        hallNo: artifact.hallNo || '',
        particulars: artifact.particulars || {
          width: '',
          depth: '',
          circumference: '',
          diameters: '',
          weight: ''
        },
        images: artifact.images || [],
        audio: artifact.audio || null
      });
    }
  }, [artifact]);

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

  const handleImageUpload = (acceptedFiles) => {
    setFormData((prevData) => ({
      ...prevData,
      images: acceptedFiles
    }));
  };

  const handleAudioStop = (blob) => {
    setFormData((prevData) => ({
      ...prevData,
      audio: blob
    }));
  };

  const handleAudioSave = (blob) => {
    setFormData((prevData) => ({
      ...prevData,
      audio: blob
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: handleImageUpload
  });

  const handleSubmit = async () => {
    const formToSubmit = new FormData();
  
    // Append textual data
    formToSubmit.append('name', formData.name);
    formToSubmit.append('itemNo', formData.itemNo);
    formToSubmit.append('serialNo', formData.serialNo);
    formToSubmit.append('description', formData.description);
    formToSubmit.append('madeOf', formData.madeOf);
    formToSubmit.append('age', formData.age);
    formToSubmit.append('shelfNo', formData.shelfNo);
    formToSubmit.append('hallNo', formData.hallNo);
  
    // Append particulars object data
    Object.keys(formData.particulars).forEach((key) => {
      formToSubmit.append(`particulars[${key}]`, formData.particulars[key]);
    });
  
    // Handle image files
    if (formData.images.length > 0) {
      formData.images.forEach((image, index) => {
        formToSubmit.append(`images[${index}]`, image);
      });
    } else {
      // Send an empty array if no images are updated
      formToSubmit.append('images', '[]');
    }
  
    // Handle audio file
    if (formData.audio) {
      formToSubmit.append('audio', formData.audio);
    } else {
      // Send an empty string if no audio is updated
      formToSubmit.append('audio', '');
    }
  
    try {
      await axios.put(`http://localhost:5000/api/artifacts/${artifact._id}`, formToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(() => {
        console.log("formToSubmit", formToSubmit);
        toast.success('Artifact updated successfully!');
        onSave(); // Call onSave prop to refresh parent component data if needed
        handleClose();
      });
    } catch (error) {
      console.error('Failed to update the artifact:', error);
      toast.error('Failed to update the artifact. Please try again.');
    }
  };
  

  return (
    <>
      <ToastContainer />
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
          <Typography variant="h6">Edit Artifact</Typography>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ height: 'calc(95% - 64px)', overflowY: 'auto' }}>
          <Grid container spacing={2}>
            {/* First Row */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Item No"
                name="itemNo"
                value={formData.itemNo}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Serial No"
                name="serialNo"
                value={formData.serialNo}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>

            {/* Second Row */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Made Of"
                name="madeOf"
                value={formData.madeOf}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>

            {/* Third Row */}
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
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Hall No"
                name="hallNo"
                value={formData.hallNo}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>

            {/* Particulars Row */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Particulars:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <TextField
                    fullWidth
                    label="Width"
                    name="width"
                    value={formData.particulars.width}
                    onChange={handleParticularsChange}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    fullWidth
                    label="Depth"
                    name="depth"
                    value={formData.particulars.depth}
                    onChange={handleParticularsChange}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    fullWidth
                    label="Circumference"
                    name="circumference"
                    value={formData.particulars.circumference}
                    onChange={handleParticularsChange}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    fullWidth
                    label="Diameters"
                    name="diameters"
                    value={formData.particulars.diameters}
                    onChange={handleParticularsChange}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  {' '}
                  <TextField
                    fullWidth
                    label="Weight"
                    name="weight"
                    value={formData.particulars.weight}
                    onChange={handleParticularsChange}
                    margin="normal"
                    variant="outlined"
                  />{' '}
                </Grid>{' '}
              </Grid>{' '}
            </Grid>
            {/* Image Upload */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Upload Images:
              </Typography>
              <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #ddd', padding: '20px', textAlign: 'center' }}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
              <div>
                {formData.images.length > 0 && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    {formData.images.map((file, index) => (
                      <span key={index}>
                        {file.name}
                        {index < formData.images.length - 1 && ', '}
                      </span>
                    ))}
                  </Typography>
                )}
              </div>
            </Grid>

            {/* Audio Recording */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Record or Upload Audio:
              </Typography>
              <VoiceRecording onAudioStop={handleAudioStop} onAudioSave={handleAudioSave} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
