import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import PaginationIndex from "./PaginationIndex";
import ModalIndex from "./ModalIndex";
import ProgressionIndex from "./ProgressionIndex";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <PaginationIndex /> */}
    {/* <ModalIndex /> */}
    <ProgressionIndex />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
