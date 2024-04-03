import { create } from "zustand";

interface State {
  zoom: number;
  location: [number, number] | null;
  actions: {
    setZoom: (_zoom: number) => void;
    setLocation: (location: [number, number] | null) => void;
  };
}

export const useMapGeographyStore = create<State>((set) => ({
  zoom: 4,
  location: null,
  actions: {
    setZoom: (zoom) => set(() => ({ zoom })),
    setLocation: (location) => set(() => ({ location }))
  }
}));
