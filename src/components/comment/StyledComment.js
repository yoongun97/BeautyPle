import { styled } from "styled-components";

export const StInputBox = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: Center;
`;

export const StCommentInput = styled.input`
  width: 80%;
  height: 35px;
  border: 1px solid lightgray;
  border-radius: 12px;
`;

export const StInputBtn = styled.button`
  height: 40px;
  width: 10%;
  overflow: hidden;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 12px;
  margin: 0 10px 0 10px;
  cursor: pointer;
  &:hover {
    background-color: #83925a;
    color: white;
  }
`;

export const StCommentBox = styled.div`
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 12px;
  height: 200px;
  overflow: auto;
  padding: 15px;
`;

export const StCommentCard = styled.div`
  display: flex;
  border-bottom: 1px solid lightgray;
`;

export const StComment = styled.p``;

export const StCommentAuthor = styled.p`
  margin-left: auto;
`;
