export const chunk = <T>(input: T[], chunkSize = 3): T[][] => {
  const chunks: T[][] = [];

  for (let i = 0; i < input.length; i += chunkSize) {
    chunks.push(input.slice(i, i + chunkSize));
  }

  return chunks;
};
