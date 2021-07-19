export const uniqueKey = (movie: string = "", page: number = 1): string => {
  return `s_${movie}_${page}`;
};
