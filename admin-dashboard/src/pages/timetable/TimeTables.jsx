/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const TimeTables = () => {
  const [timetables, setTimetables] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [note, setNote] = useState('');
  const [editId, setEditId] = useState(null); // To track which timetable is being edited
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch timetables when the component mounts
  useEffect(() => {
    fetchTimeTables();
  }, []);

  const fetchTimeTables = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/time-table');
      setTimetables(response.data);
    } catch (error) {
      console.error('Error fetching timetables:', error);
    }
  };

  const handleEditClick = (timetable) => {
    setEditId(timetable._id);
    setSelectedDay(timetable.day);
    setStartTime(timetable.openingTime);
    setEndTime(timetable.closingTime);
    setNote(timetable.note || ''); // Add support for note field
    setShowEditModal(true);
    setErrorMessage(''); // Clear error message when opening the modal
  };

  const handleSave = async () => {
    // Basic validation
    if (!selectedDay || !startTime || !endTime) {
      setErrorMessage('Day, Start Time, and End Time are required.');
      return;
    }

    const payload = {
      day: selectedDay,
      openingTime: startTime,
      closingTime: endTime,
      note,
    };

    try {
      // Since both create and update are handled by the same endpoint, no need to check for `editId`
      const response = await axios.post('http://localhost:5000/api/time-table/', payload);

      // After saving, fetch the latest timetables and close the modal
      fetchTimeTables();
      setShowEditModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving timetable:', error.response?.data || error.message);
    }
  };

  const resetForm = () => {
    setSelectedDay('');
    setStartTime('');
    setEndTime('');
    setNote('');
    setEditId(null);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    resetForm();
  };

  return (
    <div>
      <h1>Timetable Management</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Opening Time</TableCell>
              <TableCell>Closing Time</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timetables.map((timetable) => (
              <TableRow key={timetable._id}>
                <TableCell>{timetable.day}</TableCell>
                <TableCell>{timetable.openingTime}</TableCell>
                <TableCell>{timetable.closingTime}</TableCell>
                <TableCell>{timetable.note || '-'}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleEditClick(timetable)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog (Modal) */}
      <Dialog open={showEditModal} onClose={handleCloseModal}>
        <DialogTitle>{editId ? 'Edit Timetable' : 'Add New Timetable'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Day"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            type="time"
            label="Opening Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            type="time"
            label="Closing Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            margin="normal"
          />

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TimeTables;
