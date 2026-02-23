import React, { useMemo, useState } from 'react'
import data from './data.json'
import Header from './components/Header'
import Filters from './components/Filters'
import PriceSlider from './components/PriceSlider'
import FlightCard from './components/FlightCard'
import SearchHero from './components/SearchHero'
import './App.css'

function App() {
  const flightResults = data?.data?.flights?.[0]?.results
  const allFlights = flightResults?.j || []
  const filtersMeta = flightResults?.f?.[0]

  const minPrice = filtersMeta?.pr?.minPrice ?? 0
  const maxPrice = filtersMeta?.pr?.maxPrice ?? 0

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice])
  const [sort, setSort] = useState({ field: 'price', direction: 'asc' })
  const [hasSearched, setHasSearched] = useState(false)
  const [searchParams, setSearchParams] = useState(null)

  const cityNamesByCode = useMemo(() => {
    const map = {}
    const fromCities = filtersMeta?.cityap_n?.fr || {}
    const toCities = filtersMeta?.cityap_n?.to || {}

    Object.entries(fromCities).forEach(([city, codes]) => {
      codes.forEach((code) => {
        map[code] = city
      })
    })

    Object.entries(toCities).forEach(([city, codes]) => {
      codes.forEach((code) => {
        map[code] = city
      })
    })

    return map
  }, [filtersMeta])

  const handleSortChange = (field) => {
    if (field === 'price') {
      setSort((prev) => {
        if (prev.field === 'price' && prev.direction === 'asc') {
          return { field: 'price', direction: 'desc' }
        }
        return { field: 'price', direction: 'asc' }
      })
    } else {
      setSort({ field, direction: 'asc' })
    }
  }

  const clearFilters = () => {
    setPriceRange([minPrice, maxPrice])
    setSort({ field: 'price', direction: 'asc' })
  }

  const goBackToSearch = () => {
    setHasSearched(false)
    clearFilters()
  }

  const handleSearch = (params) => {
    setSearchParams(params)
    setHasSearched(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filteredAndSortedFlights = useMemo(() => {
    const [min, max] = priceRange

    const withinRange = allFlights.filter(
      (item) => item.farepr >= min && item.farepr <= max,
    )

    const { field, direction } = sort
    const multiplier = direction === 'asc' ? 1 : -1

    const sorted = [...withinRange]

    if (field === 'price') {
      sorted.sort((a, b) => (a.farepr - b.farepr) * multiplier)
    } else if (field === 'duration') {
      sorted.sort((a, b) => {
        const aFt = a.leg?.[0]?.flights?.[0]?.ft ?? 0
        const bFt = b.leg?.[0]?.flights?.[0]?.ft ?? 0
        return (aFt - bFt) * multiplier
      })
    } else if (field === 'departure') {
      sorted.sort((a, b) => {
        const aDt = a.leg?.[0]?.flights?.[0]?.dt ?? ''
        const bDt = b.leg?.[0]?.flights?.[0]?.dt ?? ''
        return aDt.localeCompare(bDt) * multiplier
      })
    } else if (field === 'arrival') {
      sorted.sort((a, b) => {
        const aAt = a.leg?.[0]?.flights?.[0]?.at ?? ''
        const bAt = b.leg?.[0]?.flights?.[0]?.at ?? ''
        return aAt.localeCompare(bAt) * multiplier
      })
    }

    return sorted
  }, [allFlights, priceRange, sort])

  if (!flightResults) {
    return (
      <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif' }}>
        <p>Unable to load flights data.</p>
      </div>
    )
  }

  const totalFlights = allFlights.length

  return (
    <>
      <Header
        showRoute={hasSearched}
        searchParams={searchParams}
        onBackToSearch={goBackToSearch}
      />

      {!hasSearched && <SearchHero onSearch={handleSearch} />}

      {hasSearched && (
        <div className="container">
          <aside className="sidebar">
            <PriceSlider
              min={minPrice}
              max={maxPrice}
              valueMin={priceRange[0]}
              valueMax={priceRange[1]}
              onChange={setPriceRange}
            />
            <p style={{ fontSize: '14px', marginTop: '10px' }}>
              Showing {filteredAndSortedFlights.length} of {totalFlights} flights
            </p>
          </aside>

          <main className="main">
            <Filters
              sort={sort}
              onChangeSort={handleSortChange}
              clearFilters={clearFilters}
            />

            <p style={{ marginBottom: '10px', fontWeight: 500 }}>
              {filteredAndSortedFlights.length} flights found
            </p>

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
