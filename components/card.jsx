import PropTypes from 'prop-types'

export default function Card({ artwork, title, date, location}) {
    return (
        <div className="card">
            <img src={artwork}/>
            <h2>{title}</h2>
            <p>{date}  {location}</p>
            
        </div>
    )
}

Card.propTypes = {
    artwork: PropTypes.string,
    info : PropTypes.string
}