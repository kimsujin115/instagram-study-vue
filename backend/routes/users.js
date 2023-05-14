const connection = require('../controllers/dbConnect');

const express = require('express');
const { format } = require('../controllers/dbConnect');
const router = express.Router();

// /api/users

/* GET users listing. */
router.get('/', (req, res, next) => {
  connection.query('SELECT * FROM users', (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.post('/signUp', (req, res, next) => {
  const user = {
    'userid' : req.body.users.userid,
    'name' : req.body.users.name,
    'email' : req.body.users.email,
    'password' : req.body.users.password,
    'profile_img' : req.body.users.profile_img,
  };
  connection.query(`SELECT userid FROM users WHERE userid = '${user.userid}'`, function(err, row) {
    if ( row[0] == undefined) { //동일한 userid 없을 경우

      connection.query(`INSERT INTO users (userid, name, email, password, profile_img, created_at) VALUES ('${user.userid}', '${user.name}', '${user.email}', '${user.password}', '${user.profile_img}', NOW())`, function(err, row2) {
        if (err) throw err;
      });
      res.json({
        success: true,
        message: '가입 성공!'
      })
    } else {
      res.json({
        success: false,
        message: '이미 사용 중인 아이디가 있습니다.'
      })
    }
  })
})


module.exports = router;
