const connection = require('../controllers/dbConnect');

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  //res.send(rows);
  connection.query('SELECT * FROM user', (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/signUp', (req, res) => {
  res.send('가입')
})


module.exports = router;
