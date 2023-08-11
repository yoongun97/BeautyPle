import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import api from "../../axios/api";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import {
  StCreateForm,
  StCreateTitle,
  StSelectBox,
  DropdownWrapper,
  DropdownHeader,
  DropdownList,
  DropdownItem,
  StCreateContent,
  StFileLink,
  StFileBtn,
  StFileBox,
  StCreateBtn,
} from "./StyledCreate";

export default function Create() {
  const upperOptions = ["제품추천", "꿀팁공유"];
  const lowerOptions = {
    제품추천: ["올인원", "기초화장"],
    꿀팁공유: ["생활 꿀팁", "쇼핑 꿀팁"],
  };
  const user = useSelector((state) => state.User);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isUpperOpen, setIsUpperOpen] = useState(false);
  const [isLowerOpen, setIsLowerOpen] = useState(false);
  const [selectedUpperOption, setSelectedUpperOption] = useState(null);
  const [selectedLowerOption, setSelectedLowerOption] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });

  // select바 action
  const handleUpperOptionClick = (option) => {
    setSelectedUpperOption(option);
    setSelectedLowerOption(null); // 상위 카테고리 선택 시 하위 카테고리 초기화
    setIsUpperOpen(false);
    setIsLowerOpen(true); // 상위 카테고리 클릭 시 하위 카테고리 열기
  };
  const handleLowerOptionClick = (option) => {
    setSelectedLowerOption(option);
    setIsLowerOpen(false); // 하위 카테고리 선택 시 상위 카테고리 닫기
  };

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 추가하기 기능
  const mutation = useMutation(
    async (newPost) => {
      await api.post("posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );
  const addButton = () => {
    const newPost = {
      ...inputs,
      selectedUpperOption,
      selectedLowerOption,
      author: user.email,
      uid: user.id,
      id: uuid(),
      attachment: selectedFile,
    };
    mutation.mutate(newPost);
    navigate("/");
  };
  //
  return (
    <>
      <StCreateForm
        onSubmit={(e) => {
          e.preventDefault();
          addButton();
        }}
      >
        <StCreateTitle
          name="title"
          value={inputs.title}
          onChange={changeHandler}
          placeholder="제목"
        />
        <StSelectBox>
          <DropdownWrapper>
            <DropdownHeader
              onClick={() => {
                setIsUpperOpen(!isUpperOpen);
                setSelectedLowerOption(null);
              }}
            >
              {selectedUpperOption ? selectedUpperOption : "상위 카테고리"}
              <span>▼</span>
            </DropdownHeader>
            {isUpperOpen && (
              <DropdownList>
                {upperOptions.map((option) => (
                  <DropdownItem
                    key={option}
                    onClick={() => {
                      handleUpperOptionClick(option);
                    }}
                  >
                    {option}
                  </DropdownItem>
                ))}
              </DropdownList>
            )}
          </DropdownWrapper>

          <DropdownWrapper>
            <DropdownHeader>
              {selectedLowerOption ? selectedLowerOption : "하위 카테고리"}
              <span>▼</span>
            </DropdownHeader>
            {isLowerOpen && selectedUpperOption && (
              <DropdownList>
                {lowerOptions[selectedUpperOption].map((option) => (
                  <DropdownItem
                    key={option}
                    onClick={() => {
                      handleLowerOptionClick(option);
                    }}
                  >
                    {option}
                  </DropdownItem>
                ))}
              </DropdownList>
            )}
          </DropdownWrapper>
        </StSelectBox>

        <StCreateContent
          name="content"
          value={inputs.content}
          onChange={changeHandler}
          placeholder="내용"
        />
        <StFileBox>
          <StFileLink
            value={selectedFile ? selectedFile.name : ""}
            type="text"
            placeholder="파일링크"
          />
          <StFileBtn htmlFor="attachment">첨부파일</StFileBtn>
          <input
            type="file"
            id="attachment"
            style={{ display: "none" }}
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
            }}
          />
        </StFileBox>

        <StCreateBtn>추가하기</StCreateBtn>
      </StCreateForm>
    </>
  );
}
