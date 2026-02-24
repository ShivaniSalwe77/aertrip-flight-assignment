// Import React and useState hook for component creation and state management
import React, { useState } from 'react'

// SearchHero component - displays the main flight search interface
// Props:
//   - onSearch: callback function triggered when search form is submitted
const SearchHero = ({ onSearch }) => {
  // Search form state variables with default values
  // Origin city
  const [from, setFrom] = useState('Mumbai')
  // Destination city
  const [to, setTo] = useState('Kolkata')
  // Departure date
  const [date, setDate] = useState('2021-10-17')
  // Number of passengers
  const [passengers, setPassengers] = useState(1)

  // Handle form submission - prevents default behavior and calls onSearch callback
  const handleSubmit = (event) => {
    event.preventDefault()
    // Pass all search parameters to parent component
    onSearch({
      from,
      to,
      date,
      passengers,
      tripType: 'Oneway',
      cabin: 'Economy',
    })
  }

  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="search-card">
          {/* Trip type selection buttons */}
          <div className="trip-types">
            {/* Oneway trip option - currently active */}
            <button type="button" className="trip-type active">
              Oneway
            </button>
            {/* Return trip option */}
            <button type="button" className="trip-type">
              Return
            </button>
            {/* Multi-city trip option */}
            <button type="button" className="trip-type">
              Multicity
            </button>
          </div>

          {/* Main search form */}
          <form onSubmit={handleSubmit} className="search-form">
            {/* Form inputs row */}
            <div className="search-row">
              {/* Origin city input field */}
              <div className="field">
                <label htmlFor="from">From</label>
                <input
                  id="from"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>

              {/* Destination city input field */}
              <div className="field">
                <label htmlFor="to">To</label>
                <input
                  id="to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>

              {/* Departure date input field */}
              <div className="field">
                <label htmlFor="date">Depart</label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* Number of passengers input field - smaller field size */}
              <div className="field small">
                <label htmlFor="passengers">Passengers</label>
                <input
                  id="passengers"
                  type="number"
                  min={1}
                  value={passengers}
                  onChange={(e) =>
                    setPassengers(Number(e.target.value) || 1)
                  }
                />
              </div>

              {/* Cabin class display - static Economy value */}
              <div className="field small">
                <label>Cabin</label>
                <div className="pill">Economy</div>
              </div>

              {/* Submit button to trigger search */}
              <button type="submit" className="search-btn">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

// Export component for use in parent components
export default SearchHero

