// Import React for component creation
import React from 'react'

// Mapping of airline codes to their display names
const AIRLINE_NAMES = {
	UK: 'Vistara',
	'6E': 'IndiGo Airlines',
	AI: 'Air India',
}

// Mapping of airline codes to their logo image URLs
const AIRLINE_LOGOS = {
	UK: 'https://thehardcopy.co/wp-content/uploads/Vistara-Images-7-1200x805.png',
	AI: 'https://d2mccptxtk231d.cloudfront.net/1.0.1863/resources/assets/scss/skin/img/airline-master/AI.png',
}

// FlightCard component - displays a single flight result with all details
// Props:
//   - flight: flight object containing fare, leg, and route information
//   - cityNamesByCode: lookup map to convert airport codes to city names
const FlightCard = ({ flight, cityNamesByCode }) => {
	console.log('Rendering FlightCard for flight:', flight)
	// Extract first leg and flight details from flight object
	const leg = flight.leg?.[0]
	const flightData = leg?.flights?.[0]

	// Render nothing if flight data is unavailable
	if (!flightData) {
		return null
	}

	// Calculate flight duration in hours and minutes from total flight time (ft) in seconds
	const hours = Math.floor(flightData.ft / 3600)
	const minutes = Math.floor((flightData.ft % 3600) / 60)

	// Get airline information and styling
	const airlineCode = flightData.al
	const airlineName = AIRLINE_NAMES[airlineCode] || airlineCode
	const logoUrl = AIRLINE_LOGOS[airlineCode]

	// Color mapping for airline logos when image is not available
	const airlineColorMap = {
		UK: '#5e1d77',
		'6E': '#0a3c8e',
		AI: '#f15a29',
	}

	const logoColor = airlineColorMap[airlineCode] || '#00c9a7'

	// Convert airport codes to city names using lookup map
	const fromCityName = cityNamesByCode?.[flightData.fr]
	const toCityName = cityNamesByCode?.[flightData.to]

	return (
		<div className="flight-card">
			{/* Left section: Airline information and logo */}
			<div className="flight-left">
				{/* Airline logo - either image or colored circle with airline code */}
				<div className="airline-logo">
					{logoUrl ? (
						<img src={logoUrl} alt={airlineName} />
					) : (
						<div
							className="airline-logo-circle"
							style={{ backgroundColor: logoColor }}
						>
							{airlineCode}
						</div>
					)}
				</div>
				{/* Airline name display */}
				<div>
					<div style={{ fontWeight: 600 }}>{airlineName}</div>
				</div>
			</div>

			{/* Center section: Departure, duration, and arrival information */}
			<div className="flight-center">
				{/* Departure time and origin city */}
				<div className="time-block">
					<h3>{flightData.dt}</h3>
					<small>
						{fromCityName
							? `${fromCityName} (${flightData.fr})`
							: flightData.fr}
					</small>
				</div>

				{/* Flight duration display with visual connector */}
				<div className="duration-block">
					<div className="line" />
					<div style={{ fontSize: '13px', fontWeight: 500 }}>
						{hours}h {minutes}m
					</div>
					<div style={{ fontSize: '11px', color: '#777' }}>Non stop</div>
				</div>

				{/* Arrival time and destination city */}
				<div className="time-block">
					<h3>{flightData.at}</h3>
					<small>
						{toCityName ? `${toCityName} (${flightData.to})` : flightData.to}
					</small>
				</div>
			</div>

			{/* Right section: Price and booking action */}
			<div className="flight-right">
				{/* Display fare price formatted for Indian currency */}
				<div className="price">
					₹ {flight.farepr?.toLocaleString('en-IN') ?? flight.farepr}
				</div>
				{/* Booking action button */}
				<button type="button" className="select-btn">
					Book
				</button>
			</div>
		</div>
	)
}

// Export component for use in parent components
export default FlightCard
