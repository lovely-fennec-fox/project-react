const express = require('express');
const router = express.Router();




router.post('/',async(req,res)=> {   //패스워드 변경 요청 처리 메소드 -민호
    console.log('패스워드 변경 요청 받음');
    console.log("요청받음",req.body);
    let passwordinfo={};
    passwordinfo.new_password=req.body.new_password;
    passwordinfo.current_password=req.body.current_password;
    passwordinfo.salt=req.body.salt;
        await save.updatedb('Users_tb',[
            {name:"salt",value:passwordinfo.salt},
            {name:"password_user",value:passwordinfo.new_password},
            {name:"update_at",value:"current_timestamp"}
        ],'password_user',passwordinfo.current_password);
        res.json({'success':true});
});

module.exports = router;0