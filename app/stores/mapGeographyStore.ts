import { create } from "zustand";

interface State {
  zoom: number;
  actions: {
    setZoom: (_zoom: number) => void;
  };
}

export const useMapGeographyStore = create<State>((set) => ({
  zoom: 4,
  actions: {
    setZoom: (zoom) => set(() => ({ zoom }))
  }
}));
