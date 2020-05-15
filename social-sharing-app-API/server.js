const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const socket = require('./app/utils/socketIO');

var corsOptions = {
  origin: 'http://localhost:4200',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require('./app/models');

db.sequelize.sync();

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome' });
});

// routes

require('./app/routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

socket.chat(server);
