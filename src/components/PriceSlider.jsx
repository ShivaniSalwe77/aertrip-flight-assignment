// Import React for component creation
import React from 'react'

// PriceSlider component - provides dual range slider for filtering flights by price
// Props:
//   - min: minimum possible price value
//   - max: maximum possible price value
//   - valueMin: current selected minimum price
//   - valueMax: current selected maximum price
//   - onChange: callback function triggered when price range changes
const PriceSlider = ({ min, max, valueMin, valueMax, onChange }) => {
	// Handle minimum price slider change
	// Ensures min value doesn't exceed max value before updating
	const handleMinChange = (event) => {
		const nextMin = Number(event.target.value)
		// Only update if new minimum doesn't exceed current maximum
		if (nextMin <= valueMax) {
			onChange([nextMin, valueMax])
		}
	}

	// Handle maximum price slider change
	// Ensures max value doesn't go below min value before updating
	const handleMaxChange = (event) => {
		const nextMax = Number(event.target.value)
		// Only update if new maximum doesn't go below current minimum
		if (nextMax >= valueMin) {
			onChange([valueMin, nextMax])
		}
	}

	return (
		<div className="price-filter">
			{/* Filter section title */}
			<h3>Price</h3>

			{/* Dual range input sliders */}
			<div className="price-range-inputs">
				{/* Minimum price range slider */}
				<input
					type="range"
					min={min}
					max={max}
					value={valueMin}
					onChange={handleMinChange}
				/>
				{/* Maximum price range slider */}
				<input
					type="range"
					min={min}
					max={max}
					value={valueMax}
					onChange={handleMaxChange}
				/>
			</div>

			{/* Display current price range values in Indian currency format */}
			<div className="price-values">
				<span>₹ {valueMin}</span>
				<span>₹ {valueMax}</span>
			</div>
		</div>
	)
}

// Export component for use in parent components
export default PriceSlider
