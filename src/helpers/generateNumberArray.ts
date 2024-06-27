export const generateNumberArray = (start: number, end: number, step: number): number[] => {
  const result: number[] = [];

  if (step <= 0) {
    throw new Error("Step should be a positive number");
  }

  if (start <= end) {
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i >= end; i -= step) {
      result.push(i);
    }
  }

  return result;
};
