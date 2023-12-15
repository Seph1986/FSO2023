import React from "react";

const Message = ({message, messageType}) => {

  const color = messageType === "error"
    ? "red"
    : "green"

  const messageStyle ={
    backgroundColor: "lightgray",
    borderRadius: "10px",
    padding: "10px",
    borderStyle: "solid",
    color: color
  }

  return(
    <div>
      <h3 style={(messageStyle)}>{message}</h3>
    </div>
  )
}

export default Message