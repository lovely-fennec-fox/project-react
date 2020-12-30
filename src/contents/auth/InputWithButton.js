import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
    & + & {
        margin-top: 1rem;
    }
`;
const Input = styled.input`
    width: 75%;
    border: 1px solid ${oc.gray[3]};
    outline: none;
    border-radius: 0px;
    line-height: 2.5rem;
    font-size: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    float:left;
    ::placeholder {
        color: ${oc.gray[3]};
    }

`;
const Button = styled.button`

    width: 25%;
    // border: 1px solid ${oc.gray[3]};
    outline: none;
    border-radius: 0px;
    line-height: 2.4rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-size: 0.8rem;
    display:inline-block;
    color: ${oc.gray[6]};
    
    
`;


const InputWithButton = ({  name, placeholder,onChange,onClick, disabled}) => (   //넥슨 코드 라인 부분-민호
    <Wrapper>
        <Input name={name} placeholder={placeholder} onChange={onChange} disabled={disabled}/>
        <Button onClick={onClick} disabled={disabled}>확인</Button> 
    </Wrapper>
);

export default InputWithButton;