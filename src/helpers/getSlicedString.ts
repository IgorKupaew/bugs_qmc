export const getSlicedString = (string: string, maxLength: number | undefined = 13) => {
  if (string.length <= maxLength) return string;

  return string.slice(0, 10) + "...";
};
