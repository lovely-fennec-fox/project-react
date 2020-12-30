const express = require('express');
const router = express.Router();

router.get('/',async (req,res)=>{
    console.log('/server/exchangerate 요청받음');
    let  ex_rate= await api.gettable('exchangerate_tb');
    res.json({"exchangerate":ex_rate});
});

module.exports= router;