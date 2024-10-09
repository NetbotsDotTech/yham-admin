/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Link, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import VersionDisplay from "./VersionDisplay";
import BASE_URL from '../baseUrl';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${BASE_URL}/api/user/login`, { email, password }, { withCredentials: true });
      console.log('Login response:', response.data);
      // Store user details in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));

      toast.success('Login successful! Redirecting to dashboard...');
    
        navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error.response?.data?.message || error.message);
      // Show error notification
      toast.error('Invalid email or password. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" p={2}>
      <Card sx={{ width: { xs: '100%', sm: '400px' } }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Login to YHAM Dashboard
          </Typography>

          <Box component="form" noValidate autoComplete="off" mt={2} display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
                disabled={loading} // Disable while loading
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </Button>
            </Box>
          </Box>

          <Box mt={2} textAlign="center">
            <Link href="/forgot-password" variant="body2" underline="none">
              Forgot Password?
            </Link>
          </Box>
        </CardContent>
      </Card>
      <VersionDisplay />
      <ToastContainer /> {/* Add ToastContainer here */}
    </Box>
  );
};

export default Login;
