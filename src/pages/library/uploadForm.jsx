/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  IconButton
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import BASE_URL from '../baseUrl';

const AddBookModal = ({ open, onClose }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [year, setYear] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [description, setDescription] = useState(''); // Optional description

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form validation
    if (!title || !author || !category || !file || !year) {
      setError('All fields are required');
      return;
    }
    
    if (isNaN(year) || year <= 0) {
      setError('Year must be a valid positive number');
      return;
    }

    setError('');
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('category', category);
    formData.append('year', year); // Include year
    formData.append('file', file);
    formData.append('description', description); // Include description if needed

    try {
      const response = await axios.post(`${BASE_URL}/api/book/`, formData, {
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total;
          const current = progressEvent.loaded;
          const percentCompleted = Math.round((current * 100) / total);
          setProgress(percentCompleted);
        },
      });

      toast.success('Book uploaded successfully!');
      console.log("Response", response.data);
      onClose();
    } catch (err) {
      setError('Upload failed. Please try again.');
      toast.error('Upload failed. Please try again.');
      console.error('Error response:', err.response ? err.response.data : err.message);
    } finally {
      setUploading(false);
      setProgress(0);
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setCategory('');
    setYear('');
    setFile(null);
    setDescription(''); // Reset description
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Add New Book
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Author"
            fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <MenuItem value=""><em>Select Category</em></MenuItem>
              <MenuItem value="Manuscripts">Manuscripts</MenuItem>
              <MenuItem value="Historic writings">Historic writings</MenuItem>
              <MenuItem value="Books about Baltistan">Books about Baltistan</MenuItem>
              <MenuItem value="Old books">Old books</MenuItem>
              <MenuItem value="Written interview records/notes">Written interview records/notes</MenuItem>
              <MenuItem value="Photographs">Photographs</MenuItem>
              <MenuItem value="Recorded Folk Songs">Recorded Folk Songs</MenuItem>
              <MenuItem value="Recorded Folk Tales">Recorded Folk Tales</MenuItem>
              <MenuItem value="Recorded Balti Hareeb">Recorded Balti Hareeb</MenuItem>
              <MenuItem value="Recorded Balti rtse kaar">Recorded Balti rtse kaar</MenuItem>
              <MenuItem value="Recorded Interviews">Recorded Interviews</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Year"
            fullWidth
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            sx={{ mb: 2 }}
            required
          />

          <TextField
            label="Description" // Optional field
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mb: 2 }}
          >
            Upload File
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp3,.mp4" // Specify accepted file types
            />
          </Button>

          {file && (
            <>
              <Typography sx={{ mb: 2 }}>{file.name}</Typography>
              <List>
                <IconButton edge="end" aria-label="delete" onClick={handleRemoveFile} disabled={uploading}>
                  <DeleteIcon />
                </IconButton>
              </List>
            </>
          )}

          {uploading && <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />}

          <Button variant="contained" type="submit" disabled={uploading}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default AddBookModal;
