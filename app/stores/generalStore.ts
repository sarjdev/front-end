import { create } from "zustand";
import { FilteredLocationData, Location } from "../types";

interface State {
  isBottomSheetOpen: boolean;
  filteredLocationData: FilteredLocationData;
  selectedLocation: Location | null;
  actions: {
    setBottomSheetOpen: (isBottomSheetOpen: boolean) => void;
    setFilteredLocationData: (filteredLocationData: FilteredLocationData) => void;
    setSelectedLocation: (selectedLocation: Location | null) => void;
  };
}

export const generalStore = create<State>((set) => ({
  isBottomSheetOpen: false,
  filteredLocationData: {} as FilteredLocationData,
  selectedLocation: null,
  actions: {
    setBottomSheetOpen: (isBottomSheetOpen) => set(() => ({ isBottomSheetOpen })),
    setFilteredLocationData: (filteredLocationData) => set(() => ({ filteredLocationData })),
    setSelectedLocation: (selectedLocation) => set(() => ({ selectedLocation }))
  }
}));
