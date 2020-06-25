const express = require("express");
const cors = require("cors");
const app = express();
const lms = require("./provider/lms");
const { PORT } = require("./config/env");

app.use(cors());
app.use(express.json());
app.use("/api/lms", lms);

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
