import React from "react";
import { Box, Typography, Card, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import FormatAlignLeftOutlined from "@mui/icons-material/FormatAlignLeftOutlined";
import ChatRounded from "@mui/icons-material/ChatRounded";
const Homepage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        <Box p={3} sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h4" mb={2} fontWeight="bold">
            Appointments
          </Typography>
          <Card
            onClick={() => navigate("/Appointments")}
            sx={{
              boxShadow: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 5,
              height: 250,
              width: 250,
              "&:hover": {
                border: 2,
                boxShadow: 0,
                borderColor: "primary.dark",
                cursor: "pointer",
              },
            }}
          >
            <DescriptionRounded
              sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
            />
            <Stack p={3} pt={0} mt={2} sx={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
              <Typography fontWeight="bold" variant="h5">
                 Appointments
              </Typography>
              <Typography variant="h6">
                See available slots
              </Typography>
            </Stack>
          </Card>
        </Box>
        <Box p={3} sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h4" mb={2} fontWeight="bold">
            Healthcare Chatbot
          </Typography>
          <Card
            onClick={() => navigate("/chatbot")}
            sx={{
              boxShadow: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 5,
              height: 250,
              width: 250,
              "&:hover": {
                border: 2,
                boxShadow: 0,
                borderColor: "primary.dark",
                cursor: "pointer",
              },
            }}
          >
            <ChatRounded
              sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
            />
            <Stack p={3} pt={0} mt={2} sx={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
              <Typography fontWeight="bold" variant="h5">
                Chatbot
              </Typography>
              <Typography variant="h6">Chat with chatbot</Typography>
            </Stack>
          </Card>
        </Box>
        <Box p={3} sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h4" mb={2} fontWeight="bold">
            Medical History
          </Typography>
          <Card
            onClick={() => navigate("/js-converter")}
            sx={{
              boxShadow: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 5,
              height: 250,
              width: 250,
              "&:hover": {
                border: 2,
                boxShadow: 0,
                borderColor: "primary.dark",
                cursor: "pointer",
              },
            }}
          >
            <ChatRounded
              sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
            />
            <Stack 
  p={3} 
  pt={0} 
  mt={2} 
  sx={{ 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    justifyContent: "center", 
    textAlign: "center" // Ensures text is centered
  }}
>
  <Typography fontWeight="bold" variant="h5" align="center">
    History
  </Typography>
  <Typography variant="h6" align="center">
    Click here to check your medical history
  </Typography>
</Stack>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Homepage;
