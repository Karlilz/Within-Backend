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
const userController = require('./controller/userController');

// Configure middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // creates req.body
app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use('/signup',userController )
app.use('/goals', goalController)
// ADD app.use for journalController?
// ADD app.use for progressController?



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