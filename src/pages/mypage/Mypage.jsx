import React, {useState} from "react";
import { styled } from "styled-components";

const StSelectPost = styled.div`
  margin-top: 130px;
  display:flex;
`

const StMyPostBtn = styled.button`
margin-left:auto;
width: 150px;
height: 50px;
background-color: ${({ isSelected }) => (isSelected ? "1px solid #83925A" : "transparent")};
border: ${({ isSelected }) => (isSelected ? "1px solid #83925A" : "1px solid #D9E0C7")};
cursor:pointer;
`
const StMyLikeBtn = styled.button`
width: 150px;
height: 50px;
background-color: ${({ isSelected }) => (isSelected ? "1px solid #83925A" : "transparent")};
border: ${({ isSelected }) => (isSelected ? "1px solid #83925A" : "1px solid #D9E0C7")};
cursor:pointer;
`

const StListContainer = styled.div`
  background-color:#C8D1AE;
  height: 800px;
  padding:30px;
`

const StCard = styled.div`
background-color: white;
height: 130px;
width: 100%;
margin: 10px auto 10px auto;
display:flex;
  box-shadow: 0 2.5px 2px 0 gray;

`
const StTextbox = styled.div`
margin-left:30px;
`
const StTitle = styled.h2``
const StContent = styled.p``
const StDeleteBtn = styled.button`
margin : auto 30px auto auto;
background-color:transparent;
border:none;
width:50px;
height:50px;
cursor:pointer;
&:hover{
  opacity:0.6;
}
`
const StDeleteImg = styled.img`
  width:50px;
  height:50px;
`

function Mypage() {
  const [selectedButton, setSelectedButton] = useState("mypost");

  return (
  <>
  <StSelectPost>
    <StMyPostBtn isSelected={selectedButton === "mypost"} onClick={() => setSelectedButton("mypost")}>내가 작성한 글</StMyPostBtn>
    <StMyLikeBtn isSelected={selectedButton === "mylike"} onClick={() => setSelectedButton("mylike")}>내가 추천한 글</StMyLikeBtn>
  </StSelectPost>
  <StListContainer>
        <StCard>
      <StTextbox>
        <StTitle>제목</StTitle>
        <StContent>내용</StContent>
      </StTextbox>
      <StDeleteBtn>
        <StDeleteImg src="https://cdn-icons-png.flaticon.com/128/9789/9789276.png" alt="deletebtn" />
      </StDeleteBtn>
    </StCard>
  </StListContainer>
  
  </>
    )
}

export default Mypage;
