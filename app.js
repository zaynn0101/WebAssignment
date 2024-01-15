const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require("./public/JS/user");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/../')); // Serve static files from the parent directory

mongoose.connect('mongodb://127.0.0.1:27017/UserDataDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Database Connected');
  })
  .catch((e) => {
    console.log(e);
    console.log("Database Can't be Connected");
  });

app.post('/', async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.name || !req.body.age || !req.body.phone || !req.body.email) {
      throw new Error('Name, age, phone, and email are required fields');
    }

    const userData = new User({
      name: req.body.name,
      age: req.body.age,
      phone: req.body.phone,
      email: req.body.email,
      comments: req.body.comments, // Include comments in the data
    });

    await userData.save();
    // Send a script to the browser for showing a prompt and redirecting
    res.send("<script>alert('Data saved successfully. Press OK to go back to the HOME page'); window.location.href = '/website/index.html';</script>");
  } catch (error) {
    // Send an error message if there's an issue
    res.status(400).send("<script>alert('" + error.message + "'); window.location.href = '/contact.html';</script>");
  }
});


app.get('/', (req, res) => {
    res.redirect('/website/index.html');
  });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/../contact.html');
});

app.get('/api', (req, res) => {
  res.json('HTTP GET REQUEST received');
});

app.use('/', express.static(path.join(__dirname, '/react-app/build')));
app.use('/website', express.static(path.join(__dirname, '/public')));

app.use((req, res) => {
  res.status(404);
  res.send('<h1>Error 404: Resource Not Found</h1>');
});

app.listen(port, () => {
  console.log('App Running on port: ', port);
});
