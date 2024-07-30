import { create } from "zustand";
import { SearchDetail } from "../types/search-detail";
import { SearchNearest } from "../types/search-nearest";

interface State {
  isBottomSheetOpen: boolean;
  isMarkerBottomSheetOpen: boolean;
  filteredLocationData: SearchNearest;
  markerBottomSheetData: SearchDetail | null;
  actions: {
    setBottomSheetOpen: (isBottomSheetOpen: boolean) => void;
    setMarkerBottomSheetOpen: (isMarkerBottomSheetOpen: boolean) => void;
    setFilteredLocationData: (filteredLocationData: SearchNearest) => void;
    setMarkerBottomSheetData: (markerBottomSheetData: SearchDetail | null) => void;
  };
}

export const useGeneralStore = create<State>((set) => ({
  isBottomSheetOpen: false,
  isMarkerBottomSheetOpen: false,
  filteredLocationData: {} as SearchNearest,
  markerBottomSheetData: null,
  actions: {
    setBottomSheetOpen: (isBottomSheetOpen) => set(() => ({ isBottomSheetOpen })),
    setMarkerBottomSheetOpen: (isMarkerBottomSheetOpen) => set(() => ({ isMarkerBottomSheetOpen })),
    setFilteredLocationData: (filteredLocationData) => set(() => ({ filteredLocationData })),
    setMarkerBottomSheetData: (markerBottomSheetData) => set(() => ({ markerBottomSheetData }))
  }
}));
