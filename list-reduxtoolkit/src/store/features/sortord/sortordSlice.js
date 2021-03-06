import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'ζ¨θζεΊ'
};

export const sortordSlice = createSlice({
  name: 'sortord',
  initialState,
  reducers: {
    changeSortord(state, action) {
      state.value = action.payload;
    }
  }
});

export const { changeSortord } = sortordSlice.actions;
export default sortordSlice.reducer;