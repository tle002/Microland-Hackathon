import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
  IconButton,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";

const ChatBot = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);

  const loggedIn = JSON.parse(localStorage.getItem("authToken") || "false");

  // Handle text input submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/openai/chatbot", { text });
      setResponse(data);
      setText(""); // Clear input after sending
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  // Voice Recognition
  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };
    recognition.onerror = (event) => {
      setError("Voice input error: " + event.error);
      setTimeout(() => setError(""), 5000);
    };
    recognition.onend = () => setListening(false);

    recognition.start();
  };

  return (
    <>
      {!loggedIn ? (
        <Box p={10} sx={{ display: "flex", justifyContent: "center", alignContent: "flex-start" }}>
          <Typography variant="h3">
            Please <Link to={"/login"}>Log In</Link> to Continue
          </Typography>
        </Box>
      ) : (
        <Box
          width={isNotMobile ? "40%" : "80%"}
          p={"2rem"}
          m={"2rem auto"}
          borderRadius={5}
          sx={{ boxShadow: 5 }}
          backgroundColor={theme.palette.background.alt}
        >
          <Collapse in={error !== ""}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Collapse>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              label="Type your question..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" fullWidth>
              Send
            </Button>
          </form>

          <IconButton onClick={handleVoiceInput} sx={{ mt: 2 }}>
            {listening ? <StopIcon color="error" /> : <MicIcon />}
          </IconButton>

          {response ? (
            <Card
              sx={{
                mt: 4,
                border: 1,
                boxShadow: 0,
                borderRadius: 5,
                borderColor: "natural.medium",
                bgcolor: "background.default",
              }}
            >
              <Typography p={2}>{response}</Typography>
            </Card>
          ) : (
            <Card
              sx={{
                mt: 4,
                border: 1,
                boxShadow: 0,
                height: "500px",
                borderRadius: 5,
                borderColor: "natural.medium",
                bgcolor: "background.default",
              }}
            >
              <Typography
                variant="h5"
                color="natural.main"
                sx={{
                  textAlign: "center",
                  verticalAlign: "middle",
                  lineHeight: "450px",
                }}
              >
                Hi, I am your Personal Health Assistant. Please input your health history to get started.
              </Typography>
            </Card>
          )}
        </Box>
      )}
    </>
  );
};

export default ChatBot;