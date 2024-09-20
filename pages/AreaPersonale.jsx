import React, { useState, useEffect } from 'react'
import Filters from '../components/Filters'
import SearchBar from "../components/SearchBar"
import ContentPage from '../components/contentPage'
import PropTypes from 'prop-types'

export default function AreaPersonale(user_id) {
    const [content, setContent] = useState([]);
    const [typeFilter, setTypeFilter] = useState();
    const [searchFilter, setSearchFilter] = useState();
    const [dateFilter, setDateFilter] = useState();
    const personal = true;

    useEffect(() => {
        fetch(`http://localhost:3000/api/AreaPersonale/booked_events?user_id=${user_id.user_id}`)
        .then(res => {
                if (!res.ok) {throw new Error(`HTTP error! status: ${res.status}`) }
                return res.json();
             })
        .then(data => {
                if (data && Array.isArray(data.eventi)) {
                    setContent(data.eventi)
                } else {
                    console.error(`Data format is incorrect: ${ data }`)
                }
             })
            .catch(error => {
                console.error(`Error fetching data: ${error}`)
            })
    }, [])
    const handleSearch = (e) => {
        e.preventDefault()
        setSearchFilter(e.target.value)
    }

    const searchDate = (e) => {
        e.preventDefault()
        setDateFilter(e.target.value)
        console.log(dateFilter)
    }

    const handleFilters = (eventType) => {
        setTypeFilter(eventType);
    }

    return (
        <div id="area-personale" className="main-content">
            <div className="head">
                <h1>LE TUE PRENOTAZIONI</h1>
                <SearchBar handleSearch={handleSearch} searchDate={searchDate} />
                <Filters handleFilters={handleFilters} />
            </div>
            <ContentPage searchFilter={searchFilter} typeFilter={typeFilter} dateFilter={dateFilter} content={content} personal={personal } />
        </div>
    )
}

AreaPersonale.propTypes = {
    user_id: PropTypes.string,
};