const express = require('express');
const router = express.Router();
const auth = require('./authEmail');


// *********** npm install nodemailer필요해요.
router.post('/nexon',(req,res)=> {  //넥슨 이메일을 전송요청 처리 메소드-민호
    console.log('넥슨이메일 전송');
    let userEmail = req.body.nexonemail;
    console.log('전송받을 이메일:'+userEmail);
    auth.SendEmail("", userEmail, true);
    res.end();
});


module.exports = router;