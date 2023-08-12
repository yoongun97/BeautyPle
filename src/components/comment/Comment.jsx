import React from "react";
import { useMutation, useQuery } from "react-query";
import api from "../../axios/api";
import {
  StComment,
  StCommentAuthor,
  StCommentBox,
  StCommentCard,
  StCommentInput,
  StInputBox,
  StInputBtn,
} from "./StyledComment";
import { useState } from "react";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

function Comment({ id }) {
  const { data, isLoading, isError, error } = useQuery(
    ["comments", id],
    async () => {
      const response = await api.get(`/comments?postId=${id}`);
      return response.data;
    }
  );
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.User);
  const changeHandler = (event) => setComment(event.target.value);

  const mutation = useMutation(
    async (newComment) => {
      await api.post("comments", newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comments");
      },
    }
  );
  const addButton = () => {
    if (!user.email) {
      alert("로그인 후에 댓글을 작성할 수 있습니다.");
      navigate("/login");
      return;
    }
    if (!comment.trim()) {
      alert("댓글을 쓴 뒤에 댓글입력을 누를 수 있습니다.");
      return;
    }
    const newComment = {
      author: user.email,
      uid: user.id,
      id: uuid(),
      postId: id,
      content: comment,
    };

    mutation.mutate(newComment);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <StInputBox>
        <StCommentInput type="text" onChange={changeHandler}></StCommentInput>
        <StInputBtn onClick={addButton}>댓글입력</StInputBtn>
      </StInputBox>
      <StCommentBox>
        {data.map((comment) => (
          <StCommentCard key={comment.id}>
            <StComment>{comment.content}</StComment>
            <StCommentAuthor>{comment.author}</StCommentAuthor>
          </StCommentCard>
        ))}
      </StCommentBox>
    </>
  );
}
export default Comment;
