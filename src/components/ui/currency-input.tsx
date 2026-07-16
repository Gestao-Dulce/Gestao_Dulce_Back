import * as React from "react";
import { Input } from "./input";

type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "type"
> & {
  value: number;
  onValueChange: (n: number) => void;
};

export function CurrencyInput({ value, onValueChange, ...rest }: Props) {
  const display = (Number(value) || 0).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    const n = digits ? Number(digits) / 100 : 0;
    onValueChange(n);
  };
  return <Input inputMode="decimal" value={display} onChange={handle} {...rest} />;
}
