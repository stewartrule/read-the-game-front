const leftPad = (value: number) => (value < 10 ? `0${value}` : value);

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${leftPad(minutes)}:${leftPad(seconds)}`;
};
