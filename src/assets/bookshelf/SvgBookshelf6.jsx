import React from "react";
import { NavLink } from "react-router-dom";

function SvgBookshelf6({ booksToRender, colorCodesToRender }) {
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
                transform="rotate(-90, 114, 295.5)"
                fill={colorCodesToRender[0]}
                stroke={colorCodesToRender[0]}
                x="-84.79417"
                y="246.15532"
                width="397.58852"
                height="98.68949"
                id="svg_4"
              />
            </NavLink>
          ) : (
            <rect
              transform="rotate(-90, 114, 295.5)"
              fill={colorCodesToRender[0]}
              stroke="#fff"
              x="-84.79417"
              y="246.15532"
              width="397.58852"
              height="98.68949"
              id="svg_4"
            />
          )}
          {booksToRender[1] ? (
            <NavLink to={`/bookpage/${booksToRender[1].id}`}>
              <rect
                transform="rotate(11, 266, 259)"
                fill={colorCodesToRender[1]}
                stroke={colorCodesToRender[1]}
                x="219.99993"
                y="26.00009"
                width="92"
                height="466"
                id="svg_5"
              />
            </NavLink>
          ) : (
            <rect
              transform="rotate(11, 266, 259)"
              fill={colorCodesToRender[1]}
              stroke="#fff"
              x="219.99993"
              y="26.00009"
              width="92"
              height="466"
              id="svg_5"
            />
          )}
          {booksToRender[2] ? (
            <NavLink to={`/bookpage/${booksToRender[2].id}`}>
              <path
                fill={colorCodesToRender[2]}
                stroke={colorCodesToRender[2]}
                opacity="undefined"
                d="m317,412.00003l439.99999,0l0,81.99997l-439.99999,0l0,-81.99997z"
                id="svg_3"
              />
            </NavLink>
          ) : (
            <path
              fill={colorCodesToRender[2]}
              stroke="#fff"
              opacity="undefined"
              d="m317,412.00003l439.99999,0l0,81.99997l-439.99999,0l0,-81.99997z"
              id="svg_3"
            />
          )}
          {booksToRender[3] ? (
            <NavLink to={`/bookpage/${booksToRender[3].id}`}>
              <path
                transform="rotate(-180, 556.008, 358.465)"
                fill={colorCodesToRender[3]}
                stroke={colorCodesToRender[3]}
                opacity="undefined"
                d="m345.00148,310.74694l422.01358,0l0,95.43583l-422.01358,0l0,-95.43583z"
                id="svg_7"
              />
            </NavLink>
          ) : (
            <path
              transform="rotate(-180, 556.008, 358.465)"
              fill={colorCodesToRender[3]}
              stroke="#fff"
              opacity="undefined"
              d="m345.00148,310.74694l422.01358,0l0,95.43583l-422.01358,0l0,-95.43583z"
              id="svg_7"
            />
          )}
          {booksToRender[4] ? (
            <NavLink to={`/bookpage/${booksToRender[4].id}`}>
              <path
                id="svg_6"
                d="m327.00004,212.00008l436.00007,0l0,93.00001l-436.00007,0l0,-93.00001z"
                transform="rotate(-180, 545, 258.5)"
                opacity="undefined"
                stroke={colorCodesToRender[4]}
                fill={colorCodesToRender[4]}
              />
            </NavLink>
          ) : (
            <path
              id="svg_6"
              d="m327.00004,212.00008l436.00007,0l0,93.00001l-436.00007,0l0,-93.00001z"
              transform="rotate(-180, 545, 258.5)"
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

export default SvgBookshelf6;
