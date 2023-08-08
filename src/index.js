import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import 하기
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
		{/* 여기 추가 */} 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);