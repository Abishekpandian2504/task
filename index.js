
const mongoose = require('mongoose');
const Joi = require("joi");

const winston = require('winston');
require('winston-mongodb');

Joi.objectId = require('joi-objectid')(Joi);


const users = require("./routes/users");
const auth = require("./routes/auth");
const genres = require("./routes/genres");

const express = require("express");
const app = express();

require('express-async-errors');

const error = require('./middleware/error');

const config = require('config');

winston.add(winston.transports.File, { filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly2' });

if (!config.get('jwtPrivateKey'))  
{
   console.log('FATAL ERROR: jwtPrivateKey is not defined');

   process.exit(1)
}

mongoose.connect('mongodb://localhost/vidly3')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'))


app.use(express.json());

app.use('/api/users', users);
app.use('/api/genres', genres);


app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
