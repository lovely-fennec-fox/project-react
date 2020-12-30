import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup  } from 'reactstrap';
import './SelectMoney.scss'

class SelectMoney extends Component {
    constructor (props) {
        super(props);
    
        this.state = { cSelected: '',
                       Selected_result: ''  
        };
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

      }
    
      onRadioBtnClick(rSelected) {
        if(rSelected === 'G2P'){ 
            this.setState({
                    cSelected : rSelected,
                    Selected_result : '플랫폼머니로 변경하기'
            });
        } else{
            this.setState({
                cSelected : rSelected,
                Selected_result : '게임머니로 변경하기'
            });
        }
      }
    

    
      render() {
        return (
          <div className='selectMoney'>
              <div className='selectMoneyBody'>
                <h3> 변경할 게임머니 종류를 선택해주세요.  </h3>
                
                <ButtonGroup className='selectButton'>
                    <Button className='btn' outline color="secondary" onClick={() => this.onRadioBtnClick('G2P')} active={this.state.cSelected === 'G2P'}>플랫폼머니로 변경하기</Button>
                    <Button className='btn' outline color="secondary" onClick={() => this.onRadioBtnClick('P2G')} active={this.state.cSelected === 'P2G'}>게임머니로 변경하기</Button>
                </ButtonGroup>
            </div>    
          </div>
        );
      }
}
export default SelectMoney;
