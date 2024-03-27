import React from "react";
import { NavLink } from "react-router-dom";

function SvgBookshelf4({ booksToRender, colorCodesToRender }) {
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
              d="m69,41.00002l121.99994,0l0,452.99997l-121.99994,0l0,-452.99997z"
              id="svg_3"
            />
            </NavLink>
          ) : (
            <path
            fill={colorCodesToRender[0]}
           stroke="#fff"
           opacity="undefined"
           d="m69,41.00002l121.99994,0l0,452.99997l-121.99994,0l0,-452.99997z"
           id="svg_3"
         />
          )}
          {booksToRender[1] ? (
            <NavLink to={`/bookpage/${booksToRender[1].id}`}>
              <rect
              transform="rotate(-90, 267, 288)"
               fill={colorCodesToRender[1]}
              stroke="#fff"
              x="61.49997"
              y="231.5"
              width="411.00002"
              height="112.99997"
              id="svg_6"
            />
            </NavLink>
          ) : (
            <rect
              transform="rotate(-90, 267, 288)"
               fill={colorCodesToRender[1   ]}
              stroke="#fff"
              x="61.49997"
              y="231.5"
              width="411.00002"
              height="112.99997"
              id="svg_6"
            />
          )}
          {booksToRender[2] ? (
            <NavLink to={`/bookpage/${booksToRender[2].id}`}>
              <rect
              transform="rotate(-13, 414, 256)"
               fill={colorCodesToRender[2]}
              stroke="#fff"
              x="367.99993"
              y="23.00009"
              width="92"
              height="466"
              id="svg_5"
            />
            </NavLink>
          ) : (
            <rect
              transform="rotate(-13, 414, 256)"
               fill={colorCodesToRender[2]}
              stroke="#fff"
              x="367.99993"
              y="23.00009"
              width="92"
              height="466"
              id="svg_5"
            />
          )}
          
          {booksToRender[3] ? (
            <NavLink to={`/bookpage/${booksToRender[3].id}`}>
              <path
              transform="rotate(-96, 539, 273)"
               fill={colorCodesToRender[3]}
              stroke="#fff"
              opacity="undefined"
              d="m321.49999,227.50005l435.00001,0l0,91.00001l-435.00001,0l0,-91.00001z"
              id="svg_7"
            />
            </NavLink>
          ) : (
            <path
              transform="rotate(-96, 539, 273)"
               fill={colorCodesToRender[3]}
              stroke="#fff"
              opacity="undefined"
              d="m321.49999,227.50005l435.00001,0l0,91.00001l-435.00001,0l0,-91.00001z"
              id="svg_7"
            />
          )}
          {booksToRender[4] ? (
            <NavLink to={`/bookpage/${booksToRender[4].id}`}>
              <rect
               fill={colorCodesToRender[4]}
              stroke="#fff"
              x="440.50011"
              y="206.50011"
              width="457.00002"
              height="117"
              id="svg_4"
              transform="rotate(-90, 669, 265)"
            />
            </NavLink>
          ) : (
            <rect
               fill={colorCodesToRender[4]}
              stroke="#fff"
              x="440.50011"
              y="206.50011"
              width="457.00002"
              height="117"
              id="svg_4"
              transform="rotate(-90, 669, 265)"
            />
          )}
        </g>
      </svg>
    </div>
  );
}

export default SvgBookshelf4;
