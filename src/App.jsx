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

  // json-server에서 현재 로그인 된 유저 정보를 가져온다. -> UUSER

  useEffect(() => {
    if (!user) {
      // user가 바꿀때만 화면 그려주기
      axios.get("http://localhost:4000/users").then((response) => {
        const users = response.data;
        const currentUser = users.find((user) => user.email === user?.email);
        //로그인 한사람의 정보를 가져오는 방법
        setUser(currentUser);
      });
    }
  }, [user]);
  // useEffect(() => {
  //   axios.get("http://localhost:4000/users").then((response) => {
  //     const currentUser = users.find((user) => user.email === user?.email);
  //     setUser(currentUser);
  //   }, []);
  // });
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
