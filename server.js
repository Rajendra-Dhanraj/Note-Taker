const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const { notes } = require("./db/db");

// ======================= MIDDLEWARE ========================

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

// ======================= ROUTES ========================

// route to direct user to notes page

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// save notes

app.post("/api/notes", (req, res) => {
  console.log(notes);
  // create a random ID value
  req.body.id = Math.random();
  notes.push(req.body);
  console.log(notes);
    // write to dj.json file
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ notes: notes }, null, 2)
  );

  res.send("hello");
});

// display notes on side panel

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// delete selected note referencing ID

app.delete("/api/notes/:id", function (req, res) {
  // loop through array to find matching id
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id == req.params.id) {
      notes.splice(i, 1);
      break;
    }
  }
  // Overwrite the db.json file again.
  fs.writeFileSync(
    path.join(__dirname, "/db/db.json"),
    JSON.stringify(notes),
    function (err) {
      if (err) {
        return console.log(err);
      } else {
        console.log("Note Deleted!");
      }
    }
  );
  res.json(notes);
});

// ======================= PORT DETAILS ========================

//Port location
const PORT = process.env.PORT || 3001;

//listen for requests
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});