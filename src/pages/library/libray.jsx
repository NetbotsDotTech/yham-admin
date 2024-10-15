/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  LinearProgress,
  List,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookUploadForm = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !author || !category || !file) {
      setError('All fields are required');
      return;
    }

    setError('');
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('category', category);
    formData.append('file', file);

    try {
      // Simulating a file upload
      const uploadSimulation = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(uploadSimulation);
            return 100;
          }
          return prev + 10; // Simulate progress
        });
      }, 300);

      // Here you would typically handle file upload
      // await yourUploadFunction(formData);

      // Simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Notify success
      toast.success('Book uploaded successfully!');

      // Close modal after upload
      if (onClose) {
        onClose();
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setProgress(0);
      // Reset form
      setTitle('');
      setAuthor('');
      setCategory('');
      setFile(null);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Upload Book
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Book Title"
          variant="outlined"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Author"
          variant="outlined"
          fullWidth
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          sx={{ mb: 2 }}
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
        <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
          Upload File
          <input
            type="file"
            hidden
            accept=".pdf, .rtf, .docx, .jpg, .jpeg, .png, .mp3, .wav, .mp4, .mov, .heic" // Accepting various file formats
            onChange={handleFileChange}
            required
          />
        </Button>
        {file && (
          <div>
            <Typography variant="body1">{file.name}</Typography>
            <List>
            <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(file)} disabled={uploading}>
                    <DeleteIcon />
                  </IconButton>

            </List>
         
          </div>
        )}
        {uploading && <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />}
        <Button type="submit" variant="contained" fullWidth disabled={uploading}>
          {uploading ? 'Uploading...' : 'Submit'}
        </Button>
      </form>
      <ToastContainer />
    </Container>
  );
};

export default BookUploadForm;
