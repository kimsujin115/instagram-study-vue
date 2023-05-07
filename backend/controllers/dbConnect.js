const mysql = require('mysql');

// Connection 객체 생성 
const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',   
  password: 'mysqlPW1!',
  database: 'instar_crud'  //기본스키마 설정했을경우 그 스키마 이름으로 정해줘야해
});  

// Connect
connection.connect(function (err) { 
    if (err) {     
      console.error('mysql connection error : ', err); 
      throw err;
    } else {
      console.log('mysql 연결성공') 
    }
});

module.exports = connection;
  