import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const showErrorMS = (message) => {
    setErrorMessage(message);
    setIsError(true);
    setTimeout(() => {
      setErrorMessage("");
      setIsError(false);
    }, 3000);
  };

  const signupBt = async (e) => {
    e.preventDefault();
    const emailForm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailForm.test(email)) {
      showErrorMS("올바른 이메일 형식이 아닙니다.");
      return;
    }

    if (password.length < 6) {
      showErrorMS("비밀번호는 최소 6자리 이상이어야 합니다.");
      return;
    }

    if (password !== passwordConfirm) {
      showErrorMS("비밀번호가 맞지 않습니다.");
      return;
    }

    try {
      const newUser = { email, password };
      await axios.post("http://localhost:4000/users", newUser);
      alert("회원가입이 성공하셨습니다.");
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      const ErrorCode = error.response?.data;
      console.log(ErrorCode);
      const setMessage = (ErrorCode) => {
        if (ErrorCode === "Email already exists") {
          return "이미 존재하는 이메일입니다.";
        } else {
          return "회원가입에 실패하였습니다. 다시 시도해주세요.";
        }
      };
      showErrorMS(setMessage(ErrorCode));
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
        <form onSubmit={signupBt}>
          <div style={{ width: "360px", marginBottom: "12px" }}>
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
          <div style={{ width: "360px", marginBottom: "12px" }}>
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
          <div style={{ width: "360px", marginBottom: "12px" }}>
            <input
              placeholder="비밀번호 확인"
              type="password"
              name="passwordconfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
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
          {isError && (
            <div
              style={{
                color: "red",
                textAlign: "center",
                marginBottom: "12px",
              }}
            >
              {errorMessage}
            </div>
          )}
          <div style={{ width: "360px", marginBottom: "12px" }}>
            <button
              type="submit"
              style={{
                width: "100%",
                border: "none",
                padding: "12px",
                borderRadius: "6px",
                backgroundColor: "#FF6969",
                color: "white",
                cursor: "pointer",
              }}
            >
              회원가입하기
            </button>
          </div>
          <div style={{ width: "360px" }}>
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
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인하러 가기
            </button>
          </div>
        </form>
      </div>
      {/* </Container> */}
    </>
  );
}

export default SignUp;
