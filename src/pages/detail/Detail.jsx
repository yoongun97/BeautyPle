import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../axios/api";
import Comment from "../../components/comment/Comment";
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
import { useSelector } from "react-redux";
import uuid from "react-uuid";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.User);

  // 데이터 불러오기
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

  // 추천, 비추천 데이터 추가/삭제
  const mutation = useMutation(
    async (state) => {
      if (state === "like" && likedUser) {
        // like 삭제
        await api.delete(`/likes/${likedUser.id}`);
      } else if (state === "dislike" && dislikedUser) {
        // dislike 삭제
        await api.delete(`/likes/${dislikedUser.id}`);
      } else {
        const newLike = {
          id: uuid(),
          postId: postsData.id,
          uid: user.id,
          state,
        };
        // // 새로운 like을 데이터베이스에 추가
        await api.post("/likes", newLike);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes", id]);
        // refetchLikes();
      },
    }
  );

  // const refetchLikes = async () => {
  //   const response = await api.get(`/likes?postId=${id}`);
  //   queryClient.setQueryData(["likes", id], response.data);
  // };

  // isLoading, isError
  if (isPostsLoading || isLikesLoading) {
    return <div>Loading...</div>;
  }

  if (isPostsError || isLikesError) {
    return (
      <div>Error: {isPostsError ? postsError.message : likesError.message}</div>
    );
  }

  const likedData = likesData.filter((v) => v.state === "like");
  const dislikedData = likesData.filter((v) => v.state === "dislike");

  const likedUser = likedData.find((v) => v.uid === user.id);
  const dislikedUser = dislikedData.find((v) => v.uid === user.id);

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
                  if (user.email === postsData.author) {
                    navigate(`/edit/${postsData.id}`);
                  } else if (user.email) {
                    alert("해당 글의 작성자가 아닙니다.");
                  } else {
                    alert("로그인이 필요합니다.");
                    navigate(`/login`);
                  }
                }}
              >
                수정
              </StEditBtn>
            </StTitleBox>
            <StContent htmlFor="readOnlyField">{postsData.content}</StContent>
            <StBtnBox style={{ display: "flex" }}>
              <StLikeBtn
                onClick={() => {
                  if (user.email) {
                    mutation.mutate("like");
                  } else {
                    alert("로그인이 필요합니다.");
                    navigate(`/login`);
                  }
                }}
              >
                {!likedUser ? (
                  <StLikeImg
                    src="https://cdn-icons-png.flaticon.com/128/2415/2415237.png"
                    alt="좋아요 버튼"
                  />
                ) : (
                  <StLikeImg
                    src="https://cdn-icons-png.flaticon.com/128/4477/4477657.png"
                    alt="좋아요 버튼"
                  />
                )}
              </StLikeBtn>
              <StLikeCount>{likedData.length}</StLikeCount>
              <StLikeBtn
                onClick={() => {
                  if (user.email) {
                    mutation.mutate("dislike");
                  } else {
                    alert("로그인이 필요합니다.");
                    navigate(`/login`);
                  }
                }}
              >
                {!dislikedUser ? (
                  <StLikeImg
                    src="https://cdn-icons-png.flaticon.com/128/10694/10694446.png"
                    alt="싫어요 버튼"
                  />
                ) : (
                  <StLikeImg
                    src="https://cdn-icons-png.flaticon.com/128/1634/1634070.png"
                    alt="싫어요 버튼"
                  />
                )}
              </StLikeBtn>
              <StLikeCount>{dislikedData.length}</StLikeCount>
            </StBtnBox>
          </StContentBox>
        </StContentContainer>
        <StCommentContainer>
          <Comment id={id} />
        </StCommentContainer>
      </StDetailContainer>
    </>
  );
}
export default Detail;
