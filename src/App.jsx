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
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {setUser} from "./redux/modules/userSlice"

function App() {
  const user = useSelector((state) => state.User);

  const dispatch = useDispatch();
  useEffect(() => {
      axios.get("http://localhost:4000/users").then((response) => {
        const users = response.data;
        const currentUser = users.find((u) => u.email === user?.email);
        if (currentUser) {
          try {
            dispatch(setUser({ email: currentUser.email, id: currentUser.id }));
          } catch (error) {
            console.log("사용자 정보를 가져오는 데 실패했습니다.\n", error);
          }
        } else {
          dispatch(setUser({ email: null, id:null }));
          // 로그인되지 않은 상태면 null로 설정
        }
      });
  }, []); 

  return (
    <Routes>
      <Route element={<Layout/>}>
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
