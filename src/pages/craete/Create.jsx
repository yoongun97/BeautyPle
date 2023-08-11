import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import api from "../../axios/api";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import uuid from "react-uuid";

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

  const user = useSelector((state) => state.user.user);
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
      author: "작성자",
      uid: "userid",
      id: uuid(),
    };
    mutation.mutate(newPost);
    // navigate("/");
  };
  //
  return (
    <>
      <form
        style={{
          height: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          console.log("제출!");
        }}
      >
        <div>
          <input
            name="title"
            value={inputs.title}
            onChange={changeHandler}
            placeholder="제목"
            style={{
              width: "100%",
              height: "60px",
              fontSize: "18px",
              borderRadius: "12px",
              border: "1px solid lightgrey",
              padding: "8px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ display: "flex" }}>
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
        </div>

        <div
          style={{
            height: "400px",
          }}
        >
          <textarea
            name="content"
            value={inputs.content}
            onChange={changeHandler}
            placeholder="내용"
            style={{
              resize: "none",
              height: "100%",
              width: "100%",
              fontSize: "18px",
              borderRadius: "12px",
              border: "1px solid lightgrey",
              padding: "12px",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="파일링크"
            style={{
              width: "50%",
              height: "40px",
              fontSize: "18px",
              borderRadius: "12px",
              border: "1px solid lightgrey",
              padding: "8px",
              boxSizing: "border-box",
            }}
          />
          <label
            htmlFor="attachment"
            style={{
              marginLeft: "10px",
              display: "inline-block",
              padding: "8px 12px",
              borderRadius: "4px",
              backgroundColor: "olive",
              color: "white",
              cursor: "pointer",
            }}
          >
            첨부파일
          </label>
          <input type="file" id="attachment" style={{ display: "none" }} />
        </div>

        <button
          style={{
            width: "100%",
            height: "40px",
            border: "none",
            color: "white",
            borderRadius: "12px",
            backgroundColor: "olive",
            cursor: "pointer",
          }}
          onClick={() => {
            addButton();
          }}
        >
          추가하기
        </button>
      </form>
    </>
  );
}

const DropdownWrapper = styled.div`
  width: 100px;
  border: 1pc solid css;
`;
const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  background-color: #f1f1f1;
`;
const DropdownList = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
`;
const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;
