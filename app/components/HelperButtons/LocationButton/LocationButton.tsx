import { useGeneralStore } from "@/app/stores/generalStore";
import { useMapGeographyStore } from "@/app/stores/mapGeographyStore";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useSnackbar } from "notistack";
import { FC } from "react";
import { useMap } from "react-leaflet";
import Button from "../../Button/Button";

const LocationButton: FC = () => {
  const { actions } = useGeneralStore();
  const { location } = useMapGeographyStore();
  const map = useMap();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickToCenter = () => {
    if (location) {
      const selectedLocationData: [number, number] = [location?.[0], location?.[1]];

      actions.setBottomSheetOpen(false);
      map.flyTo(selectedLocationData, 17);
    } else {
      enqueueSnackbar("Şu an konumunuza ulaşamıyoruz. Lütfen konum bilgisi için izin veriniz!", {
        variant: "warning"
      });
    }
  };

  return (
    <Button
      variant="contained"
      children={<Icon icon="ic:sharp-my-location" width={18} />}
      onClick={handleClickToCenter}
    />
  );
};

export default LocationButton;
