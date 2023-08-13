import { styled } from "styled-components";

export const StHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  margin: 0 auto 0 auto;
  padding: 20px;
  background-color: white;
`;

export const StLogo = styled.div`
  cursor: pointer;
`;

export const StFooter = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  padding: 24px;
  background-color: #eeeeee;
  position:absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
`;

export const StContent = styled.div`
padding-bottom: 80px;`;

export const StBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;