const express = require("express");
const connectDB = require("./db.js");
const UserRoutes = require("./Routes/UserRoutes.js");
const app = express();
const cors = require("cors");
const colors = require("colors");
const ProjectRoute = require("./Routes/ProjectRoute.js");

require("dotenv").config();

// Mongo DB Connections
connectDB();

// Middleware Connections
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/project", ProjectRoute);
app.use("/api/user", UserRoutes);

// Connection
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log("App running in port: ".yellow.bold + PORT.yellow.bold);
});
