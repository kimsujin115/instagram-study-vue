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
        message: '가입성공! 로그인 해주세요.'
      })
    } else {
      res.json({
        success: false,
        message: '동일한 아이디가 존재합니다. 다른 아이디를 입력해 주세요.'
      })
    }
  })
})


module.exports = router;
