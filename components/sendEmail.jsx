import PropTypes from 'prop-types'

export default function SendEmail({ sendEmail }) {

    return (
        <button id="send-email" onClick={sendEmail}>Invia info evento via Email</button>
    )
}

SendEmail.propTypes = {
    sendEmail: PropTypes.func
}