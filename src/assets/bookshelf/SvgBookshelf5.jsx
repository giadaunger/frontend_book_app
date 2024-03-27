import React from "react";
import { NavLink } from "react-router-dom";

function SvgBookshelf5({ booksToRender, colorCodesToRender }) {
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
              <path
                fill={colorCodesToRender[0]}
                stroke="#fff"
                opacity="undefined"
                d="m68.99999,122.00002l121.99993,0l0,371.99997l-121.99993,0l0,-371.99997z"
                id="svg_3"
              />
            </NavLink>
          ) : (
            <path
              fill={colorCodesToRender[0]}
              stroke="#fff"
              opacity="undefined"
              d="m68.99999,122.00002l121.99993,0l0,371.99997l-121.99993,0l0,-371.99997z"
              id="svg_3"
            />
          )}
          {booksToRender[2] ? (
            <NavLink to={`/bookpage/${booksToRender[2].id}`}>
              <rect
                transform="rotate(11, 299, 257)"
                fill={colorCodesToRender[2]}
                stroke="#fff"
                x="252.99993"
                y="24.00009"
                width="92"
                height="466"
                id="svg_5"
              />
            </NavLink>
          ) : (
            <rect
              transform="rotate(11, 299, 257)"
              fill={colorCodesToRender[2]}
              stroke="#fff"
              x="252.99993"
              y="24.00009"
              width="92"
              height="466"
              id="svg_5"
            />
          )}
          {booksToRender[2] ? (
            <NavLink to={`/bookpage/${booksToRender[2].id}`}>
              <path
                transform="rotate(-91, 434.508, 291.965)"
                fill={colorCodesToRender[2]}
                stroke="#fff"
                opacity="undefined"
                d="m234.00149,244.74694l401.01357,0l0,94.43582l-401.01357,0l0,-94.43582z"
                id="svg_7"
              />
            </NavLink>
          ) : (
            <path
              transform="rotate(-91, 434.508, 291.965)"
              fill={colorCodesToRender[2]}
              stroke="#fff"
              opacity="undefined"
              d="m234.00149,244.74694l401.01357,0l0,94.43582l-401.01357,0l0,-94.43582z"
              id="svg_7"
            />
          )}
          {booksToRender[3] ? (
            <NavLink to={`/bookpage/${booksToRender[3].id}`}>
              <path
                id="svg_6"
                d="m315.00004,222.00002l454.00007,0l0,89.00001l-454.00007,0l0,-89.00001z"
                transform="rotate(-90, 542, 266.5)"
                opacity="undefined"
                stroke="#fff"
                fill={colorCodesToRender[3]}
              />
            </NavLink>
          ) : (
            <path
              id="svg_6"
              d="m315.00004,222.00002l454.00007,0l0,89.00001l-454.00007,0l0,-89.00001z"
              transform="rotate(-90, 542, 266.5)"
              opacity="undefined"
              stroke="#fff"
              fill={colorCodesToRender[3]}
            />
          )}

          {booksToRender[4] ? (
            <NavLink to={`/bookpage/${booksToRender[4].id}`}>
              <rect
                fill={colorCodesToRender[4]}
                stroke="#fff"
                x="457.20583"
                y="243.15532"
                width="397.58852"
                height="98.68949"
                id="svg_4"
                transform="rotate(-96, 656, 292.5)"
              />
            </NavLink>
          ) : (
            <rect
              stroke="#fff"
              x="457.20583"
              y="243.15532"
              width="397.58852"
              height="98.68949"
              id="svg_4"
              transform="rotate(-96, 656, 292.5)"
            />
          )}
        </g>
      </svg>
    </div>
  );
}

export default SvgBookshelf5;
