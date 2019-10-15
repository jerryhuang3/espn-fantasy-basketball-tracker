"use strict";
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const axios = require("axios");

// Iniitalize express and routes
const app = express();
const apiRoutes = require("./routes/api");

app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("json spaces", 2);

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
