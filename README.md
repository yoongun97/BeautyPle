# React 심화 프로젝트 : BeautyPle(Beauty Platform)

> **Create React App Project** <br/> **개발기간: 2023.08.07 ~ 2023.08.14**

## 프로젝트 소개

- 사용자들이 제품을 추천, tip을 제공하고 다른 사용자들이 댓글을 작성하고 평가함으로써 정보를 공유합니다.

## 화면 구성

|                                                      메인 페이지                                                       |                                                      리스트 페이지                                                       |
| :--------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: |
| ![image](https://github.com/yoongun97/BeautyPle/assets/108172921/be54fb9f-67e1-4a9c-8a1e-acb4cb3cd33f)                 |                     ![image](https://github.com/yoongun97/BeautyPle/assets/108172921/bc8ad181-5a00-44a0-9e0f-d646418ebd61)   |
|                                                    로그인                                                           |                                                    상세 페이지                                                                |
|            ![image](https://github.com/yoongun97/BeautyPle/assets/108172921/52987c76-a66a-481e-9a4f-f6aa6c284b10) |   ![image](https://github.com/yoongun97/BeautyPle/assets/108172921/34cf4c06-08cc-40d3-b620-47ca6a288152)|
|                                                    포스트 작성                                                          |                                                    마이 페이지                                                                |
|                ![image](https://github.com/yoongun97/BeautyPle/assets/108172921/79b8ed09-f2f9-4ea3-abff-aef0bfe185f6)    |           ![image](https://github.com/yoongun97/BeautyPle/assets/108172921/a6aef8e9-c606-480d-a602-aa7155b4ecb9)            |
|                                                    수정 페이지                                                         |                                                   카테고리 페이지                                                 |
|                ![image](https://github.com/yoongun97/BeautyPle/assets/108172921/d5b552a7-9463-43ca-a822-079fbc039d4d)    |           ![image](https://github.com/yoongun97/BeautyPle/assets/108172921/aba7f63f-7fce-400a-84ee-71eb88ef209b)          |


---

## 주요 기능

### 회원정보 관리

#### 로그인, 회원가입

- 본인이 정한 이메일로 회원가입을 할 수 있습니다.


### 리스트 페이지

#### 포스트 리스트 불러오기

- 글 리스트를 카테고리 별로 보여줍니다.
- 더보기 버튼을 통해 상위 카테고리 별 포스트를 볼 수 있습니다.

#### 카테고라이징

- 카테고리바를 통해 상위카테고리, 하위 카테고리별 포스트를 필터링해서 볼 수 있습니다.

  

### 상세 페이지

#### 포스트 상세정보 불러오기

- 사진, 글 제목, 내용을 볼 수 있습니다.

#### 추천, 비추천 버튼

- 추천, 비추천 버튼을 통해 게시물에 본인의 의견을 표시할 수 있습니다.
- 게시물 별 추천, 비추천 수를 보여주어 게시물의 신뢰도를 확인할 수 있습니다.

#### 댓글 작성

- 게시물 별로 댓글을 통해 본인의 의견을 제시할 수 있습니다.


### 마이 페이지

#### 작성한 글 목록 불러오기

- 본인이 작성한 글 목록을 볼 수 있습니다.
- 본인이 작성한 글을 삭제할 수 있습니다.

#### 추천한 글 목록 불러오기

- 리스트페이지에서 추천 버튼를 눌렀던 포스트 목록을 불러올 수 있습니다.
- 카드를 눌러 해당 게시물의 상세페이지로 이동할 수 있습니다.




## API 명세서

기능 | URL | Method | request | response
-----|------|------|-------|------
로그인 |/api/login | POST | {<br> email: string,  <br> password: string,  <br>  } | { <br> uid, <br> email,  <br> }
회원가입 |/api/signup | POST | {<br> id: string,  <br> email: string,  <br> password: string,  <br> } | -
마이페이지(작성  목록) | /api/mypage/:uid | GET | {<br> uid:string <br> },| posts: { <br> postId, <br> postTitle, <br> postContent, <br>}
마이페이지(추천 목록) | /api/mypage/:uid | GET | likes :{ <br> userId: string, <br> state:string, <br> postId:string, <br> } <br> posts: { <br> postId <br> } <br> | posts: { <br> postId, <br> postTitle, <br> postContent, <br> } 
리스트 조회 | /api/posts | GET | posts: { <br>selectedUpperOption <br> } | posts: {<br>postTitle,<br>postImg,<br>author<br>}
카테고라이징 | /api/items, <br> /api/tips | GET |posts:{<br>selectedLowerOption<br>} | posts: {<br>postTitle,<br>postImg,<br>author<br>}
포스트 조회 | /api/detail/:postId | GET | posts: {<br>postId:string,<br>} | posts: <br>postTitle,<br>postImg,<br>postContent<br>}
포스트 추가 | /api/posts | POST |posts:{<br>postTitle:string,<br>postImg:string,<br>postContent: string,<br>author:user.email,<br>uid:user.id,<br>selectedUpperOption: string,<br>selectedLowerOption:string,<br>id:string<br>}|-
포스트 삭제 | /api/posts/:postId | DELETE | posts:{<br>postId:string, <br>uid:string<br>} | -
포스트 수정 | /api/posts/:postId | PATCH |posts:{<br>postTitle:string,<br>postImg:string,<br>postContent: string,<br>uid:user.id,<br>selectedUpperOption: string,<br>selectedLowerOption:string,<br>id:string<br>} | posts: { <br> postTitle,<br>postImg<br>postContent<br>selectedUpperOption,<br>selectedLowerOption<br>
추천 조회 | /api/likes | GET | likes: {<br>postId:string,<br>uid:string,<br>state:string<br>} | likes:{<br>uid<br>}
추천 추가 | /api/likes | POST | likes: {<br>postId:string,<br>uid:string,<br>state:string<br>} | -
추천 삭제 | /api/likes | DELETE | likes: {<br>postId:string,<br>uid:string,<br>state:string<br>} | -
댓글 추가 | /api/comments | POST |  { <br> author:user.email,<br>uid:user.id<br>id:string,<br>postId,<br>content:string,<br>} | comments: {<br>author,<br>content,<br>}
댓글 삭제 | /api/comments | DELETE| comments:{<br>uid:user.id<br>id,<br>} | -


