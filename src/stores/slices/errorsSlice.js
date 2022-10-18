import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  session: false,
  errors: {
    showModal: false
  }
}

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.errors.showModal = true
      state.errors.message = action.payload.message
    },
    hideModal: (state, action) => {
      state.errors.showModal = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { showModal, hideModal } = errorsSlice.actions

export default errorsSlice.reducer;

