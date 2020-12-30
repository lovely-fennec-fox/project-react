import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { } from 'reactstrap';
import './GameListImage.scss'


class GameListImage extends Component {
    constructor(props){
        super(props);
        this.state = {


        };
    };


    render() {
        return (
            <div className="Image">
                <div className="ImageBody">
                    <img width="100%" src={this.props.img} alt=''/>
                </div>
            </div>
        )
    }
}
export default GameListImage;
