import { Icon } from "@iconify-icon/react/dist/iconify.js";
import classNames from "classnames";
import Link from "next/link";
import { FC, useState } from "react";

import { SearchDetail } from "@/app/types/search-detail";
import { checkPlugsType, getPlugData } from "@/app/utils/general-utils";
import Accordion from "../../Accordion/Accordion";
import "./style.scss";

export interface CustomPopupType {
  tooltipData: SearchDetail;
  isForFilteredCard?: boolean;
}

const CustomPopup: FC<CustomPopupType> = ({ tooltipData }) => {
  const [isACPlugOpen, setIsACPlugOpen] = useState<boolean>(false);
  const [isDCPlugOpen, setIsDCPlugOpen] = useState<boolean>(false);

  const DCPlugData = getPlugData(tooltipData, "DC");
  const ACPlugData = getPlugData(tooltipData, "AC");

  const handleAccordionToggle = (isAc: boolean) => {
    setIsACPlugOpen(isAc ? !isACPlugOpen : false);
    setIsDCPlugOpen(!isAc ? !isDCPlugOpen : false);
  };

  return (
    <div className="custom-popup-container">
      <div className="custom-popup-header">
        <h5 className="custom-popup-header-title">{tooltipData?.title}</h5>
        <Link
          href={tooltipData?.reservationUrl ?? ""}
          target="_blank"
          className={classNames("custom-popup-header-provider", {
            [`${tooltipData?.operator?.brand}`]: true
          })}>
          {tooltipData?.operator?.brand}
        </Link>
      </div>
      <div
        className={classNames("custom-popup-suitability", {
          "custom-popup-suitability-okay": tooltipData?.stationActive,
          "custom-popup-suitability-notokay": !tooltipData?.stationActive
        })}>
        <p>{tooltipData?.stationActive ? "Kullanıma uygun" : "Kullanıma uygun değil"}</p>
      </div>
      <div className="custom-popup-info">
        <Icon className="custom-popup-info-icon" icon="fluent:location-12-filled" />
        <p className="custom-popup-info-text">{tooltipData?.location?.address}</p>
      </div>
      <div className="custom-popup-info">
        <Icon className="custom-popup-info-icon" icon="ph:phone-fill" />
        <Link className="custom-popup-info-text" href={`tel:${tooltipData?.phone}`}>
          {tooltipData?.phone}
        </Link>
      </div>
      <div className="custom-popup-button-container">
        <Link
          className="custom-popup-button-container-item custom-popup-button-container-direction"
          target="_blank"
          href={`https://www.google.com/maps?q=${tooltipData?.location?.lat},${tooltipData?.location?.lon}`}>
          Yol Tarifi
        </Link>
        <Link
          className="custom-popup-button-container-item custom-popup-button-container-payment"
          target="_blank"
          href={tooltipData?.reservationUrl ?? ""}>
          Rezervasyon
        </Link>
      </div>

      <div className="custom-popup-socket">
        <div className="custom-popup-socket-container">
          <Accordion
            isOpen={isACPlugOpen}
            onToggle={() => handleAccordionToggle(true)}
            title={
              <p
                className={classNames("custom-popup-socket-container-icon", {
                  "custom-popup-socket-container-icon-okay": checkPlugsType(tooltipData, "AC")
                })}>
                AC
              </p>
            }
            content={
              <div className="custom-popup-socket-container-data">
                {ACPlugData?.length
                  ? ACPlugData?.map((item) => (
                      <div className="custom-popup-socket-container-data-wrapper">
                        <div className="custom-popup-socket-container-data-item">
                          <h5>Tip</h5>
                          <p>{item.subType}</p>
                        </div>
                        <div className="custom-popup-socket-container-data-item">
                          <h5>Soket Nu.</h5>
                          <p>{item.socketNumber}</p>
                        </div>
                        <div className="custom-popup-socket-container-data-item">
                          <h5>Güç</h5>
                          <p>{item.power}</p>
                        </div>
                        <div className="custom-popup-socket-container-data-item">
                          <h5>Ücret</h5>
                          <p>₺{item.price}</p>
                        </div>
                        <div className="custom-popup-socket-container-data-item">
                          <h5>Sayı</h5>
                          <p>{item.count}</p>
                        </div>
                      </div>
                    ))
                  : "Soket mevcut değil!"}
              </div>
            }
          />
        </div>
        <div className="custom-popup-socket-container">
          <Accordion
            isOpen={isDCPlugOpen}
            onToggle={() => handleAccordionToggle(false)}
            title={
              <p
                className={classNames("custom-popup-socket-container-icon", {
                  "custom-popup-socket-container-icon-okay": checkPlugsType(tooltipData, "DC")
                })}>
                DC
              </p>
            }
            content={
              <div className="custom-popup-socket-container-data">
                {DCPlugData?.length
                  ? DCPlugData?.map((item) => (
                      <div className="custom-popup-socket-container-data-wrapper">
                        <div className="custom-popup-socket-container-data-item">
                          <h5>Tip</h5>
                          <p>{item.subType}</p>
                        </div>
                        <div className="custom-popup-socket-container-data-item">
                          <h5>Soket Nu.</h5>
                          <p>{item.socketNumber}</p>
                        </div>
                        <div className="custom-popup-socket-container-data-item">
                          <h5>Güç</h5>
                          <p>{item.power}</p>
                        </div>
                        <div className="custom-popup-socket-container-data-item">
                          <h5>Ücret</h5>
                          <p>₺{item.price}</p>
                        </div>
                        <div className="custom-popup-socket-container-data-item">
                          <h5>Sayı</h5>
                          <p>{item.count}</p>
                        </div>
                      </div>
                    ))
                  : "Soket mevcut değil!"}
              </div>
            }
          />
        </div>

        <div className="custom-popup-socket-container padding">
          <Icon icon="ph:clock-bold" className="custom-popup-socket-container-clock" />
          <p>00:00 - 23.59</p>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
