import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '推荐排序'
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