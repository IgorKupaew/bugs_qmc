export const getFormatedValueWithComma = (value: number | null): string => {
  if (value === null) return "0";

  const stringValue = `${value}`;
  if (stringValue.includes(".")) {
    return stringValue.split(".").join(",");
  }
  return stringValue;
};

export const getFormatedSubstanceName = (name: string) => {
  return name.split("").map((letter) => {
    if (/[0-9]/.test(letter)) {
      return <span style={{ fontSize: 8 }}>{letter}</span>;
    }
    return letter;
  });
};
