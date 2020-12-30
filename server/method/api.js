const mongodbSchema = require('../mongodbSchema.js')

const api= {

//mysql
    checkemail:async (user_email)=>{
        let check_stmt=`SELECT EXISTS (SELECT * FROM Users_TB WHERE email_user=?) as success`;
        const [row, fields] = await mydb.query(check_stmt, [user_email]);
        if(row[0].success){
            return true;
        }
        else{
            return false;
        }
        
    },
    gettable:async(table)=>{
        let query=`SELECT * FROM ${table}`;
        const [rows,fields]=await mydb.query(query);
        
        return rows;
    },
    getrow: async (table, requirements, value) => {
        let select_stmt=`SELECT * FROM ${table} WHERE ${requirements}= "${value}"`;
        const [rows, fields] = await mydb.query(select_stmt);        
        return rows[0];
    },

    getrow_list: async (table, requirements, value) => {
        let select_stmt=`SELECT * FROM ${table} WHERE ${requirements}= "${value}"`;
        const [rows, fields] = await mydb.query(select_stmt);        
   
        return rows;
    },
    
    getrow_games: async (value) => {
        let select_stmt=`SELECT DISTINCT idx_game FROM Characters_TB WHERE idx_user= "${value}"`;
        const [rows, fields] = await mydb.query(select_stmt);        
   
        return rows;
    },

    getrow_characters: async (value) => {
        let select_stmt=`SELECT c.idx_user, c.name_character, c.money_character, g.name_game, g.image_path2, e.exchange_rate 
                        FROM Characters_TB AS c
                        LEFT JOIN Games_TB AS g 
                        ON c.idx_game = g.idx_game
                        LEFT JOIN ExchangeRate_TB AS e
                        ON g.idx_game = e.idx_game 
                        WHERE c.idx_user= "${value}"
                        ORDER BY g.idx_game;`
        const [rows, fields] = await mydb.query(select_stmt);        
   
        return rows;
    },

//end mysql    
//mongodb

    getNexonUser: async (nexon_email) => {
        var result = await mongodbSchema.find({nexonEmail: nexon_email})
        return result[0];
    }    


//end mongodb


}
module.exports=api;