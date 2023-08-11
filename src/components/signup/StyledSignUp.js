import { styled } from "styled-components";

export const StSignupBox = styled.div`
    margin-top: 100px;
    display: flex;
    justify-content: center;
    height: 600px;
    align-items: center;
`

export const StSignupForm = styled.form`
    border-radius: 8px;
    border: 1px solid lightgrey;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    width : 500px;
    height: 500px;

`

export const StLogo = styled.div`
  cursor: pointer;
  height: 130px;
  width: 150px;
`;

export const StSignupInput = styled.input`
    width: 360px;
    margin-bottom: 20px;
    height: 40px;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid lightgrey;
    padding: 8px;
    box-sizing: border-box;

`
export const StErrorMsg = styled.div`
    color: red;
    margin-right:auto;
    margin-left:80px;
`

export const StSignupBtn = styled.button`
    width: 360px;
    margin-bottom: 10px;
    border: none;
    padding: 12px;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    &:hover{
        opacity: 0.7;
    }     
`