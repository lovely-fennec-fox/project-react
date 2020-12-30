const express = require('express');     //민호
const router = express.Router();
const hasher = require('pbkdf2-password')();
const auth = require('./authEmail.js');


router.post('/', async (req, res) => {
    console.log('/server/signin요청 받음');
    let userinfo = {};                //회원가입 요청 받은 값 저장-민호
    userinfo.email = req.body.email;
    userinfo.username = req.body.username;
    userinfo.password = req.body.password;
    userinfo.nexonemail = req.body.nexonemail;

    if (await api.checkemail(userinfo.email)) { //db에서 email 존재여부 확인-민호
        console.log('회원가입 불가능');
        res.json({ success: false });
        return;
    } else {
        console.log('회원가입 가능');
        await hasher({
            password: userinfo.password
        }, async (err, pass, salt, hash) => {
            if (err) {
                console.log('cccccc')
                throw error
            }
            else {
                userinfo.salt = salt;
                userinfo.password = hash;
                await save.plusUser(userinfo);    //db정보 저장 메소드-민호
                auth.SendEmail(userinfo.username, userinfo.email, false);
                res.json({ success: true });
                return;
            }
        });


        console.log('2', userinfo);






        // hasher({
        //     password :userinfo.password
        // },async(err,pass,salt,hash)=>{
        //     if(err) throw error;
        //     else{
        //         userinfo.salt = salt;
        //         userinfo.password = hash;
        //         console.log(userinfo);

        //     }
        // });




    };

});


module.exports = router;