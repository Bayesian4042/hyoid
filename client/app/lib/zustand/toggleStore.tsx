import { create } from "zustand";

interface StoreState {
  showSidebar: boolean;
  toggleShowSidebar: () => void;
}

const toggleStore = create<StoreState>((set) => ({
  showSidebar: true,
  toggleShowSidebar: () =>
    set((state) => ({ showSidebar: !state.showSidebar })),
}));

export default toggleStore;
