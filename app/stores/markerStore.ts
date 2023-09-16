import { create } from "zustand";
import { LocationData } from "../types";

interface MapState {
  markers: LocationData[];
  actions: {
    setMarkerData: (_markers: any) => void;
  };
}

export const useMarkerStore = create<MapState>()((set) => ({
  markers: [],
  actions: {
    setMarkerData: (markers) => set(() => ({ markers })),
  },
}));

export const useMarkerActions = () => useMarkerStore((state) => state.actions);