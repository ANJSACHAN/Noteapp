const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Routes/router");

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose
  .connect("mongodb://127.0.0.1:27017/notes")
  .then(() => {
    console.log("DB is connected");
  })
  .catch((e) => {
    console.log("DB error " + e);
  });


  app.use('/images', express.static('upload/images'))

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(router);

app.listen(8080, () => {
  console.log("Server is running at port no 8080");
});







