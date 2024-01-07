import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(({ notification }) => notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    margin: 10,
    backgroundColor: 'yellow',
    display: 'none'
  }

  notification !== ''
    ? style.display = ''
    : style.display = 'none'

    
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification