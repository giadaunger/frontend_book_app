import React from "react";
import { NavLink } from "react-router-dom";

function Svg1Book({ booksToRender, colorCodesToRender }) {
  return (
    <div className="svg-container w-[10rem] h-[10rem] stroke-8">
      <svg
        className="w-full h-full stroke-8 stroke-white fill-[#34271c]"
        viewBox="0 0 800 600"
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
              <rect
                transform="rotate(-90, 192.5, 290.5)"
                fill={colorCodesToRender[0]}
                stroke="#fff"
                x="-10.29426"
                y="250.34463"
                width="405.58854"
                height="80.31051"
                id="svg_4"
              />
            </NavLink>
          ) : (
            <rect
              transform="rotate(-90, 192.5, 290.5)"
              fill={colorCodesToRender[0]}
              stroke="#fff"
              x="-10.29426"
              y="250.34463"
              width="405.58854"
              height="80.31051"
              id="svg_4"
            />
          )}

        </g>
      </svg>
    </div>
  );
}

export default Svg1Book;
