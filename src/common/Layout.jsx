import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const StHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  margin: 0 auto 0 auto;
  padding: 20px;
  background-color: white;
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
  position:absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
`;

const StContent = styled.div`
padding-bottom: 80px;`;

const StBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

function Layout() {
  const navigate = useNavigate();
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true); // 헤더 투명 여부 상태 추가

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const imageHeight = 500; // 이미지의 높이
      
      // 이미지와 겹쳐질 때 헤더 투명도 설정
      if (scrollTop >= imageHeight) {
        setIsHeaderTransparent(false);
      } else {
        setIsHeaderTransparent(true);
      }
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
        margin: "auto",
      }}
    >
      <StHeader style={{ backgroundColor: isHeaderTransparent ? "rgba(255, 255, 255, 0.1)" : "white" }}>
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
              // color: "#74e2db",
              color: "#83925A",
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
