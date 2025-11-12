import { create } from "zustand"

interface FilterState {
  search: string;
  filterName: string;
  op: string;
  value: string;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  search: "",
  filterName: "",
  op: "",
  value: "",
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
  resetFilters: () => set({ search: "", filterName: "", op: "", value: "" }),
}));
