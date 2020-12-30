const express = require('express');
const router = express.Router();


// user_idx를 받아 user가 가진 character 반환_ 다래
router.post('/', async (req,res)=>{
    console.log('/server/character 요청받음');
    let useremail=req.body.useremail;
    let userInfo=await api.getrow('Users_TB','email_user',useremail);
    let user_info = await api.getrow_list('Characters_TB', 'idx_user', userInfo.idx_user);
    res.json({characterinfo:user_info});
});


router.post('/userinfo', async (req,res)=>{
    console.log('/server/character/userinfo 요청받음');
    let useremail=req.body.useremail;
    console.log("1",useremail);
    
    let userInfo=await api.getrow('Users_TB','email_user',useremail);
    let characters = await api.getrow_characters(userInfo.idx_user);
    let gameInfo={}
    gameInfo['user'] = characters[0].idx_user;
    gameInfo['games'] = [];
    let game = {};
    let character = {};
    game['name_game'] = characters[0].name_game;
    game['exchange_rate'] = characters[0].exchange_rate;
    game['img'] = characters[0].image_path2;
    game['characters'] = [];


    for (let num in characters){
        if(game['name_game'] == characters[num].name_game){
            character = {};
            character['name'] = characters[num].name_character;
            character['money'] = characters[num].money_character;
            game.characters.push(character)
        }else {
            gameInfo['games'].push(game);
            game={};
            game['name_game'] = characters[num].name_game;
            game['exchange_rate'] = characters[num].exchange_rate;
            game['img'] = characters[num].image_path2;
            game['characters'] = [];
            character = {};
            character['name'] = characters[num].name_character;
            character['money'] = characters[num].money_character;
            game.characters.push(character)
        };
    };


    res.json({characterinfo:gameInfo});
});

module.exports= router;