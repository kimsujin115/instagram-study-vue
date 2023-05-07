const connection = require('../controllers/dbConnect');

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  //res.send(rows);
  connection.query('SELECT * FROM user', function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});


module.exports = router;
