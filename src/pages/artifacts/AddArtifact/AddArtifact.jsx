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
  LinearProgress,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { Close as CloseIcon, PhotoCamera, Upload as UploadIcon } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ImageUpload from './ImageUpload';
import VoiceRecording from './VoiceRecording';
import BASE_URL from "../../baseUrl"
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
    purchasePrice: '',
    salePrice: '',
    source: '',
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
    tempErrors.purchasePrice = formData.purchasePrice ? '' : 'Purchase Price is required.';
    tempErrors.salePrice = formData.salePrice ? '' : 'Sale Price is required.';
    tempErrors.source = formData.source ? '' : 'Source is required.';
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

  const handleImageUpload = (uploadedImages) => {
    setFormData((prevData) => ({
      ...prevData,
      images: uploadedImages
    }));
  };

  const handleImageRemove = (index) => {
    setFormData((prevData) => {
      const updatedImages = [...prevData.images];
      updatedImages.splice(index, 1);
      return { ...prevData, images: updatedImages };
    });
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

  const handleAudioUpload = (uploadedAudio) => {
    setFormData((prevData) => ({
      ...prevData,
      audio: uploadedAudio
    }));
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error('Please fix the errors in the form.',{
        onClose: () => {
          toast.dismiss();
        },
      });
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
          let imageName = image.name || `image-${Date.now()}.png`;
          if (!imageName.includes('.')) {
            imageName += '.png'; // Default to png if no extension found
          }
          formDataToSend.append('images', image, imageName);
        });
      } else if (key === 'audio' && formData.audio) {
        let audioName = formData.audio.name || `recording-${Date.now()}.aac`;
        if (!audioName.includes('.')) {
          audioName += '.aac'; // Default to AAC if no extension found
        }
        formDataToSend.append('audio', formData.audio, audioName);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      console.log("formDataToSend", formDataToSend)
      await axios.post(`${BASE_URL}/api/artifacts`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Artifact added successfully!',{
        onClose: () => {
          toast.dismiss();
        },
      });
      handleClose();
      // Reset form after successful submission
      setFormData({
        name: '',
        itemNo: '',
        serialNo: '',
        description: '',
        madeOf: '',
        age: '',
        shelfNo: '',
        hallNo: '',
        purchasePrice: '',
        salePrice: '',
        source: '',
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
      setErrors({});
    } catch (error) {
      toast.error('Failed to add artifact. Please try again.',{
        onClose: () => {
          toast.dismiss();
        },
      });
    } finally {
      setLoading(false);
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
            maxHeight: 'none',
            margin: '20px' // Add margin around the modal
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h6">Add New Artifact</Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
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

            {/* Fourth Row - New Fields */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Purchase Price"
                name="purchasePrice"
                type="number"
                value={formData.purchasePrice}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                error={!!errors.purchasePrice}
                helperText={errors.purchasePrice}
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Sale Price"
                name="salePrice"
                type="number"
                value={formData.salePrice}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                error={!!errors.salePrice}
                helperText={errors.salePrice}
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Source"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                error={!!errors.source}
                helperText={errors.source}
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
                    type="number"
                    inputProps={{ min: 0 }}
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
                    type="number"
                    inputProps={{ min: 0 }}
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
                    type="number"
                    inputProps={{ min: 0 }}
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
                    type="number"
                    inputProps={{ min: 0 }}
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
                    type="number"
                    inputProps={{ min: 0 }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Image Upload Section */}
            <ImageUpload images={formData.images} onImageUpload={handleImageUpload} onImageRemove={handleImageRemove} />

            {/* Audio Recording Section */}
            <VoiceRecording
              audio={formData.audio}
              onAudioStop={handleAudioStop}
              onAudioSave={handleAudioSave}
              onAudioUpload={handleAudioUpload}
            />
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
