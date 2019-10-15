export const degreeToRadian = (degree: number) => (Math.PI / 180) * degree;
export const radianToDegree = (radian: number) => (180 / Math.PI) * radian;

export type Point = {
  x: number;
  y: number;
};

export const getPolarPoint = (
  { x, y }: Point,
  distance = 10,
  degree = 0
): Point => {
  const radian = degreeToRadian(degree);

  return {
    x: x + distance * Math.cos(radian),
    y: y + distance * Math.sin(radian)
  };
};

export const getAngleFromCenter = (
  center: Point,
  point: Point,
  angleOffset = 0
) => {
  const distX = point.x - center.x;
  const distY = point.y - center.y;

  const radian = Math.atan2(distY, distX);
  const angle = (radian * 180) / Math.PI;

  return (angle + angleOffset + 360) % 360;
};
