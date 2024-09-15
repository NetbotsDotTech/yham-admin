/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    try {
      await axios.post('http://localhost:5000/api/otp/verify', { otp });
      navigate('/update-password'); // Navigate to password update page
    } catch (error) {
      console.error('Error verifying OTP:', error.response.data.message);
      alert('Invalid or expired OTP. Please try again.');
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
            Verify OTP
          </Typography>
          <TextField
            fullWidth
            label="Enter OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            margin="normal"
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleVerifyOtp}
            sx={{ mt: 2 }}
          >
            Verify OTP
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VerifyOtp;
