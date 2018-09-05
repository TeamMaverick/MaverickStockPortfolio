const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const config = require('dotenv').config();
const router = require('./routes/index.js');
const stockRoutes = require('./routes/index.js');
//Helpers
// const apiHelpers = require('./helpers/apiHelpers.js');

//Middleware
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../client/dist')));

const stockRoutes = require('./routes/index.js');
app.use('/stock', stockRoutes);

app.listen(process.env.PORT, function() {
  console.log(`listening on port ${process.env.PORT}!`);
});
