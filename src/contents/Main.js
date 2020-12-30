import React, { Component } from 'react';
import Chart from './Chart';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import './Main.scss';
import LoginModal from './LoginModal';
import request from './Request.js';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            gamelist: "",
            isModalOpen: false,
        }
        this.modalmessage = ``;
    }
    listControl = (chart) => {   //게임 리스트목록 중 Collapse가 오픈 된 것을 한 개로 유지시키기 위한 메소드- 민호
        chart.setState(prevstate => ({  //클릭한 게임리스트 collapse on/off - 민호
            collapse: !prevstate.collapse,
        }));
        // 조건에 따라 전에 클릭했던 게임리스트의 collapse를 컨트롤 - 민호
        if (this.chart !== undefined&&this.chart!==chart&&this.chart.state.collapse===true){
            this.chart.setState(prevstate => ({ // 전에 클릭했던 게임리스트 collapse on/off - 민호
                collapse: !prevstate.collapse,
            }))
        }
        this.chart = chart;
    }

    simpleexchange = async () => {      //거래 데이터를 정제해서 서버에 거래요청 하는 메소드- 민호
        console.log(this.exchangeinfo);
        let logininfo = JSON.parse(localStorage.getItem('logininfo'));
        let email = logininfo.email_user;
        let gamename = this.game_name;
        let gamelist = JSON.parse(localStorage.getItem('gamelist'));
        let game_num = gamelist.filter((game) => { return game.name_game === gamename });
        let exchangerate = JSON.parse(localStorage.getItem('exchangerate'));
        let ex_rate = exchangerate.filter((rate) => { return rate.idx_game === game_num[0].idx_game });
        let characterInfo = [];
        for (let num in this.exchangeinfo) {
            let character = {};
            character.character_name = this.exchangeinfo[num].char_name;
            character.change_Gmoney = this.exchangeinfo[num].change_money;
            character.change_Pmoney = this.exchangeinfo[num].change_platform;
            character.ex_rate = ex_rate[0].exchange_rate;
            character.moneydir = this.money_direction;
            character.fee = this.exchangeinfo[num].fee;
            if (character.moneydir === "G2P") {
                character.change_Gmoney = -1 * parseInt(character.change_Gmoney);
            } else {
                character.change_Pmoney = -1 * parseInt(character.change_Pmoney);
            }
            characterInfo.push(character);
        }
        console.log(characterInfo);
        await request('post', '/server/exchange/saveinfo', { "userinfo": { "email": email }, "characterInfo": characterInfo, });
    }
    isOpen = (exchangeinfo, money_direction, game_name) => {    //거래하기 눌렀을 때 간편결제창 모달 - 민호
        if (!this.state.modal) {
            let logininfo = JSON.parse(localStorage.getItem('logininfo'));
            let total_platform = logininfo.money_platform;
            let platform_result = 0;
            let platformdata = "";

            let fee_data = "";
            let fee_result = 0;

            this.modalmessage = [];
            this.modalmessage.push(<p key={3}>{game_name + " " + money_direction}</p>);

            for (const i in exchangeinfo) {
                let data = "";
                let result = 0;
                let fee = 0;
                if (money_direction === "G2P") {
                    result = parseInt(exchangeinfo[i].origin_money) - parseInt(exchangeinfo[i].change_money);
                    data = <p key={i}>{exchangeinfo[i].char_name + " : " + exchangeinfo[i].origin_money + " - " + exchangeinfo[i].change_money + " = " + result}</p>;
                    platform_result += parseInt(exchangeinfo[i].change_platform);
                    platformdata += " + " + exchangeinfo[i].change_platform;

                    fee = Math.round((parseInt(exchangeinfo[i].change_platform) / 20) / 10) * 10;
                    exchangeinfo[i].fee = fee;
                    fee_result += fee;
                    fee_data += fee + " + ";
                    if (parseInt(i) === exchangeinfo.length - 1) {
                        platformdata += " - " + fee_result;
                        platform_result -= fee_result;

                    }
                } else {
                    result = parseInt(exchangeinfo[i].origin_money) + parseInt(exchangeinfo[i].change_money);
                    data = <p key={i}>{exchangeinfo[i].char_name + " : " + exchangeinfo[i].origin_money + " + " + exchangeinfo[i].change_money + " = " + result}</p>;
                    platform_result -= parseInt(exchangeinfo[i].change_platform);
                    platformdata += " - " + exchangeinfo[i].change_platform;
                }

                this.modalmessage.push(data);
            }
            platform_result += total_platform;
            fee_data = fee_data.substr(0, fee_data.length - 3);
            this.modalmessage.push(<p key={4}>{"수수료 : " + fee_data + " = " + fee_result}</p>);
            this.modalmessage.push(<p key={5}>{"플랫폼 머니 : " + total_platform + platformdata + " = " + platform_result}</p>);
            this.money_direction = money_direction;
            this.game_name = game_name;
            this.exchangeinfo = exchangeinfo;
        }
        this.setState(prevstate => ({
            modal: !prevstate.modal,
        }));
    }
    isToggle = () => {
        this.setState(prevstate => ({
            isModalOpen: !prevstate.isModalOpen,
        }));
    }
    componentDidMount = () => { //게임의 정보와 환전률을 셋팅 - 민호
        let gamelist = JSON.parse(localStorage.getItem('gamelist'));
        let exchangerate = JSON.parse(localStorage.getItem('exchangerate'));
        let list = [];
        if (this.props.characterinfo) {
            let characterinfo = this.props.characterinfo;

            for (let num in gamelist) {
                let character = characterinfo.filter((character) => {
                    return character.idx_game === parseInt(num) + 1;
                });
                let chan = "10P = " + exchangerate[num].exchange_rate + "0";
                list.push(<div key={num}><Chart name={gamelist[num].name_game} number={parseInt(num) + 1} characterinfo={character} change={chan} img={gamelist[num].image_path} gameintro={gamelist[num].game_intro} isOpen={this.isOpen} alt="" exchange_rate={exchangerate[num].exchange_rate} listControl={this.listControl} /></div>);
            }
        }
        else {
            for (let num in gamelist) {
                let chan = "10P = " + exchangerate[num].exchange_rate + "0";
                list.push(<div key={num}><Chart name={gamelist[num].name_game} change={chan} img={gamelist[num].image_path} gameintro={gamelist[num].game_intro} isOpen={this.isOpen} alt="" isToggle={this.isToggle} exchange_rate={exchangerate[num].exchange_rate} /></div>);
            }
        }
        this.setState({
            gamelist: list
        });
    }
    render() {
        return (

            <div className="aaa">
                <div className="search">
                </div>
                <div className="body">
                    {this.state.gamelist}
                </div>
                <Modal isOpen={this.state.modal} toggle={() => { this.isOpen([], "", "") }}>
                    <ModalHeader toggle={() => { this.isOpen([], "", "") }}>바로 결제하시겠습니까?</ModalHeader>
                    <ModalBody>
                        {this.modalmessage}
                        <Button color="success" onClick={this.simpleexchange}>이것만 결제할래요.</Button>
                        <Button color="link"><Link to="/exchange" params={{ exchangeinfo: this.exchangeinfo, game_name: this.game_name, money_direction: this.money_direction }}>다른 게임도 볼래요.</Link></Button>
                    </ModalBody>
                </Modal>

                {/* 헤더와 로그인폼 끝 (상욱 07.25) */}
                <LoginModal isOpen={this.state.isModalOpen} isToggle={this.isToggle} />

            </div>

        )
    }
}
export default Main;