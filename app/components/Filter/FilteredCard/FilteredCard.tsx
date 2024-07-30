import { useGeneralStore } from "@/app/stores/generalStore";
import { Location } from "@/app/types";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";
import Button from "../../Button/Button";

import { checkPlugsType, getPlugData } from "@/app/utils/general-utils";
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
                href={item?.reservationUrl || ""}
                target="_blank"
                className={classNames("card-item-header-provider", {
                  [`${item?.operator.brand}`]: true
                })}>
                {item?.operator.brand}
              </Link>
            </div>
            <div
              className={classNames("card-item-suitability", {
                "card-item-suitability-okay": item?.stationActive,
                "card-item-suitability-notokay": !item?.stationActive
              })}>
              <p>{item?.stationActive ? "Kullanıma uygun" : "Kullanıma uygun değil"}</p>
            </div>
            <div className="card-item-location">
              <Icon className="card-item-location-icon" icon="fluent:location-12-filled" />
              <p className="card-item-location-text">{item?.location?.address}</p>
            </div>
            <div className="card-item-location">
              <Icon className="card-item-location-icon" icon="ph:phone-fill" />
              <Link href={`tel:${item?.phone}`} className="card-item-location-text">
                {item?.phone}
              </Link>
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
                  <p>
                    {getPlugData(item, "AC")?.reduce((curr, next) => curr + next.count, 0)} adet
                  </p>
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
                  <p>
                    {getPlugData(item, "DC")?.reduce((curr, next) => curr + next.count, 0)} adet
                  </p>
                ) : (
                  <p>Mevcut değil</p>
                )}
              </div>
              <div className="card-item-socket-container">
                <Icon
                  icon="mdi:map-marker-distance"
                  className="card-item-socket-container-distance"
                />
                <p>{item.distance} km kuş uçuşu mesafede</p>
              </div>
            </div>
            <p className="card-item-sub-info">
              Detaylı bilgi için "Haritada Gör" butonuna tıklayınız!
            </p>
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
