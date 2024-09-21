import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Divider,
  Modal,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const FeedbackSection = ({ artifactId }) => {
  const [feedback, setFeedback] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
  const [feedbackList, setFeedbackList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // Fetch feedbacks for the artifact
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/feedback/${artifactId}`
        );
        if (response.data.feedbacks.length === 0) {
          toast.info("No feedback available for this artifact.");
        }
        setFeedbackList(response.data.feedbacks);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedbacks();
  }, [artifactId]);

  // Handle form input changes
  const handleFeedbackChange = (event) => {
    const { name, value } = event.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (event, newValue) => {
    setFeedback((prev) => ({ ...prev, rating: newValue }));
  };

  // Handle feedback submission
  const handleSubmitFeedback = async () => {
    try {
      await axios.post(`http://localhost:5000/api/feedback/`, {
        artifactId,
        ...feedback,
      });
      setFeedbackList((prev) => [...prev, { ...feedback, date: new Date() }]);
      setFeedback({ name: "", rating: 0, comment: "" });
      setOpenModal(true);
      toast.success("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Error submitting feedback. Please try again.");
    }
  };

  return (
    <>
      <Box mt={3}>
        <Typography variant="h6">Submit Feedback</Typography>
        <TextField
          label="Name"
          name="name"
          value={feedback.name}
          onChange={handleFeedbackChange}
          fullWidth
          margin="normal"
        />
        <Rating
          name="simple-controlled"
          value={feedback.rating}
          onChange={handleRatingChange}
          sx={{
            color: "#ff6f00", // Custom color for the stars
            fontSize: "2rem", // Custom size for the stars
            mb: 2, // Custom margin below the Rating component
          }}
        />
        <TextField
          label="Comment"
          name="comment"
          value={feedback.comment}
          onChange={handleFeedbackChange}
          fullWidth
          rows={4}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitFeedback}
          sx={{ mt: 2 }}
        >
          Submit Feedback
        </Button>
      </Box>
      <Box mt={5}>
        <Typography variant="h6" gutterBottom>
          Feedback
        </Typography>
        {feedbackList.length > 0 ? (
          feedbackList.map((feedbackItem, index) => (
            <Box key={index} mt={2}>
              <Typography variant="body1">
                <strong>{feedbackItem.name}</strong>
              </Typography>
              <Rating
                value={feedbackItem.rating}
                readOnly
                size="large" // Make the stars larger in the feedback list
                sx={{
                  color: "#ffa726", // Custom color for the feedback rating
                  fontSize: "1.5rem", // Custom size for the stars
                  mt: 1,
                }}
              />
              <Typography variant="body2">{feedbackItem.comment}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(feedbackItem.date).toLocaleString()}
              </Typography>
              <Divider sx={{ my: 2 }} />
            </Box>
          ))
        ) : (
          <Typography variant="body2">
            No feedback available for this artifact yet.
          </Typography>
        )}

        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Thank you!
            </Typography>
            <Typography variant="body1">
              Your feedback has been submitted successfully.
            </Typography>
            <Button
              onClick={() => setOpenModal(false)}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default FeedbackSection;
