const express = require("express");
const {
  AppointmentsController,
  chatbotController,
  jsconverterController,
} = require("../controllers/openaiController");

const router = express.Router();

//route
router.get("/Appointments", AppointmentsController);
router.post("/chatbot", chatbotController);
router.post("/js-converter", jsconverterController);


module.exports = router;
