/* eslint-disable prettier/prettier */
import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, Grid, Button, Divider } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';

// Dummy user data (replace this with props or API data in production)
const user = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '********', // For security, we display it as hidden or masked
  role: 'Admin',
};

const UserComponent = () => {
  return (
    <Box
      sx={{
        p: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: '100%',
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                bgcolor: '#1976d2',
                width: 80,
                height: 80,
                mb: 2,
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {user.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {user.role}
            </Typography>
          </Box>

          <Divider />

          {/* User Details */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <AccountCircleIcon sx={{ color: 'text.secondary', mr: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  Name
                </Typography>
              </Box>
              <Typography variant="h6">{user.name}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <EmailIcon sx={{ color: 'text.secondary', mr: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  Email
                </Typography>
              </Box>
              <Typography variant="h6">{user.email}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <LockIcon sx={{ color: 'text.secondary', mr: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  Password
                </Typography>
              </Box>
              <Typography variant="h6">{user.password}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <WorkIcon sx={{ color: 'text.secondary', mr: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  Role
                </Typography>
              </Box>
              <Typography variant="h6">{user.role}</Typography>
            </Grid>
          </Grid>

          {/* Actions */}
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <Button variant="contained" color="primary">
              Edit Profile
            </Button>
            <Button variant="outlined" color="secondary">
              Change Password
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserComponent;
