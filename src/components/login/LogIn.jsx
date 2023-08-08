import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginBt = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      if (response.data.success) {
        const user = response.data.user;

        if (user.email === email && user.password === password) {
          alert("로그인 성공!");
          navigate("/");
        } else {
          alert("이메일 또는 비밀번호를 확인해주세요.");
        }
      } else {
        alert("로그인 실패. 이메일 또는 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("로그인에 실패하였습니다. 다시 시도해주세요.");
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "600px",
          alignItems: "center",
        }}
      >
        <form onSubmit={loginBt}>
          <div
            style={{
              width: "360px",
              marginBottom: "12px",
            }}
          >
            <input
              placeholder="이메일"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                height: "40px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div
            style={{
              width: "360px",
              marginBottom: "12px",
            }}
          >
            <input
              placeholder="비밀번호"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                height: "40px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div
            style={{
              width: "360px",
              marginBottom: "12px",
            }}
          >
            <button
              style={{
                width: "100%",
                border: "none",
                padding: "12px",
                borderRadius: "6px",
                backgroundColor: "#78C1F3",
                color: "white",
                cursor: "pointer",
              }}
            >
              로그인하기
            </button>
          </div>
          <div
            style={{
              width: "360px",
            }}
          >
            <button
              style={{
                width: "100%",
                border: "none",
                padding: "12px",
                borderRadius: "6px",
                backgroundColor: "#FF6969",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입하러 가기
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
