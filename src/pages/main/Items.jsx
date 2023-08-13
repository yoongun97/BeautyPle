import React, { useEffect } from "react";
import Category from "../../components/category/Category";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import api from "../../axios/api";
import {
  StMainBody,
  StMainContent,
  StContentTitle,
  StCardContainer,
  StCard,
  StCardImg,
  StCardInfo,
  StCardTitle,
  StCardAuthor,
} from "./StyledMain";
import { useDispatch, useSelector } from "react-redux";
import { setSubCategory } from "../../redux/modules/postsSlice";
import noImage from "../../lib/logo.png";

function Items() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Subcategory = useSelector((state) => state.subCategory);

  const { data, isLoading, isError, error } = useQuery(
    ["posts", "제품추천"],
    async () => {
      const response = await api.get(`/posts?selectedUpperOption=제품추천`);
      return response.data;
    },
    {
      select: (data) => data.reverse(),
    }
  );

  useEffect(() => {
    return () => {
      dispatch(setSubCategory(null)); // subCategory를 null로 설정하여 필터링 초기화
    };
  }, []);

  if (isLoading) {
    return <div>데이터 가져오는 중...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  let filteredData = data;

  if (Subcategory) {
    filteredData = data.filter(
      (item) => item.selectedLowerOption === Subcategory
    );
  }

  return (
    <>
      <StMainBody>
        <Category />
        <StMainContent>
          <StContentTitle>제품 추천</StContentTitle>
          <StCardContainer>
            {filteredData.map((item) => (
              <StCard
                key={item.id}
                onClick={() => {
                  navigate(`/detail/${item.id}`);
                }}
              >
                <StCardImg src={item.img || noImage} alt="MainImg" />
                <StCardInfo>
                  <StCardTitle>{item.title}</StCardTitle>
                </StCardInfo>
                <StCardAuthor>{item.author}</StCardAuthor>
              </StCard>
            ))}
          </StCardContainer>
        </StMainContent>
      </StMainBody>
    </>
  );
}

export default Items;
// import React, { useEffect, useState } from "react";
// import Category from "../../components/category/Category";
// import { useNavigate } from "react-router-dom";
// import { useQuery } from "react-query";
// import api from "../../axios/api";
// import {
//   StMainBody,
//   StMainContent,
//   StContentTitle,
//   StCardContainer,
//   StCard,
//   StCardImg,
//   StCardInfo,
//   StCardTitle,
//   StCardContent,
//   StCardAuthor,
// } from "./StyledMain";
// import { useDispatch, useSelector } from "react-redux";
// import { setSubCategory } from "../../redux/modules/postsSlice";
// import InfiniteScroll from "react-infinite-scroll-component";

// function Items() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const Subcategory = useSelector((state) => state.subCategory);

//   const { data, isLoading, isError, error } = useQuery(
//     ["posts", "제품추천"],
//     async () => {
//       const response = await api.get(`/posts?selectedUpperOption=제품추천`);
//       return response.data;
//     }
//   );
//   console.log(data);
//   const [filteredData, setFilteredData] = useState(data); // 데이터 상태로 관리

//   // const [page, setPage] = useState(1); //현재페이지 추가

//   // const fetchNextPage = async () => {
//   //   setPage((prevPage) => prevPage + 1);
//   //   const nextPageResponse = await api.get(
//   //     `/posts?highcategory=제품 추천&page=${page + 1}`
//   //   );
//   //   const nextPageData = nextPageResponse.data;
//   //   setFilteredData((prevData) => [...prevData, ...nextPageData]);
//   // };

//   //다음 페이지의 데이터를 불러올 수 있는 함수
//   //이전 페이지에서 하나 추가
//   // const itemsPerPage = 8; //페이지당 보여줄 아이템수
//   // const startIndex = (page - 1) * itemsPerPage; //시작
//   // const endIndex = startIndex + itemsPerPage; //마지막
//   // console.log(filteredData);
//   // const displayedData = filteredData.slice(startIndex, endIndex);

//   useEffect(() => {
//     return () => {
//       dispatch(setSubCategory(null)); // subCategory를 null로 설정하여 필터링 초기화
//     };
//   }, []);

//   if (isLoading) {
//     return <div>데이터 가져오는 중...</div>;
//   }

//   if (isError) {
//     return <div>{error.message}</div>;
//   }

//   if (Subcategory) {
//     const categorizedData = data.filter(
//       (item) => item.selectedLowerOption === Subcategory
//     );
//     setFilteredData(categorizedData);
//   }

//   console.log(filteredData);

//   return (
//     <>
//       <StMainBody>
//         <Category />
//         <StMainContent>
//           <StContentTitle>제품 추천</StContentTitle>
//           {/* <p>Data Length: {data.length}</p>
//           <p>Filtered Data Length: {filteredData.length}</p>
//           <p>Displayed Data Length: {displayedData.length}</p> */}
//           {/* <InfiniteScroll
//             dataLength={displayedData.length}
//             // next={fetchNextPage}
//             hasMore={displayedData.length < filteredData.length}
//             loader={<h4>Loading...</h4>}
//           > */}
//           <StCardContainer>
//             {filteredData.map((item) => (
//               <StCard
//                 key={item.id}
//                 onClick={() => {
//                   navigate(`/detail/${item.id}`);
//                 }}
//               >
//                 <StCardImg src={item.img} alt="MainImg" />
//                 <StCardInfo>
//                   <StCardTitle>{item.title}</StCardTitle>
//                   <StCardContent>{item.content}</StCardContent>
//                 </StCardInfo>
//                 <StCardAuthor>{item.author}</StCardAuthor>
//               </StCard>
//             ))}
//           </StCardContainer>
//           {/* </InfiniteScroll> */}
//         </StMainContent>
//       </StMainBody>
//     </>
//   );
// }

// export default Items;
