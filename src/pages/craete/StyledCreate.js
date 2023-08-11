import { styled } from "styled-components";

export const StCreateForm = styled.form`
  height: 700px;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 12px;
  border: 1px solid lightgrey;
  margin: 100px auto 20px auto;
  padding: 20px;
  background-color: #d0d8b9;
`;
export const StCreateTitle = styled.input`
  width: 99%;
  height: 60px;
  font-size: 18px;
  border-radius: 12px;
  border: 1px solid lightgrey;
  padding: 8px;
  box-sizing: border-box;
`;

export const StSelectBox = styled.div`
  display: flex;
`;

export const DropdownWrapper = styled.div`
  border: 1pc solid css;
  width: 45%;
  height: 40px;
  border-radius: 12px;
  border: 1px solid lightgrey;
  background-color: white;
  margin-left: 20px;
`;
export const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  cursor: pointer;
`;
export const DropdownList = styled.div`
  position: absolute;
  width: 43%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 12px;
`;
export const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const StCreateContent = styled.textarea`
  resize: none;
  height: 400px;
  width: 99%;
  font-size: 18px;
  border-radius: 12px;
  border: 1px solid lightgrey;
  padding: 12px;
  box-sizing: border-box;
`;

export const StFileBox = styled.div`
  display: flex;
  align-items: "center";
`;

export const StFileLink = styled.input`
  width: 50%;
  height: 40px;
  font-size: 18px;
  border-radius: 12px;
  border: 1px solid lightgrey;
  padding: 8px;
  box-sizing: border-box;
`;

export const StFileBtn = styled.label`
  margin-left: 10px;
  display: inline-block;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: olive;
  color: white;
  cursor: pointer;
`;

export const StCreateBtn = styled.button`
  width: 99%;
  height: 40px;
  border: none;
  color: white;
  border-radius: 12px;
  background-color: olive;
  cursor: pointer;
`;
