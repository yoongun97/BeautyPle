import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { StSignupBox, StSignupForm, StLogo, StSignupInput, StSignupBtn, StErrorMsg } from "./StyledSignUp";

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
      const newUser = { email, password, id:uuid()  };
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
      <StSignupBox>
        <StSignupForm onSubmit={signupBt}>
        <StLogo
            onClick={() => {
              navigate("/");
            }}
          >
            <span
              style={{
                fontSize: "40px",
                marginRight: "10px",
                fontWeight: "bold",
                color: "#83925A",
              }}
            >
              뷰티플
            </span>
            <span style={{ fontSize: "20px" }}>Beauty Platform</span>
          </StLogo>
          <StSignupInput
            placeholder="이메일"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StSignupInput
            placeholder="비밀번호"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StSignupInput
            placeholder="비밀번호 확인"
            style={{marginBottom:"0"}}
            type="password"
            name="passwordconfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          {isError && (
            <StErrorMsg>
              {errorMessage}
            </StErrorMsg>
          )}
          <StSignupBtn
          style={{
            backgroundColor:"#83925A",
            marginTop:"20px",
          }}
            type="submit"
          >
            회원가입하기
          </StSignupBtn>
          <StSignupBtn
            style={{
              backgroundColor:"#C8D1AE"
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인하러 가기
          </StSignupBtn>
        </StSignupForm>
      </StSignupBox>
      {/* </Container> */}
    </>
  );
}

export default SignUp;
