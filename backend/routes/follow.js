const connection = require('../controllers/dbConnect');

const express = require('express');
const router = express.Router();

// /api/follow

/* 팔로잉 여부 조회 */
router.post('/', (req, res, next) => {
    const follow = {
      'userid' : req.body.userid,
      'followid' : req.body.followid
    };
    connection.query(`SELECT * FROM follow WHERE userid = '${follow.userid}' AND followid = '${follow.followid}'`, (err, follow) => {
        if (err) throw err;

        return res.json({
            list : follow
        })
    })
}); 

/* 팔로우하기 */
router.post('/follow', (req, res, next) => {
  const follow = {
    'userid' : req.body.userid,
    'followid' : req.body.followid
  };

  /* follow 테이블에 추가 후 users 테이블에 팔로우/팔로잉 갯수 저장 */
  connection.query(`SET @followNo := 'to${follow.followid}_from${follow.userid}'; INSERT INTO follow (followNo, userid, followid, created_at) VALUES (@followNo, '${follow.userid}', '${follow.followid}', NOW())`, (err, row) => {
    if (err) throw err;

    connection.query(`
        SET @followNum := (SELECT follower_num FROM users WHERE userid = '${follow.followid}'); 
        UPDATE users SET follower_num = @followNum+1 WHERE userid = '${follow.followid}';
        SET @followingNum := (SELECT following_num FROM users WHERE userid = '${follow.userid}'); 
        UPDATE users SET following_num = @followingNum+1 WHERE userid = '${follow.userid}';`, (err2, row2) => {

        if (err2) throw err2;

        return res.json({
            success : true,
            message : '팔로우 완료'
        });
    })
    
  });
}); 

/* 팔로우 삭제 */
router.post('/unfollow', (req, res, next) => {
    const follow = {
      'userid' : req.body.userid,
      'followid' : req.body.followid
    };

    /* users 테이블에 팔로우/팔로잉 갯수 저장 후 follow 테이블에서 삭제 */
    connection.query(`
        SET @followNum := (SELECT follower_num FROM users WHERE userid = '${follow.followid}'); 
        UPDATE users SET follower_num = @followNum-1 WHERE userid = '${follow.followid}';
        SET @followingNum := (SELECT following_num FROM users WHERE userid = '${follow.userid}'); 
        UPDATE users SET following_num = @followingNum-1 WHERE userid = '${follow.userid}';`, (err, row) => {

        if (err) throw err;
        
        connection.query(`DELETE FROM follow WHERE userid = '${follow.userid}' AND followid = '${follow.followid}'`, (err, row) => {
            if (err) throw err;

            return res.json({
                success : true,
                message : '언팔로우 완료'
            });
        });
    })
    
  }); 


module.exports = router;
