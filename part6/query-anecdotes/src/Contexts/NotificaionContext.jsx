import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type){
    case 'setNotification':
      return action.payload
  }
  return state
}

const NotificationContext = createContext()


export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => { //eslint-disable-line
  const notificationContext = useContext(NotificationContext)
  return notificationContext[0]
}

export const useNotificationDispatch = () => { //eslint-disable-line
  const notificationContext = useContext(NotificationContext)
  return notificationContext[1]
}

export default NotificationContext