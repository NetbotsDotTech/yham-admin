/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, Grid, Typography, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer';
import { Upload as UploadIcon, Mic as MicIcon, Stop as StopIcon } from '@mui/icons-material';

const VoiceRecording = ({ audio, onAudioStop, onAudioSave, onAudioUpload }) => {
  const recorderControls = useVoiceVisualizer();
  const [recording, setRecording] = useState(false);
  const [uploadMethod, setUploadMethod] = useState('record'); // 'record' or 'upload'

  const handleStartRecording = () => {
    recorderControls.startRecording();
    setRecording(true);
  };

  const handleStopRecording = () => {
    recorderControls.stopRecording();
    setRecording(false);
    if (recorderControls.recordedBlob) {
      onAudioStop(recorderControls.recordedBlob);
    }
  };

  const handleSave = () => {
    if (recorderControls.recordedBlob) {
      const aacBlob = new Blob([recorderControls.recordedBlob], { type: 'audio/aac' });
      onAudioSave(aacBlob);
    }
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onAudioUpload(file);
    }
  };

  const handleUploadMethodChange = (event, newMethod) => {
    if (newMethod !== null) {
      setUploadMethod(newMethod);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      // Move focus to the next field
    } else if (event.key === 'ArrowLeft') {
      // Move focus to the previous field
    } else if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      handleSave(); // Save action
    } else if (event.key === 'Escape') {
      // Cancel action
      // Implement cancel logic
    }
  };

  return (
    <Grid item xs={12} onKeyDown={handleKeyDown} tabIndex={0}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Record or Upload Audio
      </Typography>
      <ToggleButtonGroup
        value={uploadMethod}
        exclusive
        onChange={handleUploadMethodChange}
        aria-label="audio upload method"
        sx={{ mb: 2 }}
      >
        <ToggleButton value="record" aria-label="record audio">
          <MicIcon sx={{ mr: 1 }} /> Record
        </ToggleButton>
        <ToggleButton value="upload" aria-label="upload audio">
          <UploadIcon sx={{ mr: 1 }} /> Upload
        </ToggleButton>
      </ToggleButtonGroup>

      {uploadMethod === 'record' ? (
        <Box p={2} border={1} borderColor="#ccc" borderRadius="8px">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color={recording ? 'secondary' : 'primary'}
                onClick={recording ? handleStopRecording : handleStartRecording}
                fullWidth
                startIcon={recording ? <StopIcon /> : <MicIcon />}
              >
                {recording ? 'Stop Recording' : 'Start Recording'}
              </Button>
            </Grid>

            {/* Visualizer */}
            <Grid item xs={12}>
              <VoiceVisualizer
                controls={recorderControls}
                height={100}
                width="100%"
                backgroundColor="#f5f5f5"
                mainBarColor="#1976d2"
                secondaryBarColor="#e3f2fd"
                speed={2}
                barWidth={3}
                gap={2}
                rounded={4}
                isControlPanelShown={false}
              />
            </Grid>

            {/* Recording Status */}
            {recording && (
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  Recording in progress...
                </Typography>
              </Grid>
            )}

            {/* Recorded Audio Playback */}
            {recorderControls.recordedBlob && (
              <>
                <Grid item xs={12}>
                  <Typography variant="body1">Duration: {recorderControls.formattedDuration}</Typography>
                  <audio controls src={URL.createObjectURL(recorderControls.recordedBlob)} style={{ width: '100%', marginBottom: '10px' }} />
                  <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
                    Save Recording
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      ) : (
        <Box p={2} border={1} borderColor="#ccc" borderRadius="8px" textAlign="center">
          <input
            accept="audio/*"
            style={{ display: 'none' }}
            id="audio-upload"
            type="file"
            onChange={handleUpload}
          />
          <label htmlFor="audio-upload">
            <Button variant="contained" component="span" startIcon={<UploadIcon />}>
              Upload Audio
            </Button>
          </label>
          {audio && (
            <Box mt={2}>
              <Typography variant="body1">Uploaded Audio:</Typography>
              <audio controls src={URL.createObjectURL(audio)} style={{ width: '100%', marginTop: '10px' }} />
            </Box>
          )}
        </Box>
      )}
    </Grid>
  );
};

export default VoiceRecording;
