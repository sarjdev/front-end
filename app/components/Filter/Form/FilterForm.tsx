import { useResponsive } from "@/app/hooks/useResponsive";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import FilterButton from "../Buttons/FilterButton";

import "./styles.scss";

type Inputs = {
  distance: number;
  size: number;
};

const FilterForm = () => {
  const mdUp = useResponsive("up", "md");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();

  const values = watch();

  console.log("values--->", values);

  return (
    <div className={classNames("filter-section", { "filter-section-responsive": !mdUp })}>
      <form
        className={classNames("filter-section-form", { "filter-section-form-responsive": !mdUp })}>
        <div>
          <h3>Filtrele</h3>
        </div>
        <div>
          <span>Mesafe {`(${values.distance} km)`}</span>
          <input type="range" min={1} max={20} {...register("distance")} />
        </div>
        <div>
          <span>Adet {`(${values.size})`}</span>
          <input type="range" min={1} max={30} {...register("size")} />
        </div>
        <FilterButton classes="filter-button-contained" label="Ara" onClick={() => null} />
      </form>
      <div></div>
    </div>
  );
};

export default FilterForm;
