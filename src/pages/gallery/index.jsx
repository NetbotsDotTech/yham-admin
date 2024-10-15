/* eslint-disable prettier/prettier */
import React, { useState, } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Button,
  
} from '@mui/material';
import { ToastContainer} from 'react-toastify';

import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddIcon from '@mui/icons-material/Add';
import MediaDisplay from './mediaDisplay'; // Media Display Component
import AddMediaModal from './addMedia'; // Import the modal component

const mediaOptions = [
  {
    title: 'Videos',
    icon: <VideoLibraryIcon fontSize="large" />,
    category: 'video',
  },
  {
    title: 'Audios',
    icon: <MusicNoteIcon fontSize="large" />,
    category: 'audio',
  },
  {
    title: 'Images',
    icon: <ImageIcon fontSize="large" />,
    category: 'image',
  },
  {
    title: 'PDFs',
    icon: <PictureAsPdfIcon fontSize="large" />,
    category: 'pdf',
  },
];

const MediaGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility

  const fetchMediaByCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('YOUR_API_ENDPOINT'); // Replace with your actual API endpoint
      setMediaFiles(response.data); // Assuming the API returns a list of media objects
    } catch (err) {
      setError('Error fetching media.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (category) => {
    setSelectedCategory(category);
    fetchMediaByCategory(category); // Fetch media by the clicked category
  };

  const handleAddMedia = () => {
    setModalOpen(true); // Open the modal when the Add Media button is clicked
  };

  const handleModalClose = () => {
    setModalOpen(false); // Close the modal when user closes it
  };

  const handleMediaAdd = (newMedia) => {
    // Handle the newly added media
    setMediaFiles([...mediaFiles, ...newMedia.files]); // Add new media files to the existing list
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddMedia}
        sx={{ mb: 4 }}
      >
        Add Media
      </Button>

      <Grid container spacing={2}>
        {mediaOptions.map((option, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(option.category)}>
                <CardContent>
                  {option.icon}
                  <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                    {option.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Media Display */}
      {selectedCategory && (
        <MediaDisplay
          mediaFiles={mediaFiles}
          loading={loading}
          error={error}
          category={selectedCategory}
        />
      )}

      {/* Add Media Modal */}
      <AddMediaModal
        open={modalOpen}
        handleClose={handleModalClose}
        onMediaAdd={handleMediaAdd} // Pass the media add handler
      />
      <ToastContainer/>
    </Container>
  );
};

export default MediaGallery;
