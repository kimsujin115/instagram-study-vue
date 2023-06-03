const connection = require('../controllers/dbConnect');

const express = require('express');
// const { format } = require('../controllers/dbConnect');
const router = express.Router();

// /api/post

router.post('/', (req, res, next) => {
  const newpost = {
    'userid' : req.body.userid,
    'img_url' : req.body.img_url,
    'content' : req.body.content,
  };
  connection.query(`INSERT INTO post (userid, image_url, content, num_likes, created_at) VALUES ('${newpost.userid}', '${newpost.image_url}', '${newpost.content}', 0, NOW())`, function(err, row) {
    if (err) throw err;

    res.json({
      success: true,
      message: '게시물 등록 완료'
    })
  });
})

module.exports = router;
