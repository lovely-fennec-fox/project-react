//마이페이지 시작 7.31(상욱)

import React, { Component } from 'react';
import './Submy.scss';
import { Collapse, Card, CardBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Submy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false
        };
    }
    toggle = () => {
        this.setState(state => ({
            collapse: !state.collapse
        }));
    }
    setCharacterinfo = () => {
        this.totalmoney=0;
        if (this.props.characterinfo) {
            if (this.props.characterinfo.length > 0) {
                this.characterlist = [];
                for (let num in this.props.characterinfo) {
                    this.characterlist.push(
                        <div key={num}>
                            {this.props.characterinfo[num].name_character + " : "+this.props.characterinfo[num].money_character}
                        </div>
                    );
                    this.totalmoney+=parseInt(this.props.characterinfo[num].money_character);
                }
            }
            else {
                this.characterlist = <p>캐릭터가 존재하지 않습니다.</p>;
            }
        }
    }
    render() {
        this.setCharacterinfo();
        return (
            <div className="ChartDiv" >
                <div className="Submyli" onClick={this.toggle}>
                    <img className="myimg" src={this.props.img} alt="" />
                    {this.props.name}
                    <div className="ClickBtn" >{"총 보유머니 : " +this.totalmoney}</div>
                    <Collapse isOpen={this.state.collapse}>
                        <Card>
                            <CardBody>
                            {this.characterlist}
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>

            </div>
        );
    }
}

export default Submy;