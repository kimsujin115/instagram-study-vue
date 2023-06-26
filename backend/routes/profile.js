const connection = require('../controllers/dbConnect');

const express = require('express');
const router = express.Router();

const multer  = require('multer');
const fs = require('fs');
const fsExtra = require('fs-extra');

const storage = multer.diskStorage({
    //파일저장경로
    destination: function (req, file, callback) {
        const userid = req.body.userid;
        //유저의 프로필 저장하는 폴더 없을 경우 폴더 생성
        if (!fs.existsSync(`public/images/profile/${userid}`)) { 
            fs.mkdirSync(`public/images/profile/${userid}`)
        }
        
        callback(null, `public/images/profile/${userid}/`);
        
    },
    //저장되는 파일이름 형식 커스텀 가능
    filename: function (req, file, callback) {
        const userid = req.body.userid;
        const imgfile = fs.readdirSync(`public/images/profile/${userid}/`)
        //console.log(imgfile.length)
         //유저의 프로필 사진은 1개만 저장 할 수 있으므로, 변경할때 기존꺼는 삭제하기
        if (imgfile.length > 0) {
            imgfile.forEach((num) => {
                fs.unlinkSync(`public/images/profile/${userid}/${num}`)
            })
        }
        callback(null, `${file.originalname}`);
    },
  });
  
  const upload = multer({ storage: storage }).single('uploadProfile');

  router.post('/', upload, (req, res) => {
    const user = {
        'userid' : req.body.userid,
        'profile_img' : `http://localhost:3000/images/profile/${req.body.userid}/${req.file.filename}`
    }

    connection.query(`UPDATE users SET profile_img = '${user.profile_img}' WHERE userid = '${user.userid}'`, function(err, row) {
        if (err) {
            if (err) throw err;
          } else {
            connection.query(`SELECT profile_img FROM users WHERE userid = '${user.userid}'`, function(err, row2) {
                if (err) {
                    return res.json({success:false})
                } else {
                    return res.json({
                        success : true,
                        message : '프로필 이미지 변경 완료',
                        profile_img : row2[0],
                    });
                }
            })
          }
      });
  })


  module.exports = router;
  
