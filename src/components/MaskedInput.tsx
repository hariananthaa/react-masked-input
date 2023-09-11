import { ReactElement } from "react";
import { Control, Controller, FieldErrorsImpl } from "react-hook-form";

export interface MaskedInputProps {
  id: string;
  label: string;
  placeholder: string;
  control: Control<any, any>;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
  disabled?: boolean;
  autoComplete?: string;
  maxLength?: number | undefined;
  minLength?: number | undefined;
  value: string;
  required?: boolean;
  onChange: any;
}

export const MaskedInput = ({
  id,
  label,
  control,
  errors,
  value,
  onChange,
  required = true,
}: MaskedInputProps): ReactElement => {
  const pattern = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/; // Basic PAN regex

  const normalizePanNumber = (value: string): string => {
    value =
      value
        .replace(/\s/g, "")
        .match(/^.{1,5}|.{1,4}/g)
        ?.join(" ") ?? "";
    return value;
  };
  return (
    <Controller
      name={id}
      control={control}
      rules={{
        validate: (val) => {
          console.log(val);
          if (required && (val === "" || val === undefined)) {
            return `${label} is required.`;
          }
          if (val !== "" && val !== undefined && !pattern.test(val)) {
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
                value={field.value}
                onChange={(e) => {
                  field.onChange(normalizePanNumber(e.target.value));
                }}
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
              <p className="text-error text-sm font-normal tracking-wide">
                {fieldState.error?.message?.toString()}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};
