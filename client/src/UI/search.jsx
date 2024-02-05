import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export default function Search({value , onSearch}) {

  return (
    <div
      style={{
        position: "relative",
        width: "fit-content",
        margin: "20px auto",
      }}
    >
      <label
        htmlFor="search"
        style={{
          position: "absolute",
          transform: "translateY(-50%)",
          top: "50%",
          right: "4%",
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </label>
      <input
        id="search"
        style={{
          padding: "10px 15px",
          borderRadius: "25px",
          width: "20rem",
          paddingRight: "40px",
          outline: "none",
        }}
        value={value}
        onChange={(event) => onSearch(event.target.value)}
      ></input>
    </div>
  );
}
