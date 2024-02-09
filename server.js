const express = require("express");
require("dotenv").config();
const apiRoutes = require("./routes/contactRoutes");
const connect = require("./config/db");

const app = express();
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
