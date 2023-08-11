import React from "react";
import { styled } from "styled-components";

export const StLikeBtn = styled.button`
  background-color: transparent;
  border: none;
  width: 50px;
  height: 50px;
  cursor: pointer;
  object-fit: cover;
  &:hover {
    opacity: 0.4;
  }
`;

export const StLikeImg = styled.img`
  width: 35px;
  height: 35px;
`;

export const StLikeCount = styled.span`
  font-size: 20px;
  margin: 10px;
  margin-left: 4px;
`;

function DisLike() {
  return (
    <>
      <StLikeBtn>
        <StLikeImg
          src="https://cdn-icons-png.flaticon.com/128/10694/10694446.png"
          alt="싫어요 버튼"
        />
      </StLikeBtn>
      <StLikeCount>0</StLikeCount>
    </>
  );
}

export default DisLike;
