import { createSlice } from "@reduxjs/toolkit";

// 1. createSlice 만들기
const subCategory = createSlice({
  name: "subCategory",
  initialState: null,
  // 3. reducers 추가
  reducers: {
    // 4. reducer 안에 변경함수 만들기
    setSubCategory: (state, action) => {
        return action.payload
    }
  },
});

export const { setSubCategory } = subCategory.actions;
export default subCategory.reducer;
