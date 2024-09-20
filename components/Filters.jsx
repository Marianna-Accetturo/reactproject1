import PropTypes from 'prop-types'
export default function Filters({ handleFilters }) {
    return (
        <div id="filters">
            <button id="allFilter" onClick={() => handleFilters()}>All</button>
            <button id="filmFilter" onClick={() => handleFilters('Film')}>Film</button>
            <button id="concertFilter" onClick={() => handleFilters('Concerti')}>Concerti</button>
        </div>
    )
}

Filters.propTypes = {
    handleFilters: PropTypes.func
}