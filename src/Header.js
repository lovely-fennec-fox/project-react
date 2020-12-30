import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.scss';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import AuthButton from './contents/auth/AuthButton.js';
import { withRouter } from 'react-router-dom';
import request from './contents/Request.js';
import axios from 'axios';
const hasher = require('pbkdf2-password')();
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            file: undefined,
            image_change: false,
    
        }
        this.passwordinfo = {};

    }
    isOpen = () => {
        this.setState(prevstate => ({
            modal: !prevstate.modal
        }))
    }
    isToggle = () => {
        this.props.isToggle();
    }
    isLogin = () => {   // 로그인 여부 판단메소드 - 민호

        console.log("1", localStorage);
        if (localStorage.getItem('logininfo')) {
            return true;
        } else {
            return false;
        }
    }
    logOut = () => {  //로그아웃 메소드 - 민호
        console.log('로그아웃 시도');
        localStorage.removeItem('logininfo');
        localStorage.removeItem('chracters');   //character정보 삭제_ 다래
        
        let loginData = {
            isLoggedIn: false,
            username: ''
        };

        sessionStorage.setItem('key', btoa(JSON.stringify(loginData)));
        window.location.href = '/';
    }
    menuSet = () => {       //로그인 여부에 따라 메뉴 출력 메소드-민호
        if (this.isLogin()) {
            let logininfo = JSON.parse(localStorage.getItem('logininfo'));
            this.name_user = logininfo.name_user;
            this.money_platform = logininfo.money_platform;
            this.image_path = logininfo.image_path;
            return (
                <>
                    {/* 로그인후 Nav 설정 */}
                    {/* 이미지 설정 해줘야 함 민호짱 -상욱 */}
                    <table>
                        <tr>
                            <td rowspan="2"><img className="testI" src={this.image_path} alt="" /></td>
                            <td className="tdNav" >{this.name_user}</td>
                            <td className="tdNav" onClick={this.isOpen}>회원정보수정</td>
                            <td className="tdNav"><Link to="/newexchange">환전소</Link></td>
                        </tr>
                        <tr>
                            <td className="tdNav"> 포인트 : {this.money_platform}</td>
                            <td className="tdNav" onClick={() => { this.isToggle() }}>마이페이지</td>
                            <td className="tdNav" onClick={this.logOut}>로그아웃</td>
                        </tr>

                    </table>
                </>
            );
        } else {
            return (
                <>
                    <table className="logTable">
                        <tr>
                            <td><Link to="/login">로그인</Link></td>
                            <td><Link to="/signin">회원가입</Link></td>
                        </tr>
                    </table>
                </>
            );
        }
    }
    handleChange = (evt) => {   //비밀번호 변경 인자값 받아오기-민호
        const { name, value } = evt.target;
        console.log('name:' + name + '\n value: ' + value);
        this.passwordinfo[name] = value;
        evt.preventDefault();
    }
    changePassword = async () => {

        let logininfo = JSON.parse(localStorage.getItem('logininfo'));
        console.log(logininfo);
        let current_salt = logininfo.salt;
        let passwordinfo = this.passwordinfo;
        await hasher({
            password: passwordinfo.current_password,
            salt: current_salt,
        }, async (err, pass, salt, hash) => {
            if (err) throw err;
            else {
                let current_hash = hash;
                let rawdata = await request('post', '/server/checkpassword', { "current_password": current_hash });
                let checkpassword = rawdata.data.issuccess;
                if (!checkpassword) {
                    console.log('현재 비밀번호가 틀렸습니다.');
                    alert('현재 비밀번호가 틀렸습니다.');
                    return;
                }
                // var regex = /^[A-Za-z0-9]{6,12}$/;
                var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!?])[A-Za-z\d$@$!?]{8,}$/;
                console.log(passwordinfo.new_password);
                if (!regex.test(passwordinfo.new_password)) {     //비밀번호 숫자,문자 포함 8~12자리-민호
                    console.log('숫자,문자 포함 8~12자리로 다시 설정하셔야 합니다.');
                    alert('숫자,문자,특수문자 포함 8~12자리로 다시 설정하셔야 합니다.');
                    return;
                };
                if (passwordinfo.new_password !== passwordinfo.confirm_password) {
                    console.log('새로운 비밀번호가 일치하지 않습니다.');
                    alert('새로운 비밀번호가 일치하지 않습니다.');
                    return;
                }
                await hasher({
                    password: passwordinfo.new_password
                }, async (err, pass, salt, hash) => {
                    if (err) throw err;
                    else {
                        passwordinfo.salt = salt;
                        passwordinfo.new_password = hash;
                        passwordinfo.current_password = current_hash;
                        let issuccess = await request('post', '/server/changepassword', passwordinfo);
                        if (issuccess.data.success) {
                            alert('비밀번호 변경이 완료 되었습니다.');
                            logininfo.salt = passwordinfo.salt;
                            localStorage.setItem('logininfo', JSON.stringify(logininfo));
                        }
                        else {
                            alert('비밀번호가 변경되지 않았습니다.');
                        }
                    }
                });
            }
        });
    }
    fileSelectedHandler = (e) => {
        this.setState({
            file: e.target.files[0],
        })
    }
 
    uploadFile = () => {
        console.log('uploadFile실행');
        console.log(this.state.file);
        let formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('username', this.name_user);
        formData.append('origin_image', this.image_path);

        for (let key of formData.entries()) {
            console.log(`${key}`);
        }

        axios({
            url: '/server/uploadimage',
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData,
        }).then((c) => {
            console.log(c);
            let logininfo = JSON.parse(localStorage.getItem('logininfo'));
            logininfo.image_path = c.data.image_path;
            localStorage.setItem('logininfo', JSON.stringify(logininfo));
            this.setState(prevstate => ({
                image_change: !prevstate.image_path,
            }));
        });
    }



    render() {

        let menu = this.menuSet();  //로그인에 따라 메뉴 출력 - 민호

        var Header = {
            fontSize: '30px',
            fontWeight: '1000',
            display: 'block',
            position: 'absolute',
            left: '120px',
            top: '30px',
            margin: '0px auto',
            padding: '0px',
            transform: 'translate(-50%,-50%)',
            color: 'black',
            width: '232px'
        }
        var modal = {
            backgroundColor: '#f2f2f2'
        }
        var infoinput = {
            width: '100%',
            height: '25px',
        }
        var pstyle = {
            fontSize: '12px',
            margin: '5px'
        }
        var image = {
            width: '225px',
            height: '225px'
        }
        return (
            <div className="header">
                <Link to="/"><p style={Header}><img className="mainicon" src="./jpg/nexonicon.jpg" alt="" />Nexon Trade</p></Link>
                <ul className="form">
                    {menu}
                    <Modal className="userinfo" isOpen={this.state.modal} toggle={this.isOpen}>
                        <ModalHeader style={modal} toggle={this.isOpen}>회원정보</ModalHeader>
                        <ModalBody style={modal}>
                            <div>
                                <div className="uploadimg">
                                    <div style={image}><img style={image} className="userinfoimg" src={this.image_path} alt="" /></div>
                                    <input type="file" style={{ display: "none" }} onChange={(e) => { this.fileSelectedHandler(e) }} ref={fileInput => { this.fileInput = fileInput }} />
                                    <AuthButton onClick={() => { this.fileInput.click() }}>변경이미지선택</AuthButton>
                                    <AuthButton onClick={this.uploadFile} >이미지변경</AuthButton>
                                </div>
                                <div className="info">
                                    <p>이름: {this.name_user}</p>
                                    <p>포인트 : {this.money_platform} </p>
                                    <p style={pstyle}>현재 비밀번호 : <input style={infoinput} type="password" name='current_password' onChange={this.handleChange} ></input></p>
                                    <p style={pstyle}>새 비밀번호 : <input style={infoinput} type="password" name='new_password' onChange={this.handleChange}></input></p>
                                    <p style={pstyle}>새 비밀번호 확인 : <input style={infoinput} type="password" name='confirm_password' onChange={this.handleChange} ></input></p>
                                    <button className="pbutton" onClick={this.changePassword}>비밀번호변경</button>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>

                </ul>
            </div>
        )
    }
}

export default withRouter(Header);