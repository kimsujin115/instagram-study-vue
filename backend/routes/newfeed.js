
const express = require('express');
const router = express.Router();
const multer  = require('multer');
const { get } = require('.');

const storage = multer.diskStorage({
    //파일저장경로
    destination: function (req, file, callback) {
      callback(null, 'public/images/');
    },
    //저장되는 파일이름 형식 커스텀 가능
    filename: function (req, file, callback) {
      const today = new Date().toISOString().substring(0,10).replace(/-/g,''); //yyyymmdd 형식
      callback(null, `${today}_${file.originalname}`);
    },
  });
  
  const upload = multer({ storage: storage }).single('uploadImage');
  
  router.post('/', (req, res) => {
    // 가져온 이미지를 저장해주면 됨
    upload(req, res, (err) => {
      if (err) {
        return req.json({ success: false, err });
      }
      return res.json({
        success: true,
        filePath: res.req.file.path,
        fileName: res.req.file.filename,
      });
    });
  });
  // filePath:res.req.file.path 어디에 파일이 저장되있는지 path(위치)를 가져올수있다.
  // fileName: 저장된 파일의 이름을 가져올 수 있다.
  module.exports = router;