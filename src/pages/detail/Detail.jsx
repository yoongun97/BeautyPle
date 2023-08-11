import React from "react";
import { useQuery } from "react-query";
import api from "../../axios/api";
import { useParams, useNavigate } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery(["posts", id], async () => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  });

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div style={{ marginTop: "80px", maxWidth: "1200px" }}>
        <div style={{ display: "flex" }}>
          <img
            style={{
              height: "400px",
              width: "400px",
              display: "flex",
              border: "1px solid lightgray",
              borderRadius: "12px",
              padding: "12px",
              backgroundColor: "gray",
            }}
            src={data.img}
            alt="상세이미지"
          />

          <div
            style={{
              height: "400px",
              width: "1000px",
              border: "none",
              padding: "12px",
              paddingTop: "12px",
            }}
          >
            <div style={{ display: "flex" }}>
              <h1
                style={{
                  width: "550px",
                  border: "1px solid lightgray",
                  borderRadius: "12px",
                  padding: "12px",
                }}
              >
                {data.title}
              </h1>
              <button
                style={{
                  marginTop: "30px",
                  marginLeft: "15px",
                  width: "150px",
                  height: "50px",
                  border: "none",
                  padding: "8px",
                  borderRadius: "6px",
                  backgroundColor: "orange",
                  color: "white",
                  cursor: "pointer",
                  marginRight: "6px",
                }}
                onClick={() => {
                  navigate(`/edit/${data.id}`);
                }}
              >
                수정
              </button>
            </div>
            <div
              style={{
                height: "200px",
                border: "1px solid lightgray",
                borderRadius: "12px",
                padding: "12px",
              }}
            >
              {data.content}
            </div>
            <div style={{ display: "flex" }}>
              <button style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}>
                <img
                  style={{
                    width: "60px",
                    height: "60px",
                  }}
                  src="https://t4.ftcdn.net/jpg/05/54/76/53/240_F_554765365_GV87lL7ynZSvGDQt26BBsJ89hfrYfDzU.jpg"
                  alt="좋아요 버튼"
                />
              </button>
              <span style={{ fontSize: "30px", margin: "10px", marginLeft: "4px" }}>0</span>
              <button style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}>
                <img
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  src="https://cdn-icons-png.flaticon.com/128/8391/8391771.png"
                  alt="싫어요 버튼"
                />
              </button>
              <span style={{ fontSize: "30px", margin: "10px" }}>0</span>
            </div>
          </div>
        </div>
        <div
          style={{
            height: "400px",
            margin: "10px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          cc
          {/* 이 부분의 박스를 댓글창으로 쓰면 좋을듯 */}
        </div>
      </div>
    </>
  );
}
export default Detail;
