import { styled } from "styled-components";

export const StSelectPost = styled.div`
  margin-top: 130px;
  display:flex;
`

export const StMyPostBtn = styled.button`
margin-left:auto;
width: 150px;
height: 50px;
background-color: ${({ isSelected }) => (isSelected ? "1px solid #83925A" : "transparent")};
border: ${({ isSelected }) => (isSelected ? "1px solid #83925A" : "1px solid #D9E0C7")};
cursor:pointer;
`
export const StMyLikeBtn = styled.button`
width: 150px;
height: 50px;
background-color: ${({ isSelected }) => (isSelected ? "1px solid #83925A" : "transparent")};
border: ${({ isSelected }) => (isSelected ? "1px solid #83925A" : "1px solid #D9E0C7")};
cursor:pointer;
`

export const StListContainer = styled.div`
  background-color:#C8D1AE;
  height: 800px;
  padding:30px;
`

export const StCard = styled.div`
background-color: white;
height: 130px;
width: 100%;
margin: 10px auto 10px auto;
display:flex;
box-shadow: 0 2.5px 2px 0 gray;
cursor:pointer;
`
export const StTextbox = styled.div`
margin-left:30px;
`
export const StTitle = styled.h2``
export const StContent = styled.p``
export const StDeleteBtn = styled.button`
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
export const StDeleteImg = styled.img`
  width:50px;
  height:50px;
`