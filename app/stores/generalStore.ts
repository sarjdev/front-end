import { create } from "zustand";
import { FilteredLocationData } from "../types";

interface State {
  isBottomSheetOpen: boolean;
  filteredLocationData: FilteredLocationData;
  actions: {
    setBottomSheetOpen: (isBottomSheetOpen: boolean) => void;
    setFilteredLocationData: (filteredLocationData: FilteredLocationData) => void;
  };
}

export const generalStore = create<State>((set) => ({
  isBottomSheetOpen: false,
  filteredLocationData: {} as FilteredLocationData,
  actions: {
    setBottomSheetOpen: (isBottomSheetOpen) => set(() => ({ isBottomSheetOpen })),
    setFilteredLocationData: (filteredLocationData) => set(() => ({ filteredLocationData }))
  }
}));
