const express = require('express');
const router = express.Router();




// req 정보 받을 변수 
let user = ''; 
let user_email = '';    
let all_user_platform_money = ''; 
let user_change_platform_money = ''; 
let characters = [];
   

let character_name = ''; 
let character_money = ''; 
let character_change_money = ''; 
let user_platform_money = ''; 
let rate = ''; 
let moneydir = ''; 
let fee = ''; 



// character TB의 정보 받을 변수
let character_info =''; 
let character_idx = ''; 
let user_idx = ''; 
let exchange_data = ''; 
let check = '';


// 거래요청시 exchange TB에 insert / 승인 전_ 다래
router.post('/saveinfo', async(req,res)=>{
    console.log('/server/exchange/saveinfo 요청 받음');

    check = req.body.insertCheck;
    console.log('check', check)

    if(check !== "approval"){
        user = req.body.userInfo; 
        characters = req.body.exchangeData;
        console.log('user', user)
        console.log('characters', characters)
    } else {
        console.log('user', user)
        console.log('characters', characters)
    }


    // for ( var num in characters){        

    //     character_name = characters[num].character_name;
    //     character_change_money = characters[num].change_Gmoney;
    //     user_platform_money = characters[num].change_Pmoney;
    //     rate = characters[num].ex_rate;
    //     moneydir = characters[num].moneydir;
    //     fee = characters[num].fee;
        

    //     // character_TB에서 정보 가져오기
    //     character_info = await api.getrow('Characters_TB', 'name_character', character_name);
    //     character_idx = character_info['idx_character'];

    //     // user_idx저장
    //     user_idx = character_info['idx_user'];


    //     // exchange TB에 저장, 승인 전
    //     exchange_data = [
    //                         {'name':'idx_character', 'value':character_idx}, 
    //                         {'name':'idx_exchang_rate', 'value':rate}, 
    //                         {'name':'fee', 'value': fee}, 
    //                         {'name':'moneydir', 'value': moneydir}, 
    //                         {'name':'game_money', 'value':character_change_money}, 
    //                         {'name':'platform_money', 'value':user_platform_money}
    //                     ];

    //     await save.insertdb('Exchange_TB', exchange_data);
    // };

    res.json({'issuccess':true});
});



// 거래 승인 후, exchange TB 승인으로 변경, platform_money와 character_money update_ 다래
router.post('/approval', async (req, res)=> {

    characters = req.body.characterInfo;
    all_user_platform_money = user.origin_Pmoney;
    user_change_platform_money = user.change_Pmoney;
    let character_game_money = 0;
    let user_platform_money = all_user_platform_money + user_change_platform_money;

    for( num in characters){
        character_name = characters[num].character_name;
        character_info = await api.getrow('Characters_TB', 'name_character', character_name);
        character_idx = character_info['idx_character'];


        // 거래 승인으로 update
        await save.updatedb('Exchange_TB',[{'name':'approvalYn','value':'Y'}],'idx_character', character_idx);


        // charcter money 바뀐 금액으로 update
        character_money = characters[num].origin_Gmoney;
        character_change_money = characters[num].change_Gmoney;
        character_game_money = character_money + character_change_money;
        await save.updatedb('Characters_TB',[{'name':'money_character','value': character_game_money}] ,'idx_character', character_idx);
    };

    await save.updatedb('Users_TB',[{'name':'money_platform','value': user_platform_money}] ,'idx_user', user_idx);
    res.json({'issucssece': true});

});





// req 객체형태
// { userInfo: { 
//                 email: 
//                 origin_Pmoney:
//                 change_Pmoney:   
//             }
//   characterInfo: [{
//                 character_name:
//                 origin_Gmoney:
//                 change_Gmoney:
//                 change_Pmoney:
//                 ex_rate:
//                 fee:
//                 moneydir: 'G2P', 'P2G'                 
//   }]
// }







module.exports= router;