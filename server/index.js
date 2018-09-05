const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const config = require('dotenv').config();
const stockRoutes = require('./routes/index.js');
//Helpers
// const apiHelpers = require('./helpers/apiHelpers.js');

//Middleware
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../client/dist')));
//posting stock list
app.use('/stock', stockRoutes);

//Geting stock list
app.use('/stocks', stockRoutes);

app.listen(process.env.PORT, function() {
  console.log(`listening on port ${process.env.PORT}!`);
});
