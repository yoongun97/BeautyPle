import { styled } from "styled-components";

export const StMainBody = styled.div`
  display: flex;
  /* background-color: yellow; */
  max-width: 1200px;
  margin: 20px auto 20px auto;
  overflow: hidden;
`;

export const StMainContent = styled.div`
  margin: auto;
`;
export const StContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
`;
export const StContentTitle = styled.h2`
  margin-left: 50px;
  margin-bottom: 0;
`;
export const StCardContainer = styled.div`
  margin-left: 40px;
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  width: 100%;
`;
export const StCard = styled.div`
  border: 0.1px solid #d9d9d9;
  box-shadow: 0 2.5px 2px 0 gray;
  max-height: 340px;
  max-width: 200px;
  margin: 15px;
  padding: 5px;
  cursor: pointer;
  overflow: hidden;
`;
export const StCardImg = styled.img`
  width: 200px;
  height: 230px;
`;
export const StCardInfo = styled.div``;
export const StCardTitle = styled.span`
  font-size: 20px;
`;
export const StCardAuthor = styled.span`
  background-color: beige;
  margin: auto 10px 10px 0px;
  float: right;
`;
