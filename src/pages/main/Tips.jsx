import React from "react";
import Category from "../../components/category/Category";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import api from "../../axios/api";
import {
  MainImg,
  StMainBody,
  StMainContent,
  StContentTitle,
  StCardContainer,
  StCard,
  StCardImg,
  StCardInfo,
  StCardTitle,
  StCardContent,
  StCardAuthor,
} from "./StyledMain";
function Tips() {
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
      <MainImg
        src="https://media.istockphoto.com/id/1408439145/ko/%EC%82%AC%EC%A7%84/%EA%B0%80%EC%9D%84-%EC%8A%A4%ED%82%A8%EC%BC%80%EC%96%B4%EC%99%80-%EA%B0%80%EC%9D%84-%EB%A9%94%EC%9D%B4%ED%81%AC%EC%97%85-%EC%BB%A8%EC%85%89-%ED%85%8C%EC%9D%B4%EB%B8%94%EC%97%90-%EB%B7%B0%ED%8B%B0-%EC%A0%9C%ED%92%88.webp?b=1&s=612x612&w=0&k=20&c=JO76OkdkmOOtqC5_3FtJhVwIEvP-MNhD6qM2nZLNWMs="
        alt="MainImg"
      />
      <StMainBody>
        <Category />
        <StMainContent>
          <StContentTitle>꿀팁 공유</StContentTitle>
          <StCardContainer>
            {data
              .filter((item) => item.highcategory === "꿀팁 공유")
              .map((item) => (
                <StCard
                  key={item.id}
                  onClick={() => {
                    navigate(`/detail/${item.id}`);
                  }}
                >
                  <StCardImg src={item.img} alt="MainImg" />
                  <StCardInfo>
                    <StCardTitle>{item.title}</StCardTitle>
                    <StCardContent>{item.content}</StCardContent>
                  </StCardInfo>
                  <StCardAuthor>{item.author}</StCardAuthor>
                </StCard>
              ))}
          </StCardContainer>
        </StMainContent>
      </StMainBody>
    </>
  );
}

export default Tips;
