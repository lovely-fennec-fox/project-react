const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const pool = require('./dbconnection.js')
const mongodb = require('./mongodbConnecion.js');
global.path = require('path');
// ENV_ mongoDB 변수지정
require('dotenv').config();


// 변경해야할 사항
// mysql 비번
// mysql character money bigint로
// mongodb- database: NexonDB, collection: nexonusers 

// 확인해야 할 사항
// checkcode.js = code
// gamelist.js = user_idx, user
// exchange.js = user_idx, user





global.mydb = pool.promise();
mongodb();


global.api=require('./method/api.js');
global.save=require('./method/save.js');
global.ipaddress= process.env.SERVER_IP;
global.gamelist;
const gamedata=async ()=>{
    gamelist = await api.gettable('games_tb')
};
gamedata();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));


const login = require('./router/login.js');
app.use('/server/login',login);
const signin = require('./router/signin.js');
app.use('/server/signin',signin);
const character = require('./router/character.js');
app.use('/server/character',character);
const exchange = require('./router/exchange.js');
app.use('/server/exchange',exchange);
const email = require('./router/email.js');
app.use('/server/email',email);
const checkcode = require('./router/checkcode.js');
app.use('/server/checkcode',checkcode);
const changepassword = require('./router/changepassword.js');
app.use('/server/changepassword',changepassword);
const gameinfo = require('./router/gameinfo.js');
app.use('/server/gameinfo',gameinfo);
const exchangerate = require('./router/exchangerate.js');
app.use('/server/exchangerate',exchangerate);
const checkpassword = require('./router/checkpassword');
app.use('/server/checkpassword',checkpassword);
const uploadimage = require('./router/uploadimage.js');
app.use('/server/uploadimage',uploadimage);
// 이메일 인증 후 db에 저장된 user인지 확인
const auth = require('./router/auth.js')
app.use('/server/auth',auth)


const test = require('./router/test.js');
app.use('/server/test',test);


app.listen(port, ()=>{
    console.log(port+"번호로 대기 중...");
});