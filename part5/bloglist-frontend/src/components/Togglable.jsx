import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const handleVisible = () => {
    setVisible(!visible)
  }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={handleVisible}>{props.label}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={handleVisible}>cancel</button>
      </div>
    </>
  )
}

Togglable.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}

export default Togglable