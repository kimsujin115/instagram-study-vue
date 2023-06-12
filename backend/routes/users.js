const connection = require('../controllers/dbConnect');

const express = require('express');
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
    'userid' : req.body.userid,
    'name' : req.body.username,
    'email' : req.body.email,
    'password' : req.body.password,
    'profile_img' : req.body.profile_img,
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

router.post('/login', (req, res, next) => {
  const user = {
    'userid' : req.body.userid,
    'password' : req.body.password,
  };

  connection.query(`SELECT * FROM users WHERE userid = '${user.userid}'`, function(err, row) {
    if (err) throw err;
    
    if ( row[0] !== undefined && row[0].userid == user.userid) { //사용자 아이디가 일치하는지 확인
      if ( row[0].password == user.password ) { //비밀번호가 일치하는지 확인
        res.json({
          success : true,
          message : '로그인 성공',
          user : row[0],
        });
      } else {
        res.json({
          success : false,
          message : '비밀번호를 다시 확인해 주세요.'
        })
      }
    } else {
      res.json({
        success : false,
        message : '사용자 아이디, 비밀번호를 다시 확인해 주세요.'
      })
    }
  })
});

module.exports = router;
