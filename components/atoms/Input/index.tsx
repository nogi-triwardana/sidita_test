import React from "react";
import { Controller } from "react-hook-form";

const Input: React.FC<TInputProps> = ({
  control,
  controllerName = '',
  asController = true,
  value,
  onChange,
  ...props
}) => {

  const coreComponent = (value: any, onChange: any) => {
    return (
      <input
        className="border-2 border-[#585858] rounded-lg w-full p-2"
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  };

  if(asController) {
    return (
      <Controller
        control={control}
        name={controllerName}
        render={({
          field: { value, onChange }
        }) => {
          return coreComponent(value, onChange);
        }}
      />  
    );
  } else {
    return coreComponent(value, onChange);
  }
  
};

export default Input;