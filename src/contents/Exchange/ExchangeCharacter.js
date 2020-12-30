import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, InputGroupText, InputGroupAddon, Input, Row, Col } from 'reactstrap';
import './ExchangeCharacter.scss'



class ExchangeCharacter extends Component {
    constructor(props){
        super(props);     
        this.state = {
            moneyValue: 0,
            platform_money: JSON.parse(localStorage.getItem('logininfo')).money_platform
        };
    };

    showOption() {

        let logininfo = JSON.parse(localStorage.getItem('logininfo'));
        let platform_money = logininfo.money_platform;

        console.log("지금 상태 : ", this.props.cSelected)

        if(this.props.cSelected === '플랫폼머니로 변경하기'){
            let list = [];
            let rate = this.props.rate;
            let characterMoney = this.props.characterMoney;
            let number = 10

            for (let num= 0; num <= 100; num=num+10) {
                list.push(<option key={num}> {num * rate} </option>);
            };

            return list;

        } else if(this.props.cSelected === '게임머니로 변경하기'){
            let list2 = [];

            for (let num= 0; num <= platform_money; num=num+10) {
                list2.push(<option key={num}> {num} </option>);
            };

            return list2;
        }

    };



    setReceipt= async ()=> {
 
        let Info = {}

        if(this.props.cSelected === '플랫폼머니로 변경하기'){
            Info['check'] = 1;
            Info['game_name'] = this.props.name;  // user 이름
            Info['character_name'] = this.props.characterName; // character 이름
            Info['money'] = parseInt(this.state.moneyValue);  // character money
            Info['money_with_rate'] = parseInt(parseInt(this.state.moneyValue) / parseInt(this.props.rate)); // 환율 적용 
            Info['fee'] = parseInt(parseInt(this.state.moneyValue) * 0.05); // 수수료
            Info['remain_game_money'] = parseInt(this.props.characterMoney) - parseInt(this.state.moneyValue) - parseInt(parseInt(this.state.moneyValue) * 0.05);
            Info['remain_platform_money'] = parseInt(this.state.platform_money) + parseInt(parseInt(this.state.moneyValue) / parseInt(this.props.rate)) - parseInt(parseInt(this.state.moneyValue) * 0.05);
            Info['selected'] = this.props.cSelected;
            await this.props.changeMoney(Info['money'],Info['fee'])
            await this.props.changeState(Info);

        } else if(this.props.cSelected === '게임머니로 변경하기'){
            Info['check'] = 1;
            Info['game_name'] = this.props.name;
            Info['character_name'] = this.props.characterName;
            Info['money'] = parseInt(this.state.moneyValue);
            Info['money_with_rate'] = parseInt(parseInt(this.state.moneyValue) * parseInt(this.props.rate));
            Info['fee'] = 0
            Info['remain_game_money'] = parseInt(this.props.characterMoney) + parseInt(parseInt(this.state.moneyValue) * parseInt(this.props.rate));
            Info['remain_platform_money'] = parseInt(this.state.platform_money) - parseInt(this.state.moneyValue);
            Info['selected'] = this.props.cSelected;
            await this.props.changeMoney(Info['money_with_rate'],Info['fee'])
            await this.props.changeState(Info);
        }
    }



    render() {
        return (
            <Row className='characterInfo'>    
                <Col xs="3"> 
                    <Row className='characterName'>
                        <Col xs="5" className='characterNametitle'> ID
                        </Col>
                        <Col xs="7" className='characterNamevalue'> {this.props.characterName}
                        </Col>
                    </Row>
                    <Row className='characterMoney'>
                        <Col xs="5" className='characterMoneytitle'> Money
                        </Col>
                        <Col xs="7" className='characterMoneyvalue'> {this.props.characterMoney}
                        </Col>
                    </Row>
                </Col>
                <Col xs="8" className="ListInfoBody_input_col" >
                    <InputGroup className="ListInfoBody_input">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className="moneytitle">{this.props.cSelected}</InputGroupText>
                        </InputGroupAddon>
                        <Input className="money" type="select" name="select" id="exampleSelect" onChange={async (e) => { await this.setState({moneyValue: e.target.value}); await this.setReceipt();}}>
                            {this.showOption()}
                        </Input>
                    </InputGroup>
                </Col>
            </Row> 
        )
    };
};
export default ExchangeCharacter;
