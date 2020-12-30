import React, { Component } from 'react';
import AuthButton from './auth/AuthButton.js';
import RightAlignedLink from './auth/RightAlignedLink.js';
import AuthContent from './auth/AuthContent.js';
import InputWithLabel from './auth/InputWithLabel.js';
import InputWithLabelButton from './auth/InputWithLabelButton';
import InputWithButton from './auth/InputWithButton';
import {withRouter} from 'react-router-dom';
import './Signin.scss';
import {Link} from 'react-router-dom'
import request from './Request';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.Signininfo = {}; //회원정보를 담아올 그릇-민호
        this.state = {
            isdisabled: false,   //넥슨 이메일 입력란 disabled인자 -민호
            isdisabled2: true    //넥슨 인증코드 입력란 disabled인자 - 민호
        }
    }
    handleChange = (evt) => {   //인자값 받아오기-민호
        const { name, value } = evt.target;
        if (name === 'confirmcode') {
            this.nexoncode = evt.target;
        }
        if (name === "nexonemail") {
            this.nexonemail = evt.target;
            console.log(this.nexonemail.disabled);
        }
        console.log('name:' + name + '\n value: ' + value);
        this.Signininfo[name] = value;
        evt.preventDefault();
    }
    trySignin = async () => { //회원가입 메소드- 민호
        console.log(this.Signininfo);
        let regExp =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; //
        if (!regExp.test(this.Signininfo.email)) {       //이메일 정규식 체크-민호
            console.log('이메일이 아닙니다');
            alert('이메일 형식이 아닙니다.');
            return;
        };
        // var regex = /^[A-Za-z0-9]{6,12}$/;

        var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!?*])[A-Za-z\d$@$!?*]{8,12}$/;

        if (!regex.test(this.Signininfo.password)) {     //비밀번호 숫자,문자,특수문자 포함 8자리이상-민호
            console.log('비밀번호를 다시 설정하셔야 합니다.');
            alert('비밀번호를 다시 설정하셔야 합니다.');
            return;
        };

        if (!this.Signininfo.password === this.Signininfo.passwordconfirm) { //비밀번호 체크-민호
            console.log('비밀번호가 일치 하지 않습니다.');
            alert('비밀번호가 일치 하지 않습니다.');
            return;
        }
        if (this.nexonemail.disabled === false) {     //넥슨 이메일 인증 체크-민호
            console.log('넥슨 이메일이 인증 되지 않았습니다.');
            alert('넥슨 이메일이 인증 되지 않았습니다.');
            return;
        }
        let issuccess = await request('post', '/server/signin', this.Signininfo); //서버에회원가입 요청-민호 
        console.log(issuccess.data.success);
        if (issuccess.data.success) {
            alert('회원가입 이메일을 전송하였습니다.');
            this.props.history.push('/confirm');
        } else {
            alert('이미 가입한 이메일 입니다');
        }
    }

    sendCode = async () => {
        console.log('넥슨 코드 요청');
        // let regExp = /[a-z0-9]{2,}@nexon.com/i;
        // if (!regExp.test(this.Signininfo.nexonemail)) {       //넥슨 이메일 정규식 체크- 민호
        //     console.log('넥슨 이메일이 아닙니다');
        //     alert('넥슨 이메일 형식이 아닙니다.');
        //     return;
        // };
        await request('post', '/server/email/nexon', { 'nexonemail': this.Signininfo.nexonemail });  //서버에 넥슨 이메일코드 전송요청-민호
        this.setState({
            isdisabled2: false,
        });
    }
    checkCode = async () => { ////서버에 넥슨 코드 인증요청-민호
        console.log('넥슨코드 체크요청 보냄');
        let issuccess = await request('post', '/server/checkcode', { 'code': this.nexoncode.value });
        if (issuccess.data.success) {
            this.setState(prevstate => ({
                isdisabled: !prevstate.disabled,
                isdisabled2: true,
            }));
            alert("넥슨아이디 인증이 완료되었습니다.");
         
        } else {
            alert('코드가 틀렸습니다.');
        }
    }
    isLogin = () => {
        if(localStorage.getItem('logininfo')){
            return true;
        }else{
            return false;
        }
        
    }
    render() {
        if(!this.isLogin()){
        return (    //민호
            <div className="signinform">
                <AuthContent title="회원가입">
                    <InputWithLabel label="이메일" name="email" placeholder="이메일" onChange={this.handleChange} />
                    <InputWithLabel label="이름" name="username" placeholder="이름" onChange={this.handleChange} />
                    <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password" onChange={this.handleChange} />
                    <InputWithLabel label="비밀번호 확인" name="passwordconfirm" placeholder="비밀번호 확인" type="password" onChange={this.handleChange} />
                    <InputWithLabelButton label="넥슨이메일" name="nexonemail" placeholder="넥슨 이메일" onChange={this.handleChange} onClick={this.sendCode} disabled={this.state.isdisabled} />
                    <InputWithButton name="confirmcode" placeholder="넥슨 이메일 인증 코드" onChange={this.handleChange} onClick={this.checkCode} disabled={this.state.isdisabled2} />
                    <AuthButton onClick={this.trySignin}>회원가입</AuthButton>
                    <RightAlignedLink to="/login">로그인</RightAlignedLink>
                </AuthContent>
            </div>
        )
    } else{
         return(
             <div>
             <h1>이미 회원가입을 하셨습니다</h1>
             <Link to="/">홈으로</Link>
             </div>
         )
    }
    }
}
export default withRouter(Signin);
//민호 19.08.01