import { create } from "zustand";
import { FilteredLocationData } from "../types";
import { SearchDetail } from "../types/search-detail";

interface State {
  isBottomSheetOpen: boolean;
  isMarkerBottomSheetOpen: boolean;
  filteredLocationData: FilteredLocationData;
  markerBottomSheetData: SearchDetail | null;
  actions: {
    setBottomSheetOpen: (isBottomSheetOpen: boolean) => void;
    setMarkerBottomSheetOpen: (isMarkerBottomSheetOpen: boolean) => void;
    setFilteredLocationData: (filteredLocationData: FilteredLocationData) => void;
    setMarkerBottomSheetData: (markerBottomSheetData: SearchDetail | null) => void;
  };
}

export const useGeneralStore = create<State>((set) => ({
  isBottomSheetOpen: false,
  isMarkerBottomSheetOpen: false,
  filteredLocationData: {} as FilteredLocationData,
  markerBottomSheetData: null,
  actions: {
    setBottomSheetOpen: (isBottomSheetOpen) => set(() => ({ isBottomSheetOpen })),
    setMarkerBottomSheetOpen: (isMarkerBottomSheetOpen) => set(() => ({ isMarkerBottomSheetOpen })),
    setFilteredLocationData: (filteredLocationData) => set(() => ({ filteredLocationData })),
    setMarkerBottomSheetData: (markerBottomSheetData) => set(() => ({ markerBottomSheetData }))
  }
}));
