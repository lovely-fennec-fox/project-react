const express = require('express');
const router = express.Router();


// password가 존재 하는지 여부 체크 - 민호
router.post('/', async (req,res)=>{
    console.log('/server/checkpassword 요청받음');
    console.log(req.body);
    let correctinfo= await api.getrow('Users_tb','password_user',req.body.current_password);
    console.log(correctinfo);
    if(correctinfo){
        res.json({'issuccess':true});
    }
    else{
        res.json({'issuccess':false});
    }
});



module.exports= router;