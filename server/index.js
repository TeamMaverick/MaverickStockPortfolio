const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
// sets process.env variables
const config = require('dotenv').config();
const stockRoutes = require('./routes/index.js');
//Helpers
// const apiHelpers = require('./helpers/apiHelpers.js');

//Middleware
app.use(bodyParser.json());

// server client side
app.use(express.static(path.join(__dirname, '/../client/dist')));

// Set stock api prefix
app.use('/api', stockRoutes);

app.listen(process.env.PORT, function() {
  console.log(`listening on port ${process.env.PORT}!`);
});
