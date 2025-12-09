import React, { forwardRef } from "react";

const Input = forwardRef(({ label, input }, ref) => {
  return (
    <div className="input-group">
      <label className="sr-only">{label}</label>
      <input ref={ref} {...input} className="input-small" />
    </div>
  );
});

export default Input;
