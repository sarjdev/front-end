import omit from "lodash.omit";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getHashStorage } from "../utils/zustand";

interface State {
  isBottomSheetOpen: boolean;
  actions: {
    setBottomSheetOpen: (isBottomSheetOpen: boolean) => void;
  };
}

export const generalStore = create<State>()(
  persist(
    (set) => ({
      isBottomSheetOpen: false,
      actions: {
        setBottomSheetOpen: (isBottomSheetOpen) => set(() => ({ isBottomSheetOpen }))
      }
    }),
    {
      name: "gs",
      getStorage: () => getHashStorage(),
      partialize: (state) => ({ ...omit(state, "actions") })
    }
  )
);
