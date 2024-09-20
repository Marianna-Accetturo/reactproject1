import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import Card from './card'

export default function Section({ filter, eventType, cardContent, personal, type }) {

    console.log(personal)

    return (
        <div>
            <h2>{eventType}</h2>
            <section className='album'> 
                {cardContent?.filter(f => (!filter && f) || (f.title.toUpperCase().includes(filter.toUpperCase().split(' ').join('')) || f.location.toUpperCase().includes(filter.toUpperCase().split(' ').join('')))).map((c, index) => <Link to="/EventPage" state={{ event: { type: eventType, artwork: c.artwork, title: c.title, info: c.info, location: c.location, date: c.date, eventId: c._id, personal: personal }}} key={index}> <Card artwork={c.artwork} title= {c.title} date={c.date} location={c.location}/> </Link>)}
            </section>
        </div>
    )
}

Section.propTypes = {
    eventType: PropTypes.string,
    filter: PropTypes.node,
    cardContent: PropTypes.array,
    personal: PropTypes.bool
}