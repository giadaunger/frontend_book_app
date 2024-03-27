import React from "react";
import { NavLink } from "react-router-dom";

function SvgBookshelf3({ booksToRender, colorCodesToRender }) {
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
                d="m108,389.00002l482.99997,0l0,104.99999l-482.99997,0l0,-104.99999z"
                id="svg_3"
              />
            </NavLink>
          ) : (
            <path
              fill={colorCodesToRender[0]}
              stroke="#fff"
              opacity="undefined"
              d="m108,389.00002l482.99997,0l0,104.99999l-482.99997,0l0,-104.99999z"
              id="svg_3"
            />
          )}
          {booksToRender[1] ? (
            <NavLink to={`/bookpage/${booksToRender[1].id}`}>
              <rect
                fill={colorCodesToRender[1]}
                stroke="#fff"
                x="217.5"
                y="119.5"
                width="88"
                height="437.99999"
                id="svg_4"
                transform="rotate(-90, 261.5, 338.5)"
              />
            </NavLink>
          ) : (
            <rect
              fill={colorCodesToRender[1]}
              stroke="#fff"
              x="217.5"
              y="119.5"
              width="88"
              height="437.99999"
              id="svg_4"
              transform="rotate(-90, 261.5, 338.5)"
            />
          )}
          {booksToRender[2] ? (
            <NavLink to={`/bookpage/${booksToRender[2].id}`}>
              <path
                transform="rotate(-90, 313, 244.5)"
                fill={colorCodesToRender[2]}
                stroke="#fff"
                opacity="undefined"
                d="m268,10l90,0l0,469.00002l-90,0l0,-469.00002z"
                id="svg_7"
              />
            </NavLink>
          ) : (
            <path
              transform="rotate(-90, 313, 244.5)"
              fill={colorCodesToRender[2]}
              stroke="#fff"
              opacity="undefined"
              d="m268,10l90,0l0,469.00002l-90,0l0,-469.00002z"
              id="svg_7"
            />
          )
          }
          {booksToRender[3] ? (
            <NavLink to={`/bookpage/${booksToRender[3].id}`}>
              <rect
                transform="rotate(-90, 307.5, 153.5)"
                fill={colorCodesToRender[3]}
                stroke="#fff"
                x="266.5"
                y="-90.50001"
                width="82"
                height="488"
                id="svg_6"
              />
            </NavLink>
          ) : (
            <rect
              transform="rotate(-90, 307.5, 153.5)"
              fill={colorCodesToRender[3]}
              stroke="#fff"
              x="266.5"
              y="-90.50001"
              width="82"
              height="488"
              id="svg_6"
            />
          )}
          
          {booksToRender[4] ? (
            <NavLink to={`/bookpage/${booksToRender[4].id}`}>
              <rect
                transform="rotate(-13, 636, 257)"
                fill={colorCodesToRender[2]}
                stroke="#fff"
                x="589.99993"
                y="24.00009"
                width="92"
                height="466"
                id="svg_5"
              />
            </NavLink>
          ) : (
            <rect
              transform="rotate(-13, 636, 257)"
              fill={colorCodesToRender[4]}
              stroke="#fff"
              x="589.99993"
              y="24.00009"
              width="92"
              height="466"
              id="svg_5"
            />
          )}
        </g>
      </svg>
    </div>
  );
}

export default SvgBookshelf3;
