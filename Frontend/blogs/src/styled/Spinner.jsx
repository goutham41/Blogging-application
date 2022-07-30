import React from "react";
import "../styles/spinner.css";

export default function LoadingSpinner() {
  return (
    <>
      {" "}
      <div className="spinner-container">
        <div
          className="loading-spinner"
          style={{ textAlign: "center", margin: "auto", color: "#3a87bd" }}
        ></div>
      </div>
    </>
  );
}
