/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  LinearProgress
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import VoiceRecording from './VoiceRecording';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddArtifact({ open, handleClose }) {
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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? '' : 'Name is required.';
    tempErrors.itemNo = formData.itemNo ? '' : 'Item No is required.';
    tempErrors.serialNo = formData.serialNo ? '' : 'Serial No is required.';
    tempErrors.description = formData.description ? '' : 'Description is required.';
    tempErrors.madeOf = formData.madeOf ? '' : 'Material (Made Of) is required.';
    tempErrors.shelfNo = formData.shelfNo ? '' : 'Shelf No is required.';
    tempErrors.hallNo = formData.hallNo ? '' : 'Hall No is required.';
    tempErrors.images = formData.images.length > 0 ? '' : 'At least one image is required.';

    // Validate particulars fields if provided
    Object.keys(formData.particulars).forEach((key) => {
      if (formData.particulars[key] && isNaN(formData.particulars[key])) {
        tempErrors.particulars = { ...tempErrors.particulars, [key]: 'Must be a number' };
      }
    });

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

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

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'particulars') {
        Object.keys(formData.particulars).forEach((particularKey) => {
          formDataToSend.append(`particulars[${particularKey}]`, formData.particulars[particularKey]);
        });
      } else if (key === 'images') {
        formData.images.forEach((image) => {
          formDataToSend.append('images', image);
        });
      } else if (key === 'audio' && formData.audio) {
        formDataToSend.append('audio', formData.audio, `recording-${Date.now()}.wav`);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      await axios.post('http://localhost:5000/api/artifacts', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Artifact added successfully!');
      handleClose();
    } catch (error) {
      toast.error('Failed to add artifact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: handleImageUpload
  });

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
            maxHeight: 'none',
            margin: '20px' // Add margin around the modal
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h6">Add New Artifact</Typography>
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
                error={!!errors.name}
                helperText={errors.name}
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
                error={!!errors.itemNo}
                helperText={errors.itemNo}
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
                error={!!errors.serialNo}
                helperText={errors.serialNo}
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
                error={!!errors.description}
                helperText={errors.description}
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
                error={!!errors.madeOf}
                helperText={errors.madeOf}
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
                error={!!errors.shelfNo}
                helperText={errors.shelfNo}
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
                error={!!errors.hallNo}
                helperText={errors.hallNo}
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
                    error={!!errors.particulars?.width}
                    helperText={errors.particulars?.width}
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
                    error={!!errors.particulars?.depth}
                    helperText={errors.particulars?.depth}
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
                    error={!!errors.particulars?.circumference}
                    helperText={errors.particulars?.circumference}
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
                    error={!!errors.particulars?.diameters}
                    helperText={errors.particulars?.diameters}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    fullWidth
                    label="Weight"
                    name="weight"
                    value={formData.particulars.weight}
                    onChange={handleParticularsChange}
                    margin="normal"
                    variant="outlined"
                    error={!!errors.particulars?.weight}
                    helperText={errors.particulars?.weight}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Image Upload Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Upload Images
              </Typography>
              <div
                {...getRootProps({ className: 'dropzone' })}
                style={{ padding: '10px', border: '2px dashed #ccc', borderRadius: '8px', textAlign: 'center', marginBottom: '20px' }}
              >
                <input {...getInputProps()} />
                <Typography variant="body1">Drag & drop some images here, or click to select images</Typography>
              </div>
              <Grid container spacing={2}>
                {formData.images.map((file, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`uploaded-img-${index}`}
                      style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Audio Recording Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Record Audio
              </Typography>
              <VoiceRecording audio={formData.audio} onAudioStop={handleAudioStop} onAudioSave={handleAudioSave} />
            </Grid>
          </Grid>
        </DialogContent>
        {loading && <LinearProgress />} {/* Show Progress Bar when loading */}

        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={loading} // Disable Save button while loading
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
}
