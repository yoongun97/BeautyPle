import React from "react";
import { useQuery } from "react-query";
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
function Comment({ id }) {
  const { data, isLoading, isError, error } = useQuery(
    ["comments", id],
    async () => {
      const response = await api.get(`/comments?postId=${id}`);
      return response.data;
    }
  );
  const [comment, setComment] = useState("");
  const changeHandler = (event) => setComment(event.target.value);
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
        <StInputBtn>댓글입력</StInputBtn>
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
