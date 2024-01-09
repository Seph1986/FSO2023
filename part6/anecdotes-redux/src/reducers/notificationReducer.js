import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers:{
    setNotification (state, action){
      return action.payload
    }
  }
})

export const { setNotification } = notificationSlice.actions

export const manageNotification = (content, sec) => {
  return async dispatch => {
    dispatch(setNotification(content))
    setTimeout(()=> {
      dispatch(setNotification(''))
    }, 1000*sec)
  }
}

export default notificationSlice.reducer