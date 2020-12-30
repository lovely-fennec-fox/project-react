const express = require('express');
const hasher = require('pbkdf2-password')();
const router = express.Router();


var loginBlock = 0;


router.post('/', async (req,res)=>{
    console.log('/server/login요청 받음');
    let login_email = req.body.email;
    let login_password = req.body.password;
    let num = 0;
    let recall = {};
    let re_num = 0;
    let lastFailedLogin;
    


    // serch user from Users_TB
    let user= await api.getrow('Users_TB','email_user',login_email);


    if(user){
        
        if(loginBlock === 1){

        } else {

            hasher({
                password: login_password,
                salt: user.salt
            }, async function(err, pass, salt, hash){
                try {
                    if(hash === user.password_user){
                        console.log('비밀번호 맞음');
                        let userInfo = {}
                        userInfo['email_user'] = user.email_user;
                        userInfo['name_user'] = user.name_user;
                        userInfo['money_platform'] = user.money_platform;
                        userInfo['salt'] = user.salt;  
                        userInfo['image_path'] = user.image_path;
                        res.json({'userInfo':userInfo});

                    } else {

                        console.log("dbuser",user);
                        num = user.countlog + 1
                        await save.updatedb('Users_TB',[{'name':'countlog','value':num}],'email_user', user.email_user);
                        console.log("dblognum",num);
                        recall= await api.getrow('Users_TB','email_user',login_email);
                        let re_num = parseInt(recall.countlog);
                        console.log("re_num",re_num);
                        console.log(typeof re_num);
                        
                        let retry;
                        let retry_time;

                        if(re_num === 5){
                            lastFailedLogin = new Date().getTime();
                            await save.updatedb('Users_TB',[{'name':'checkLastlogin','value':lastFailedLogin}],'email_user', user.email_user);


                            loginBlock = 1;

                            setTimeout(function(){
                                loginBlock = 0;
                            }, 30000)

                            console.log("마지막 시간",lastFailedLogin);  
                            res.json({'message':'로그인 횟수 시도를 초과 하였습니다 30초후 시도해 주세요'});

                            return '';

                        } else if(re_num > 5){
                            recall= await api.getrow('Users_TB','email_user',login_email);
                            retry= new Date().getTime();
                            lastFailedLogin= recall.checkLastlogin;
                            console.log('retry',retry);
                            console.log('lastFailedLogin',lastFailedLogin);
                            retry_time = 30 - parseInt((parseInt(retry) - parseInt(lastFailedLogin))/1000);

                            if(retry_time <= 0){
                                await save.updatedb('Users_TB',[{'name':'countlog','value':0}],'email_user', user.email_user);

                                return '';

                            } else {
                                console.log(retry - lastFailedLogin);
                                console.log('retry_time',retry_time);
                                res.json({'message':'로그인 횟수 시도를 초과 하였습니다' + retry_time + '초후 시도해 주세요'});

                                return '';
                            }
                        } 
                    } 
                        res.json({'message':'비밀번호가 잘못되었습니다.'});
            } catch (err) {
                    console.log(err)
                }
            });
        }

    } else {
            res.json({'message':'회원이 아닙니다. 이메일을 확인해주세요.'});
    }
});


// *********************  return 형태
// {
//     name_user: 'aa',
//     email_user: 'admin@admin.com',
//     money_platform: 100,
//      salt:''
//   }
// 


module.exports= router;
module.exports= router;
