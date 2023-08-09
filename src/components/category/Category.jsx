import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";


const StCategory = styled.div`
  background-color: gray;
  border-radius: 20px;
  min-width: 200px;
  max-width: 200px;
  height: 500px;
  display: flex;
  flex-direction: column;
  opacity: 0.8;
  position: fixed;
  top:200px;
  /* display: none; */
  visibility: ${({ isvisible }) => (isvisible ? "visible" : "hidden")}; // 변경된 부분
  transition: opacity 0.3s ease;
`;

const StCategoryBtn = styled.button`
  border: none;
  width: 30px;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
  padding-left: 0px;
  position: fixed;
  top:400px;
  /* &:hover {
    display: none;
    + ${StCategory} {
      display: block;
    };
  }; */
`;

const StSelect = styled.button`
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
const StOption = styled.button`
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

function Category() {
  const navigate = useNavigate()

  return (
    <>
      <StCategoryBtn>
        <img
          style={{ width: "30px", height: "30px" }}
          src="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
          alt="MainImg"
        />
      </StCategoryBtn>
      <StCategory>
        <StSelect onClick={()=>{navigate("/items")}}>제품 추천</StSelect>
        <StOption> 올인원</StOption>
        <StOption> 기초화장</StOption>
        <StSelect onClick={()=>{navigate("/tips")}}>꿀팁</StSelect>
        <StOption> 생활 꿀팁</StOption>
        <StOption> 쇼핑 꿀팁</StOption>
        <StSelect onClick={()=>{navigate("/youtube")}}>Youtube</StSelect>
      </StCategory>
    </>
  );
}

export default Category;
