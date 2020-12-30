const save = {

    plusUser: async (userinfo) => {   //데이터베이스에 유저 데이터 추가 -민호
       //User_TB에 추가 -민호
       console.log(userinfo);
       let query = 'INSERT INTO Users_TB (name_user, email_user,password_user,salt) VALUES (?,?,?,?)';
       let [result, field]=await mydb.query(query, [userinfo.username, userinfo.email, userinfo.password, userinfo.salt]);
       console.log(result);
        let query2 = 'SELECT idx_user FROM Users_TB WHERE email_user=?';
       let [result2, field2]=await mydb.query(query2, [userinfo.email]);
       console.log(result2);

       let query3 = 'INSERT INTO NexonInfo_TB (email_nexon, idx_user) VALUES (?,?)';
       let [result3,field3]=await mydb.query(query3, [userinfo.nexonemail ,result2[0].idx_user]);
       console.log(result3);
   },

    insertdb: async(table,array)=>{
       console.log('save.insertdb메소드 실행');
       console.log('table: '+table);
       console.log('array: '+array);
       let query=await save.insertquery(table,array);
       let [result, field2]=await mydb.query(query);
       console.log(result);
       return query;
   },
   insertquery:async(table,array)=>{
       let column="";
       let value="";
       array.forEach(element => {
           column+=`${element.name},`;
           value+=`"${element.value}",`;
       });

       column=column.substring(0, column.length-1);
       value=value.substring(0, value.length-1);
       let query=`INSERT INTO ${table} (${column}) VALUES (${value})`;
       console.log(query);
       return query;
   },
    updatedb:async(table,array,requirement,value)=>{
       let query=await save.updatequery(table,array,requirement,value); 
       let [result, field2]=await mydb.query(query);
       console.log(result);
       return query;
   },
   updatequery:async(table,array,requirement,value)=>{
       let set="";
       array.forEach(element => {
           if(element.name!=="update_at"){
           set+=`${element.name}="${element.value}",`;
           }else{
            set+=`${element.name}=${element.value},`;
           }
       });
       set=set.substring(0, set.length-1);
       let query=`UPDATE ${table} SET  ${set} WHERE ${requirement}="${value}"`;
       console.log(query);
       return query;
   },
    deletedb:async(table,requirement,value)=>{
       let query=`DELETE FROM ${table} WHERE ${requirement}="${value}"`;
       let [result, field2]=await mydb.query(query);
       console.log(query);
       // return query;
   },
}
module.exports=save;