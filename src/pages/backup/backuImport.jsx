/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Typography, Button, Modal, LinearProgress, Fade,
} from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../baseUrl';

const BackupPage = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // State for progress
  const [openProgressModal, setOpenProgressModal] = useState(false); // State for progress modal

  // Function to handle backup download
  const handleBackupDownload = async () => {
    try {
      setLoading(true);
      setProgress(0); // Reset progress
      setOpenProgressModal(true); // Open progress modal

      const response = await axios.get(`${BASE_URL}/api/backup/export`, {
        responseType: 'blob', // Expecting a blob response
        onDownloadProgress: (progressEvent) => {
          const total = progressEvent.total;
          const current = progressEvent.loaded;
          const percentCompleted = Math.round((current * 100) / total);
          setProgress(percentCompleted); // Update progress
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'artifact_backup.zip'); // Name of the downloaded file
      document.body.appendChild(link);
      link.click();

      // Show success toast
      toast.success('Backup downloaded successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    } catch (error) {
      console.error(error);

      // Show error toast
      toast.error('Failed to download backup. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
      setProgress(0); // Reset progress after download
      setOpenProgressModal(false); // Close progress modal
    }
  };

  // Effect to simulate progress updates
  useEffect(() => {
    if (openProgressModal) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0; // Reset progress if it reaches 100
          }
          const diff = Math.random() * 10; // Simulating progress update
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }
  }, [openProgressModal]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Backup
      </Typography>

      {/* Backup Section */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Backup Data
          </Typography>
          <Typography variant="body1" gutterBottom>
            Download a complete backup of all artifact data and media files.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackupDownload}
            disabled={loading}
            sx={{ mb: 2 }}
          >
            {loading ? 'Processing...' : 'Download Complete Backup'}
          </Button>
        </Grid>
      </Grid>

      {/* Progress Modal */}
      <Modal
        open={openProgressModal}
        onClose={() => {}} // Prevent closing the modal by clicking outside
        aria-labelledby="progress-modal-title"
        aria-describedby="progress-modal-description"
        closeAfterTransition
      >
        <Fade in={openProgressModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600, // Increased width for larger dialog
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
          }}>
            <Typography id="progress-modal-title" variant="h4" gutterBottom>
              Downloading Backup...
            </Typography>
            <Typography id="progress-modal-description" variant="h6" gutterBottom>
              This may take some time to retrieve all the data. Please be patient and do not close or refresh the page.
            </Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ mt: 2 }} />
          </Box>
        </Fade>
      </Modal>

      {/* Toast Container */}
      <ToastContainer />
    </Box>
  );
};

export default BackupPage;
