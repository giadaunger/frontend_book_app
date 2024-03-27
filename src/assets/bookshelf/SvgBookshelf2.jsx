import React from "react";
import { NavLink } from "react-router-dom";

function SvgBookshelf2({ booksToRender, colorCodesToRender }) {
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
            d="m108,407.00001l493.99997,0l0,86.99999l-493.99997,0l0,-86.99999z"
            id="svg_3"
          />
            </NavLink>
          ) : (
            <path
            fill={colorCodesToRender[0]}
            stroke="#fff"
            opacity="undefined"
            d="m108,407.00001l493.99997,0l0,86.99999l-493.99997,0l0,-86.99999z"
            id="svg_3"
          />
          )}
          {booksToRender[1] ? (
            <NavLink to={`/bookpage/${booksToRender[1].id}`}>
                       <rect
            fill={colorCodesToRender[1]}
            stroke="#fff"
            x="381.5"
            y="136.5"
            width="88"
            height="437.99999"
            id="svg_4"
            transform="rotate(-90, 425.5, 355.5)"
          />
            </NavLink>
          ) : (
            <rect
            fill={colorCodesToRender[1]}
            stroke="#fff"
            x="381.5"
            y="136.5"
            width="88"
            height="437.99999"
            id="svg_4"
            transform="rotate(-90, 425.5, 355.5)"
          />
          )}
          {booksToRender[2] ? (
            <NavLink to={`/bookpage/${booksToRender[2].id}`}>
                        <rect
            transform="rotate(-90, 358, 271)"
            fill={colorCodesToRender[2]}
            stroke="#fff"
            x="323.9999"
            y="73.99994"
            width="68"
            height="394.00002"
            id="svg_5"
          />
            </NavLink>
          ) : (
            <rect
            transform="rotate(-90, 358, 271)"
            fill={colorCodesToRender[2]}
            stroke="#fff"
            x="323.9999"
            y="73.99994"
            width="68"
            height="394.00002"
            id="svg_5"
          />
          )}
          {booksToRender[3] ? (
            <NavLink to={`/bookpage/${booksToRender[3].id}`}>
                        <path
            transform="rotate(-90, 338, 183.5)"
            fill={colorCodesToRender[4]}
            stroke="#fff"
            opacity="undefined"
            d="m293,-51l90,0l0,469.00002l-90,0l0,-469.00002z"
            id="svg_7"
          />
            </NavLink>
          ) : (
            <path
            transform="rotate(-90, 338, 183.5)"
            fill={colorCodesToRender[3]}
            stroke="#fff"
            opacity="undefined"
            d="m293,-51l90,0l0,469.00002l-90,0l0,-469.00002z"
            id="svg_7"
          />
          )}
          {booksToRender[4] ? (
            <NavLink to={`/bookpage/${booksToRender[4].id}`}>
                     <rect
            transform="rotate(-90, 415.5, 91.5)"
            fill={colorCodesToRender[3]}
            stroke="#fff"
            x="374.5"
            y="-152.50001"
            width="82"
            height="488"
            id="svg_6"
          />
            </NavLink>
          ) : (
            <rect
            transform="rotate(-90, 415.5, 91.5)"
            fill={colorCodesToRender[4]}
            stroke="#fff"
            x="374.5"
            y="-152.50001"
            width="82"
            height="488"
            id="svg_6"
          />
          )}
        </g>
      </svg>
    </div>
  );
}

export default SvgBookshelf2;
