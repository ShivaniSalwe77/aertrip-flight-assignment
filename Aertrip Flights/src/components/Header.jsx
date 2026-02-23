import React from 'react'
import '../App.css'

const Header = ({ showRoute, searchParams, onBackToSearch }) => {
  const from = searchParams?.from || 'Mumbai'
  const to = searchParams?.to || 'Kolkata'

  return (
    <header className="header">
      <div className="header-content">
        <div className="brand">
          <img
            className="brand-logo"
            src="https://d2mccptxtk231d.cloudfront.net/v2_d_app/1048/dist/4392c80dcf7394e51ed0.svg"
            alt="Aertrip"
          />
        </div>

        <nav className="nav-links">
          <button type="button" className="nav-link active">
            Flight
          </button>
          <button type="button" className="nav-link">
            Hotel
          </button>
          <button type="button" className="nav-link">
            Visa
          </button>
          <button type="button" className="nav-link">
            AI Trip
          </button>
          <button type="button" className="nav-link">
            Forex
          </button>
          <button type="button" className="nav-link">
            Holidays
          </button>
        </nav>

        <div className="header-actions">
          {showRoute && (
            <button
              type="button"
              className="new-search-btn"
              onClick={onBackToSearch}
            >
              New search
            </button>
          )}
          <button type="button" className="support-pill">
            Support
          </button>
          <button type="button" className="login-btn">
            Login / Signup
          </button>
        </div>
      </div>

      {showRoute && (
        <div className="route-summary">
          <span className="route-main">
            {from} → {to}
          </span>
        </div>
      )}
    </header>
  )
}

export default Header