import { Link, Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Detail from "./pages/detail/Detail";
import Create from "./pages/craete/Create";
import Edit from "./pages/edit/Edit";
import Mypage from "./pages/mypage/Mypage";
import LogIn from "./components/login/LogIn";
import SignUp from "./components/signup/SignUp";
import Layout from "./common/Layout";
import Items from "./pages/main/Items";
import Tips from "./pages/main/Tips";
import MainImg from "./common/MainImg";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // JSON Server에서 사용자 정보를 가져오기
    axios.get("http://localhost:4000/users").then(
      (response) => {
        const users = response.data;
        // 여기서 users 함수를 정의하여 현재 로그인한 사용자 정보를 찾을 수 있도록 만들기
        const currentUser = users.find((user) => user.email === user?.email);
        setUser(currentUser);
        //14번째 줄 user가 바뀐다. 13번째 줄이 다시실행하도록 만든다.
      },
      []
      //이게 변경되면 useeffect 다시 실행된다. 이걸 다 비우면 한번만 실행되게 다시 실행되게 한다. 제가 바뀌면 다시 실행하고 계속 실행
      //넣으면 계속 실행된다.
    );
  });

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<MainImg />}>
          <Route path="/" element={<Main />} />
          <Route path="/items" element={<Items />} />
          <Route path="/tips" element={<Tips />} />
        </Route>
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/mypage/:uid" element={<Mypage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      <Route
        path="*"
        element={
          <>
            <div>없는 페이지입니다.</div>
            <Link to="/">홈으로 이동</Link>
          </>
        }
      />
    </Routes>
  );
}

export default App;
