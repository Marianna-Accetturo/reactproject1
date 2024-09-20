import { useState } from 'react'
import PropTypes from 'prop-types'

export default function SearchButton({handleSearch }) {

    return (
        <div className="search">
            <form id="search-bar" onSubmit={handleSearch}>
                <input type="text" id="search-input" placeholder="Cerca i tuoi eventi" onChange={handleSearch} />
            </form>
        </div>
    )
}

SearchButton.propTypes = {
    handleSearch: PropTypes.func,
    searchDate: PropTypes.func
}