import PropTypes from 'prop-types'
import Section from './section'

export default function contentPage({ typeFilter, searchFilter, content, personal }) {

    console.log(personal)

    return (
            <div className="content-page">
            {content?.filter(f => (!typeFilter && f) || (f.eventType === typeFilter)).map((s, index) => <Section key={index} filter={searchFilter} eventType={s.eventType} cardContent={s.cardContent} personal={personal } /> )}
            </div>
    )
}

contentPage.propTypes = {
    typeFilter: PropTypes.node,
    searchFilter: PropTypes.node,
    content: PropTypes.array,
    personal: PropTypes.bool
}