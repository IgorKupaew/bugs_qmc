export const toFixed2 = (value: number | string | undefined | null, message?: string | number): number | string => {
  if (value === null || value === undefined) return message || 0;
  if (typeof value === "string") return Number(value).toFixed(2);
  return value.toFixed(2);
};
