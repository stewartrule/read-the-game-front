import * as React from "react";

import { Point, getAngleFromCenter, getPolarPoint } from "../../util/geometry";
import { BrandColor } from "../../util/skin";
import AngledLines from "../AngledLines/AngledLines";
import Donut from "../Donut/Donut";

const { useState, useRef, useEffect } = React;

export type RenderOptions = {
  center: Point;
  value: number;
  radius: number;
  dragged: boolean;
};

type Props = {
  knobRadius?: number;
  value: number;
  onStartDrag?: (val: number) => void;
  onEndDrag?: (val: number) => void;
  onDrag: (val: number) => void;
  render?: (options: RenderOptions) => React.ReactElement;
};

const clamp = (nextValue: number, prevValue: number, threshold = 0.3) => {
  const min = threshold;
  const max = 1 - threshold;

  if (prevValue <= 1 && prevValue >= max && nextValue >= 0 && nextValue < min) {
    return 1;
  }

  if (prevValue >= 0 && prevValue <= min && nextValue <= 1 && nextValue > max) {
    return 0;
  }

  return nextValue;
};

const RotaryKnob: React.FC<Props> = ({
  knobRadius = 200,
  value = 0,
  onStartDrag,
  onEndDrag,
  onDrag,
  render
}) => {
  const knobOffset = 20;
  const radius = knobRadius + knobOffset;

  const [dragged, setDragged] = useState(false);
  const [centerX, setCenterX] = useState(radius);
  const [centerY, setCenterY] = useState(radius);

  const ref = useRef<SVGSVGElement | null>(null);

  const size = 2 * radius;
  const viewBox = `0 0 ${size} ${size}`;
  const angleOffset = 90;

  const center: Point = {
    x: radius,
    y: radius
  };

  const draggable = getPolarPoint(
    center,
    knobRadius - knobOffset,
    value * 360 - angleOffset
  );

  const onPointerDown = () => {
    setDragged(true);
    onStartDrag && onStartDrag(value);
  };

  const onPointerUp = () => {
    setDragged(false);
    onEndDrag && onEndDrag(value);
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (dragged) {
      const angle = getAngleFromCenter(
        { x: centerX, y: centerY },
        { x: e.clientX, y: e.clientY },
        angleOffset
      );

      onDrag(clamp((1 / 360) * angle, value));
    }
  };

  const setCenter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();

      setCenterX(rect.left + rect.width / 2);
      setCenterY(rect.top + rect.height / 2);
    }
  };

  useEffect(() => {
    setCenter();
    document.addEventListener("scroll", setCenter);
    return () => {
      document.removeEventListener("scroll", setCenter);
    };
  }, [ref.current]);

  useEffect(() => {
    document.addEventListener("pointerup", onPointerUp);
    return () => {
      document.removeEventListener("pointerup", onPointerUp);
    };
  }, [value]);

  const innerRadius = knobRadius - knobOffset * 2;

  return (
    <svg
      width="100%"
      height="100%"
      ref={ref}
      viewBox={viewBox}
      onPointerMove={onPointerMove}
    >
      <Ring
        center={center}
        radius={knobRadius}
        innerRadius={innerRadius}
        value={value}
      />

      <circle
        cx={center.x}
        cy={center.y}
        r={innerRadius}
        stroke="black"
        strokeWidth="0"
        fill="#fff"
      />

      {render && render({ center, value, radius: innerRadius, dragged })}

      <Draggable center={draggable} onActivate={onPointerDown} />
    </svg>
  );
};

type DraggableProps = {
  center: Point;
  onActivate: () => void;
};

const Draggable: React.FC<DraggableProps> = ({ center, onActivate }) => (
  <>
    <circle
      cx={center.x}
      cy={center.y}
      r={34}
      stroke="black"
      strokeWidth="0"
      fill="rgba(0, 0, 0, 0.1)"
    />
    <circle
      cx={center.x}
      cy={center.y}
      r={32}
      stroke="black"
      strokeWidth="0"
      fill="#aaa"
    />
    <circle
      cx={center.x}
      cy={center.y}
      r={30}
      stroke="black"
      strokeWidth="0"
      fill="#fff"
    />
    <rect
      x={center.x - 15}
      y={center.y - 3}
      width="30"
      height="2"
      fill="#aaa"
      stroke="#fff"
      strokeWidth="0"
    />
    <rect
      x={center.x - 15}
      y={center.y + 3}
      width="30"
      height="2"
      fill="#aaa"
      stroke="#fff"
      strokeWidth="0"
    />
    <circle
      cx={center.x}
      cy={center.y}
      r={34}
      stroke="black"
      strokeWidth="0"
      fill="rgba(255, 255, 255, 0.01)"
      onPointerDown={onActivate}
    />
  </>
);

type RingProps = {
  center: Point;
  radius: number;
  innerRadius: number;
  value: number;
};

const Ring: React.FC<RingProps> = ({ center, radius, innerRadius, value }) => (
  <>
    <circle
      cx={center.x}
      cy={center.y}
      r={radius}
      stroke="black"
      strokeWidth="0"
      fill="#eee"
    />
    <Donut
      cx={center.x}
      cy={center.y}
      radius={radius}
      innerRadius={innerRadius}
      segments={[{ value, fill: BrandColor.primary }]}
    />
    <AngledLines
      center={center}
      innerRadius={() => radius}
      outerRadius={() => radius - 20}
      amount={48}
      stroke={() => "rgba(0, 0, 0, 0.25)"}
      strokeWidth={3}
      filter={i => i % 4 !== 0}
    />
    <AngledLines
      center={center}
      innerRadius={() => radius}
      outerRadius={() => radius - 30}
      amount={12}
      stroke={() => "rgba(0, 0, 0, 0.25)"}
      strokeWidth={5}
    />
  </>
);
export default RotaryKnob;
