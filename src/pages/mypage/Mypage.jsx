import React, {useState} from "react";
import {StSelectPost,StMyPostBtn, StMyLikeBtn, StListContainer, StCard, StTextbox, StTitle, StContent, StDeleteBtn, StDeleteImg } from "./StyledMypage"
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import api from "../../axios/api"

function Mypage() {
  const [selectedButton, setSelectedButton] = useState("mypost");
  const {uid} = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery("posts", async () => {
    const response = await api.get("/posts");
    return response.data;
  });

  if (isLoading) {
    return <div>데이터 가져오는 중...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
  <>
  <StSelectPost>
    <StMyPostBtn isSelected={selectedButton === "mypost"} onClick={() => setSelectedButton("mypost")}>내가 작성한 글</StMyPostBtn>
    <StMyLikeBtn isSelected={selectedButton === "mylike"} onClick={() => setSelectedButton("mylike")}>내가 추천한 글</StMyLikeBtn>
  </StSelectPost>
  <StListContainer>
    {
    (selectedButton === "mypost") ?
    (data
      .filter((item) => item.uid === uid)
      .map((item) => (
        <StCard 
          key={item.id}
          onClick={() => {
            navigate(`/detail/${item.id}`);
          }}  
        >
        <StTextbox>
          <StTitle>{item.title}</StTitle>
          <StContent>{item.content}</StContent>
        </StTextbox>
        <StDeleteBtn>
          <StDeleteImg src="https://cdn-icons-png.flaticon.com/128/9789/9789276.png" alt="deletebtn" />
        </StDeleteBtn>
      </StCard>
    ))) : 
    (data
      .filter((item) => item.uid !== uid)
      .map((item) => (
        <StCard key={item.id}>
          <StTextbox>
            <StTitle>{item.title}</StTitle>
            <StContent>{item.content}</StContent>
           </StTextbox>
        </StCard>
      )))
  }
    
  </StListContainer>
  
  </>
    )
}

export default Mypage;
