import { styled } from "styled-components";

export const StDetailContainer = styled.div`
  height: 810px;
  max-width: 1200px;
  margin: 100px auto 20px auto;
  border: 1px solid lightgray;
  border-radius: 12px;
  overflow: hidden;
`;

export const StContentContainer = styled.div`
  display: flex;
`;

export const StDetaliImg = styled.img`
  height: 450px;
  width: 45%;
  border: 1px solid lightgray;
  border-radius: 12px;
  margin: 12px;
`;

export const StContentBox = styled.div`
  height: 400px;
  width: 50%;
  border: none;
  padding: 12px;
  margin: 10px;
`;

export const StTitleBox = styled.div`
  display: flex;
`;
export const StTitle = styled.h2`
  width: 550px;
  border: 1px solid lightgray;
  padding: 12px;
`;
export const StEditBtn = styled.button`
  margin-top: 25px;
  margin-left: 10px;
  margin-right: 10px;
  width: 150px;
  height: 50px;
  border: none;
  color: white;
  border-radius: 12px;
  background-color: olive;
  cursor: pointer;
`;

export const StContent = styled.textarea`
  height: 280px;
  width: 90%;
  border: 1px solid lightgray;
  border-radius: 12px;
  padding: 12px;
`;

export const StBtnBox = styled.div`
  display: flex;
`;

export const StLikeBtn = styled.button`
  background-color: transparent;
  border: none;
  width: 50px;
  height: 50px;
  cursor: pointer;
  object-fit: cover;
  &:hover {
    opacity: 0.4;
  }
`;

export const StLikeImg = styled.img`
  width: 35px;
  height: 35px;
`;

export const StLikeCount = styled.span`
  font-size: 20px;
  margin: 10px;
  margin-left: 4px;
`;

export const StCommentContainer = styled.div`
  background-color: #808000;
  height: 280px;
  margin: 10px;
  border: 1px solid lightgray;
  border-radius: 12px;
  padding: 12px;
  overflow: hidden;
`;
