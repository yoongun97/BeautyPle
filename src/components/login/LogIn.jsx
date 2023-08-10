import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "./Auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

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
    //받아온 값이 없다. 받아온 값을 넣고 data를 넣고 따로 받아온 값이 있거나
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      }); //일단 여기서 사용자의 이메일을 받아서 사용하는 것은 맞고
      const responseData = response.data;
      //받아온 것들 중 data 값을 가지고 새로운 변수를 만든다.

      const newAccessToken = responseData.accessToken;
      //tokens 값을 새변수 만들고
      setAccessToken(newAccessToken);
      alert("로그인이 되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      const ErrorCode = error.response?.data;
      setErrorMessage(setMessage(ErrorCode));
    }
  };

  // 확인하는 용도는 맞고 쓸모없다.
  // useEffect(() => {
  //   if (accessToken) {
  //     //만약 tokens 값을 넣었을때
  //     console.log("Access Token:", accessToken);
  //   }
  // }, [accessToken]);
  //앞의 app이랑 여기 차이 다시 공부하기!
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
          {errorMessage && (
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
          {/* {accessToken && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p>로그인된 이메일: {email}</p>
            </div>
          )} */}
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
      {accessToken && <Auth accessToken={accessToken} />}
      {/* 이때 들어가야 마지막에 확인이 가능하다는데 맞는지도 모르겠다. */}
    </>
  );
}
//token : 사용자가 성공적으로 로그인하면 `jsonwebtoken`과 같은 라이브러리를 사용하여 JWT 토큰을 생성