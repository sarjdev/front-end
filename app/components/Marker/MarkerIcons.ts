import maIcon from "@/app/assets/images/ma.svg";
import defaultMarker from "@/app/assets/images/marker.svg";
import mbIcon from "@/app/assets/images/mb.svg";
import meIcon from "@/app/assets/images/me.svg";
import msIcon from "@/app/assets/images/ms.svg";
import mzIcon from "@/app/assets/images/mz.svg";

export const renderIcon = (id: string): any => {
  const Icons: Record<string, any> = {
    "919287": mzIcon.src,
    "992950": mbIcon.src,
    "952581": maIcon.src,
    "930848": meIcon.src,
    "929899": msIcon.src
  };

  return Icons[id] || defaultMarker.src;
};
