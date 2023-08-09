import { styled, keyframes } from "styled-components";

export const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;


export const StCategory = styled.div`
  border-radius: 20px;
  min-width: 200px;
  max-width: 200px;
  height: 500px;
  display: flex;
  flex-direction: column;
  background-color: rgba(95, 113, 63, 0.6);
  position: fixed;
  top:200px;
  left: ${({ isvisible }) => (isvisible ? "0" : "-200px")};
  animation: ${({ isvisible }) => (isvisible ? slideIn : slideOut)} 0.3s ease;
`;

export const StCategoryBtn = styled.button`
  background-color: rgba(217, 224, 199, 1);
  z-index: 2;
  border: none;
  width: 30px;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
  padding-left: 0px;
  position: fixed;
  top:400px;
  cursor:pointer;
  left: ${({ isvisible }) => (isvisible ? "190px" : "0px")};
  animation: ${({ isvisible }) => (isvisible ? slideIn : slideOut)} 0.3s ease;
`;

export const StSelect = styled.button`
  margin: 30px auto 0px auto;
  background-color: transparent;
  color:white;
  border: none;
  width: 100px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  &:hover {
    opacity: 0.4;
  }
  /* color: gray; */
`;
export const StOption = styled.button`
  margin: 0px auto 0px auto;
  background-color: transparent;
  color:white;
  border: none;
  width: 100px;
  height: 30px;
  font-size: 15px;
  font-weight: bold;
  text-align: left;
  &:hover {
    opacity: 0.4;
  }
`;