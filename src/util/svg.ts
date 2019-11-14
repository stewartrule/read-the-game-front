import { getPolarPoint, Point } from "./geometry";

export function getArcPath(
  center: Point,
  radius: number,
  startAngle: number,
  stopAngle: number
) {
  const start = getPolarPoint(center, radius, stopAngle);
  const stop = getPolarPoint(center, radius, startAngle);
  const largeArcFlag = stopAngle - startAngle <= 180 ? 0 : 1;

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    stop.x,
    stop.y
  ].join(" ");
}
