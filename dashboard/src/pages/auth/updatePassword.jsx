/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, CircularProgress, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate();

  const isValidPassword = (password) => {
    // Minimum 6 characters, at least one uppercase, one lowercase, one number, and one special character
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordCriteria.test(password);
  };

  const handleUpdatePassword = async () => {
    setError(''); // Clear previous errors

    if (!isValidPassword(password)) {
      setError('Password must be at least 6 characters long, including uppercase, lowercase, number, and special character.');
      toast.error('Password must be at least 6 characters long, including uppercase, lowercase, number, and special character.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      toast.error('Passwords do not match!');
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post('http://localhost:5000/api/otp/update-password', { newPassword: password }, { withCredentials: true });
      
      toast.success('Password updated successfully!');
      navigate('/login'); // Navigate to login page after success
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Error updating password:', errorMessage);
      toast.error(`Failed to update password: ${errorMessage}`);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Update Password
          </Typography>
          <TextField
            fullWidth
            type="password"
            label="New Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            error={!!error} // Show error styling if error exists
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
            error={!!error} // Show error styling if error exists
          />
          {error && <FormHelperText error>{error}</FormHelperText>} {/* Display error message */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleUpdatePassword}
            disabled={loading} // Disable while loading
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Password'}
          </Button>
        </CardContent>
      </Card>

      {/* Toast Container to show notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </Box>
  );
};

export default UpdatePassword;
