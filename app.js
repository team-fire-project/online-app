const express = require('express');

const exphbs = require('express-handlebars');

const path = require('path');

const fs = require('fs');

const app = express();

app.get('/', (req, res) => res.send('TEST'));



//Routes
app.use('/route', require('./db.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

//Database
const db = require('./db.js')

//Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error:' + err))

app.listen(PORT, console.log(`Server started on port ${PORT}`));
