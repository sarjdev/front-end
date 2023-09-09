import { create } from "zustand";
import { LocationData } from "../types";

interface MapState {
  shouldFetchNextOption: boolean;
  sendRequest: boolean;
  markers: LocationData[];
  error?: any;
  actions: {
    setError: (_error: any) => void;
    setMarkerData: (_markers: any) => void;
    setSendRequest: () => void;
    setShouldFetchNextOption: (_shouldFetchNextOption: boolean) => void;
  };
}

export const useAreasStore = create<MapState>()((set) => ({
  shouldFetchNextOption: false,
  error: undefined,
  sendRequest: false,
  markers: [],
  actions: {
    setMarkerData: (markers) => set(() => ({ markers })),
    setSendRequest: () => set(() => ({ sendRequest: true })),
    setShouldFetchNextOption: (shouldFetchNextOption) =>
      set(() => ({ shouldFetchNextOption })),
    setError: (error) => set(() => ({ error })),
  },
}));

export const useAreasMarkerData = () => useAreasStore((state) => state.markers);
export const useAreasActions = () => useAreasStore((state) => state.actions);
export const useSendRequest = () => useAreasStore((state) => state.sendRequest);
export const useAreasStoreError = () => useAreasStore((state) => state.error);
export const useShouldFetchNextOption = () =>
  useAreasStore((state) => state.shouldFetchNextOption);