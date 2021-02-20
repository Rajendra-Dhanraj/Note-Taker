
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const { notes } = require("./db/db");

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

// route to save notes 

app.post('/api/notes', (req, res)=>{
    console.log(notes);
    req.body.id = notes.length + 1;
    notes.push(req.body);
    console.log(notes);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notes}, null, 2)
    )

        res.send('hello');
});

// route to display notes on side panel

app.get('/api/notes', (req, res) => {
    res.json(notes);
});


// ======== PORT DETAILS ======

//Port location
const PORT = process.env.PORT || 3001;

//listen for requests
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});