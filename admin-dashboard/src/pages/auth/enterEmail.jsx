/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EnterEmail = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
       await axios.post('http://localhost:5000/api/otp/send', 
        { email }, 
        { headers: { 'Content-Type': 'application/json' } }
      );
      navigate('/verify-otp'); // Navigate to OTP verification page
    } catch (error) {
      console.error('Error sending OTP:', error.response.data.message);
      alert('Failed to send OTP. Please try again.');
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
            Enter Your Email
          </Typography>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSendOtp}
            sx={{ mt: 2 }}
          >
            Send OTP
          </Button>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2 }}
          >
            Remembered your password? <a href="/login">Login</a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EnterEmail;
