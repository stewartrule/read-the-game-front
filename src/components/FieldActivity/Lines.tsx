import * as React from "react";

const Lines: React.FC = () => (
  <>
    <rect
      x="2"
      y="2"
      height="596"
      width="996"
      fill="#fff"
      stroke="#ddd"
      strokeWidth="4"
      key="fieldBoundary"
    />

    <circle
      cx="120"
      cy="300"
      r="96"
      fill="#fff"
      stroke="#ddd"
      strokeWidth="4"
      key="circleLeft"
    />

    <circle
      cx="880"
      cy="300"
      r="96"
      fill="#fff"
      stroke="#ddd"
      strokeWidth="4"
      key="circleBottom"
    />

    <rect
      x="2"
      y="160"
      width="170"
      height="280"
      fill="#fff"
      stroke="#ddd"
      strokeWidth="4"
      key="goalAreaTop"
    />

    <rect
      x="2"
      y="225"
      width="60"
      height="150"
      fill="#fff"
      stroke="#ddd"
      strokeWidth="4"
      key="goalTop"
    />

    <circle
      cx="500"
      cy="300"
      r="86"
      fill="#fff"
      stroke="#ddd"
      strokeWidth="4"
      key="middleCircle"
    />

    <rect
      x="828"
      y="160"
      height="280"
      width="170"
      fill="#fff"
      stroke="#ddd"
      strokeWidth="4"
      key="goalAreaBottom"
    />

    <rect
      x="938"
      y="225"
      width="60"
      height="150"
      fill="#fff"
      stroke="#ddd"
      strokeWidth="4"
      key="goalBottom"
    />

    <rect
      x="498"
      y="0"
      width="4"
      height="600"
      fill="#ddd"
      strokeWidth="0"
      key="middleLine"
    />
  </>
);

export default Lines;
