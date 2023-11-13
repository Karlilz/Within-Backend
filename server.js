// Import dependencies
const express = require('express');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const goalController = require('./controller/goalController');
const journalController = require('./controller/journalController');
const progressController = require('./controller/progressController');
const userController = require('./controller/userController');

// Initialize Express app
const app = express();

// Configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json())
app.use('/signup',userController )


require('dotenv').config()



// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Successfully served on port: ${PORT}.`);
})