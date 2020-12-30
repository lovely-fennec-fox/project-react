import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { } from 'reactstrap';
import ExchangeGameList from './ExchangeGameList';
import './ExchangeBody.scss'
import Receipt from './Receipt'
import axios from 'axios';

class ExchangeBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: JSON.parse(localStorage.getItem('gamelist')),
            rates: JSON.parse(localStorage.getItem('exchangerate')),
            check: 0,
            game_name: '',
            money:0,
            money_with_rate: 0,
            fee: 100,
            remain_game_money:0,
            remain_platform_money:0,
            selected: '',
            showReceipt:'',
            };
        this.changeState = this.changeState.bind(this);
        this.showReceipt = this.showReceipt.bind(this);
        };


    changeState= async (Info)=> {

        let data = JSON.parse(localStorage.getItem('Infos'))

        data.push(Info);
        localStorage.setItem('Infos', JSON.stringify(data)) 

        this.setState({
        check: Info.check,
        game_name: Info.game_name,
        money:Info.money,
        money_with_rate: Info.money_with_rate,
        fee: Info.fee,
        remain_game_money:Info.remain_game_money,
        remain_platform_money:Info.remain_platform_money,
        selected:Info.selected,
        showReceipt:await this.showReceipt(data)
        })

    };


    saveData = ()=> {

        console.log('여기에 들어와야대')
        axios({
            url: 'http://localhost:5000/server/exchange/saveinfo',
            method: 'post',
            data: {insertCheck: "approval"}
          });
    }

    clearData() {

    }



    showReceipt(data) {
    
    if (this.state.check === 1){
        let user_info = JSON.parse(localStorage.getItem('logininfo'));

        return <Receipt Infos={data}
            cSelected={this.props.cSelected}      
            check={this.state.check}
            user_name={user_info.name_user}
            saveData={this.saveData}
            clearData={this.clearData}
            />
        }
    };


    gameList() {

        if (localStorage.getItem('chracters')) {

            let game_info = JSON.parse(localStorage.getItem('chracters'));
            let list = [];
            let gameInfo = game_info.games;
            let gameName = '';
            let exchangeRate = '';
            let img = '';
            let characterList = [];

            for (let num in gameInfo) {
                gameName = gameInfo[num].name_game;
                exchangeRate = gameInfo[num].exchange_rate;
                img = gameInfo[num].img;
                characterList = gameInfo[num].characters;

                list.push(<div key={num + 300}>
                    <ExchangeGameList cSelected={this.props.cSelected}
                        name={gameName}
                        img={img}
                        rate={exchangeRate}
                        character={characterList} 
                        changeState={this.changeState}
                        />
                </div>);
            };
            return list;

        } 
    };



    render() {

        return (
            <div className="ExchangeBody">
                {this.gameList()}
                <div className="ExchangeReceipt">
                    {this.state.showReceipt}
                </div>
            </div>
        )
    }
}
export default ExchangeBody;
