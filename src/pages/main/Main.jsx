import React from "react";
import Category from "../../components/category/Category";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import api from "../../axios/api";
import {
  StMainBody,
  StMainContent,
  StContentHeader,
  StContentTitle,
  StCardContainer,
  StCard,
  StCardImg,
  StCardInfo,
  StCardTitle,
  StCardAuthor,
} from "./StyledMain";
import { Link } from "react-router-dom";
import noImage from "../../lib/logo.png";

function Main() {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery(
    "posts",
    async () => {
      const response = await api.get("/posts");
      return response.data;
    },
    {
      select: (data) => data.reverse(),
    }
  );

  if (isLoading) {
    return <div>데이터 가져오는 중...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <StMainBody>
        <Category />
        <StMainContent>
          <StContentHeader>
            <StContentTitle>제품 추천</StContentTitle>
            <Link
              to="/items"
              style={{ marginRight: "30px", marginTop: "20px" }}
            >
              더보기
            </Link>
          </StContentHeader>
          <StCardContainer style={{ height: "380px", overflow: "hidden" }}>
            {data
              .filter((item) => item.selectedUpperOption === "제품추천")
              .map((item) => (
                <StCard
                  key={item.id}
                  onClick={() => {
                    navigate(`/detail/${item.id}`);
                  }}
                >
                  <StCardImg src={item.img || noImage} alt="MainImg" />
                  <StCardInfo>
                    <StCardTitle>{item.title}</StCardTitle>
                  </StCardInfo>
                  <StCardAuthor>{item.author}</StCardAuthor>
                </StCard>
              ))}
          </StCardContainer>
          <StContentHeader>
            <StContentTitle>꿀팁 공유</StContentTitle>
            <Link to="/tips" style={{ marginRight: "30px", marginTop: "20px" }}>
              더보기
            </Link>
          </StContentHeader>
          <StCardContainer style={{ height: "380px", overflow: "hidden" }}>
            {data
              .filter((item) => item.selectedUpperOption === "꿀팁공유")
              .map((item) => (
                <StCard
                  key={item.id}
                  onClick={() => {
                    navigate(`/detail/${item.id}`);
                  }}
                >
                  <StCardImg src={item.img || noImage} alt="MainImg" />
                  <StCardInfo>
                    <StCardTitle>{item.title}</StCardTitle>
                  </StCardInfo>
                  <StCardAuthor>{item.author}</StCardAuthor>
                </StCard>
              ))}
          </StCardContainer>
          <StContentTitle>Youtube</StContentTitle>
        </StMainContent>
      </StMainBody>
    </>
  );
}

export default Main;
