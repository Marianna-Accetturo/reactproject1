import PropTypes from 'prop-types'

export default function NewsCard({ title, location, artwork, date }) {

    return (
        <div id="newsCard">
            <img src={artwork}/>
            <div id="newsDes">
            <h4>{title}</h4>
            <p> {date }</p>
            <p>{location}</p>
            </div>

        </div>
    )

}

NewsCard.propTypes = {
    title: PropTypes.string,
    location: PropTypes.string,
    date: PropTypes.string,
    artwork: PropTypes.string
};