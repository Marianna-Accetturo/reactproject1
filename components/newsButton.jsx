import PropTypes from 'prop-types'
export default function NewsButton({ showNews }) {

    return (
        <button id="news-btn" onClick={() => showNews() }>News</button>
    )
}

NewsButton.propTypes = {
    showNews: PropTypes.func
}