/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; 
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import CardContent from '@mui/material/CardContent';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import { useTheme } from '@mui/material/styles'; // Import useTheme
import { Profile, Logout, Edit } from 'iconsax-react';
import avatar1 from 'assets/images/users/avatar-6.png';

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function ProfilePage() {
  const theme = useTheme(); // Now it will work
  const navigate = useNavigate();

  // Retrieve user details from localStorage
  const [userDetails, setUserDetails] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : { name: 'User', role: 'Guest' };
  });

  const handleLogout = () => {
    // Perform logout action: clear localStorage and remove cookies
    localStorage.removeItem('user');
    Cookies.remove('token');
    
    // Navigate back to login page
    navigate('/login');
  };

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2
          }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar alt="profile user" src={avatar1} />
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: 290,
                minWidth: 240,
                maxWidth: 290,
                borderRadius: 1.5
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard sx={{ border: 'none' }} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack direction="row" spacing={1.25} alignItems="center">
                          <Avatar alt="profile user" src={avatar1} />
                          <Stack>
                            <Typography variant="subtitle1">{userDetails.name}</Typography>
                            <Typography variant="body2" color="secondary">{userDetails.role}</Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>

                    <Stack spacing={2} mt={2}>
                      <ButtonBase
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          p: 1,
                          borderRadius: 1,
                          '&:hover': { bgcolor: 'secondary.lighter' }
                        }}
                      >
                        <Profile size={18} />
                        <Typography variant="body2">View Profile</Typography>
                      </ButtonBase>

                      <ButtonBase
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          p: 1,
                          borderRadius: 1,
                          '&:hover': { bgcolor: 'secondary.lighter' }
                        }}
                      >
                        <Edit size={18} />
                        <Typography variant="body2">Edit Profile</Typography>
                      </ButtonBase>

                      <ButtonBase
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          p: 1,
                          borderRadius: 1,
                          '&:hover': { bgcolor: 'secondary.lighter' }
                        }}
                        onClick={handleLogout}
                      >
                        <Logout size={18} />
                        <Typography variant="body2" color="error">Logout</Typography>
                      </ButtonBase>
                    </Stack>
                  </CardContent>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}

ProfilePage.propTypes = {
  userName: PropTypes.string,
  token: PropTypes.string
};
