// Import React for component creation
import React from 'react'

// Filters component - provides sorting options for flight results
// Props:
//   - sort: object with current sort field and direction
//   - onChangeSort: callback to change sorting
//   - clearFilters: callback to reset all filters
const Filters = ({ sort, onChangeSort, clearFilters }) => {
	// Helper function to determine which arrow to show based on current sort state
	const getArrow = (field) => {
		if (sort.field !== field) return ''
		// Show up arrow for price descending (inverted: low to high becomes high to low)
		if (field === 'price' && sort.direction === 'desc') {
			return '↑'
		}
		// Show down arrow for all other ascending sorts
		return '↓'
	}

	return (
		<div className="sort-bar">
			{/* Container for all sort button options */}
			<div className="sort-options">
				{/* Sort by price button - toggles between low-to-high and high-to-low */}
				<button
					type="button"
					className={sort.field === 'price' ? 'active' : ''}
					onClick={() => onChangeSort('price')}
				>
					Price low to high {getArrow('price')}
				</button>

				{/* Sort by flight duration button - shows shortest flights first */}
				<button
					type="button"
					className={sort.field === 'duration' ? 'active' : ''}
					onClick={() => onChangeSort('duration')}
				>
					Duration shortest first {getArrow('duration')}
				</button>

				{/* Sort by departure time button - shows earliest departures first */}
				<button
					type="button"
					className={sort.field === 'departure' ? 'active' : ''}
					onClick={() => onChangeSort('departure')}
				>
					Depart earliest first {getArrow('departure')}
				</button>

				{/* Sort by arrival time button - shows earliest arrivals first */}
				<button
					type="button"
					className={sort.field === 'arrival' ? 'active' : ''}
					onClick={() => onChangeSort('arrival')}
				>
					Arrival earliest first {getArrow('arrival')}
				</button>
			</div>

			{/* Button to reset all filters to default state */}
			<button type="button" className="clear-btn" onClick={clearFilters}>
				Clear filters
			</button>
		</div>
	)
}

// Export component for use in parent components
export default Filters
