const api = require('../method/api.js')
const save = require('../method/save.js')

// nexonEmail 확인 후 mysql character_TB에 캐릭터 저장_ 다래
const saveNexonInfo = async (nexonEmail)=>{

    const nexon_info = await api.getNexonUser(nexonEmail);
    const user_info = await api.getrow('NexonInfo_TB','email_nexon', nexonEmail);
    const user_idx = user_info.idx_user;
    const user_games = nexon_info.games;

    user_games.forEach(await async function(gameinfo){
        const arr_value = [];

        const value_idx_user = {};
        value_idx_user['name'] = 'idx_user'
        value_idx_user['value'] = user_idx;
        arr_value.push(value_idx_user);


        const game_name = gameinfo.game.toString();
        const value_idx_game = {};
        const games_TB = await api.getrow('Games_TB', 'name_game', game_name);
        value_idx_game['name'] = 'idx_game'
        value_idx_game['value'] = games_TB.idx_game;
        arr_value.push(value_idx_game)

 
        const characters = gameinfo.characters;

 
        characters.forEach(await async function(character){
            const value_name = {};
            value_name['name']= 'name_character'
            value_name['value'] = character.NickName
            arr_value.push(value_name)

            const value_money = {};
            value_money['name'] =  'money_character'
            value_money['value'] = character.Money
            arr_value.push(value_money)

            save.insertdb('Characters_TB', arr_value);
            arr_value.pop()
            arr_value.pop()
        });
    }); 
} 



module.exports = saveNexonInfo;