import { create } from "zustand";
import { FilteredLocationData } from "../types";

interface State {
  isBottomSheetOpen: boolean;
  filteredLocationData: FilteredLocationData;
  location: [number, number] | null;
  actions: {
    setBottomSheetOpen: (isBottomSheetOpen: boolean) => void;
    setFilteredLocationData: (filteredLocationData: FilteredLocationData) => void;
    setLocationData: (location: [number, number] | null) => void;
  };
}

export const generalStore = create<State>((set) => ({
  isBottomSheetOpen: false,
  filteredLocationData: {} as FilteredLocationData,
  location: null,
  actions: {
    setBottomSheetOpen: (isBottomSheetOpen) => set(() => ({ isBottomSheetOpen })),
    setFilteredLocationData: (filteredLocationData) => set(() => ({ filteredLocationData })),
    setLocationData: (location) => set(() => ({ location }))
  }
}));
