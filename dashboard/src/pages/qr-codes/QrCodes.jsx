/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  Typography,
  Dialog,
  DialogContent,
  LinearProgress,
} from '@mui/material';
import { SearchNormal, DocumentDownload } from 'iconsax-react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const QRCodeDownloader = () => {
  const [shelfNo, setShelfNo] = useState('');
  const [hallNo, setHallNo] = useState('');
  const [itemNo, setItemNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // New state for progress bar
  const [error, setError] = useState('');
  const [pdfData, setPdfData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const canvasRef = useRef(null);

  const validateInputs = () => {
    const nonEmptyFields = [shelfNo, hallNo, itemNo].filter(Boolean);

    if (nonEmptyFields.length === 0) return true; // Allow empty fields to download all
    if (nonEmptyFields.length > 1) {
      setError('Please enter only one search parameter (Shelf No, Hall No, or Item No).');
      return false;
    }
    return true;
  };

  const handleDownload = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setProgress(0); // Reset progress
    setError('');
    setPdfData(null);
    setOpenDialog(true);

    try {
      const response = await axios.get('http://localhost:5000/api/qr-codes/', {
        params: { shelfNo, hallNo, itemNo },
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable ? progressEvent.total : 100;
          setProgress((progressEvent.loaded / totalLength) * 100);
        }
      });

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        setPdfData(blob);
        setProgress(100); // Mark the progress as complete
      } else {
        setError('No artifacts found.');
      }
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to fetch QR codes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDownloadClick = () => {
    const url = URL.createObjectURL(pdfData);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qr_codes.pdf';
    link.click();
    URL.revokeObjectURL(url); // Clean up after download
    handleCloseDialog(); // Close the modal after download
  };
  

  const renderPDF = async () => {
    if (pdfData && canvasRef.current) {
      const pdf = await pdfjsLib.getDocument(URL.createObjectURL(pdfData)).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.2 });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      page.render(renderContext);
    }
  };

  React.useEffect(() => {
    renderPDF();
  }, [pdfData]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#f0f0f0',
        transform: 'translateY(-5%)',
        maxHeight: '90vh', // Set maximum height to fit view
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '1rem', fontWeight: 'bold', color: '#1976d2' }}>
        Download QR Codes
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: '1rem', textAlign: 'center', color: '#555', fontSize: '0.9rem' }}>
        Search by Shelf No, Hall No, or Item No, or leave all fields empty to download all QR codes.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '500px',
          marginBottom: '1rem'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            width: '100%',
            marginBottom: '1rem'
          }}
        >
          <TextField
            fullWidth
            label="Shelf No"
            value={shelfNo}
            onChange={(e) => setShelfNo(e.target.value)}
            variant="outlined"
            placeholder="Enter shelf number"
            size="small" // Smaller input fields
          />
          <TextField
            fullWidth
            label="Hall No"
            value={hallNo}
            onChange={(e) => setHallNo(e.target.value)}
            variant="outlined"
            placeholder="Enter hall number"
            size="small"
          />
          <TextField
            fullWidth
            label="Item No"
            value={itemNo}
            onChange={(e) => setItemNo(e.target.value)}
            variant="outlined"
            placeholder="Enter item number"
            size="small"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            position: 'relative'
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownload}
            disabled={loading}
            fullWidth
            sx={{
              backgroundColor: '#1976d2',
              fontWeight: 'bold',
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              borderRadius: '8px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: '#1565c0'
              }
            }}
            startIcon={<SearchNormal size="20" />}
          >
            Search QR Codes
          </Button>
        </Box>
      </Box>

      {/* Loading Modal */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <Box sx={{ textAlign: 'center', padding: '1rem' }}>
            <Typography variant="h6">Fetching QR Code PDF...</Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ marginTop: '1rem' }}
            />
            {!loading && pdfData && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleDownloadClick}
                sx={{ marginTop: '1rem' }}
                startIcon={<DocumentDownload />}
              >
                Download QR Code PDF
              </Button>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Render the PDF canvas if available */}
      {pdfData && !loading && (
         <Box
         sx={{
           width: '100%',
           maxWidth: '600px',
           height: '400px',
           overflow: 'auto', // Add scroll for the canvas
           marginTop: '2rem',
           border: '1px solid #ddd',
           backgroundColor: '#fff',
           position: 'relative'
         }}
       >
          <canvas ref={canvasRef} style={{ width: '100%', height: 'auto' }} />
        </Box>
      )}
    </Box>
  );
};

export default QRCodeDownloader;
