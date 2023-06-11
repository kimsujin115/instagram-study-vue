const connection = require('../controllers/dbConnect');

const express = require('express');
const router = express.Router();

const multer  = require('multer');

const storage = multer.diskStorage({
    //파일저장경로
    destination: function (req, file, callback) {
      callback(null, 'public/images/feed');
    },
    //저장되는 파일이름 형식 커스텀 가능
    filename: function (req, file, callback) {
      const today = new Date().toISOString().substring(0,10).replace(/-/g,''); //yyyymmdd 형식
      callback(null, `${today}_${file.originalname}`);
    },
  });
  
  const upload = multer({ storage: storage }).single('uploadImage');
  

  /* 새 피드 등록 */
  router.post('/', upload, (req, res) => {
    // upload(req,res,(err) => {  // 가져온 이미지를 저장
    //   if (err) {
    //     return req.json({ success: false, err });
    //   } else {
    //     return res.json({
    //       success: true,
    //       filePath: res.req.file.path, // filePath:res.req.file.path 어디에 파일이 저장되있는지 path(위치)를 가져올수있다.
    //       fileName: res.req.file.filename, // fileName: 저장된 파일의 이름을 가져올 수 있다.
    //     });
    //   }
    // })

    const post = {
      'userid' : req.body.userid,
      'image_url' : 'images/feed/' + req.file.filename,
      'content' : req.body.content,
      'num_likes' : req.body.num_likes,
    }

    connection.query(`INSERT INTO post (userid, image_url, content, num_likes, created_at) VALUES ('${post.userid}', '${post.image_url}', '${post.content}', '${post.num_likes}', NOW())`, (err, row2) => {
      if (err) {
        return res.json({ success: false, err });
      } else {
        return res.json({
          success : true,
          message : '새로운 피드 등록 완료!'
        });
      }
    });

  });

  /* 등록된 피드 */
  router.post('/post', (req, res, next) => {
    connection.query('SELECT * FROM post', (err, postlist) => {
      if (err) throw err;
      res.send({
        success : true,
        list : postlist,
      });
    })
  })

  
  
  module.exports = router;