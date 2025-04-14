require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
