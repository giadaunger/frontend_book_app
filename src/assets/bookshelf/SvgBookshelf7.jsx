import React from "react";
import { NavLink } from "react-router-dom";

function SvgBookshelf7({ booksToRender, colorCodesToRender }) {
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
                transform="rotate(-90, 97.5001, 307.5)"
                fill={colorCodesToRender[0]}
                stroke={colorCodesToRender[0]}
                x="-86.29413"
                y="257.65534"
                width="367.58852"
                height="99.68949"
                id="svg_4"
              />
            </NavLink>
          ) : (
            <rect
              transform="rotate(-90, 97.5001, 307.5)"
              fill={colorCodesToRender[0]}
              stroke="#fff"
              x="-86.29413"
              y="257.65534"
              width="367.58852"
              height="99.68949"
              id="svg_4"
            />
          )}

          {booksToRender[1] ? (
            <NavLink to={`/bookpage/${booksToRender[1].id}`}>
              <path
                transform="rotate(-180, 397.008, 444.465)"
                fill={colorCodesToRender[1]}
                stroke={colorCodesToRender[1]}
                opacity="undefined"
                d="m186.00148,396.74694l422.01358,0l0,95.43583l-422.01358,0l0,-95.43583z"
                id="svg_7"
              />
            </NavLink>
          ) : (
            <path
              transform="rotate(-180, 397.008, 444.465)"
              fill={colorCodesToRender[1]}
              stroke="#fff"
              opacity="undefined"
              d="m186.00148,396.74694l422.01358,0l0,95.43583l-422.01358,0l0,-95.43583z"
              id="svg_7"
            />
          )}

          {booksToRender[2] ? (
            <NavLink to={`/bookpage/${booksToRender[2].id}`}>
              <path
                id="svg_6"
                d="m198,309.00015l393.00005,0l0,80.00001l-393.00005,0l0,-80.00001z"
                transform="rotate(-180, 394.5, 349)"
                opacity="undefined"
                stroke={colorCodesToRender[2]}
                fill={colorCodesToRender[2]}
              />
            </NavLink>
          ) : (
            <path
              id="svg_6"
              d="m198,309.00015l393.00005,0l0,80.00001l-393.00005,0l0,-80.00001z"
              transform="rotate(-180, 394.5, 349)"
              opacity="undefined"
              stroke="#fff"
              fill={colorCodesToRender[2]}
            />
          )}

          {booksToRender[3] ? (
            <NavLink to={`/bookpage/${booksToRender[3].id}`}>
              <rect
                transform="rotate(-90, 398, 255)"
                fill={colorCodesToRender[3]}
                stroke={colorCodesToRender[3]}
                x="351.99993"
                y="22.00009"
                width="92"
                height="466"
                id="svg_5"
              />
            </NavLink>
          ) : (
            <rect
              transform="rotate(-90, 398, 255)"
              fill={colorCodesToRender[3]}
              stroke="#fff"
              x="351.99993"
              y="22.00009"
              width="92"
              height="466"
              id="svg_5"
            />
          )}

          {booksToRender[4] ? (
            <NavLink to={`/bookpage/${booksToRender[4].id}`}>
              <path
                fill={colorCodesToRender[4]}
                stroke={colorCodesToRender[4]}
                opacity="undefined"
                d="m646.00002,30.99999l111,0l0,463.99999l-111,0l0,-463.99999z"
                id="svg_3"
              />
            </NavLink>
          ) : (
            <path
              fill={colorCodesToRender[4]}
              stroke="#fff"
              opacity="undefined"
              d="m646.00002,30.99999l111,0l0,463.99999l-111,0l0,-463.99999z"
              id="svg_3"
            />
          )}
        </g>
      </svg>
    </div>
  );
}

export default SvgBookshelf7;
