import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  Alert,
  Collapse,
  Card,
  Grid,
} from "@mui/material";

const ChatBot = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [bookedSlots, setBookedSlots] = useState([]);
  const loggedIn = JSON.parse(localStorage.getItem("authToken") || "false");

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/v1/Appointments");
        setBookedSlots(data);
      } catch (err) {
        console.error("Error fetching booked slots", err);
      }
    };
    fetchBookedSlots();
  }, []);

  const generateTimeSlots = () => {
    let slots = [];
    for (let i = 9; i < 13; i++) {
      slots.push(`${i}:00 - ${i}:30`);
      slots.push(`${i}:30 - ${i + 1}:00`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

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
          width={isNotMobile ? "60%" : "90%"}
          p={"2rem"}
          m={"2rem auto"}
          borderRadius={5}
          sx={{ boxShadow: 5 }}
          backgroundColor={theme.palette.background.alt}
        >
          <Collapse in={bookedSlots.length === 0}>
            <Alert severity="info" sx={{ mb: 2 }}>
              Fetching available slots...
            </Alert>
          </Collapse>

          <Typography variant="h4" textAlign="center" sx={{ mb: 2 }}>
            Appointment Slots (9 AM - 1 PM)
          </Typography>

          <Grid container spacing={2}>
            {timeSlots.map((slot, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Card
                  sx={{
                    p: 2,
                    textAlign: "center",
                    backgroundColor: bookedSlots.includes(slot) ? "red" : "green",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {slot}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ChatBot;
