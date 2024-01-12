import { useNotificationValue, useNotificationDispatch } from "../Contexts/NotificaionContext"

const Notification = () => {
  const notification = useNotificationValue()
  const dispatch = useNotificationDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notification) return null

  setTimeout(() => {
    dispatch({type: 'setNotification', payload: null})
  }, 5000)

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
