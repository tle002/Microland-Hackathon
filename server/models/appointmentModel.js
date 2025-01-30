const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  slot: { type: String, required: true }, // Format: "9:00 - 9:30"
  bookedBy: { type: String, required: true }, // User who booked the slot
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
