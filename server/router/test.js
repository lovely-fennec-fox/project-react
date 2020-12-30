const express = require('express');
const router  = express.Router();
const crypto = require('crypto');

router.get('/', async (req,res)=>{
    console.log('/server/test요청 받음');
    // console.log(save.insertquery("hello",[{name:"one",value:"1"},{name:"two",value:"2"},{name:"three",value:"3"}]));
    // console.log(save.updatequery("hello",[{name:"one",value:"1"},{name:"two",value:"2"},{name:"three",value:"3"}],"idx_user","3"));
    // console.log(save.deletedb('hello','email_user','wptnzpq@gmail.com'));
    // var n = await api.checkemail("wptnzpq@gmail").
    // auth.SendEmail('aa', 'momo0735@naver.com', true);
    // var a = await info('9zAw2t@nexon.com');
    // console.log(a);


    

 
   
    res.end();
});
module.exports = router;

