const info = (...params) => {

  if (process.env.NODE_ENV !== 'test') {  //eslint-disable-line
    console.log(...params)
  }
}

const error = (...params) => {

  if (process.env.NODE_ENV !== 'test') {  //eslint-disable-line
    console.error(...params)
  }
}

module.exports = {
  info, error
}