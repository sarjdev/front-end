import { PlugType, Providers, ProvidersEnum, TooltipData } from "../types";

export const checkPlugsType = (tooltipData: TooltipData, type: PlugType): boolean => {
  return tooltipData?.plugs?.some((plug) => plug.type === type) ?? false;
};

export const getPlugData = (
  tooltipData: TooltipData,
  type: PlugType,
  data: "count" | "power"
): string | number => {
  return tooltipData?.plugs?.filter((plug) => plug.type === type)?.[0]?.[data] ?? "";
};

export const handleClickProvider = (company: Providers): string => {
  switch (company) {
    case ProvidersEnum.ESARJ:
      return "https://esarj.com/";
    case ProvidersEnum.SHARZ:
      return "https://www.sharz.net/";
    case ProvidersEnum.ZES:
      return "https://zes.net/?utm_source=digital_media&utm_medium=footer_logo&utm_campaign=ZES_borusan&utm_id=borusan";
    case ProvidersEnum.AKSAENERGY:
      return "https://www.aksasarj.com.tr/";
    case ProvidersEnum.BEEFULL:
      return "https://beefull.com/Elektrikli-Arac-Sarj-Istasyonlari";
    default:
      return "https://sarj.dev/";
  }
};
