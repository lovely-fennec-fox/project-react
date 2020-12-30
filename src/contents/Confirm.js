import React, { Component } from 'react';
import './Confirm.scss';
import { Button } from 'reactstrap';
import {withRouter} from 'react-router-dom';

class Confirm extends Component {



    render() {
        return (
            <div className="Auth">
                <h1> 이메일 전송이 완료되었습니다. ! </h1>
                <hr></hr>
                <p> 이메일 확인 </p>

                <Button className='btn' color="primary" size="lg" onClick={()=>{this.props.history.push('/')}} block>Home</Button>
            </div>
        );
    }
}

export default withRouter(Confirm);