/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { TextField, Button, Box, CircularProgress, Snackbar, Alert, Typography, Dialog, DialogContent, LinearProgress, IconButton } from '@mui/material';
import { SearchNormal, DocumentDownload } from 'iconsax-react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const QRCodeDownloader = () => {
  const [shelfNo, setShelfNo] = useState('');
  const [hallNo, setHallNo] = useState('');
  const [itemNo, setItemNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pdfData, setPdfData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const canvasRef = useRef(null);

  const validateInputs = () => {
    // Ensure only one query field is set
    const nonEmptyFields = [shelfNo, hallNo, itemNo].filter(Boolean);
    if (nonEmptyFields.length !== 1) {
      setError('Please enter only one query parameter (Shelf No, Hall No, or Item No).');
      return false;
    }
    return true;
  };

  const handleDownload = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setError('');
    setPdfData(null);
    setOpenDialog(true);

    try {
      const response = await axios.get('http://localhost:5000/api/qr-codes/', {
        params: { shelfNo, hallNo, itemNo },
        responseType: 'blob',
      });

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        setPdfData(blob);
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
  };

  const renderPDF = async () => {
    if (pdfData && canvasRef.current) {
      const pdf = await pdfjsLib.getDocument(URL.createObjectURL(pdfData)).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
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
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: '#f0f0f0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '600px',
          marginBottom: '2rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            width: '100%',
            marginBottom: '1rem',
          }}
        >
          <TextField
            fullWidth
            label="Shelf No"
            value={shelfNo}
            onChange={(e) => setShelfNo(e.target.value)}
            variant="outlined"
            placeholder="Enter shelf number"
          />
          <TextField
            fullWidth
            label="Hall No"
            value={hallNo}
            onChange={(e) => setHallNo(e.target.value)}
            variant="outlined"
            placeholder="Enter hall number"
          />
          <TextField
            fullWidth
            label="Item No"
            value={itemNo}
            onChange={(e) => setItemNo(e.target.value)}
            variant="outlined"
            placeholder="Enter item number"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
          }}
        >
          <Button variant="contained" color="primary" onClick={handleDownload} disabled={loading}>
            <SearchNormal size="24" />
          </Button>
        </Box>
      </Box>

      {/* Loading Modal */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <Box sx={{ textAlign: 'center', padding: '1rem' }}>
            <Typography variant="h6">Fetching QR Code PDF...</Typography>
            <LinearProgress sx={{ marginTop: '1rem' }} />
            {loading && (
              <CircularProgress sx={{ marginTop: '1rem' }} />
            )}
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
            marginTop: '2rem',
            border: '1px solid #ddd',
            backgroundColor: '#fff',
          }}
        >
          <canvas ref={canvasRef} style={{ width: '100%', height: 'auto' }} />
        </Box>
      )}
    </Box>
  );
};

export default QRCodeDownloader;
