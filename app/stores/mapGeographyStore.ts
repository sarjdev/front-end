
import omit from "lodash.omit";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getHashStorage } from "../utils/zustand";

type Coordinates = { lat: number; lon: number };

interface State {
  coordinates: Coordinates;
  zoom: number;
  actions: {
    setCoordinates: (_data: Coordinates) => void;
    setZoom: (_zoom: number) => void;
  };
}

export const useMapGeographyStore = create<State>()(
  persist(
    (set) => ({
      coordinates: {
        lat: 51.505,
        lon: -0.09,
      },
      zoom: 8,
      actions: {
        setCoordinates: (coordinates) => set(() => ({ coordinates })),
        setZoom: (zoom) => set(() => ({ zoom })),
      },
    }),
    {
      name: "mg",
      getStorage: () => getHashStorage(),
      partialize: (state) => ({ ...omit(state, "actions") }),
    }
  )
);