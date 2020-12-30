const api = require('../method/api.js')
const security = require('./security.js')

module.exports = {
    // 이메일 인증 관련 모듈

    // 넥슨 이메일 인증 코드_ 다래
    createCodeMessage: async () => {

        let code = {};
        let auth_code = '';
        let auth_num = 0;

        for (var num = 0; num < 4; num++ ) {
            auth_num = await Math.floor((Math.random() * 9));
            auth_code += String(auth_num)
        }
        
        // user 이메일에 보내는 메세지
        let message_code = ` <br>
                        <h1>Please confirm your Nexon email</h1>
                        <br>
                        <p> Please enter the following code in the membership box </p>
                        <br>
                        <br>
                        <h5> Code : ${auth_code}</h5>
                        <br>`
        code['auth_code'] = auth_code;
        code['message_code'] = message_code;

        return code;
    },

    // 이메일 인증 메세지_ 다래
    createAuthMessage:  async(userName, userEmail) => {
        
        let user_data = await api.getrow('Users_TB','email_user',userEmail);
        let salt = user_data.salt;
        let encrypt = await security.Cipher(userEmail, salt);
        let encrypt_check = encrypt.split('/').join('-');
        let salt_check = salt.split('/').join('-');
        console.log(encrypt_check);
        console.log(salt_check);

        let url = `http://${ipaddress}:5000/server/auth/${encrypt_check}/${salt_check}`
        //user이메일에 보내는 메세지 
        let message = `<br>
                        <h1>Please confirm your email address</h1> 
                        <br> 
                        <br>
                        <p> You have created a Nexon Trade ID with the username: ${userName}. As an extra security measure, <br>
                        please verify this is the correct email address linked to your Nexon Trade ID by <br>
                        clicking the button below.</p>
                        <br>
                        <br>
                        <a href=${url}><button>confirm your email</button></a> 
                        <br>`
         
        return message
    },    
}

