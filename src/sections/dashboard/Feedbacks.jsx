/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import Tabs from '@mui/material/Tabs';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';

// material-ui icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import StarIcon from '@mui/icons-material/Star';

// project-imports
import MainCard from 'components/MainCard';

// Mock feedback data with Pakistani names and ancient artifact names
const initialFeedbackData = [
  {
    user: 'Ahmed Khan',
    artifact: 'Harrapan Pottery',
    rating: 4.5,
    comment: 'Great work, needs a few changes.',
    status: 'pending',
    date: '2023-09-21' // Date field added for sorting
  },
  {
    user: 'Fatima Ali',
    artifact: 'Mohenjo-daro Tablet',
    rating: 5,
    comment: 'Excellent preservation, ready to publish.',
    status: 'approved',
    date: '2023-09-19'
  },
  {
    user: 'Ayesha Noor',
    artifact: 'Taxila Statue',
    rating: 4,
    comment: 'Good structure, but might need some revisions.',
    status: 'published',
    date: '2023-09-15'
  },
  { user: 'Usman Javed', artifact: 'Gandhara Sculpture', rating: 3.5, comment: 'Missing some key points.', status: 'blocked', date: '2023-09-17' },
  { user: 'Zara Iqbal', artifact: 'Indus Seal', rating: 5, comment: 'Amazing work! Will promote it.', status: 'promoted', date: '2023-09-18' },
  { user: 'Hamza Tariq', artifact: 'Bhir Mound Coin', rating: 4, comment: 'Unique design, but needs some polishing.', status: 'pending', date: '2023-09-20' },
  { user: 'Saad Malik', artifact: 'Kushan Empire Sword', rating: 4.7, comment: 'Impressive craftsmanship.', status: 'approved', date: '2023-09-13' },
  { user: 'Mariam Shah', artifact: 'Ancient Sindh Necklace', rating: 3.8, comment: 'Could use better detailing.', status: 'published', date: '2023-09-12' },
  { user: 'Bilal Ahmed', artifact: 'Gandhara Buddha', rating: 4.2, comment: 'A well-preserved statue with intricate detail.', status: 'approved', date: '2023-09-14' },
  { user: 'Sadia Farooq', artifact: 'Sphinx of Balochistan', rating: 3.9, comment: 'The details are a bit worn out, but still fascinating.', status: 'blocked', date: '2023-09-19' },
  { user: 'Ali Raza', artifact: 'Mehrgarh Jewelry', rating: 4.6, comment: 'Beautiful craftsmanship, ready for display.', status: 'published', date: '2023-09-11' },
  { user: 'Sara Jamil', artifact: 'Kalash Valley Artifacts', rating: 4.8, comment: 'A magnificent collection.', status: 'approved', date: '2023-09-10' },
  { user: 'Omar Khan', artifact: 'Makran Tablet', rating: 3.5, comment: 'Needs more research on the origin.', status: 'pending', date: '2023-09-13' },
  { user: 'Rabia Siddiqui', artifact: 'Buddhist Stupa of Swat', rating: 5, comment: 'Absolutely stunning.', status: 'promoted', date: '2023-09-09' },
  
  { user: 'Usman Javed', artifact: 'Gandhara Sculpture', rating: 3.5, comment: 'Missing some key points.', status: 'blocked', date: '2023-09-17' },
  { user: 'Zara Iqbal', artifact: 'Indus Seal', rating: 5, comment: 'Amazing work! Will promote it.', status: 'promoted', date: '2023-09-18' },
  { user: 'Hamza Tariq', artifact: 'Bhir Mound Coin', rating: 4, comment: 'Unique design, but needs some polishing.', status: 'pending', date: '2023-09-20' },
  { user: 'Saad Malik', artifact: 'Kushan Empire Sword', rating: 4.7, comment: 'Impressive craftsmanship.', status: 'approved', date: '2023-08-13' },
  { user: 'Mariam Shah', artifact: 'Ancient Sindh Necklace', rating: 3.8, comment: 'Could use better detailing.', status: 'published', date: '2023-10-12' },
  { user: 'Bilal Ahmed', artifact: 'Gandhara Buddha', rating: 4.2, comment: 'A well-preserved statue with intricate detail.', status: 'approved', date: '2023-09-14' },
  { user: 'Sadia Farooq', artifact: 'Sphinx of Balochistan', rating: 3.9, comment: 'The details are a bit worn out, but still fascinating.', status: 'blocked', date: '2023-09-19' },
 { user: 'Hassan Qureshi', artifact: 'Rani Kot Fort Ruins', rating: 4, comment: 'Interesting architecture but needs restoration.', status: 'pending', date: '2023-09-09' }
];

// Map statuses to icons and colors
const statusMap = {
  pending: { icon: <PendingActionsIcon color="warning" />, label: 'Pending' },
  approved: { icon: <CheckCircleIcon color="success" />, label: 'Approved' },
  published: { icon: <CheckCircleIcon color="primary" />, label: 'Published' },
  blocked: { icon: <BlockIcon color="error" />, label: 'Blocked' },
  promoted: { icon: <StarIcon color="secondary" />, label: 'Promoted' }
};

// ==============================|| TAB PANEL ||============================== //

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// ==============================|| DATA WIDGET - FEEDBACKS ||============================== //

export default function Feedbacks() {
  const [value, setValue] = useState(0);
  const [feedbackData, setFeedbackData] = useState(initialFeedbackData);
  const [currentPage, setCurrentPage] = useState(1);

  // Sort the feedbacks by date, newest first
  const sortedFeedbackData = feedbackData.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Pagination variables
  const feedbacksPerPage = 3;
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCurrentPage(1); // Reset to page 1 when switching tabs
  };

  const handleStatusChange = (event, idx) => {
    const updatedFeedback = [...feedbackData];
    updatedFeedback[idx].status = event.target.value;
    setFeedbackData(updatedFeedback);
  };

  return (
    <MainCard content={false}>
      <Box sx={{ p: 3, pb: 1 }}>
        <Typography variant="h5">Feedbacks</Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="feedback tabs" sx={{ px: 3 }}>
            <Tab label="Pending" {...a11yProps(0)} />
            <Tab label="Approved" {...a11yProps(1)} />
            <Tab label="Published" {...a11yProps(2)} />
            <Tab label="Blocked" {...a11yProps(3)} />
            <Tab label="Promoted" {...a11yProps(4)} />
          </Tabs>
        </Box>

        {Object.keys(statusMap).map((status, index) => (
          <TabPanel key={status} value={value} index={index}>
            <List disablePadding sx={{ '& .MuiListItem-root': { px: 3, py: 1.5 } }}>
              {sortedFeedbackData
                .filter((feedback) => feedback.status === status)
                .slice((currentPage - 1) * feedbacksPerPage, currentPage * feedbacksPerPage)
                .map((feedback, idx) => (
                  <ListItem key={idx} divider>
                    <ListItemAvatar>
                      <Avatar>{feedback.user[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" sx={{ display: 'block', mb: 1 }}>
                          {feedback.user}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Artifact:</strong> {feedback.artifact} | <strong>Rating:</strong> {feedback.rating}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                            <strong>Comment:</strong> {feedback.comment}
                          </Typography>
                          {/* Display status with updated icon and color */}
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                            {statusMap[feedback.status].icon}
                            <Typography color={statusMap[feedback.status].icon.props.color}>
                              {statusMap[feedback.status].label}
                            </Typography>
                          </Stack>
                        </>
                      }
                    />
                    <Stack spacing={0.25} alignItems="flex-end">
                      <FormControl variant="outlined" size="small">
                        <Select
                          value={feedback.status}
                          onChange={(event) => handleStatusChange(event, idx)}
                          displayEmpty
                          inputProps={{ 'aria-label': 'Select Status' }}
                        >
                          {Object.keys(statusMap).map((statusKey) => (
                            <MenuItem key={statusKey} value={statusKey}>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                {statusMap[statusKey].icon}
                                <Typography color={statusMap[statusKey].icon.props.color}>
                                  {statusMap[statusKey].label}
                                </Typography>
                              </Stack>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Stack>
                  </ListItem>
                ))}
            </List>

            {/* Pagination Component */}
            <Stack alignItems="center" sx={{ mt: 2 }}>
              <Pagination
                count={Math.ceil(
                  feedbackData.filter((feedback) => feedback.status === status).length / feedbacksPerPage
                )}
                page={currentPage}
                onChange={handlePageChange}
              />
            </Stack>
          </TabPanel>
        ))}
      </Box>
    </MainCard>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};
