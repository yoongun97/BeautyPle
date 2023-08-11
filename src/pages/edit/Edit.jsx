import React from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
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
  //셀렉트 관련 -추후수정
  const upperOptions = ["제품추천", "꿀팁공유"];
  const lowerOptions = {
    제품추천: ["올인원", "기초화장"],
    꿀팁공유: ["생활 꿀팁", "쇼핑 꿀팁"],
  };
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isUpperOpen, setIsUpperOpen] = useState(false);
  const [isLowerOpen, setIsLowerOpen] = useState(false);
  const [selectedUpperOption, setSelectedUpperOption] = useState(
    data.selectedUpperOption
  );
  const [selectedLowerOption, setSelectedLowerOption] = useState(
    data.selectedLowerOption
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputs, setInputs] = useState({
    title: data.title,
    content: data.content,
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
  // 수정하기 기능
  const mutation = useMutation(
    async () => {
      const editedItem = {
        ...data,
        title: inputs.title,
        content: inputs.content,
        selectedUpperOption,
        selectedLowerOption,
      };
      api.patch(`/posts/${id}`, editedItem);
      navigate("/");
    },
    // 데이터 추가 후 화면 바로 변경
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post", id]);
      },
    }
  );
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
          e.preventDefault();
          mutation.mutate();
        }}
      >
        <StEditTitle
          name="title"
          value={inputs.title}
          onChange={changeHandler}
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
        </>
        <StEditContent
          name="content"
          value={inputs.content}
          onChange={changeHandler}
          //changeHandler 했는데 임포트가 안돼서 Event를 붙힘
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
        <StEditBtn onClick={() => {}}>수정하기</StEditBtn>
      </StEditForm>
    </>
  );
}
export default Edit;
