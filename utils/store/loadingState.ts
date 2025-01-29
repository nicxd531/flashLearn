import create from "zustand";

interface CollectionState {
  isSaving: boolean;
  setIsSaving: (isSaving: boolean) => void;
}

export const useCollectionStore = create<CollectionState>((set) => ({
  isSaving: false,
  setIsSaving: (isSaving: boolean) => set({ isSaving }),
}));
