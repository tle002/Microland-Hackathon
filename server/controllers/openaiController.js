const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const Appointment = require("../models/appointmentModel.js");
exports.AppointmentsController = async (req, res) => {
  console.log("Received request:", req.body);
  try {
    // Fetch booked slots from MongoDB
    const bookedAppointments = await Appointment.find({}, "slot -_id");

    // Extracting booked slot times into an array
    const bookedSlots = bookedAppointments.map(appointment => appointment.slot);

    return res.status(200).json(bookedSlots);
  } catch (err) {
    console.error("Error fetching booked slots:", err);
    return res.status(500).json({ message: "Server error, try again later" });
  }
};
// exports.chatbotController = async (req, res) => {
//   try {
//     console.log("........................");
//     const { text } = req.body;
//     const { data } = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `${text}`,
//       max_tokens: 300,
//       temperature: 0.7,
//     });
//     if (data) {
//       if (data.choices[0].text) {
//         return res.status(200).json(data.choices[0].text);
//       }
//     }
//   } catch (err) {

//     return res.status(404).json({
//       message: err.message,
//     });
//   }
// };

exports.chatbotController = async (req, res) => {
  try {
    //console.log("Received request:", req.body);
    const { text } = req.body;
    //console.log("User input:", text);
    const prefixedText = `you are a healthcare assistance bot. your task is to answer the question ${text}`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prefixedText);

    console.log("Full API response:", JSON.stringify(result, null, 2));

    // Extract actual text response
    const replyParts = result.response?.candidates?.[0]?.content?.parts;
    const replyText = replyParts?.map(part => part.text).join(" ") || "No response";

    console.log("Extracted reply:", replyText);

    return res.status(200).send(replyText); // Send plain text as expected by UI
  } catch (err) {
    console.error("Error in chatbotController:", err.message);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};



exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `/* convert these instructions into javascript code \n${text}`,
      max_tokens: 400,
      temperature: 0.25,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
