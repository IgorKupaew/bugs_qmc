import type { ChangeEvent } from "react";

interface ICustomInputProps {
  value: string;
  onChange: (e: ChangeEvent) => void;
}

export const CustomInput = ({ value, onChange, ...props }: ICustomInputProps & Record<string, any>) => {
  return <input onChange={onChange} value={value} {...props} />;
};
