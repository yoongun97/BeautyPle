import React from "react";
function Detail() {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [coments, setComents] = useState("");

  return (
    <>
      <div>
        <h1
          style={{
            float: "left",
            height: "400px",
            width: "400px",
            display: "flex",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          dd
        </h1>
        <h1
          style={{
            height: "400px",
            width: "1000px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
            paddingTop: "12px",
          }}
        >
          dd
        </h1>
        <div
          style={{
            height: "400px",
            margin: "10px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          dd
          {/* 이 부분의 박스를 댓글창으로 쓰면 좋을듯 */}
        </div>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <button
            onClick={() => {}}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "orange",
              color: "white",
              cursor: "pointer",
              marginRight: "6px",
            }}
          >
            수정
          </button>
          <button
            onClick={() => {}}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "red",
              color: "white",
              cursor: "pointer",
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </>
  );
}
export default Detail;
