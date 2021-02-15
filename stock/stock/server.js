const fs = require('fs');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const mysql = require('mysql');

const app = express();
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

const connection = mysql.createConnection({
    host : conf.host  ,
    user : conf.user, //mysql의 id
    password : conf.password, //mysql의 password
    database : conf.database, //사용할 데이터베이스 
    port : conf.port
});
connection.connect();
 
const http = require('http').createServer(app);
http.listen(8080,function(){
    console.log('8080하고있습니당');
});


// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',express.static(path.join(__dirname,'/build')));
app.use('/stock',express.static(path.join(__dirname,'/build')));
// app.use('*',express.static(path.join(__dirname,'/build')));

app.get('/',function(req,res){
    req.sendFile(path.join(__dirname,'/build/index.html'));
});

app.get('/stock/kakao',(req,res)=>{
    connection.query("SELECT *FROM 포스코엠텍 LIMIT 30",
    function (err,rows,fields){
       if(err){
           console.log("실패실패실패실패실패실패실패실패실패실패실패실패");
           return res.send( err);
       }
       else{  
         return res.send(rows)
        }
    })
})

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname, '/build/index.html'));
});



// mariadb 접속하기

// mysql -u kljstock --host stockserver.cc2pdrlk4lu2.us-east-2.rds.amazonaws.com -P3306 -p
