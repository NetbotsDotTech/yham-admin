/* eslint-disable prettier/prettier */
// AddMediaModal Component
import React, { useState } from 'react';
import {
  Modal, Box, Typography, TextField, FormControl, InputLabel, Select,
  MenuItem, List, ListItem, ListItemText, ListItemSecondaryAction,
  IconButton, Button, CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import axios from 'axios';
import BASE_URL from '../baseUrl';

const AddMediaModal = ({ open, handleClose, onMediaAdd }) => {
  const [newMedia, setNewMedia] = useState({
    fileType: '', 
    caption: '',
    description: '',
    files: [] // Ensure initial value is always an array
  });
  const [uploading, setUploading] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 500,
    maxHeight: '80vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    p: 4,
    boxShadow: 24,
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const firstFileType = selectedFiles[0]?.type.split('/')[0];
    const isValid = selectedFiles.every(file => file.type.split('/')[0] === firstFileType);

    if (!isValid || (newMedia.files.length > 0 && newMedia.files[0].type.split('/')[0] !== firstFileType)) {
      toast.error('Please select only one type of media at a time.', {
        onClose: handleClose, // Close the modal when the toast closes
      });
      return;
    }

    setNewMedia(prevState => ({
      ...prevState,
      files: [...prevState.files, ...selectedFiles] // Always add new files to the array
    }));
  };

  const handleRemoveFile = (fileToRemove) => {
    setNewMedia(prevState => ({
      ...prevState,
      files: prevState.files.filter(file => file !== fileToRemove) // Ensure files array remains consistent
    }));
  };

  const resetForm = () => {
    setNewMedia({
      fileType: '', 
      caption: '',
      description: '',
      files: [] // Reset files to an empty array
    });
  };

  const handleSubmit = async () => {
    // Ensure `files` is an array before starting upload
    if (!Array.isArray(newMedia.files)) {
      console.error("newMedia.files is not an array", newMedia.files);
      return;
    }

    const formData = new FormData();
    formData.append('fileType', newMedia.fileType);
    formData.append('caption', newMedia.caption);
    formData.append('description', newMedia.description);

    newMedia.files.forEach(file => {
      formData.append(newMedia.fileType === 'image' ? 'images' :
                      newMedia.fileType === 'video' ? 'video' :
                      newMedia.fileType === 'audio' ? 'audio' :
                      'pdf', // default to pdf
                      file);
    });

    try {
      setUploading(true);

      const response = await axios.post(`${BASE_URL}/api/media/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success("Successfully added media!", {
        onClose: () => {
          handleClose(); // Close modal when the success toast closes
          resetForm();   // Clear the form state
        },
      });
      console.log("response.data", response.data);
      onMediaAdd(response.data);  // Pass the newly added media to the parent component
    } catch (error) {
      console.error("Error", error.message);
      toast.error('Failed to upload media.', {
        onClose: handleClose, // Close modal on error as well
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {/* Close button at the top-right corner */}
          <IconButton 
            onClick={handleClose} 
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6">Add New Media</Typography>

          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="media-type-label">Media Type</InputLabel>
            <Select
              labelId="media-type-label"
              value={newMedia.fileType}
              onChange={(e) => {
                setNewMedia({
                  ...newMedia,
                  fileType: e.target.value,
                  files: [] // Reset files when media type changes
                });
              }}
              label="Media Type"
              disabled={uploading}
            >
              <MenuItem value="image">Image</MenuItem>
              <MenuItem value="video">Video</MenuItem>
              <MenuItem value="audio">Audio</MenuItem>
              <MenuItem value="pdf">PDF</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Caption (optional)"
            fullWidth
            variant="outlined"
            value={newMedia.caption}
            onChange={(e) => setNewMedia({ ...newMedia, caption: e.target.value })}
            sx={{ mb: 2 }}
            disabled={uploading}
          />
          <TextField
            label="Description (optional)"
            fullWidth
            variant="outlined"
            multiline
            rows={2}
            value={newMedia.description}
            onChange={(e) => setNewMedia({ ...newMedia, description: e.target.value })}
            sx={{ mb: 2 }}
            disabled={uploading}
          />

          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mb: 2 }}
            disabled={!newMedia.fileType || uploading}
          >
            {uploading ? <CircularProgress size={24} /> : `Upload ${newMedia.fileType}`}
            <input
              type="file"
              hidden
              multiple
              accept={newMedia.fileType === 'image' ? 'image/*' :
                      newMedia.fileType === 'video' ? 'video/*' :
                      newMedia.fileType === 'audio' ? 'audio/*' :
                      newMedia.fileType === 'pdf' ? 'application/pdf' : '*/*'}
              onChange={handleFileChange}
            />
          </Button>

          <List>
            {newMedia.files.map((file, index) => (
              <ListItem key={index}>
                <ListItemText primary={file.name} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(file)} disabled={uploading}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            disabled={newMedia.files.length === 0 || uploading}
            sx={{ mt: 2 }}
          >
            {uploading ? <CircularProgress size={24} /> : 'Submit Media'}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddMediaModal;
