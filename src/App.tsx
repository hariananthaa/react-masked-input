/* eslint-disable @typescript-eslint/no-misused-promises */
import { ReactElement, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { MaskedInput } from "./components/MaskedInput";

export const App = (): ReactElement => {
  const [formValues, setFormValues] = useState<any>({});
  const [panNumber, setPanNumber] = useState<string>("");

  const onSubmit = (values: FieldValues): void => {
    console.log(values);

    setFormValues(values);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-80">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-7">
          <div className="space-y-1">
            <div>Pan input field: </div>
            <MaskedInput
              id={"pan"}
              label={"PAN"}
              placeholder={"Enter"}
              control={control}
              errors={errors}
              onChange={setPanNumber}
              value={panNumber}
            />
          </div>

          <button type="submit">Submit</button>

          <div>
            {Object.keys(formValues).map((item, index) => {
              return <div key={index}>{`${item} : ${formValues[item]}`}</div>;
            })}
          </div>
        </form>
      </div>
    </div>
  );
};
