import React, { useEffect } from "react";
import Category from "../../components/category/Category";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import api from "../../axios/api";
import {
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
import { useDispatch, useSelector } from "react-redux";
import { setSubCategory } from "../../redux/modules/postsSlice";
import noImage from "../../lib/logo.png";

function Tips() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Subcategory = useSelector((state) => state.subCategory);

  const { data, isLoading, isError, error } = useQuery(
    ["posts", "꿀팁공유"],
    async () => {
      const response = await api.get(`/posts?selectedUpperOption=꿀팁공유`);
      return response.data;
    },
    {
      select: (data) => data.reverse(),
    }
  );

  useEffect(() => {
    return () => {
      dispatch(setSubCategory(null)); // subCategory를 null로 설정하여 필터링 초기화
    };
  }, []);

  if (isLoading) {
    return <div>데이터 가져오는 중...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  let filteredData;

  if (Subcategory) {
    filteredData = data.filter(
      (item) => item.selectedLowerOption === Subcategory
    );
  } else {
    filteredData = data;
  }

  return (
    <>
      <StMainBody>
        <Category />
        <StMainContent>
          <StContentTitle>꿀팁 공유</StContentTitle>
          <StCardContainer>
            {filteredData.map((item) => (
              <StCard
                key={item.id}
                onClick={() => {
                  navigate(`/detail/${item.id}`);
                }}
              >
                <StCardImg src={item.img || noImage} alt="MainImg" />
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
