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

  const {
    data: postsData,
    isLoading: isPostsLoading,
    isError: isPostsError,
    error: postsError,
  } = useQuery(["posts", id], async () => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  });

  const {
    data: likesData,
    isLoading: isLikesLoading,
    isError: isLikesError,
    error: likesError,
  } = useQuery(["likes", id], async () => {
    const response = await api.get(`/likes?postId=${id}`);
    return response.data;
  });
  // const likedData = likesData.filter((v) => v.state === "like");
  // const dislikedData = likesData.filter((v) => v.state === "dislike");

  if (isPostsLoading || isLikesLoading) {
    return <div>Loading...</div>;
  }

  if (isPostsError || isLikesError) {
    return (
      <div>Error: {isPostsError ? postsError.message : likesError.message}</div>
    );
  }

  return (
    <>
      <StDetailContainer>
        <StContentContainer>
          <StDetaliImg src={postsData.img} alt="상세이미지" />

          <StContentBox>
            <StTitleBox>
              <StTitle>{postsData.title}</StTitle>
              <StEditBtn
                onClick={() => {
                  navigate(`/edit/${postsData.id}`);
                }}
              >
                수정
              </StEditBtn>
            </StTitleBox>
            <StContent>{postsData.content}</StContent>
            <StBtnBox style={{ display: "flex" }}>
              <StLikeBtn>
                <StLikeImg
                  src="https://cdn-icons-png.flaticon.com/128/2415/2415237.png"
                  alt="좋아요 버튼"
                />
              </StLikeBtn>
              <StLikeCount>{/* {likedData.length} */}</StLikeCount>
              <StLikeBtn>
                <StLikeImg
                  src="https://cdn-icons-png.flaticon.com/128/10694/10694446.png"
                  alt="싫어요 버튼"
                />
              </StLikeBtn>
              <StLikeCount>{/* {dislikedData.length} */}</StLikeCount>
            </StBtnBox>
          </StContentBox>
        </StContentContainer>
        <StCommentContainer>cc</StCommentContainer>
      </StDetailContainer>
    </>
  );
}
export default Detail;
