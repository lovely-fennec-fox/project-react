import React, { Component } from 'react';
import ExchangeMain from './ExchangeMain'
import 'bootstrap/dist/css/bootstrap.min.css';
import './NewExchange.scss'

class NewExchange extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };
    isLogin = () => {   // 로그인 여부 판단메소드 - 민호

        console.log("1", localStorage);
        if (localStorage.getItem('logininfo')) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        if(!this.isLogin()){
       
          return(  <div>
               <h1>로그인을 부탁드립니다.</h1>
            </div>
            )
    
    } else{
        let logininfo = JSON.parse(localStorage.getItem('logininfo'));
        this.name_user = logininfo.name_user;
        this.money_platform = logininfo.money_platform;
        this.image_path = logininfo.image_path;
        return (
            <>
                {/* 로그인후 Nav 설정 */}
              <div className="newExchange">
                    <ExchangeMain />
                </div>
            </>
        );
    }
}
}
export default NewExchange;

