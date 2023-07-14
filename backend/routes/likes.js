const connection = require('../controllers/dbConnect');

const express = require('express');
const router = express.Router();

// /api/likes

/* 좋아요 유무 체크 */
router.post('/', (req, res, next) => {
  const likes = {
    'userid' : req.body.userid,
    'postNo' : req.body.postNo,
  };
  connection.query(`SELECT count(*) AS liked_num FROM likes WHERE userid = '${likes.userid}' AND postNo = '${likes.postNo}'`, (err, row) => {
    if (err) throw err;

    return res.json({
        success : true,
        count : row[0].liked_num, 
    });
  })
})

/* 좋아요 증가 */
router.post('/addLike', (req, res, next) => {
  const likes = {
    userid : req.body.userid,
    postNo : req.body.postNo,
    postuser : req.body.postuser
  }
  /* likes 테이블에 추가 */
  connection.query(`SET @likesNo := ('${likes.userid}ISLIKE${likes.postNo}'); INSERT INTO likes (likesNo, userid, postNo, postuser, created_at) VALUES (@likesNo, '${likes.userid}', '${likes.postNo}', '${likes.postuser}', NOW())`, (err, row) => {
    if (err) throw err;
    
    /* post 테이블 num_likes 필드에 +1 */
    connection.query(`SET @likeNum := (SELECT num_likes FROM post WHERE postNo = '${likes.postNo}'); UPDATE post SET num_likes = @likeNum+1 WHERE postNo = '${likes.postNo}'; SELECT num_likes FROM post WHERE postNo = '${likes.postNo}'`, (err2, post) => {
      if (err2) throw err2;

      return res.json({
          success : true,
          like_num : post[2][0].num_likes,
          message : 'DB에 좋아요 추가 및 개수 증가 완료'
      });

    });
  })
})

/* 좋아요 취소 */
router.post('/deleteLike', (req, res, next) => {
  const likes = {
    userid : req.body.userid,
    postNo : req.body.postNo,
  }
  /* likes 테이블에서 삭제 */
  connection.query(`DELETE FROM likes WHERE userid = '${likes.userid}' AND postNo = '${likes.postNo}'`, (err, row) => {
    if (err) throw err;
    
    /* post 테이블 num_likes 필드에 -1 */
    connection.query(`SET @likeNum := (SELECT num_likes FROM post WHERE postNo = '${likes.postNo}'); UPDATE post SET num_likes = @likeNum-1 WHERE postNo = '${likes.postNo}'; SELECT num_likes FROM post WHERE postNo = '${likes.postNo}'`, (err2, post) => {
      if (err2) throw err2;

      return res.json({
          success : true,
          like_num : post[2][0].num_likes,
          message : 'DB에 좋아요 삭제 및 개수 감소 완료'
      });

    });
  })
})

module.exports = router;
