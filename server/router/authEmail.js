const nodemailer = require('nodemailer');
const authutill = require('../utill/authUtill.js');
require('dotenv').config();

module.exports = {
    // 이메일 보내기_ 다래 

    SendEmail: async (userName, userEmail, is_nexon) => {

        let User_name = userName;
        let User_email = userEmail;
        let Subject;
        let Massage;
        let transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.GMAIL_ID,
                pass: process.env.GMAIL_PASSWORD
            }
        });

        if(is_nexon){
            Subject = 'Please confirm your Nexon Email';
            
          let code = await authutill.createCodeMessage();
            console.log(code)
            Massage = code.message_code;
            let auth_code = code.auth_code;

            // 재전송시 db에서 기존 auth_code 삭제
            let resend_check = await api.getrow('SecurityCode_TB', 'nexon_email', User_email)
            if(resend_check){
                await save.deletedb('SecurityCode_TB', 'nexon_email', User_email);
            }

            // 인증코드 db저장, 5분 뒤 삭제_ 다래
            let code_info = [{'name': 'security_code', 'value': auth_code}, {'name': 'nexon_email' , 'value': User_email}];
            save.insertdb('SecurityCode_TB', code_info);
            setTimeout(function(){
                save.deletedb('SecurityCode_TB', 'security_code', auth_code);
            },300000);
            
   // 인증코드와 메세지생성_ 다래
           
        } else {
            Subject = 'Please confirm the email linked to your Nexon Trade ID'
            Massage = await authutill.createAuthMessage(User_name, User_email)
        }
    
        // 메일 보내는 사람, 받을 사람, 메세지 내용
        let mailOptions = {
            from: process.env.GMAIL_ID,
            to: User_email,
            subject: Subject,
            html: Massage
        };

        // 메일보내기    
        transporter.sendMail(mailOptions, function(err, info){
            if(err){
                console.log(err);
            } else {
                console.log('send')
            }
        });
    }
}

