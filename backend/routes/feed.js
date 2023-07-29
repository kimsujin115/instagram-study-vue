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
      'image_url' : 'images/feed/' + req.file.filename, //이미지 파일경로 지정
      'content' : req.body.content,
      'num_likes' : req.body.num_likes,
    }
    //유저의 피드 개수 체크 한 후 postNo 저장, 피드 등록까지 여러 쿼리 한번에 진행
     connection.query(`SET @length := (SELECT count(*) FROM post WHERE userid = '${post.userid}'); SET @postid := CONCAT('postNo_${post.userid}_',CONCAT(@length)); INSERT INTO post (postNo, userid, image_url, content, num_likes, created_at) VALUES (@postid, '${post.userid}', '${post.image_url}', '${post.content}', '${post.num_likes}', NOW())`, (err, row) => {
        if (err) {
          return res.json({ success: false, message : err });
        } else {
          return res.json({
            success : true,
            message : '새로운 피드 등록 완료!'
          });
      }

      //피드 추가등록
      // connection.query(`INSERT INTO post (postNo, userid, image_url, content, num_likes, created_at) VALUES ('${post.userid} @length' '${post.userid}', '${post.image_url}', '${post.content}', '${post.num_likes}', NOW())`, (err, row2) => {
      //   if (err) {
      //     return res.json({ success: false, message : err });
      //   } else {
      //     return res.json({
      //       success : true,
      //       message : '새로운 피드 등록 완료!'
      //     });
      //   }
      // });
    })

  });

  /* 등록된 피드 */
  router.get('/post', (req, res, next) => {
    connection.query('SELECT * FROM post ORDER BY created_at DESC', (err, postlist) => {
      if (err) throw err;
      res.send({
        success : true,
        list : postlist,
      });
    })
  })

  /* 내가 등록한 피드 불러오기 */
  router.post('/profile', (req, res, next) => {
    const user = {
      'userid' : req.body.userid,
    };
    console.log(req.body.userid)
    connection.query(`SELECT * FROM post WHERE userid = '${user.userid}' ORDER BY created_at DESC `, (err, feedList) => {
      if (err) throw err;
      res.send({
        success : true,
        profile : feedList,
      });
    })
  })
  
  /* 내 게시글 삭제 */
  router.post('/delete', (req, res, next) => {
    const postNo = req.body.postNo;

    connection.query(`DELETE FROM post WHERE postNo = '${postNo}'`, (err, post) => {
      if (err) throw err;

      res.send({
        success : true,
        message : '게시글 삭제됨' 
      })
    })
  })


  module.exports = router;