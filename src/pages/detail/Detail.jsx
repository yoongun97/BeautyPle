import React from "react";
import { useQuery } from "react-query";
import api from "../../axios/api";
import { useParams, useNavigate } from "react-router-dom";
import {
  StBtnBox,
  StCommentContainer,
  StContent,
  StContentBox,
  StContentContainer,
  StDetailContainer,
  StDetaliImg,
  StEditBtn,
  StLikeBtn,
  StLikeCount,
  StLikeImg,
  StTitle,
  StTitleBox,
} from "./StyledDetail";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery(
    ["posts", id],
    async () => {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <StDetailContainer>
        <StContentContainer>
          <StDetaliImg src={data.img} alt="상세이미지" />

          <StContentBox>
            <StTitleBox>
              <StTitle>{data.title}</StTitle>
              <StEditBtn
                onClick={() => {
                  navigate(`/edit/${data.id}`);
                }}
              >
                수정
              </StEditBtn>
            </StTitleBox>
            <StContent>{data.content}</StContent>
            <StBtnBox style={{ display: "flex" }}>
              <StLikeBtn>
                <StLikeImg
                  src="https://cdn-icons-png.flaticon.com/128/2415/2415237.png"
                  alt="좋아요 버튼"
                />
              </StLikeBtn>
              <StLikeCount>0</StLikeCount>
              <StLikeBtn>
                <StLikeImg
                  src="https://cdn-icons-png.flaticon.com/128/10694/10694446.png"
                  alt="싫어요 버튼"
                />
              </StLikeBtn>
              <StLikeCount>0</StLikeCount>
            </StBtnBox>
          </StContentBox>
        </StContentContainer>
        <StCommentContainer>cc</StCommentContainer>
      </StDetailContainer>
    </>
  );
}
export default Detail;
