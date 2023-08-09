import React from 'react'
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

export const TopImg = styled.img`
  width: 100%;
  height: 500px;
`;

function MainImg() {
  return (
    <>
    <TopImg
        src="https://cdn.pixabay.com/photo/2017/05/30/19/42/cosmetic-2357981_1280.jpg"
        alt="MainImg"
      />
      <Outlet />
    </>
  )
}

export default MainImg