import React from 'react'

const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      <form>
        filter shown with: <input
          type='text'
          value={filter}
          onChange={handleFilter}
        />
      </form>
    </div>
  )
}

export default Filter