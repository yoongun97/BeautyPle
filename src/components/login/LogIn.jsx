import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "./Auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/modules/userSlice";
import { StLoginBox, StLoginForm, StLogo, StLoginInput, StLoginBtn, StErrorMsg } from "./StyledLogIn";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const setMessage = (ErrorCode) => {
    if (ErrorCode === "Cannot find user") {
      return "가입한 적이 없는 이메일입니다.";
    } else if (ErrorCode === "Incorrect password") {
      return "비밀번호가 틀렸습니다.";
    } else {
      return "로그인에 실패하였습니다. 다시 시도해주세요.";
    }
  };
  const loginBt = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      }); 

      const responseData = response.data;
      const newAccessToken = responseData.accessToken;
      console.log(responseData)

      dispatch(setUser(responseData.user))

      setAccessToken(newAccessToken);
      alert("로그인이 되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      const ErrorCode = error.response?.data;
      setErrorMessage(setMessage(ErrorCode));
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };


  return (
    <>
      <StLoginBox>
        <StLoginForm onSubmit={loginBt}>
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
                // color: "#74e2db",
                color: "#83925A",
              }}
            >
              뷰티플
            </span>
            <span style={{ fontSize: "20px" }}>Beauty Platform</span>
          </StLogo>
          <StLoginInput
            placeholder="이메일"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}             
          />
          <StLoginInput
            placeholder="비밀번호"
            name="password"
            type="password"
            value={password}
            style={{marginBottom:"0"}}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <StErrorMsg>
              {errorMessage}
            </StErrorMsg>
          )}
          <StLoginBtn
            style={{
              backgroundColor:"#83925A",
              marginTop:"20px",
            }}
          >
            로그인하기
          </StLoginBtn>
  
          <StLoginBtn
            style={{
              backgroundColor:"#C8D1AE"
            }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입하러 가기
          </StLoginBtn>
        </StLoginForm>
      </StLoginBox>
      {accessToken && <Auth accessToken={accessToken} />}
      {/* 이때 들어가야 마지막에 확인이 가능하다는데 맞는지도 모르겠다. */}
    </>
  );
}
//token : 사용자가 성공적으로 로그인하면 `jsonwebtoken`과 같은 라이브러리를 사용하여 JWT 토큰을 생성
