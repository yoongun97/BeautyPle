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
function Items() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Subcategory = useSelector((state) => state.subCategory);

  const { data, isLoading, isError, error } = useQuery(["posts", "제품 추천"], 
    async () => {
      const response = await api.get(`/posts?selectedUpperOption=제품 추천`);
      console.log(response.data)
      return response.data;
    });

  let filteredData = data

  if (Subcategory) {
    filteredData = data.filter((item) => item.selectedLowerOption === Subcategory);
  }

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

  return (
    <>
      <StMainBody>
        <Category />
        <StMainContent>
          <StContentTitle>제품 추천</StContentTitle>
          <StCardContainer>
            {filteredData.map((item) => (
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

export default Items;
