import React from "react";
import { styled } from "styled-components";

const StCategoryBtn = styled.button`
  border: none;
  width: 25px;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
  padding-left: 0px;
  position: fixed;
  &:hover {
    display: none;
  }
`;
const StCategory = styled.div`
  background-color: beige;
  border-radius: 20px;
  min-width: 200px;
  max-width: 200px;
  height: 500px;
  display: flex;
  flex-direction: column;
  opacity: 0.6;
  position: fixed;
  display: none;
`;

const StSelect = styled.button`
  margin: 30px auto 0px auto;
  background-color: transparent;
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
        <StSelect>제품 추천</StSelect>
        <StOption> 올인원</StOption>
        <StOption> 기초화장</StOption>
        <StSelect>꿀팁</StSelect>
        <StOption> 생활 꿀팁</StOption>
        <StOption> 쇼핑 꿀팁</StOption>
        <StSelect>Youtube</StSelect>
      </StCategory>
    </>
  );
}

export default Category;
