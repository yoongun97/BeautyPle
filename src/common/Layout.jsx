import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/modules/userSlice";
import { StHeader, StLogo, StFooter, StContent, StBtn } from "./StyledLayout";

function Layout() {
  const navigate = useNavigate();
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true); // 헤더 투명 여부 상태 추가
  const user = useSelector((state) => state.User);
  const dispatch = useDispatch();

  // 로그아웃 함수
  const logout = async () => {
    alert("로그아웃 하시겠습니까?");
    dispatch(setUser({ email: null, id: null }));
    navigate("/");
  };

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
      <StHeader
        style={{
          backgroundColor: isHeaderTransparent
            ? "rgba(255, 255, 255, 0.1)"
            : "white",
        }}
      >
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
          {user.email ? (
            <>
              <StBtn onClick={logout}>LogOut</StBtn>
              <StBtn
                onClick={() => {
                  navigate(`/mypage/${user.id}`);
                }}
              >
                {user.email}
              </StBtn>
              <StBtn
                onClick={() => {
                  navigate("/create");
                }}
              >
                <img
                  style={{
                    width: "35px",
                    height: "35px",
                  }}
                  src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
                  alt="글 작성 버튼"
                />
              </StBtn>
            </>
          ) : (
            <>
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
            </>
          )}
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
