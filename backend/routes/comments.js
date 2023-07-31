const connection = require('../controllers/dbConnect');

const express = require('express');
const router = express.Router();

// /api/comments

/* 댓글 등록 */
router.post('/', (req, res, next) => {
  const comment = {
    'userid' : req.body.userid,
    'postNo' : req.body.postNo,
    'postuser' : req.body.postuser,
    'comment_body' : req.body.comment,
  };
  connection.query(`SET @length := (SELECT count(*) FROM comments WHERE userid = '${comment.userid}'); SET @commentNo := CONCAT('replyNo_${comment.postNo}_${comment.userid}_',CONCAT(@length)); INSERT INTO comments (commentNo, userid, postNo, postuser, comment, created_at) VALUES (@commentNo, '${comment.userid}', '${comment.postNo}', '${comment.postuser}', '${comment.comment_body}', NOW())`, (err, row) => {
    if (err) throw err;

    return res.json({
        success : true,
        message : '댓글 등록 완료'
    });
  });
})

/* 댓글 조회 */
router.post('/inquiry', (req, res, next) => {
  const postComment = req.body.postNo;

  connection.query(`SELECT * FROM comments WHERE postNo = '${postComment}'`, (err, comments) => {
    if (err) throw err;

    return res.json({
      list : comments
    })
  })
});

/* 댓글 삭제 */
router.post('/delete', (req, res, next) => {
  const comment = {
    userid : req.body.userid,
    comment : req.body.comment
  };

  connection.query(`DELETE FROM comments WHERE userid = '${comment.userid}' AND comment = '${comment.comment}';`, (err, comment) => {
    if (err) throw err;

    return res.json({
      message : '댓글 삭제됨',
      comments : comment 
    })
  })

})

module.exports = router;
