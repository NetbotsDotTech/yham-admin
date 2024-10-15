/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Container, Grid, Button, Card, CardContent, Typography, CardMedia, CircularProgress, Alert } from '@mui/material';

const MediaDisplay = ({ mediaFiles, loading, error, category }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {category.charAt(0).toUpperCase() + category.slice(1)} Gallery
      </Typography>

      <Grid container spacing={2}>
        {mediaFiles.map((file, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card onClick={() => handleMediaClick(file)}>
              {file.type.startsWith('image/') && (
                <CardMedia component="img" height="140" image={file.url} alt={file.name} />
              )}
              {file.type.startsWith('video/') && (
                <CardMedia component="video" height="140" src={file.url} alt={file.name} controls />
              )}
              {file.type.startsWith('audio/') && (
                <CardContent>
                  <Typography variant="subtitle1">{file.name}</Typography>
                  <audio controls src={file.url} />
                </CardContent>
              )}
              {file.type === 'application/pdf' && (
                <CardContent>
                  <Typography variant="subtitle1">{file.name}</Typography>
                  <Button href={file.url} target="_blank" fullWidth>
                    View PDF
                  </Button>
                </CardContent>
              )}
              <CardContent>
                <Typography variant="subtitle1">{file.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Selected Media Details */}
      {selectedMedia && (
        <Container sx={{ mt: 4 }}>
          <Typography variant="h6">Details of {selectedMedia.name}</Typography>
          {/* Add more details as per the file metadata */}
          {selectedMedia.type.startsWith('image/') && <img src={selectedMedia.url} alt={selectedMedia.name} width="100%" />}
          {selectedMedia.type.startsWith('video/') && <video src={selectedMedia.url} controls width="100%" />}
          {selectedMedia.type.startsWith('audio/') && <audio controls src={selectedMedia.url} />}
          {selectedMedia.type === 'application/pdf' && (
            <Button href={selectedMedia.url} target="_blank" fullWidth>
              View PDF
            </Button>
          )}
        </Container>
      )}
    </Container>
  );
};

export default MediaDisplay;
