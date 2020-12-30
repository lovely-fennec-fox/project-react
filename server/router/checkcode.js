const express = require('express');
const router = express.Router();
const auth = require('./authEmail.js');
// code 확인 후, 맞으면 SecurityCode_TB에서 코드 삭제. 틀리면 오류메세지 전송_ 다래
router.post('/',async(req,res)=> {

    console.log('넥슨코드 확인')
    const code = req.body.code;  // input name: code

    const check = await api.getrow('SecurityCode_TB', 'security_code', code);
    console.log('check', check);
    if(!check){
        res.json({'success':false});       
    } else {
        res.json({'success': true});
        
        save.deletedb('SecurityCode_TB', 'security_code', code);
        console.log('SecurityCode_TB에서 코드가 삭제되었습니다.') 
    }
});



module.exports = router;