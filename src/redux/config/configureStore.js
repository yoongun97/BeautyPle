import { configureStore } from "@reduxjs/toolkit";
import subCategory from "../modules/postsSlice";
import user from "../modules/usersSlice";

// 데이터 중앙 저장소 만들기
const store = configureStore({
  reducer: {
    // 2. 다른 곳에서 사용할 수 있게 configureStore에 넣어주기
    subCategory,
    user: user.reducer,
  },
});

export default store;
