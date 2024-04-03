import { useGeneralStore } from "@/app/stores/generalStore";
import { useMapGeographyStore } from "@/app/stores/mapGeographyStore";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useSnackbar } from "notistack";
import { FC } from "react";
import Button from "../../Button/Button";

const FilterButton: FC = () => {
  const { actions } = useGeneralStore();
  const { location } = useMapGeographyStore();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickFilterButton = () => {
    if (location) {
      actions.setBottomSheetOpen(true);
    } else {
      enqueueSnackbar("Filtreleme yapabilmek için konum erişimine izin vermeniz gerekmektedir!", {
        variant: "warning"
      });
    }
  };
  return (
    <Button
      variant="contained"
      children={<Icon icon="ion:filter-sharp" width={18} />}
      onClick={handleClickFilterButton}
    />
  );
};

export default FilterButton;
