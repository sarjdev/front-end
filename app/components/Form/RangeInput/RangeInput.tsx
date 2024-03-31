import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

import "./styles.scss";

type RangeInputType = {
  min: number;
  max: number;
  name: string;
};

const RangeInput: FC<RangeInputType> = ({ min, max, name }) => {
  const { control } = useFormContext();

  return (
    <div className="range-input">
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input {...field} type="range" min={min} max={max} />
            {error ? <p className="range-input-error">{error.message}</p> : null}
          </div>
        )}
      />
    </div>
  );
};

export default RangeInput;
