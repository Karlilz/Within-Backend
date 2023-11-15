// Import dependencies
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const goalController = require('./controller/goalController');
const journalController = require('./controller/journalController');
const progressController = require('./controller/progressController');
const AuthController = require('./controller/AuthController');

// Configure middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // creates req.body
app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use('/',AuthController ) //telling app to use the Auth model
app.use('/goals', goalController) //telling app to use Goal model
app.use('journal', journalController) //telling app to use Journal model
app.use('progress', progressController) //telling app to use Progress model

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/goals', (req,res) => {
  console.log("Hitting the create route")
  res.send(req.body);
});



app.listen(PORT, () => {
    console.log(`Successfully served on port: ${PORT}.`);
})