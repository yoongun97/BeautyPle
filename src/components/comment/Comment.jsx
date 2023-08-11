import React from "react";
import {
  StComment,
  StCommentAuthor,
  StCommentBox,
  StCommentCard,
  StCommentInput,
  StInputBox,
  StInputBtn,
} from "./StyledComment";

function Comment() {
  return (
    <>
      <StInputBox>
        <StCommentInput></StCommentInput>
        <StInputBtn>댓글입력</StInputBtn>
      </StInputBox>
      <StCommentBox>
        <StCommentCard>
          <StComment>댓글</StComment>
          <StCommentAuthor>작성자</StCommentAuthor>
        </StCommentCard>
        <StCommentCard>
          <StComment>댓글</StComment>
          <StCommentAuthor>작성자</StCommentAuthor>
        </StCommentCard>
        <StCommentCard>
          <StComment>댓글</StComment>
          <StCommentAuthor>작성자</StCommentAuthor>
        </StCommentCard>
        <StCommentCard>
          <StComment>댓글</StComment>
          <StCommentAuthor>작성자</StCommentAuthor>
        </StCommentCard>
        <StCommentCard>
          <StComment>댓글</StComment>
          <StCommentAuthor>작성자</StCommentAuthor>
        </StCommentCard>
        <StCommentCard>
          <StComment>댓글</StComment>
          <StCommentAuthor>작성자</StCommentAuthor>
        </StCommentCard>
      </StCommentBox>
    </>
  );
}

export default Comment;
