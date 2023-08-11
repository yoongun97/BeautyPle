import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import api from "../../axios/api";
import {
  StEditForm,
  StEditTitle,
  StSelectBox,
  DropdownWrapper,
  DropdownHeader,
  DropdownList,
  DropdownItem,
  StEditContent,
  StFileLink,
  StFileBox,
  StFileBtn,
  StEditBtn,
} from "./StyledEdit";

function Edit() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery(
    ["posts", id],
    async () => {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    }
  );
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);

  //셀렉트 관련 -추후수정
  const upperOptions = ["제품추천", "꿀팁공유"];
  const lowerOptions = {
    제품추천: ["올인원", "기초화장"],
    꿀팁공유: ["생활 꿀팁", "쇼핑 꿀팁"],
  };

  const [isUpperOpen, setIsUpperOpen] = useState(false);
  const [isLowerOpen, setIsLowerOpen] = useState(false);
  const [selectedUpperOption, setSelectedUpperOption] = useState(
    data.selectedUpperOption
  );
  const [selectedLowerOption, setSelectedLowerOption] = useState(
    data.selectedLowerOption
  );

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <StEditForm
        onSubmit={(e) => {
          setTitle(e.preventDefault());
        }}
      >
        <StEditTitle
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <>
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
        </>

        <StEditContent
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          //changeHandler 했는데 임포트가 안돼서 Event를 붙힘
        />

        <StFileBox>
          <StFileLink type="text" placeholder="파일링크" />
          <StFileBtn htmlFor="attachment">첨부파일</StFileBtn>
          <input type="file" id="attachment" style={{ display: "none" }} />
        </StFileBox>
        <StEditBtn onClick={() => {}}>수정하기</StEditBtn>
      </StEditForm>
    </>
  );
}

export default Edit;
