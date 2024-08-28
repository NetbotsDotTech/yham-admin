import React from 'react';
import { Grid, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ images, onImageRemove, onImageUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: onImageUpload
  });

  return (
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
        {images.map((file, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden', borderRadius: '8px', marginBottom: '10px' }}>
              <img src={file} alt={`uploaded-img-${index}`} style={{ width: 'auto', height: '100%', objectFit: 'cover' }} />
              <IconButton onClick={() => onImageRemove(index)} style={{ position: 'absolute', top: 8, right: 8, backgroundColor: '#fff' }}>
                <CloseIcon />
              </IconButton>
            </div>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ImageUpload;
