import React, { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const StHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  padding: 24px;
  background-color: white;
  transition: opacity 0.3 ease;
`;

const StLogo = styled.div`
  cursor: pointer;
`;

const StFooter = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  padding: 24px;
  background-color: #eeeeee;
  /* color: black; */
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
`;

const StContent = styled.div`
  margin-top: 80px;
`;

const StBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

function Layout() {
  const navigate = useNavigate();
  const [headerOpacity, setHeaderOpacity] = useState(1); // 헤더 투명도 상태 추가
  const scrollTimeoutRef = useRef(null); // 스크롤 타임아웃 참조 추가

  useEffect(() => {
    const handleScroll = () => {
      clearTimeout(scrollTimeoutRef.current);
      setHeaderOpacity(0.7); // 스크롤 중에는 투명도를 0.7로 설정
      scrollTimeoutRef.current = setTimeout(() => {
        setHeaderOpacity(1); // 스크롤이 멈추면 투명도를 1로 설정
      }, 50);
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        paddingBottom: "90px",
        boxSizing: "border-box",
      }}
    >
      <StHeader style={{ opacity: headerOpacity }}>
        <StLogo
          onClick={() => {
            navigate("/");
          }}
        >
          <span
            style={{
              fontSize: "25px",
              marginRight: "10px",
              fontWeight: "bold",
              color: "#74e2db",
            }}
          >
            뷰티플
          </span>
          <span style={{ fontSize: "13px" }}>Beauty Platform</span>
        </StLogo>
        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <StBtn
            onClick={() => {
              navigate("/login");
            }}
          >
            LogIn
          </StBtn>
          <StBtn
            onClick={() => {
              navigate("/signup");
            }}
          >
            SignUp
          </StBtn>
        </div>
      </StHeader>
      <StContent>
        <Outlet />
      </StContent>
      <StFooter>
        <div>문의하기</div>
        <div>SNS 채널들</div>
      </StFooter>
    </div>
  );
}

export default Layout;
