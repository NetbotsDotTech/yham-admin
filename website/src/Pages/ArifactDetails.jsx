import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Divider,
  Slider,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  PlayArrow,
  Pause,
  Stop,
} from "@mui/icons-material";
import axios from "axios";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { Howl } from "howler";
import FeedbackSection from "../components/FeedbeackSection"

const ViewArtifact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artifact, setArtifact] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/artifacts/item-wise/${id}`
        );
        setArtifact(response.data.data);
        console.log("Artifact:", response.data.data);

        if (response.data.data.audio) {
          const newSound = new Howl({
            src: [response.data.data.audio],
            html5: true,
            volume: volume,
            playbackRate: playbackRate,
            onplay: () => {
              setIsPlaying(true);
              setDuration(newSound.duration());
            },
            onpause: () => setIsPlaying(false),
            onend: () => setIsPlaying(false),
            onstop: () => setIsPlaying(false),
            onseek: (time) => setCurrentTime(time),
            onload: () => setDuration(newSound.duration()),
          });
          setSound(newSound);
        }
      } catch (error) {
        console.error("Error fetching artifact:", error);
      }
    };

    fetchArtifact();

    return () => {
      if (sound) {
        sound.unload();
      }
    };
  }, [id, volume, playbackRate]);

  useEffect(() => {
    let interval;
    if (isPlaying && sound) {
      interval = setInterval(() => {
        setCurrentTime(sound.seek());
      }, 1000);
    } else if (!isPlaying) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, sound]);

  const handlePlayPause = () => {
    if (isPlaying) {
      sound.pause();
    } else {
      sound.play();
    }
  };

  const handleStop = () => {
    sound.stop();
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (sound) {
      sound.volume(newValue);
    }
  };

  const handleSpeedChange = (event, newValue) => {
    setPlaybackRate(newValue);
    if (sound) {
      sound.rate(newValue);
    }
  };

  const handleSeekChange = (event, newValue) => {
    if (sound) {
      sound.seek(newValue);
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const images =
    artifact?.images?.map((image) => ({
      original: image,
      thumbnail: image,
    })) || [];

  if (!artifact)
    return (
      <Typography variant="h6" align="center">
        Loading artifact details...
      </Typography>
    );

  return (
    <Box sx={{ padding: 3 }}>
      <IconButton
        onClick={handleGoHome}
        sx={{
          mb: 2,
          border: "2px solid",
          borderColor: "primary.main",
          "&:hover": { borderColor: "secondary.main" },
        }}
      >
        <ArrowBackIcon />
        <Typography
          variant="button"
          sx={{ ml: 1, fontSize: "1rem", fontWeight: "bold" }}
        >
          Back to Home
        </Typography>
      </IconButton>
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <Card
            sx={{
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "background.paper",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                fontFamily="'Roboto', sans-serif"
                fontWeight="bold"
                align="center"
              >
                Media
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                {artifact.images && artifact.images.length > 0 && (
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      fontFamily="'Roboto', sans-serif"
                      fontWeight="bold"
                    >
                      Images
                    </Typography>
                    <ImageGallery
                      items={images}
                      showPlayButton={false}
                      showThumbnails={true}
                      thumbnailPosition="left"
                    />
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "background.paper",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                fontFamily="'Roboto', sans-serif"
                fontWeight="bold"
                align="center"
              >
                Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {[
                "name",
                "itemNo",
                "serialNo",
                "description",
                "madeOf",
                "age",
                "shelfNo",
                "hallNo",
              ].map((field) => (
                <Typography
                  key={field}
                  variant="body1"
                  sx={{ mb: 1, fontFamily: "Arial", fontSize: "0.9rem" }}
                >
                  <strong>
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </strong>{" "}
                  {artifact[field] || "N/A"}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "background.paper",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                fontFamily="'Roboto', sans-serif"
                fontWeight="bold"
                align="center"
              >
                Particulars
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {["width", "depth", "circumference", "diameters", "weight"].map(
                (field) => (
                  <Typography
                    key={field}
                    variant="body1"
                    sx={{ mb: 1, fontFamily: "Arial", fontSize: "0.9rem" }}
                  >
                    <strong>
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </strong>{" "}
                    {artifact.particulars?.[field] || "N/A"}
                  </Typography>
                )
              )}
            </CardContent>
          </Card>
        </Grid>
      
        <Grid item xs={12}>
          <Card
            sx={{
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "background.paper",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                fontFamily="'Roboto', sans-serif"
                fontWeight="bold"
                align="center"
              >
                Audio Player
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <IconButton
                    onClick={handlePlayPause}
                    sx={{
                      border: "1px solid",
                      borderColor: "grey.300",
                      borderRadius: "50%",
                    }}
                  >
                    {isPlaying ? <Pause /> : <PlayArrow />}
                  </IconButton>
                  <IconButton
                    onClick={handleStop}
                    sx={{
                      border: "1px solid",
                      borderColor: "grey.300",
                      borderRadius: "50%",
                    }}
                  >
                    <Stop />
                  </IconButton>
                </Box>
                <Slider
                  value={currentTime}
                  max={duration}
                  onChange={handleSeekChange}
                  sx={{ width: "80%", mb: 2 }}
                />
                <Box
                  sx={{
                    width: "80%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    {formatTime(currentTime)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {formatTime(duration)}
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", width: "80%" }}
                >
                  <Box
                    sx={{
                      width: "50%",
                      display: "flex",
                      alignItems: "center",
                      mr: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mr: 1 }}
                    >
                      Volume
                    </Typography>
                    <Slider
                      value={volume}
                      onChange={handleVolumeChange}
                      min={0}
                      max={1}
                      step={0.01}
                      sx={{ flexGrow: 1, mr: 2 }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {Math.round(volume * 100)}%
                    </Typography>
                  </Box>
                  <Box
                    sx={{ width: "50%", display: "flex", alignItems: "center" }}
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mr: 1 }}
                    >
                      Speed
                    </Typography>
                    <Slider
                      value={playbackRate}
                      onChange={handleSpeedChange}
                      min={0.5}
                      max={2}
                      step={0.1}
                      sx={{ flexGrow: 1, mr: 2 }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {playbackRate}x
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>



<Card sx={{ padding: 2, borderRadius: 2, boxShadow: 3, backgroundColor: "background.paper", mt: 5 }}>

<FeedbackSection artifactId={artifact._id} />

</Card>


           
      
    </Box>
  );
};


export default ViewArtifact;








