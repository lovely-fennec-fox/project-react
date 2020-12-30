import React, { Component } from 'react';
import { Collapse, Card, CardBody, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chart.scss';


class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      money_direction: "G2P",
      disabled: true,
    };
    this.readonly = false;
    this.direction = "-->";
    this.exchangeinfo = {};
    this.exchange_totalplatform = 0;
    this.totalmoney = 0;
  }
  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.exchangeinfo[name] = value;
    let num = name.charAt(0);
    let logininfo = JSON.parse(localStorage.getItem('logininfo'));
    if (logininfo !== undefined) {
      this.money_platform = logininfo.money_platform;
    }
    if (this.state.money_direction === "G2P") { //게임머니 ==> 플랫폼머니일 경우 조건에 따라 결제하기 버튼 on/off - 민호
      console.log("환율 곱하기 게임 머니" + 1 / this.props.exchange_rate * value);
      this.exchangeinfo[num + "platform"] = 1 / this.props.exchange_rate * value;
      this[num + "platform"].value = this.exchangeinfo[num + "platform"];
      if (value <= this.props.characterinfo[num].money_character) {
        console.log("1");
        let isvalid = true;
        for (let key in this.exchangeinfo) {
          if (key.match(/platform/) !== null) { //환전할 플랫폼머니의 값만 거르는 것  - 민호
            //환전할 플랫폼머니가 10단위이고 최소 10포인트 이상인지 확인하는 조건문 - 민호
            if (this.exchangeinfo[key] % 10 !== 0 || this.exchangeinfo[key] < 10) {
              isvalid = false;
              break;
            }
          }
          else {  //환전할 게임머니의 값 - 민호
            //환전할 게임머니가 갖고 있는 게임머니보다 적게 입력했는지 확인 - 민호
            if (this.exchangeinfo[key] > this.props.characterinfo[key.charAt(0)].money_character) {
              isvalid = false;
              break;
            }
          }
        }
        if (isvalid) {
          this.setState({
            disabled: false,
          });
        }
      }
      else if (this.state.disabled === false) {
        console.log("2");
        this.setState({
          disabled: true,
        });
      }
    }
    else {
      console.log("환율 나누기 플랫폼 머니" + (this.props.exchange_rate * value));
      this.exchangeinfo[num + "game"] = this.props.exchange_rate * value;
      this[num + "game"].value = this.exchangeinfo[num + "game"];
      if (value >= 10&&value % 10 === 0) {
        let total_platform = 0;
        for (let key in this.exchangeinfo) {
          if (key.match(/platform/) !== null) {
            total_platform += parseInt(this.exchangeinfo[key]);
          }
        }
        if (total_platform <= this.money_platform) {
          this.setState({
            disabled: false,
          });
        }
      } else if (this.state.disabled === false) {
        this.setState({
          disabled: true,
        });
      }
    }
    evt.preventDefault();
  }
  toggle = () => {    // 게임리스트 자세히 보기 on/off - 상욱
    if (localStorage.getItem('logininfo')) {
      this.props.listControl(this);
    }
    else { //로그인 안되었을 경우 Project.js에서 모달 isOpen:true로 바뀜
      this.props.isToggle();
    }
  }
  isOpen = (exchangeinfo) => {
    //데이터 정제

    let info = [];
    for (let num in this.props.characterinfo) {
      let data={};
      data.char_name=this.props.characterinfo[num].name_character;
      data.origin_money=this.props.characterinfo[num].money_character;
      if(!exchangeinfo[num+"game"]){
        data.change_money = 0;
      }else{
        data.change_money=exchangeinfo[num+"game"];
      }
      if(!exchangeinfo[num+"platform"]){
        data.change_platform =0;
      }
      else{
        data.change_platform=exchangeinfo[num+"platform"];
      }
      
      info.push(data);
    }
    console.log(info);
    this.props.isOpen(info, this.state.money_direction, this.props.name);

  }
  directionchange = (e) => {    //셀렉트바 바뀔 때 돈의 이동경로 방향을 바꿈
    if (this.state.money_direction === "G2P") {
      this.direction = "<--";
      this.readonly = true;
    }
    else {
      this.direction = "-->";
      this.readonly = false;
    }
    for (let key in this.exchangeinfo) {
      console.log(key + '=>' + this.exchangeinfo[key]);
      this[key].value = "";
    }
    this.exchangeinfo = {};
    this.setState({
      money_direction: e.target.value,
    });
    e.preventDefault();
  }
  render(
    chart = {
      height: '80px',
      padding: '10px',
      margin: '10px'

    },
    list = {
      width: '100%',
      float: 'left',
      listStyle: 'none',
      fontSize: '30px',
      border: '1px solid black',
      borderRadius: '12px',
      marginBottom: '10px',
      boxShadow: '3px 3px #c1c1c1'
    },
    change = {
      fontSize: '15px',
      margin: '5px',
      display: 'inline'
    },
    ulstyle = {
      width: '800px'
    },
    gameintro = {
      fontSize: '8px',
    }
  ) {
    if (this.props.characterinfo) {
      if (this.props.characterinfo.length > 0) {
        this.characterlist = [];
        //money 경로 표현
        this.characterlist.push(
          <select key="direction" style={gameintro} value={this.state.money_direction} onChange={this.directionchange} name="money_direction">
            <option value="G2P">게임머니 -> 플랫폼머니</option>
            <option value="P2G">플랫폼머니 -> 게임머니</option>
          </select>
        );
        //money 경로 표현 끝
        this.totalmoney = 0;
        for (let num in this.props.characterinfo) {
          this.characterlist.push(
            <div key={num} style={gameintro}>
              <p>{"<" + this.props.characterinfo[num].name_character + "> 게임머니 : [" + this.props.characterinfo[num].money_character + "]"}</p>
              <label>게임머니 :</label><input type="text" name={num + "game"} onChange={this.handleChange} ref={ref => { this[num + "game"] = ref; }} disabled={this.readonly} />
              {this.direction}<label>플랫폼머니 :</label><input type="text" name={num + "platform"} onChange={this.handleChange} ref={ref => { this[num + "platform"] = ref; }} disabled={!this.readonly} />
            </div>
          );
          this.totalmoney += parseInt(this.props.characterinfo[num].money_character);
        }

      }
      else {
        this.characterlist = <p style={gameintro}>캐릭터가 존재하지 않습니다.</p>;
      }
    }
    return (
      <div className="ChartDiv" style={chart}>
        <ul style={ulstyle}>
          <div style={list}>
            <img className="subimg" src={this.props.img} alt="" />
            {this.props.name}
            
            <p style={change}>{this.props.change}</p>
            <button className="downbtn" onClick={this.toggle}><img className="downimg" src="./jpg/down.png" alt="" /></button>
            <Collapse isOpen={this.state.collapse}>
              <Card>
                <CardBody>
                  <p style={gameintro}>{this.props.gameintro}</p>
                  <div style={gameintro}>총 보유머니 : {this.totalmoney}</div>
                  {this.characterlist}
                  <Button color="primary" className="paybtn" onClick={() => { this.isOpen(this.exchangeinfo) }} disabled={this.state.disabled}>결제하기</Button>
                </CardBody>
              </Card>
            </Collapse>
          </div>
        </ul>
      </div>
    );
  }
}

export default Chart;