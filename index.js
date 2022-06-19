const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
app.use(cors());

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
);

// import routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const tasksRoutes = require("./routes/tasks");
const typesRoutes = require("./routes/types");
const usersRoutes = require("./routes/users");
const verifyToken = require("./routes/validate-token");

// middlewares
app.use(express.json()); // body parser

// route middlewares
app.use("/api/user", authRoutes);

// this route is protected with token
app.use("/api/dashboard", verifyToken, dashboardRoutes);

app.use("/api/tasks", verifyToken, tasksRoutes);
app.use("/api/types", verifyToken, typesRoutes);
app.use("/api/users", verifyToken, usersRoutes);

app.listen(process.env.PORT || 3001, () => console.log("server is running..."));
