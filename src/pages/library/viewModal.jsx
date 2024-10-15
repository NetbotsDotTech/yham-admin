/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
} from '@mui/material';
import PDFViewer from 'pdf-viewer-reactjs';

const ViewBookModal = ({ open, book, onClose }) => {
  if (!book) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          View Book Details
        </Typography>
        <Typography variant="body1">
          <strong>Title:</strong> {book.title}
        </Typography>
        <Typography variant="body1">
          <strong>Author:</strong> {book.author}
        </Typography>
        <Typography variant="body1">
          <strong>Category:</strong> {book.category}
        </Typography>
        <Typography variant="body1">
          <strong>Year:</strong> {book.year}
        </Typography>

        {/* Display PDF file */}
        {book.files.length > 0 && (
          <Box sx={{ overflowY: 'auto', maxHeight: '60vh', mt: 2 }}>
            <PDFViewer
              document={{
                url: book.files[0]?.url,
              }}
              scale={1.0} // Set the scale of the PDF viewer
              css="pdfViewer" // Optional custom CSS class for the viewer
            />
          </Box>
        )}

        <Button onClick={onClose} variant="contained" color="primary" sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%', // Increased width for better visibility
  height: '80%', // Increased height for better visibility
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: '8px',
  overflow: 'hidden', // Prevent overflow issues
};

export default ViewBookModal;
