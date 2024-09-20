import PropTypes from 'prop-types'

export default function Prenotations({addPrenotation, deletePrenotation, personal}){

    return (
        <div id={personal ? "prenotationsPersonal" : "prenotationsGeneral" }>
            <div id="addP" className="pHandler">
                <button className="book-btn" onClick={addPrenotation}>Aggiungi Prenotazione!</button>
                <input type="number" id="add-btn" className="ticketInput"/>
            </div>
            {personal && <div id="deleteP" className="pHandler">
                    <button className="booh-btn" onClick={deletePrenotation}>Cancella Prenotazione!</button>
                    <input type="number" id="delete-btn" className="ticketInput"/>
                </div>
            }
        </div>
    )

}

Prenotations.propTypes = {
    addPrenotation: PropTypes.func,
    deletePrenotation: PropTypes.func,
    personal: PropTypes.bool
};