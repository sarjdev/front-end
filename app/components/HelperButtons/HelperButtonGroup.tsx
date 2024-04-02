import { FC } from "react";
import FilterButton from "./FilterButton/FilterButton";
import LocationButton from "./LocationButton/LocationButton";

import "./styles.scss";

const HelperButtonGroup: FC = () => {
  return (
    <div className="helper">
      <FilterButton />
      <LocationButton />
    </div>
  );
};

export default HelperButtonGroup;
