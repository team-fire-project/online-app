const express = require ('express');
const res = require('express/lib/response');
const router = express.Router();
const db = require('../config/database');
const route = require('../routes/route');


router.get('/', (req, res) => 
  route.findALL());
    .then(route => {console.log(route)
      console.log(route);
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
  

module.exports = router;