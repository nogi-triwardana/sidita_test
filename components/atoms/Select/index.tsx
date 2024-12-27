import React from "react";
import { Controller } from "react-hook-form";
import Select from 'react-select';

const AtomSelect: React.FC<TSelectProps> = ({
  control,
  controllerName = '',
  asController = true,
  value,
  onChange,
  options,
  ...props
}) => {

  const coreComponent = (value: any, onChange: any) => {
    return (
      <Select 
        value={value}
        onChange={onChange}
        className="border-2 border-[#585858] rounded-lg w-full p-2"
        options={options}
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
} 

export default AtomSelect;