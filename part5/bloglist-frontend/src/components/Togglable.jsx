import React, {useState} from 'react'

const Toggable = (props) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = {display: visible ? '' : 'none'}
  const hideWhenVisible = {display: visible ? 'none' : ''}

  const handleVisible = () => {
    setVisible(!visible)
  }

  return(
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

export default Toggable