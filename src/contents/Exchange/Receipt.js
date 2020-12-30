import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Row, Col, Button } from 'reactstrap';
import './Receipt.scss'
import axios from 'axios';

class Receipt extends Component {
    constructor(props){
        super(props);
        this.state = {
            platform_money: JSON.parse(localStorage.getItem('logininfo')).money_platform,
            saveData:[],
        };
    };


    createReceipt=()=>{
        let list = [];
        let game_name_check = {};
        let infos = this.props.Infos;
        let save_data = [];

        for (let num in infos){
            game_name_check[infos[num].character_name] = infos[num];
        }
        
        let key_list = Object.keys(game_name_check);
        let remain_money = parseInt(this.state.platform_money); // user의 Platform money

        for (let num2 in key_list){
            if(this.props.cSelected === '플랫폼머니로 변경하기'){
                remain_money += parseInt(game_name_check[key_list[num2]].money_with_rate)

                if(remain_money<0){
                    list.push('플랫폼 금액이 부족합니다.')
                    
                    return list
    
                } else if(game_name_check[key_list[num2]].money == 0){
    
                } else{
                list.push(<tr key={num2}>
                    <th scope="row">{ parseInt(num2) + 1 }</th>
                    <td>{game_name_check[key_list[num2]].game_name}</td>
                    <td>{game_name_check[key_list[num2]].character_name}</td>
                    <td>{game_name_check[key_list[num2]].money}</td>
                    <td>{game_name_check[key_list[num2]].money_with_rate}</td>
                    <td>{game_name_check[key_list[num2]].fee}</td>
                    <td>{game_name_check[key_list[num2]].remain_game_money}</td>
                    <td>{remain_money}</td>
                    </tr> )
    
                save_data.push(game_name_check[key_list[num2]]);
                }    
            } else {
                remain_money -= parseInt(game_name_check[key_list[num2]].money)

                if(remain_money<0){
                    list.push('플랫폼 금액이 부족합니다.')
                    
                    return list
    
                } else if(game_name_check[key_list[num2]].money == 0){
    
                } else{
                list.push(<tr key={num2}>
                    <th scope="row">{ parseInt(num2) + 1 }</th>
                    <td>{game_name_check[key_list[num2]].game_name}</td>
                    <td>{game_name_check[key_list[num2]].character_name}</td>
                    <td>{game_name_check[key_list[num2]].money}</td>
                    <td>{game_name_check[key_list[num2]].money_with_rate}</td>
                    <td>{game_name_check[key_list[num2]].fee}</td>
                    <td>{game_name_check[key_list[num2]].remain_game_money}</td>
                    <td>{remain_money}</td>
                    </tr> )
    
                save_data.push(game_name_check[key_list[num2]]);
                }    
            }
        }    
        
        console.log("save_data :", save_data);
       
        let send_data = {
            exchangeData: save_data,
            userInfo: localStorage.getItem('logininfo')
        }

        axios({
            url: 'http://localhost:5000/server/exchange/saveinfo',
            method: 'post',
            data: send_data
          });

        return list
    };







    render() {
        return (
            <div className='Receipt'>
                <div className='ReceiptBody'>
                <h1> {this.props.user_name}님의 계산서 </h1>
                <p> 마우스를 올려놓으면 전체 계산서가 보여요 </p>

                <Table size="sm">
                    <thead>
                        <tr>
                            <th> </th>
                            <th>게임 이름</th>
                            <th>캐릭터 이름</th>
                            <th>금액</th>
                            <th>금액(환율적용)</th>
                            <th>수수료</th>
                            <th>게임_남은 금액</th>
                            <th>플랫폼_남은 금액</th>
                        </tr>    
                    </thead>
                    <tbody id='tbody'>
                        {this.createReceipt()}
                    </tbody>
                </Table>
                <Row>
                    <Col> <Button color="secondary" onClick={this.props.clearData()}> 취소 </Button>
                    </Col>
                    <Col> <Button color="danger" onClick={this.props.saveData()}> 바꾸기 </Button>
                    </Col>
                </Row>
            </div>
        </div>
        )
    }
}
export default Receipt;

