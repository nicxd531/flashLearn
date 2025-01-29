import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface CollectionState {
  busyACollection: boolean;
  busyAQuestion: boolean;
  collectionId?: string;
}
const initialState: CollectionState = {
  busyACollection: false,
  busyAQuestion: false,
};

const slice = createSlice({
  name: "collectionState",
  initialState,
  reducers: {
    updateBusyStateCollection(collectionState, { payload }) {
      collectionState.busyACollection = payload;
    },
    updateBusyStateQuestion(collectionState, { payload }) {
      collectionState.busyAQuestion = payload;
    },
    updateCollectionId(collectionState, { payload }) {
      collectionState.collectionId = payload;
    },
  },
});
export const {
  updateBusyStateCollection,
  updateCollectionId,
  updateBusyStateQuestion,
} = slice.actions;

export const getCollectionState = createSelector(
  (state: RootState) => state,
  (collectionState) => collectionState
);

export default slice.reducer;
