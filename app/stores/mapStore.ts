/* eslint-disable no-unused-vars */

import { create } from "zustand";
import { ClusterPopupData, DeviceType, EVENT_TYPES, LocationData, LocationResponse } from "../types";

export type DrawerData = LocationResponse | null;

interface MapState {
  eventType?: EVENT_TYPES;
  popUpData: ClusterPopupData | null;
  drawerData: DrawerData;
  isDrawerOpen: boolean;
  device: DeviceType;
  actions: {
    toggleDrawer: () => void;

    // after click a point, pass to drawer content
    setDrawerData: (data: DrawerData) => void;
    setPopUpData: (data: ClusterPopupData | null) => void;
    setDevice: (device: DeviceType) => void;
    setEventType: (eventType: EVENT_TYPES) => void;
  };
}

export const useMapStore = create<MapState>()((set) => ({
  drawerData: null,
  popUpData: null,
  isDrawerOpen: false,
  device: "desktop",
  markerData: [],
  actions: {
    toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
    setDrawerData: (data: DrawerData) => set(() => ({ drawerData: data })),
    setPopUpData: (data: ClusterPopupData | null) => set(() => ({ popUpData: data })),
    setDevice: (device: DeviceType) => set(() => ({ device })),
    setEventType: (eventType) => set(() => ({ eventType }))
  }
}));

export const useIsDrawerOpen = () => useMapStore((state) => state.isDrawerOpen);
export const useDrawerData = () => useMapStore((state) => state.drawerData);
export const useMapActions = () => useMapStore((state) => state.actions);
export const usePopUpData = () => useMapStore((state) => state.popUpData);
export const useDevice = () => useMapStore((state) => state.device);
export const useEventType = () => useMapStore((state) => state.eventType);
