const names = [
  "Bonmann",
  "Burki",
  "Hoffman",
  "Kimmich",
  "Muller",
  "Neuer",
  "Ulreich",
  "Werner"
];

export const players = names.map((name, i) => ({
  id: i + 1,
  firstname: name,
  lastname: name,
  dob: new Date(),
  shots: names.map((_, j) => ({
    hit: j <= i,
    time: new Date()
  })),
  avatar: "http://thetopforward.com/uploads/0/57134.jpg"
}));
