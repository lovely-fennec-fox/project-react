import React, { Component } from 'react';
import './Exchangelist.js';
import './Character.scss';

class Character extends Component {

    constructor(props) {
        super(props);
        this.state = {
            output: 0,
            add: "",
            addvalue: 0,

        }
    }
    datain = () => {
        var props = this.props.number

        console.log("props", props);
     
        var val = document.getElementsByClassName('datain')[props];
        console.log("value=", val.value);
        var out = document.getElementsByClassName('out');
        var change = document.getElementsByClassName('aaabbb')[0];
        console.log(change);

        out.value = Number(val.value) * change.value;
        console.log("value=", out);

        this.setState({
            output: out.    value,
            addvalue: props,
        });
    }
    
    addBill = () => {
        var p = document.createElement('p'); 
        var p_txt = document.createTextNode(this.state.output);
        var bill_div = document.querySelector('bill');
        p.appendChild(p_txt);
        bill_div.appendChild(p);

    }


    // addBtn = () => {
    //     var props = this.props.number
    //     console.log("jkcsakjdkasdbfkdsr",props);

    //     var money = document.getElementsByClassName('output')[props].value;
    //     var gname = document.getElementsByClassName('name')[props].innerText;
    //     console.log("output =", document.getElementsByClassName('output')[0].value);
    //     console.log("name = ", document.getElementsByClassName('name')[0].innerText);

    //     this.setState({
    //         add: gname + money,
    //     })
    // }

    render() {
        return (
            <div>
                <div className="Character">
                    <input className="datain" onKeyUp={this.datain} number={this.props.number} />
                    <img src="./jpg/rightarrow.png" className="right" alt="" />
                    <input className="output" type="text" value={this.state.output} />
                    <button className="addBtn" onClick={this.addBill}>추가하기</button>
                </div>
                <div className="bill">
                    <h2>계산서</h2>
                    <input className="output" type="text" value={this.state.output} />
                </div>
            </div>
        );
    }


}

export default Character;