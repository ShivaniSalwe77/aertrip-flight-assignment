import React from 'react'

const PriceSlider = ({ min, max, valueMin, valueMax, onChange }) => {
  const handleMinChange = (event) => {
    const nextMin = Number(event.target.value)
    if (nextMin <= valueMax) {
      onChange([nextMin, valueMax])
    }
  }

  const handleMaxChange = (event) => {
    const nextMax = Number(event.target.value)
    if (nextMax >= valueMin) {
      onChange([valueMin, nextMax])
    }
  }

  return (
    <div className="price-filter">
      <h3>Price</h3>

      <div className="price-range-inputs">
        <input
          type="range"
          min={min}
          max={max}
          value={valueMin}
          onChange={handleMinChange}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={valueMax}
          onChange={handleMaxChange}
        />
      </div>

      <div className="price-values">
        <span>₹ {valueMin}</span>
        <span>₹ {valueMax}</span>
      </div>
    </div>
  )
}

export default PriceSlider