/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    if (password === confirmPassword) {
      try {
        await axios.post('http://localhost:5000/api/otp/update-password', { email: 'user@example.com', newPassword: password });
        navigate('/login'); // Navigate to login page
      } catch (error) {
        console.error('Error updating password:', error.response.data.message);
        alert('Failed to update password. Please try again.');
      }
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: '#f5f5f5'
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
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleUpdatePassword}
            sx={{ mt: 2 }}
          >
            Update Password
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UpdatePassword;
