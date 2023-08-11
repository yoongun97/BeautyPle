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
  //셀렉트 관련 -추후수정
  const upperOptions = ["제품추천", "꿀팁공유"];
  const lowerOptions = {
    제품추천: ["올인원", "기초화장"],
    꿀팁공유: ["생활 꿀팁", "쇼핑 꿀팁"],
  };

  const [isUpperOpen, setIsUpperOpen] = useState(false);
  const [isLowerOpen, setIsLowerOpen] = useState(false);
  const [selectedUpperOption, setSelectedUpperOption] = useState(null);
  const [selectedLowerOption, setSelectedLowerOption] = useState(null);

  // select바 action
  const handleUpperOptionClick = (option) => {
    setSelectedUpperOption(option);
    setSelectedLowerOption(null); // 상위 카테고리 선택 시 하위 카테고리 초기화
    setIsUpperOpen(false);
    setIsLowerOpen(true); // 상위 카테고리 클릭 시 하위 카테고리 열기
  };
  const handleLowerOptionClick = (option) => {
    setSelectedLowerOption(option);
    setInputs({
      ...inputs,
      selectedUpperOption,
      selectedLowerOption,
    });
    setIsLowerOpen(false); // 하위 카테고리 선택 시 상위 카테고리 닫기
  };

  const user = useSelector((state) => state.User);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    selectedUpperOption: "", // 상위 카테고리 선택값 추가

    selectedLowerOption: "", // 하위 카테고리 선택값 추가
  });

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 추가하기 기능
  const queryClient = useQueryClient();

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
      author: user.email,
      uid: user.id,
      id: uuid(),
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
          console.log("제출!");
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
            <DropdownHeader
              onClick={() => {
                setSelectedLowerOption(null);
              }}
            >
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
          <StFileLink type="text" placeholder="파일링크" />
          <StFileBtn htmlFor="attachment">첨부파일</StFileBtn>
          <input type="file" id="attachment" style={{ display: "none" }} />
        </StFileBox>

        <StCreateBtn
          onClick={() => {
            addButton();
          }}
        >
          추가하기
        </StCreateBtn>
      </StCreateForm>
    </>
  );
}
