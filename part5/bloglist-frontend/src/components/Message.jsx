import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ message, messageType }) => {

  const color = messageType === 'error'
    ? 'red'
    : 'green'

  const messageStyle = {
    backgroundColor: 'lightgray',
    borderRadius: '10px',
    padding: '10px',
    borderStyle: 'solid',
    color: color
  }

  return (
    <div>
      <h3 id='message' style={(messageStyle)}>{message}</h3>
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired
}

export default Message