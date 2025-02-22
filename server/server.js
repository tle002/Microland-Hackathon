const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");

//routes path
const authRoutes = require("./routes/authRoutes");

//dotenv
dotenv.config();

//mongo connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('API is running');
})

//API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", require("./routes/openaiRoutes"));

//listen server
const startServer = () => {
  app.listen(PORT, () => {
    console.log(
      `Server Running in ${process.env.DEV_MODE} mode on port no ${PORT}`.bgCyan
        .white
    );
  });
};

if (process.env.NODE_ENV === "development") {
  const nodemon = require("nodemon");
  nodemon(app);
  nodemon.on("start", () => {
    console.log("Server started");
  });
  nodemon.on("quit", () => {
    console.log("Server quit");
  });
  nodemon.on("restart", () => {
    console.log("Server restarted");
  });
} else {
  startServer();
}