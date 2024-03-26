import React from "react";
import { NavLink } from "react-router-dom";

function SvgBooshelf1({ booksToRender, colorCodesToRender }) {
  return (
    <div className="svg-container w-[10rem] h-[10rem] stroke-8">
      {" "}
      {/* Adjust these values as needed */}
      <svg
        className="w-full h-full stroke-8 stroke-white fill-[#34271c]"
        viewBox="0 0 800 600" // This should match the original width and height
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <title>Layer 1</title>
          <path
            className="stroke-3"
            id="svg_2"
            d="m13,499l766,0l0,87l-766,0l0,-87z"
            opacity="undefined"
            stroke="#4a3728"
            fill="#4a3728"
          />
          {booksToRender[0] ? (
            <NavLink to={`/bookpage/${booksToRender[0].id}`}>
              <path
                id="svg_3"
                d="m108,108l109,0l0,386l-109,0l0,-386z"
                opacity="undefined"
                fill={`${colorCodesToRender[0]}`}
              />
            </NavLink>
          ) : (
            <path
              id="svg_3"
              d="m108,108l109,0l0,386l-109,0l0,-386z"
              opacity="undefined"
              fill={`${colorCodesToRender[0]}`}
            />
          )}
          {booksToRender[1] ? (
            <NavLink to={`/bookpage/${booksToRender[1].id}`}>
              <path
                id="svg_4"
                d="m256,111l128,0l0,375l-128,0l0,-375z"
                transform="rotate(-12, 320, 298.5)"
                opacity="undefined"
                fill={`${colorCodesToRender[1]}`}
              />
            </NavLink>
          ) : (
            <path
              id="svg_4"
              d="m256,111l128,0l0,375l-128,0l0,-375z"
              transform="rotate(-12, 320, 298.5)"
              opacity="undefined"
              fill={`${colorCodesToRender[1]}`}
            />
          )}
          {booksToRender[2] ? (
            <NavLink to={`/bookpage/${booksToRender[2].id}`}>
              <path
                id="svg_5"
                d="m423,152l79,0l0,342l-79,0l0,-342z"
                opacity="undefined"
                fill={`${colorCodesToRender[2]}`}
              />
            </NavLink>
          ) : (
            <path
              id="svg_5"
              d="m423,152l79,0l0,342l-79,0l0,-342z"
              opacity="undefined"
              fill={`${colorCodesToRender[2]}`}
            />
          )}
          {booksToRender[3] ? (
            <NavLink to={`/bookpage/${booksToRender[3].id}`}>
              <path
                id="svg_6"
                d="m511,70l76,0l0,424l-76,0l0,-424z"
                opacity="undefined"
                fill={`${colorCodesToRender[3]}`}
              />
            </NavLink>
          ) : (
            <path
                id="svg_6"
                d="m511,70l76,0l0,424l-76,0l0,-424z"
                opacity="undefined"
                fill={`${colorCodesToRender[3]}`}
              />
          )}
          {booksToRender[4] ? (
            <NavLink to={`/bookpage/${booksToRender[4].id}`}>
              <path
            id="svg_7"
            d="m595,124l77,0l0,370l-77,0l0,-370z"
            opacity="undefined"
            fill={`${colorCodesToRender[4]}`}
          />
            </NavLink>
          ) : (
            <path
            id="svg_7"
            d="m595,124l77,0l0,370l-77,0l0,-370z"
            opacity="undefined"
            fill={`${colorCodesToRender[4]}`}
          />
          )}
        </g>
      </svg>
    </div>
  );
}

export default SvgBooshelf1;
