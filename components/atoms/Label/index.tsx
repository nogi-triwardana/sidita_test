import React from "react";

const Label: React.FC<TLabelProps> = ({
  children,
  ...props
}) => {
  return (
    <label 
      className="text-[#585858] font-semibold"
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;