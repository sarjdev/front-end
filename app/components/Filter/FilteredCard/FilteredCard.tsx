import { useGeneralStore } from "@/app/stores/generalStore";
import { Location } from "@/app/types";
import { checkPlugsType, getPlugData, handleClickProvider } from "@/app/utils/general-utils";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";
import Button from "../../Button/Button";

import "./styles.scss";

type FilteredCardType = {
  handleClickToCenter: (location: Location) => void;
};

const FilteredCard: FC<FilteredCardType> = ({ handleClickToCenter }) => {
  const { filteredLocationData } = useGeneralStore();

  return (
    <div className="card-container">
      {filteredLocationData?.total ? (
        filteredLocationData?.chargingStations?.map((item) => (
          <div key={item.id} className="card-item">
            <div className="card-item-header">
              <h5 className="card-item-header-title">{item?.title}</h5>
              <Link
                href={handleClickProvider(item?.provider ?? "ZES")}
                target="_blank"
                className={classNames("card-item-header-provider", {
                  [`${item?.provider}`]: true
                })}>
                {item?.provider}
              </Link>
            </div>
            <div className="card-item-suitability card-item-suitability-okay">
              <p>Kullanıma uygun</p>
            </div>
            <div className="card-item-location">
              <Icon className="card-item-location-icon" icon="fluent:location-12-filled" />
              <p className="card-item-location-text">{item?.address}</p>
            </div>
            <Button
              classes="button-contained card-item-button"
              children="Haritada Gör"
              onClick={() => handleClickToCenter(item.location)}
            />
            <div className="card-item-socket">
              <div className="card-item-socket-container">
                <p
                  className={classNames("card-item-socket-container-icon", {
                    "card-item-socket-container-icon-okay": checkPlugsType(item, "AC")
                  })}>
                  AC
                </p>
                {checkPlugsType(item, "AC") ? (
                  <>
                    <p>{getPlugData(item, "AC", "count")} adet /</p>
                    <p>{getPlugData(item, "AC", "power")}</p>{" "}
                  </>
                ) : (
                  <p>Mevcut değil</p>
                )}
              </div>
              <div className="card-item-socket-container">
                <p
                  className={classNames("card-item-socket-container-icon", {
                    "card-item-socket-container-icon-okay": checkPlugsType(item, "DC")
                  })}>
                  DC
                </p>
                {checkPlugsType(item, "DC") ? (
                  <>
                    <p>{getPlugData(item, "DC", "count")} adet /</p>
                    <p>{getPlugData(item, "DC", "power")}</p>{" "}
                  </>
                ) : (
                  <p>Mevcut değil</p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="card-empty">
          {filteredLocationData?.total === undefined
            ? "Lütfen filtreleme yapınız!"
            : "Herhangi bir konum bilgisi bulunamadı!"}
        </div>
      )}
    </div>
  );
};

export default FilteredCard;
