import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { StCategory, StCategoryBtn, StSelect, StOption } from "./StyledCategory";
import { useDispatch } from "react-redux";
import { setSubCategory } from "../../redux/modules/postsSlice";

function Category() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [isCategoryVisible, setIsCategoryVisible] = useState(false); // 카테고리 바 표시 여부 상태 추가

  const toggleCategoryVisibility = () => {
    setIsCategoryVisible((prevVisible) => !prevVisible);
  };

  const handleSubcategorySelect1 = (subcategory) => {
    console.log(subcategory)
    dispatch(setSubCategory(subcategory));
    toggleCategoryVisibility();
    navigate("/items")
  };

  const handleSubcategorySelect2 = (subcategory) => {
    dispatch(setSubCategory(subcategory));
    toggleCategoryVisibility();
    navigate("/tips")
  };

  return (
    <>
      <StCategoryBtn onClick={toggleCategoryVisibility} isvisible={isCategoryVisible}>
        <img
          style={{ width: "30px", height: "30px" }}
          src="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
          alt="MainImg"
        />
      </StCategoryBtn>
      <StCategory isvisible={isCategoryVisible}>
        <StSelect onClick={()=>{
          dispatch(setSubCategory(null));
          navigate("/items")
          toggleCategoryVisibility()
          }}>
            제품 추천
            </StSelect>
        <StOption onClick={() => handleSubcategorySelect1("올인원")}>
           올인원
        </StOption>
        <StOption onClick={() => handleSubcategorySelect1("기초화장")}>
           기초화장
        </StOption>
        <StSelect onClick={()=>{
                dispatch(setSubCategory(null));
                navigate("/tips")
                toggleCategoryVisibility()
              }}>꿀팁</StSelect>
        <StOption onClick={() => handleSubcategorySelect2("생활 꿀팁")}>
           생활 꿀팁
        </StOption>
        <StOption onClick={() => handleSubcategorySelect2("쇼핑 꿀팁")}>
           쇼핑 꿀팁
        </StOption>
        <StSelect onClick={()=>{
                navigate("/youtube")
                toggleCategoryVisibility()
              }}>Youtube</StSelect>
        <StSelect onClick={()=>{
                navigate("/")
                toggleCategoryVisibility()
               }}>메인으로</StSelect>
      </StCategory>
    </>
  );
}

export default Category;
