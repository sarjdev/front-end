import maIcon from "@/app/assets/images/ma.svg";
import defaultMarker from "@/app/assets/images/marker.svg";
import mastorIcon from "@/app/assets/images/mastor.svg";
import mbIcon from "@/app/assets/images/mb.svg";
import mcwIcon from "@/app/assets/images/mcw.svg";
import mdchargeIcon from "@/app/assets/images/mdcharge.svg";
import meIcon from "@/app/assets/images/me.svg";
import mpowersarjIcon from "@/app/assets/images/mpowersarj.svg";
import msIcon from "@/app/assets/images/ms.svg";
import mteslaIcon from "@/app/assets/images/mtesla.svg";
import mtrugoIcon from "@/app/assets/images/mtrugo.svg";
import mtuncIcon from "@/app/assets/images/mtunc.svg";
import mvoltrunIcon from "@/app/assets/images/mvoltrun.svg";
import mwattIcon from "@/app/assets/images/mwatt.svg";
import mzIcon from "@/app/assets/images/mz.svg";

export const renderIcon = (id: string): any => {
  const Icons: Record<string, any> = {
    "919287": mzIcon.src,
    "992950": mbIcon.src,
    "952581": maIcon.src,
    "930848": meIcon.src,
    "929899": msIcon.src,
    "929964": mtrugoIcon.src,
    "993744": mteslaIcon.src,
    "929436": mwattIcon.src,
    "1093161": mvoltrunIcon.src,
    "1006519": mtuncIcon.src,
    "919121": mastorIcon.src,
    "919069": mcwIcon.src,
    "1092971": mdchargeIcon.src,
    "931220": mpowersarjIcon.src
  };

  return Icons[id] || defaultMarker.src;
};
