import omit from "lodash.omit";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getHashStorage } from "../utils/zustand";

interface State {
  zoom: number;
  actions: {
    setZoom: (_zoom: number) => void;
  };
}

export const useMapGeographyStore = create<State>()(
  persist(
    (set) => ({
      zoom: 8,
      actions: {
        setZoom: (zoom) => set(() => ({ zoom }))
      }
    }),
    {
      name: "mg",
      getStorage: () => getHashStorage(),
      partialize: (state) => ({ ...omit(state, "actions") })
    }
  )
);
