import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  // 추후 이메일 이외에 다른 정보가 필요할 수도 있으므로 객체에 email 추가
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = user.actions;
export default user;
