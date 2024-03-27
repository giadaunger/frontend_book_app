import React from "react";
import { NavLink } from "react-router-dom";

function SvgBookshelf10({ booksToRender, colorCodesToRender }) {
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

          {booksToRender[1] ? (
            <NavLink to={`/bookpage/${booksToRender[1].id}`}>
              <rect
                transform="rotate(-90, 287.907, 309.51)"
                fill={colorCodesToRender[1]}
                stroke="#fff"
                x="104.68515"
                y="265.01007"
                width="366.44358"
                height="88.99996"
                id="svg_5"
              />
            </NavLink>
          ) : (
            <rect
              transform="rotate(-90, 287.907, 309.51)"
              fill={colorCodesToRender[1]}
              stroke="#fff"
              x="104.68515"
              y="265.01007"
              width="366.44358"
              height="88.99996"
              id="svg_5"
            />
          )}

          {booksToRender[2] ? (
            <NavLink to={`/bookpage/${booksToRender[2].id}`}>
              <path
                fill={colorCodesToRender[2]}
                stroke="#fff"
                opacity="undefined"
                d="m346.95894,41.63796l96.08215,0l0,450.72406l-96.08215,0l0,-450.72406z"
                id="svg_3"
              />
            </NavLink>
          ) : (
            <path
              fill={colorCodesToRender[2]}
              stroke="#fff"
              opacity="undefined"
              d="m346.95894,41.63796l96.08215,0l0,450.72406l-96.08215,0l0,-450.72406z"
              id="svg_3"
            />
          )}

          {booksToRender[3] ? (
            <NavLink to={`/bookpage/${booksToRender[3].id}`}>
              <path
                fill={colorCodesToRender[3]}
                stroke="#fff"
                opacity="undefined"
                d="m456.64922,124.11218l86.71836,0l0,368.70485l-86.71836,0l0,-368.70485z"
                id="svg_7"
              />
            </NavLink>
          ) : (
            <path
              fill={colorCodesToRender[3]}
              stroke="#fff"
              opacity="undefined"
              d="m456.64922,124.11218l86.71836,0l0,368.70485l-86.71836,0l0,-368.70485z"
              id="svg_7"
            />
          )}

          {booksToRender[4] ? (
            <NavLink to={`/bookpage/${booksToRender[4].id}`}>
              <path
                id="svg_6"
                d="m373.053,223.57139l444.89389,0l0,93.85736l-444.89389,0l0,-93.85736z"
                transform="rotate(-90, 595.5, 270.5)"
                opacity="undefined"
                stroke="#fff"
                fill={colorCodesToRender[4]}
              />
            </NavLink>
          ) : (
            <path
              id="svg_6"
              d="m373.053,223.57139l444.89389,0l0,93.85736l-444.89389,0l0,-93.85736z"
              transform="rotate(-90, 595.5, 270.5)"
              opacity="undefined"
              stroke="#fff"
              fill={colorCodesToRender[4]}
            />
          )}
        </g>
      </svg>
    </div>
  );
}

export default SvgBookshelf10;
