import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: true,
    singleItem:null
}

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setSingleItem: (state, action) => {
        state.singleItem = action.payload;
    },
    removeSingleItem: (state, action) => {
        state.singleItem = null;
    },
    setLoadingRequest: state => {
        state.loading = true;
    },
    setFinishedRequest: state => {
        state.loading = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
    setSingleItem, 
    removeSingleItem,
    setLoadingRequest,
    setFinishedRequest } = itemSlice.actions;

export const loadingSelector = state => state.item.loading;
export const itemSelector = state => state.item.singleItem;

export default itemSlice.reducer