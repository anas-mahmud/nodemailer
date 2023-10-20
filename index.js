require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const router = require("./src/routes/index")

//! Middleware's...
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("server is running !!!");
});

app.all("*", (req, res) => {
   res.send("No Route Found... !!");
 });

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
