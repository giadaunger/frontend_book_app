import React from "react";
import { NavLink } from "react-router-dom";

function SvgBookshelf9({ booksToRender, colorCodesToRender }) {
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
                transform="rotate(-90, 117.5, 276)"
                fill={colorCodesToRender[0]}
                stroke={colorCodesToRender[0]}
                x="-100.79416"
                y="202.84478"
                width="436.58853"
                height="146.31052"
                id="svg_4"
              />
            </NavLink>
          ) : (
            <rect
              transform="rotate(-90, 117.5, 276)"
              fill={colorCodesToRender[0]}
              stroke={colorCodesToRender[1]}
              x="-100.79416"
              y="202.84478"
              width="436.58853"
              height="146.31052"
              id="svg_4"
            />
          )}

          {booksToRender[1] ? (
            <NavLink to={`/bookpage/${booksToRender[1].id}`}>
              <rect
                transform="rotate(-99, 269, 285.5)"
                fill={colorCodesToRender[1]}
                stroke="#fff"
                x="65.50008"
                y="242.50001"
                width="407.00001"
                height="86.00002"
                id="svg_5"
              />
            </NavLink>
          ) : (
            <rect
              transform="rotate(-99, 269, 285.5)"
              fill={colorCodesToRender[1]}
              stroke="#fff"
              x="65.50008"
              y="242.50001"
              width="407.00001"
              height="86.00002"
              id="svg_5"
            />
          )}

          {booksToRender[2] ? (
            <NavLink to={`/bookpage/${booksToRender[2].id}`}>
              <path
                transform="rotate(-12, 372, 265)"
                fill={colorCodesToRender[2]}
                stroke={colorCodesToRender[2]}
                opacity="undefined"
                d="m323.95895,41.63795l96.08214,0l0,446.72407l-96.08214,0l0,-446.72407z"
                id="svg_3"
              />
            </NavLink>
          ) : (
            <path
              transform="rotate(-12, 372, 265)"
              fill={colorCodesToRender[2]}
              stroke="#fff"
              opacity="undefined"
              d="m323.95895,41.63795l96.08214,0l0,446.72407l-96.08214,0l0,-446.72407z"
              id="svg_3"
            />
          )}

          {booksToRender[3] ? (
            <NavLink to={`/bookpage/${booksToRender[3].id}`}>
              <path
                transform="rotate(-13, 481.008, 305.465)"
                fill={colorCodesToRender[3]}
                stroke={colorCodesToRender[3]}
                opacity="undefined"
                d="m437.64922,121.11218l86.71836,0l0,368.70485l-86.71836,0l0,-368.70485z"
                id="svg_7"
              />
            </NavLink>
          ) : (
            <path
              transform="rotate(-13, 481.008, 305.465)"
              fill={colorCodesToRender[3]}
              stroke="#fff"
              opacity="undefined"
              d="m437.64922,121.11218l86.71836,0l0,368.70485l-86.71836,0l0,-368.70485z"
              id="svg_7"
            />
          )}

          {booksToRender[4] ? (
            <NavLink to={`/bookpage/${booksToRender[4].id}`}>
              <path
                id="svg_6"
                d="m349.053,219.57139l444.89389,0l0,93.85736l-444.89389,0l0,-93.85736z"
                transform="rotate(-104, 571.5, 266.5)"
                opacity="undefined"
                stroke={colorCodesToRender[4]}
                fill={colorCodesToRender[4]}
              />
            </NavLink>
          ) : (
            <path
              id="svg_6"
              d="m349.053,219.57139l444.89389,0l0,93.85736l-444.89389,0l0,-93.85736z"
              transform="rotate(-104, 571.5, 266.5)"
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

export default SvgBookshelf9;
