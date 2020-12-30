import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'reactstrap';
import GameListImage from './GameListImage';
import GameListInfo from './GameListInfo';
import GameListChangeInfo from './GameListChangeInfo';
import './ExchangeGameList.scss';


class ExchangeGameList extends Component {
    constructor(props){
        super(props);
        this.state = {
            characterMoney: "",
            fee:0
        };
        this.changeMoney = this.changeMoney.bind(this);
};

    changeMoney= async (money, fee)=>{


        await this.setState({
            characterMoney:money,
            fee:fee
        })
    }

    render() {
        return (
            <div className="List">
                <Row className="gameList">
                    <Col xs="5" sm="3"><GameListImage img={this.props.img}/>
                    </Col>
                    <Col xs="7" sm="6"><GameListInfo cSelected={this.props.cSelected} 
                                                    name={this.props.name} 
                                                    rate={this.props.rate} 
                                                    character={this.props.character} 
                                                    changeState={this.props.changeState}
                                                    changeMoney={this.changeMoney}
                                                    />
                                                    </Col>
                    <Col sm="3"><GameListChangeInfo cSelected={this.props.cSelected} 
                                                money={this.state.characterMoney}
                                                fee={this.state.fee} 
                                                character={this.props.character}/>
                                                </Col>
                </Row>
            </div>
        )
    }
}
export default ExchangeGameList;
