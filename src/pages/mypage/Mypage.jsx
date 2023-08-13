import React, { useState } from "react";
import {
  StSelectPost,
  StMyPostBtn,
  StMyLikeBtn,
  StListContainer,
  StCard,
  StTextbox,
  StTitle,
  StContent,
  StDeleteBtn,
  StDeleteImg,
} from "./StyledMypage";
import { useNavigate, useParams } from "react-router-dom";
import { QueryClient, useMutation, useQuery } from "react-query";
import api from "../../axios/api";
import { useSelector } from "react-redux";

function Mypage() {
  const [selectedButton, setSelectedButton] = useState("mypost");
  const { uid } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.User);

  // 데이터 불러오기
  const {
    data: postsData,
    isLoading: isPostsLoading,
    isError: isPostsError,
    error: postsError,
  } = useQuery(
    "posts",
    async () => {
      const response = await api.get(`/posts`);
      return response.data;
    },
    {
      select: (data) => data.reverse(),
      enabled: !!user.email,
    }
  );

  const {
    data: likesData,
    isLoading: isLikesLoading,
    isError: isLikesError,
    error: likesError,
  } = useQuery(["likes", uid], async () => {
    const response = await api.get(`/likes?uid=${uid}`);
    return response.data;
  });

  // item 삭제 이벤트
  const mutation = useMutation(
    async (id) => {
      if (window.confirm("삭제하시겠습니까??")) {
        // 데이터베이스에서 삭제
        await api.delete(`/posts/${id}`);
      }
    },
    // 데이터 삭제 후 화면 바로 변경
    {
      onSuccess: () => {
        QueryClient.invalidateQueries("posts");
      },
    }
  );

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

  return (
    <>
      <StSelectPost>
        <StMyPostBtn
          isSelected={selectedButton === "mypost"}
          onClick={() => setSelectedButton("mypost")}
        >
          내가 작성한 글
        </StMyPostBtn>
        <StMyLikeBtn
          isSelected={selectedButton === "mylike"}
          onClick={() => setSelectedButton("mylike")}
        >
          내가 추천한 글
        </StMyLikeBtn>
      </StSelectPost>
      <StListContainer>
        {selectedButton === "mypost"
          ? postsData
              ?.filter((item) => item.uid == uid)
              ?.map((item) => (
                <StCard key={item.id}>
                  <StTextbox
                    onClick={() => {
                      navigate(`/detail/${item.id}`);
                    }}
                  >
                    <StTitle>{item.title}</StTitle>
                    <StContent>{item.content}</StContent>
                  </StTextbox>
                  <StDeleteBtn
                    onClick={() => {
                      mutation.mutate(item.id);
                    }}
                  >
                    <StDeleteImg
                      src="https://cdn-icons-png.flaticon.com/128/9789/9789276.png"
                      alt="deletebtn"
                    />
                  </StDeleteBtn>
                </StCard>
              ))
          : postsData
              ?.filter((item) =>
                likedData.some((liked) => liked.postId === item.id)
              )
              ?.map((item) => (
                <StCard key={item.id}>
                  <StTextbox
                    onClick={() => {
                      navigate(`/detail/${item.id}`);
                    }}
                  >
                    <StTitle>{item.title}</StTitle>
                    <StContent>{item.content}</StContent>
                  </StTextbox>
                </StCard>
              ))}
      </StListContainer>
    </>
  );
}

export default Mypage;
