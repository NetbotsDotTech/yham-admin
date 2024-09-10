/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Box, Grid, Typography, IconButton, Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const ViewStockModal = ({ open, handleClose, stock }) => {
  const safeStock = stock || {}; // Fallback in case stock is not provided

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth sx={{ '& .MuiPaper-root': { borderRadius: '10px' } }}>
      <DialogTitle sx={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #ccc' }}>
        <Typography variant="h6" sx={{ color: 'black' }}>
          View Stock Details
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
                {['stockName', 'stockId', 'quantity', 'description', 'location', 'category', 'supplier', 'dateAdded'].map((field) => (
                  <Typography key={field} variant="body1" sx={{ color: 'black', mb: 1 }}>
                    <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {safeStock[field] || 'N/A'}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" sx={{ color: 'black', mb: 2 }}>
                Additional Info:
              </Typography>
              <Box>
                {['batchNumber', 'expiryDate', 'costPrice', 'sellingPrice'].map((field) => (
                  <Typography key={field} variant="body1" sx={{ color: 'black', mb: 1 }}>
                    <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {safeStock[field] || 'N/A'}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h6" sx={{ color: 'black' }}>
            Loading stock details...
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewStockModal;
