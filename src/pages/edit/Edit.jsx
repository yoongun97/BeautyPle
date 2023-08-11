import React from "react";
import { useState } from "react";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import api from "../../axios/api";
// const result = todos.filter((value) => value.id === id);
function Edit() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery(["posts", id], async () => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  });
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ marginTop: "80px", maxWidth: "1200px" }}>
      <form
        style={{
          height: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
        onSubmit={(e) => {
          setTitle(e.preventDefault());
        }}
      >
        <div>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <select
              style={{
                width: "50%",
                height: "40px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
            >
              r{" "}
              <DropdownWrapper>
                <DropdownHeader
                  onClick={() => {
                    // setIsOpen((prev) => !prev);
                  }}
                >
                  {/* {selectedOption || "상위 카테고리"} */}
                  상위카테고리
                </DropdownHeader>
                <span>▼</span>
              </DropdownWrapper>
              {/* <option value="">상위 카테고리 선택</option>
              <option value="category1">카테고리 1</option>
              <option value="category2">카테고리 2</option>
             */}
            </select>
            <span style={{ margin: "0 10px" }}>:</span>
            <select
              style={{
                width: "50%",
                height: "40px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
            >
              <option value="">하위 카테고리 선택</option>
              <option value="subcategory1">하위 카테고리 1</option>
              <option value="subcategory2">하위 카테고리 2</option>
            </select>
          </div>
        </>
        <div
          style={{
            height: "400px",
          }}
        >
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            //changeHandler 했는데 임포트가 안돼서 Event를 붙힘
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
          onClick={() => {}}
        >
          수정하기
        </button>
      </form>
    </div>
  );
}
const DropdownWrapper = styled.div``;
const DropdownHeader = styled.div``;
export default Edit;
