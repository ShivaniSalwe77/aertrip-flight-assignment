// Import React for component creation
import React from 'react'
// Import app styles
import '../App.css'

// Header component - displays navigation and route information
// Props:
//   - showRoute: boolean to show/hide route summary section
//   - searchParams: object containing search origin and destination
//   - onBackToSearch: callback to handle new search button click
const Header = ({ showRoute, searchParams, onBackToSearch }) => {
	// Extract origin and destination cities from search params with default fallbacks
	const from = searchParams?.from || 'Mumbai'
	const to = searchParams?.to || 'Kolkata'

	return (
		<header className="header">
			{/* Main header content container */}
			<div className="header-content">
				{/* Brand/logo section */}
				<div className="brand">
					<img
						className="brand-logo"
						src="https://d2mccptxtk231d.cloudfront.net/v2_d_app/1048/dist/4392c80dcf7394e51ed0.svg"
						alt="Aertrip"
					/>
				</div>

				{/* Primary navigation menu */}
				<nav className="nav-links">
					{/* Flight navigation option - marked as active */}
					<button type="button" className="nav-link active">
						Flight
					</button>
					{/* Other travel service navigation options */}
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

				{/* Right side header actions */}
				<div className="header-actions">
					{/* New search button - only shown when viewing search results */}
					{showRoute && (
						<button
							type="button"
							className="new-search-btn"
							onClick={onBackToSearch}
						>
							New search
						</button>
					)}
					{/* Support button - always visible */}
					<button type="button" className="support-pill">
						Support
					</button>
					{/* Authentication button - always visible */}
					<button type="button" className="login-btn">
						Login / Signup
					</button>
				</div>
			</div>

			{/* Route summary section - displays selected origin and destination */}
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

// Export component for use in parent components
export default Header
