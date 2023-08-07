import { Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Detail from "./pages/detail/Detail";
import Create from "./pages/craete/Create";
import Edit from "./pages/edit/Edit";
import Mypage from "./pages/mypage/Mypage";
import LogIn from "./components/login/LogIn";
import SignUp from "./components/signup/SignUp";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
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
