import React from "react";
import { NavLink } from "react-router-dom";

function SvgBookshelf8({ booksToRender, colorCodesToRender }) {
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
                transform="rotate(-81, 195.5, 305.5)"
                fill={colorCodesToRender[0]}
                stroke="fff"
                x="11.70587"
                y="255.65534"
                width="367.58852"
                height="99.68949"
                id="svg_4"
              />
            </NavLink>
          ) : (
            <rect
              transform="rotate(-81, 195.5, 305.5)"
              fill={colorCodesToRender[0]}
              stroke="fff"
              x="11.70587"
              y="255.65534"
              width="367.58852"
              height="99.68949"
              id="svg_4"
            />
          )}

          {booksToRender[1] ? (
            <NavLink to={`/bookpage/${booksToRender[1].id}`}>
              <rect
                transform="rotate(-90, 329, 287)"
                fill={colorCodesToRender[1]}
                stroke="fff"
                x="123.99998"
                y="235.00005"
                width="410.00001"
                height="104.00002"
                id="svg_5"
              />
            </NavLink>
          ) : (
            <rect
              transform="rotate(-90, 329, 287)"
              fill={colorCodesToRender[1]}
              stroke="fff"
              x="123.99998"
              y="235.00005"
              width="410.00001"
              height="104.00002"
              id="svg_5"
            />
          )}

          {booksToRender[2] ? (
            <NavLink to={`/bookpage/${booksToRender[2].id}`}>
              <path
                fill={colorCodesToRender[2]}
                stroke="fff"
                opacity="undefined"
                d="m389.00002,27.99999l111,0l0,463.99999l-111,0l0,-463.99999z"
                id="svg_3"
              />
            </NavLink>
          ) : (
            <path
              fill={colorCodesToRender[2]}
              stroke="fff"
              opacity="undefined"
              d="m389.00002,27.99999l111,0l0,463.99999l-111,0l0,-463.99999z"
              id="svg_3"
            />
          )}

          {booksToRender[3] ? (
            <NavLink to={`/bookpage/${booksToRender[3].id}`}>
              <path
                transform="rotate(-180, 558.508, 293.965)"
                fill={colorCodesToRender[3]}
                stroke="fff"
                opacity="undefined"
                d="m509.0016,95.74667l99.0136,0l0,396.43585l-99.0136,0l0,-396.43585z"
                id="svg_7"
              />
            </NavLink>
          ) : (
            <path
              transform="rotate(-180, 558.508, 293.965)"
              fill={colorCodesToRender[3]}
              stroke="fff"
              opacity="undefined"
              d="m509.0016,95.74667l99.0136,0l0,396.43585l-99.0136,0l0,-396.43585z"
              id="svg_7"
            />
          )}

          {booksToRender[4] ? (
            <NavLink to={`/bookpage/${booksToRender[4].id}`}>
              <path
                id="svg_6"
                d="m483,252.00015l393.00005,0l0,80.00001l-393.00005,0l0,-80.00001z"
                transform="rotate(-98, 679.5, 292)"
                opacity="undefined"
                stroke="fff"
                fill={colorCodesToRender[4]}
              />
            </NavLink>
          ) : (
            <path
              id="svg_6"
              d="m483,252.00015l393.00005,0l0,80.00001l-393.00005,0l0,-80.00001z"
              transform="rotate(-98, 679.5, 292)"
              opacity="undefined"
              stroke="fff"
              fill={colorCodesToRender[4]}
            />
          )}
        </g>
      </svg>
    </div>
  );
}

export default SvgBookshelf8;
