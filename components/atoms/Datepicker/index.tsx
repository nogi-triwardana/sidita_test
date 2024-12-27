import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { Controller, useFormContext } from "react-hook-form";
import { RiCalendarLine } from "react-icons/ri";
import "react-datepicker/dist/react-datepicker.css";

const ExampleCustomInput = forwardRef<any, any>(
  (
    {
      onClick,
      value,
      className,
      asText,
      asTextClass,
      placeholder,
      rangeYear,
      isDisabled,
    },
    ref
  ) => {
    return asText ? (
      <div
        className={[
          "min-h-[2.5rem] py-2 overflow-hidden text-ellipsis",
          asTextClass,
        ].join(" ")}
      >
        {value}
      </div>
    ) : !isDisabled ? (
      <div className="relative">
        <input
          className={`input w-full text-left bg-white p-2 mt-2 rounded-lg border ${className}`}
          onClick={onClick}
          ref={ref}
          placeholder={placeholder}
          value={
            rangeYear && value !== ""
              ? `${new Date(value).getFullYear() - 2}-${new Date(
                  value
                ).getFullYear()}`
              : value
          }
          readOnly // Make the input readOnly when disabled
        />
        <RiCalendarLine className="absolute top-[55%] right-3 -translate-y-1/2 text-gray-400 h-6 w-6" />
      </div>
    ) : (
      <div className="relative">
        <input
          className={`input w-full text-left bg-white p-2 mt-2 rounded-lg border ${className}`}
          onClick={onClick}
          ref={ref}
          placeholder={placeholder}
          value={
            rangeYear && value !== ""
              ? `${new Date(value).getFullYear() - 2}-${new Date(
                  value
                ).getFullYear()}`
              : value
          }
          disabled={isDisabled}
        />
        <RiCalendarLine className="absolute top-[55%] right-3 -translate-y-1/2 text-gray-400 h-6 w-6" />
      </div>
    );
  }
);

const AtomDatePicker: React.FC<any> = ({
  controllerName,
  startDate = new Date(),
  setStartDate,
  isError = false,
  label = "label",
  required = false,
  showErrorLabel = false,
  datepickerOptions = {},
  className,
  append,
  prepend,
  placeholder,
  wrapperClass,
  asText = false,
  isRangeDatePicker = false,
  asTextClass,
  selectsRange,
  newDate,
  format = null,
  rangeYear = false,
  disabled = false,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={controllerName}
      control={control}
      rules={{ required: true }}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { invalid, error },
      }) => {
        return (
          <div className={["form-control w-full", wrapperClass].join(" ")}>
            {label && (
              <label className="px-0 label font-semibold text-sm">
                <span className={`label-text`}>
                  {label}
                  {required && (
                    <span className="text-[#F04438] text-[14px]">*</span>
                  )}{" "}
                </span>
              </label>
            )}
            <div className={`relative`}>
              {prepend}
              {isRangeDatePicker ? (
                <>
                  <DatePicker
                    wrapperClassName="date_picker w-full"
                    className={`${className || ""}focus:!outline-none ${
                      invalid
                        ? "!border-[#F04438]"
                        : "focus:!border-primary-700"
                    }`}
                    onChange={(date) => onChange(date)}
                    customInput={
                      <ExampleCustomInput
                        asText={asText}
                        asTextClass={asTextClass}
                        isDisabled={disabled}
                      />
                    }
                    placeholderText={placeholder}
                    disabled={disabled ? disabled : asText}
                    {...datepickerOptions}
                    selected={value?.[0]}
                    startDate={value?.[0]}
                    endDate={value?.[1]}
                    dateFormat={format || "MM/dd/yyyy"}
                    selectsRange
                  />
                </>
              ) : (
                <>
                  <DatePicker
                    selected={
                      newDate
                        ? value === "" || value === undefined || value === null
                          ? undefined
                          : new Date(value)
                        : value
                    }
                    wrapperClassName="date_picker w-full"
                    className={`${className || ""}focus:!outline-none ${
                      invalid
                        ? "!border-[#F04438]"
                        : "focus:!border-primary-700"
                    }`}
                    onChange={(date) => onChange(date)}
                    customInput={
                      <ExampleCustomInput
                        asText={asText}
                        asTextClass={asTextClass}
                        rangeYear={rangeYear}
                        isDisabled={disabled}
                      />
                    }
                    placeholderText={placeholder}
                    disabled={disabled ? disabled : asText}
                    dateFormat={format || "MM/dd/yyyy"}
                    showYearPicker={format === "yyyy"}
                    {...datepickerOptions}
                  />
                </>
              )}

              {append}
            </div>
            {invalid && showErrorLabel && (
              <label className="label">
                <div className="text-xs text-error-600 mt-2 label-text-alt text-error">
                  {error?.message}
                </div>
              </label>
            )}
          </div>
        );
      }}
    />
  );
};

export default AtomDatePicker;