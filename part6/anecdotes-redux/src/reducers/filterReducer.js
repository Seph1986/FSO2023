const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_ANECDOTES': {
      return action.data
    }
  }
  return state
}

export const filterAnecdotes = (word) => {
  return {
    type: 'FILTER_ANECDOTES',
    data: word
  }
}
 
export default filterReducer