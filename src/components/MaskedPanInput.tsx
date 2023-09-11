import { ReactElement } from "react";
import { Control, Controller, FieldErrorsImpl } from "react-hook-form";
import { maskPan } from "../services/maskPan";

/// This is the example of PAN number masking

export interface MaskedPanInputProps {
  id: string;
  label: string;
  placeholder: string;
  control: Control<any, any>;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
  clearErrors: any;
  disabled?: boolean;
  autoComplete?: string;
  maxLength?: number | undefined;
  minLength?: number | undefined;
  value: string;
  required?: boolean;
  onChange: any;
}

export const MaskedPanInput = ({
  id,
  label,
  control,
  errors,
  value,
  onChange,
  clearErrors,
  required = true,
}: MaskedPanInputProps): ReactElement => {
  const pattern = /^[A-Za-z]{3}[CHFATBLJGPchfatbljgp][A-Za-z][0-9]{4}[A-Za-z]$/; // Basic PAN regex
  const normalizePanNumber = (value: string): string => {
    value =
      value
        ?.replace(/\s/g, "")
        .match(/^.{1,5}|.{1,4}/g)
        ?.join(" ")
        .substring(0, 12) ?? "";
    return value;
  };

  const keyUpFunc = (event: any) => {
    var inputValue = event.target.value;
    var lastLetter = inputValue.charAt(inputValue.length - 1);
    if (/[a-zA-Z]/.test(inputValue)) {
      let val = "";
      onChange((prev: string) => {
        if (prev.length === 10 || prev.length >= inputValue.length) {
          val = prev.length === 2 ? "" : prev.substring(0, prev.length - 1);
        } else if (inputValue.length !== 12) {
          val = prev + lastLetter;
        } else if (inputValue.length === 12) {
        }
        return val;
      });
    }
  };

  return (
    <Controller
      name={id}
      control={control}
      rules={{
        validate: (val) => {
          if (required && (value === "" || value === undefined)) {
            return `${label} is required.`;
          }
          if (value !== "" && value !== undefined && !pattern.test(value)) {
            return "Invalid PAN.";
          }
          return true;
        },
      }}
      render={({ field, fieldState }) => {
        return (
          <div className="w-full">
            <label
              htmlFor={id}
              className="block text-sm font-medium leading-5 text-gray-900"
            >
              {label}
              {required && (
                <span className={`text-error ml-[2px] text-base`}>*</span>
              )}
            </label>
            <div className="relative mt-[8px] mb-[4px] rounded-md shadow-sm">
              <input
                id={id}
                data-testid={id}
                type="text"
                {...field}
                maxLength={12}
                onChange={(e) => {
                  if (pattern.test(value)) {
                    clearErrors(id, undefined);
                  }
                  keyUpFunc(e);
                }}
                value={normalizePanNumber(maskPan(value))}
                inputMode={
                  value.length < 5 || value.length > 8 ? "text" : "numeric"
                }
                className={`${
                  errors[id] === undefined
                    ? "ring-input-border focus:ring-primary ring-1 focus:ring-2 "
                    : "ring-error focus:ring-error ring-1 focus:ring-2 pl-2.5 !pr-9"
                } w-full rounded border-0 py-1.5 px-2.5 text-input-text placeholder:text-input-placeholder sm:text-sm sm:leading-6 !appearance-none outline-none uppercase 
                `}
                placeholder={"XXXXX XXXX X"}
                defaultValue={undefined}
              />
              {errors[id] !== undefined && (
                <i
                  title="Invalid input."
                  className="fa-solid fa-circle-exclamation text-error absolute right-2.5 top-1/2 -translate-y-1/2"
                ></i>
              )}
            </div>
            {fieldState.error !== undefined && (
              <p className="text-red-500 text-sm font-normal tracking-wide">
                {fieldState.error?.message?.toString()}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};
