import React, { Component } from 'react';
import AuthButton from './auth/AuthButton.js';
import AuthContent from './auth/AuthContent.js';
import InputWithLabel from './auth/InputWithLabel.js';
import './Login.scss';
import { withRouter } from 'react-router-dom';
import request from './Request.js';
import {Link} from 'react-router-dom'


class Login extends Component {
    constructor(props) {
        super(props);
        this.logininfo = {};  //로그인 시도 정보 담아오는 그릇-민호
    }


    isLogin = () => {   // 로그인 여부 판단메소드 - 민호

        console.log("1", localStorage);
        if (localStorage.getItem('logininfo')) {
            return true;
        } else {
            return false;
        }
    }

    handleChange = (e) => { //로그인 시도 정보를 받아오는 메소드 -민호
        const { name, value } = e.target;
        console.log('name:' + name + ' value' + value);
        this.logininfo[name] = value;
        e.preventDefault();
    }
    handlekeypress = (e) => {       //엔터키 입력시 로그인 버튼 클릭 메소드 - 민호
        console.log(e.charCode);
        if (e.charCode === 13) {
            this.tryLogin();
        }
    }
    getCharacter = async () => {
        await this.props.getCharacter();
    }
    tryLogin = async () => {    //로그인시도 메소드 -민호
        console.log(this.logininfo);
        let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (!regExp.test(this.logininfo.email)) {      
            console.log('이메일이 아닙니다');
            alert('이메일 형식이 아닙니다.');
            return;
        };

        let issuccess = await request('post', '/server/login', this.logininfo); //서버에 로그인 요청- 민호
        if (issuccess.data.userInfo !== undefined) {
            localStorage.setItem('logininfo', JSON.stringify(issuccess.data.userInfo));//로컬 스토리지에 로그인 정보 저장-민호
            await this.getCharacter();

            console.log('issuccess.data.userInfo', issuccess.data.userInfo)
            let loginData = {
                isLoggedIn: true,
                username: JSON.stringify(issuccess.data.userInfo.email_user)
            };
            sessionStorage.setItem('key', btoa(JSON.stringify(loginData)));
            this.props.history.push('/');   //메인페이지로 이동-민호
        } else {
            alert(issuccess.data.message);  //로그인 실패시 메세지-민호
        }

    }

    render() {
        if (!this.isLogin()) {

            return (
                <>
                    <div className='loginform'>
                        <AuthContent title="로그인">
                            <InputWithLabel label="이메일" name="email" placeholder="이메일" onChange={this.handleChange} onKeyPress={this.handlekeypress} autoFocus={true} />
                            <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password" onChange={this.handleChange} onKeyPress={this.handlekeypress} />
                            <AuthButton onClick={this.tryLogin}>로그인</AuthButton>
                        </AuthContent>
                    </div>
                </>
            )
        }
        else {
            return (
                <div>
                    <h1>이미 로그인을 하셨습니다.</h1>
                    <Link to="/">홈으로</Link>
                </div>
            )
        }
    }
}
export default withRouter(Login);