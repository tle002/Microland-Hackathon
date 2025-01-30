import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
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
  Select,
  MenuItem,
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
  const [selectedMic, setSelectedMic] = useState("");
  const [availableMics, setAvailableMics] = useState([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const mics = devices.filter((device) => device.kind === "audioinput");
      setAvailableMics(mics);
      if (mics.length > 0) setSelectedMic(mics[0].deviceId);
    });
  }, []);

  const loggedIn = JSON.parse(localStorage.getItem("authToken") || "false");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/openai/chatbot", { text });
      setResponse(data);
      setText("");
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setTimeout(() => setError(""), 5000);
    }
  };

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
        <Box p={10} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h3">
            Please <Link to="/login">Log In</Link> to Continue
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

          <Select
            fullWidth
            value={selectedMic}
            onChange={(e) => setSelectedMic(e.target.value)}
            sx={{ mb: 2 }}
          >
            {availableMics.map((mic) => (
              <MenuItem key={mic.deviceId} value={mic.deviceId}>
                {mic.label || `Microphone ${availableMics.indexOf(mic) + 1}`}
              </MenuItem>
            ))}
          </Select>

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
                p: 2,
              }}
            >
              <ReactMarkdown>{response}</ReactMarkdown>
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                p: 2,
              }}
            >
              <Typography variant="h5" color="textSecondary">
                Hi, I am your Personal Health Assistant. Please input your health history to get started.
              </Typography>
            </Card>
          )}
        </Box>
      )}
    </>
  );
};

export default ChatBot;
