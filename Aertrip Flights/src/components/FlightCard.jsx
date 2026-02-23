import React from 'react'

const AIRLINE_NAMES = {
  UK: 'Vistara',
  '6E': 'IndiGo Airlines',
  AI: 'Air India',
}

const AIRLINE_LOGOS = {
  UK: 'https://thehardcopy.co/wp-content/uploads/Vistara-Images-7-1200x805.png',
  AI: 'https://d2mccptxtk231d.cloudfront.net/1.0.1863/resources/assets/scss/skin/img/airline-master/AI.png',
}

const FlightCard = ({ flight, cityNamesByCode }) => {
  const leg = flight.leg?.[0]
  const flightData = leg?.flights?.[0]

  if (!flightData) {
    return null
  }

  const hours = Math.floor(flightData.ft / 3600)
  const minutes = Math.floor((flightData.ft % 3600) / 60)

  const airlineCode = flightData.al
  const airlineName = AIRLINE_NAMES[airlineCode] || airlineCode
  const logoUrl = AIRLINE_LOGOS[airlineCode]

  const airlineColorMap = {
    UK: '#5e1d77',
    '6E': '#0a3c8e',
    AI: '#f15a29',
  }

  const logoColor = airlineColorMap[airlineCode] || '#00c9a7'

  const fromCityName = cityNamesByCode?.[flightData.fr]
  const toCityName = cityNamesByCode?.[flightData.to]

  return (
    <div className="flight-card">
      <div className="flight-left">
        <div className="airline-logo">
          {logoUrl ? (
            <img src={logoUrl} alt={airlineName} />
          ) : (
            <div className="airline-logo-circle" style={{ backgroundColor: logoColor }}>
              {airlineCode}
            </div>
          )}
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>{airlineName}</div>
        </div>
      </div>

      <div className="flight-center">
        <div className="time-block">
          <h3>{flightData.dt}</h3>
          <small>
            {fromCityName
              ? `${fromCityName} (${flightData.fr})`
              : flightData.fr}
          </small>
        </div>

        <div className="duration-block">
          <div className="line" />
          <div style={{ fontSize: '13px', fontWeight: 500 }}>
            {hours}h {minutes}m
          </div>
          <div style={{ fontSize: '11px', color: '#777' }}>Non stop</div>
        </div>

        <div className="time-block">
          <h3>{flightData.at}</h3>
          <small>
            {toCityName ? `${toCityName} (${flightData.to})` : flightData.to}
          </small>
        </div>
      </div>

      <div className="flight-right">
        <div className="price">
          ₹ {flight.farepr?.toLocaleString('en-IN') ?? flight.farepr}
        </div>
        <button type="button" className="select-btn">
          Book
        </button>
      </div>
    </div>
  )
}

export default FlightCard