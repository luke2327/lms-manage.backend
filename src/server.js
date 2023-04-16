const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const lms = require("./provider/lms");
const {
  PORT
} = require("./config/env");

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});
app.use(cors());
app.use(express.json());
app.use("/api/lms", lms);

app.use((req, res, next) => {
  res.send();
});

app.use((err, req, res, next) => {
  /** render the error page */
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message,
    data: err.data
  });
});

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
