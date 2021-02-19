const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
//const { notes } = require("./data/db");

// ==== MIDDLEWARE ====

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

// route to direct user to notes page

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//Port location
const PORT = process.env.PORT || 3001;

//listen for requests
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});
