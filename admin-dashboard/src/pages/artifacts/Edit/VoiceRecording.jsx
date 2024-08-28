/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography, Box } from '@mui/material';
import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer';

const VoiceRecording = ({ audio, onAudioStop, onAudioSave }) => {
  const recorderControls = useVoiceVisualizer();
  const [recording, setRecording] = useState(false);

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
      onAudioSave(recorderControls.recordedBlob);
    }
  };

  useEffect(() => {
    if (recorderControls.recordedBlob) {
      // Do something with the recorded blob if needed
    }
  }, [recorderControls.recordedBlob]);

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color={recording ? 'secondary' : 'primary'}
            onClick={recording ? handleStopRecording : handleStartRecording}
            fullWidth
          >
            {recording ? 'Stop Recording' : 'Start Recording'}
          </Button>
        </Grid>

        {/* Visualizer */}
        <Grid item xs={12}>
          <VoiceVisualizer
            controls={recorderControls}
            height={200}
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
          <Grid item xs={12}>
            <Typography variant="body1">
              Duration: {recorderControls.formattedDuration}
            </Typography>
            <audio
              controls
              src={URL.createObjectURL(recorderControls.recordedBlob)}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default VoiceRecording;
