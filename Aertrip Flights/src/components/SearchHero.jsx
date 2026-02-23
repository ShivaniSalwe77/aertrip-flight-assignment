import React, { useState } from 'react'

const SearchHero = ({ onSearch }) => {
  const [from, setFrom] = useState('Mumbai')
  const [to, setTo] = useState('Kolkata')
  const [date, setDate] = useState('2021-10-17')
  const [passengers, setPassengers] = useState(1)

  const handleSubmit = (event) => {
    event.preventDefault()
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
          <div className="trip-types">
            <button type="button" className="trip-type active">
              Oneway
            </button>
            <button type="button" className="trip-type">
              Return
            </button>
            <button type="button" className="trip-type">
              Multicity
            </button>
          </div>

          <form onSubmit={handleSubmit} className="search-form">
            <div className="search-row">
              <div className="field">
                <label htmlFor="from">From</label>
                <input
                  id="from"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="to">To</label>
                <input
                  id="to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="date">Depart</label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

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

              <div className="field small">
                <label>Cabin</label>
                <div className="pill">Economy</div>
              </div>

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

export default SearchHero

