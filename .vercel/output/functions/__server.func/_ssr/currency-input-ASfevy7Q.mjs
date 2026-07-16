import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { I as Input } from "./label-CyHelp1K.mjs";
function CurrencyInput({ value, onValueChange, ...rest }) {
  const display = (Number(value) || 0).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const handle = (e) => {
    const digits = e.target.value.replace(/\D/g, "");
    const n = digits ? Number(digits) / 100 : 0;
    onValueChange(n);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "decimal", value: display, onChange: handle, ...rest });
}
export {
  CurrencyInput as C
};
