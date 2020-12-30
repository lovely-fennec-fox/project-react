import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
    & + & {
        margin-top: 1rem;
    }
    margin : 1rem 0;
`;
const Label = styled.div`
    font-size: 1rem;
    color: ${oc.gray[6]};
    margin-bottom: 0.25rem;
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
    font-size: 0.65rem;
    display:inline-block;
    color: ${oc.gray[6]};
    
    
`;

//넥슨 이메일 요청 부분-민호
const InputWithLabelButton = ({  label, name, placeholder,onChange, onClick, disabled}) => (
    <Wrapper >
        <Label>{label}</Label>
        <div>
        <Input name={name} placeholder={placeholder} onChange={onChange} disabled={disabled}/>
        <Button onClick={onClick} disabled={disabled}>인증번호 전송/재전송</Button> 
        </div>
    </Wrapper>
);

export default InputWithLabelButton;