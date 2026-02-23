import React from 'react'

const Filters = ({ sort, onChangeSort, clearFilters }) => {
  const getArrow = (field) => {
    if (sort.field !== field) return ''
    if (field === 'price' && sort.direction === 'desc') {
      return '↑'
    }
    return '↓'
  }

  return (
    <div className="sort-bar">
      <div className="sort-options">
        <button
          type="button"
          className={sort.field === 'price' ? 'active' : ''}
          onClick={() => onChangeSort('price')}
        >
          Price low to high {getArrow('price')}
        </button>

        <button
          type="button"
          className={sort.field === 'duration' ? 'active' : ''}
          onClick={() => onChangeSort('duration')}
        >
          Duration shortest first {getArrow('duration')}
        </button>

        <button
          type="button"
          className={sort.field === 'departure' ? 'active' : ''}
          onClick={() => onChangeSort('departure')}
        >
          Depart earliest first {getArrow('departure')}
        </button>

        <button
          type="button"
          className={sort.field === 'arrival' ? 'active' : ''}
          onClick={() => onChangeSort('arrival')}
        >
          Arrival earliest first {getArrow('arrival')}
        </button>
      </div>

      <button type="button" className="clear-btn" onClick={clearFilters}>
        Clear filters
      </button>
    </div>
  )
}

export default Filters