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
    if (err) {
        return res.json({ success:false })
    } else {
        return res.json({
            success : true,
            count : row[0].liked_num, 
        });
    }
  })
})

module.exports = router;
