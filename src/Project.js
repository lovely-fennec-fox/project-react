import React, { Component } from 'react';
import './Project.scss';
import Header from './Header';
import Main from './contents/Main';

import Login from './contents/Login';
import Signin from './contents/Signin';
import Mypage from './Mypage';
import Footer from './Footer';
import Auth from './contents/Auth';
import Confirm from './contents/Confirm';
import NewExchange from './contents/Exchange/NewExchange'
import Errorpage from './contents/Errorpage'
import { BrowserRouter, Route , Switch } from 'react-router-dom';
import request from './contents/Request';



class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            characterinfo:"",
            
        }
    }
    isToggle = () => {
        this.setState(prevstate => ({
            isOpen: !prevstate.isOpen,
        }));
    }
    getdata= async()=>{
        let rawdata1 = await request('get', '/server/gameinfo', {});
        let rawdata2 = await request('get', '/server/exchangerate', {});
        localStorage.setItem('gamelist', JSON.stringify(rawdata1.data.gamelist));
        localStorage.setItem('exchangerate', JSON.stringify(rawdata2.data.exchangerate));
        localStorage.setItem('Infos','[]');// 계산서 관련 data 저장소_ 다래
    }
    getCharacter=async()=>{
        if(localStorage.getItem('logininfo')){
            let logininfo = JSON.parse(localStorage.getItem('logininfo'));
            let rawdata= await request('post','/server/character',{useremail:logininfo.email_user});
            let characterinfo=rawdata.data.characterinfo;
            let new_rawdata = await request('post','/server/character/userinfo',{useremail:logininfo.email_user});  //.. character 정보를 받아오는 방법을 바꿔서 다시 가져옴, localStorage에 저장함_ 다래
            localStorage.setItem('chracters', JSON.stringify(new_rawdata.data.characterinfo));
            console.log("character정보");
            console.log(characterinfo);
            this.setState({
                characterinfo:characterinfo,
            })
        }
    }
    componentDidMount=()=>{
        console.log('project재실행');
        this.getCharacter();
        this.getdata();
    }
    render() {
        return (
            <BrowserRouter className='Project'>
                <div>
                    <Header isToggle={this.isToggle} />{/*Navbar 부분 */}
                </div>
                <div className="ContentsBox">
                    <div id="Contents" style={{ width: this.state.isOpen ? '70%' : '100%'}}>{/*내용 부분 */}
                        <Switch>
                        <Route exact to path="/" component={() => <Main  characterinfo={this.state.characterinfo}/>}/>
                        <Route path="/login" component={() => <Login getCharacter={this.getCharacter}/>}/>
                        <Route path="/signin" component={Signin} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/confirm" component={Confirm} />
                        <Route path='/newExchange' component={NewExchange} isOpen={this.state.isOpen} />
                        <Route component={Errorpage} />
                        </Switch>
                    </div>
                    <div id="Mypage" style={{ width: this.state.isOpen ? '30%' : '0%'}}  >{/*마이페이지 부분 */}
                        <Mypage characterinfo={this.state.characterinfo}/>
                    </div>
                </div>
                <div className="footer">
                    <Footer />{/* footer 부분*/}
                </div>
            </BrowserRouter>
        )
    }
}

export default Project;        