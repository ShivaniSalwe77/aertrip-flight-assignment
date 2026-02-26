// Import React hooks for component state management and optimization
import React, { useMemo, useState } from 'react'
// Import flight data from JSON file
import data from './data.json'
// Import UI components
import Header from './components/Header'
import Filters from './components/Filters'
import PriceSlider from './components/PriceSlider'
import FlightCard from './components/FlightCard'
import SearchHero from './components/SearchHero'
// Import component styling
import './App.css'

function App() {
	// Extract flight data from imported JSON
	const flightResults = data?.data?.flights?.[0]?.results
	const allFlights = flightResults?.j || []
	console.log('Loaded flight results:', allFlights)
	const filtersMeta = flightResults?.f?.[0]
	console.log('Loaded filters metadata:', filtersMeta)

	// Extract price range metadata for price slider
	const minPrice = filtersMeta?.pr?.minPrice ?? 0
	const maxPrice = filtersMeta?.pr?.maxPrice ?? 0

	// Track selected price range for filtering
	const [priceRange, setPriceRange] = useState([minPrice, maxPrice])
	// Track sorting preference (field and direction)
	const [sort, setSort] = useState({ field: 'price', direction: 'asc' })
	// Track if search has been performed
	const [hasSearched, setHasSearched] = useState(false)
	// Store search parameters (origin, destination, dates, etc.)
	const [searchParams, setSearchParams] = useState(null)

	// Memoized mapping of airport codes to city names for efficient lookups
	// This prevents unnecessary recalculation of the mapping
	const cityNamesByCode = useMemo(() => {
		const map = {}
		const fromCities = filtersMeta?.cityap_n?.fr || {}
		const toCities = filtersMeta?.cityap_n?.to || {}

		// Map origin city codes
		Object.entries(fromCities).forEach(([city, codes]) => {
			codes.forEach((code) => {
				map[code] = city
			})
		})

		// Map destination city codes
		Object.entries(toCities).forEach(([city, codes]) => {
			codes.forEach((code) => {
				map[code] = city
			})
		})

		return map
	}, [filtersMeta])

	// Handle sorting changes - toggles direction for price sort, resets for other fields
	const handleSortChange = (field) => {
		if (field === 'price') {
			// Toggle price sort direction between ascending and descending
			setSort((prev) => {
				if (prev.field === 'price' && prev.direction === 'asc') {
					return { field: 'price', direction: 'desc' }
				}
				return { field: 'price', direction: 'asc' }
			})
		} else {
			// For other fields, apply ascending sort
			setSort({ field, direction: 'asc' })
		}
	}

	// Reset all filters to their default values
	const clearFilters = () => {
		setPriceRange([minPrice, maxPrice])
		setSort({ field: 'price', direction: 'asc' })
	}

	// Return to search view, clearing current search and filters
	const goBackToSearch = () => {
		setHasSearched(false)
		clearFilters()
	}

	// Handle new search submission - stores params and scrolls to results
	const handleSearch = (params) => {
		setSearchParams(params)
		setHasSearched(true)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	// Memoized computation of filtered and sorted flights
	// Runs only when dependencies (allFlights, priceRange, sort) change
	const filteredAndSortedFlights = useMemo(() => {
		const [min, max] = priceRange

		// Step 1: Filter flights by selected price range
		const withinRange = allFlights.filter(
			(item) => item.farepr >= min && item.farepr <= max,
		)

		// Step 2: Apply sorting logic based on selected field and direction
		const { field, direction } = sort
		const multiplier = direction === 'asc' ? 1 : -1

		const sorted = [...withinRange]

		// Sort by price (fare price)
		if (field === 'price') {
			sorted.sort((a, b) => (a.farepr - b.farepr) * multiplier)
		}
		// Sort by flight duration
		else if (field === 'duration') {
			sorted.sort((a, b) => {
				const aFt = a.leg?.[0]?.flights?.[0]?.ft ?? 0
				const bFt = b.leg?.[0]?.flights?.[0]?.ft ?? 0
				return (aFt - bFt) * multiplier
			})
		}
		// Sort by departure time
		else if (field === 'departure') {
			sorted.sort((a, b) => {
				const aDt = a.leg?.[0]?.flights?.[0]?.dt ?? ''
				const bDt = b.leg?.[0]?.flights?.[0]?.dt ?? ''
				return aDt.localeCompare(bDt) * multiplier
			})
		}
		// Sort by arrival time
		else if (field === 'arrival') {
			sorted.sort((a, b) => {
				const aAt = a.leg?.[0]?.flights?.[0]?.at ?? ''
				const bAt = b.leg?.[0]?.flights?.[0]?.at ?? ''
				return aAt.localeCompare(bAt) * multiplier
			})
		}

		return sorted
	}, [allFlights, priceRange, sort])

	// Error handling: display message if flight data fails to load
	if (!flightResults) {
		return (
			<div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif' }}>
				<p>Unable to load flights data.</p>
			</div>
		)
	}

	// Total count of available flights before filtering
	const totalFlights = allFlights.length

	// Render the main app interface
	return (
		<>
			{/* Header component - shows route info if search was performed */}
			<Header
				showRoute={hasSearched}
				searchParams={searchParams}
				onBackToSearch={goBackToSearch}
			/>

			{/* Show search hero only before search is performed */}
			{!hasSearched && <SearchHero onSearch={handleSearch} />}

			{/* Show results container only after search is performed */}
			{hasSearched && (
				<div className="container">
					{/* Left sidebar with filtering options */}
					<aside className="sidebar">
						{/* Price range filter slider */}
						<PriceSlider
							min={minPrice}
							max={maxPrice}
							valueMin={priceRange[0]}
							valueMax={priceRange[1]}
							onChange={setPriceRange}
						/>
						{/* Display count of visible flights vs total */}
						<p style={{ fontSize: '14px', marginTop: '10px' }}>
							Showing {filteredAndSortedFlights.length} of {totalFlights}{' '}
							flights
						</p>
					</aside>

					{/* Main results area */}
					<main className="main">
						{/* Sorting and filter controls */}
						<Filters
							sort={sort}
							onChangeSort={handleSortChange}
							clearFilters={clearFilters}
						/>

						{/* Display number of search results */}
						<p style={{ marginBottom: '10px', fontWeight: 500 }}>
							{filteredAndSortedFlights.length} flights found
						</p>

						{/* Render list of flight cards */}
						{filteredAndSortedFlights.map((flight) => (
							<FlightCard
								key={flight.fk ?? flight.id}
								flight={flight}
								cityNamesByCode={cityNamesByCode}
							/>
						))}
					</main>
				</div>
			)}
		</>
	)
}

export default App


// JSON response to display data

// 1.	Keys for Results Screen:

// Use the “j” array from below response to display data on the results screen. 
// Below are the keys used to display the data on the results screen:

// ●	“fr” - departure city name
// ●	“dt” -  departure time 
// ●	“to” - arrival city name
// ●	“at” - Arrival time
// ●	“al” - airline of that flight,
// ●	“ft” - total time of the flight
// ●	“farepr” - amount


// 2.	Keys for Filters:

// Use the “f” array from below response to display data on the filter screen. Below are the keys used to display the data.
// ●	“pr” -  Price(min/Max).
// ●	"dt" -  Departure time (min: earliest/Max: latest)
// ●	"at" -  arrival time (min: earliest/Max: latest)
// ●	"tt"  -   total duration (min: minTime/ max: maxTime)
