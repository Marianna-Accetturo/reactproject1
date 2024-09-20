import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SendEmail from '../components/sendEmail';
import Prenotations from '../components/prenotations';

export default function EventPage({ user_id }) {
    const location = useLocation();
    const navigate = useNavigate(); 
    
    const [comments, setComments] = useState();
    
    const { event } = location.state;

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:3000/api/Eventi/getComments?eventId=${event.eventId}`);
        eventSource.onopen = () => { console.log("comment section open") }
        eventSource.onmessage = (e) => {
            const parsedData = JSON.parse(e.data)
            const dataArray = JSON.parse(parsedData.data)
           if (Array.isArray(dataArray)) {
                setComments(dataArray)
            } else {
                console.error("I dati sono nel formato sbagliato")
            }
        }

        eventSource.onerror = (e) => {
            console.error("Errore con EventSource:", e);
        };

        return () => { eventSource.close() }
    }, [])

    const addPrenotation = async () => {

      const tickets = document.getElementById("add-btn").value;
      if(tickets && tickets>0) {
      try {
        const response = await fetch(`http://localhost:3000/api/Eventi/book`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({user_id: user_id, eventId: event.eventId, tickets})
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert('Prenotazione effettuata!')
        } else {
          alert(`Errore: ${data.msg}`)
        }
      } catch (error) {
        alert(`Errore: ${error}`)
      }
    }
    else {alert('Selezionare un numero valido di biglietti')}
    document.getElementById('add-btn').value = "";
    }

    const deletePrenotation = async () => {

      const tickets = document.getElementById("delete-btn").value;

      if(tickets && tickets>0) {
      try {
        const response = await fetch(`http://localhost:3000/api/AreaPersonale/cancel`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({user_id: user_id, eventId: event.eventId, tickets})
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert('Prenotazione cancellata!')
        } else {
          alert(`Errore: ${data.msg}`)
        }
      } catch (error) {
        alert(`Errore: ${error}`)
      }
    }else {alert('Selezionare un numero valido di biglietti')}
    document.getElementById('delete-btn').value = "";
    }

    const handleComments = async () => {
      const text = document.getElementById("commentInput").value

      if(text === "") return;
        else 
      try {
      const response = await fetch(`http://localhost:3000/api/Eventi/addComment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({eventId: event.eventId, user_id: user_id, text: text})
          });
          const data = await response.json();
    
          if (response.ok) {
            console.log('Commento inviato!')
          } else {
            console.log(`Errore 1: ${data.msg}`)
          }
        } catch (error) {
          console.log(`Errore 2: ${error}`)
        };
        document.getElementById("commentInput").value= "";
      }

      const sendEmail = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/Eventi/sendemail`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id: user_id, eventId: event.eventId})
          });
    
          const data = await response.json();
    
          if (response.ok) {
            alert('Email inviata!')
          } else {
            alert(`Errore: ${data.msg}`)
          }
        } catch (error) {
          alert(`Errore: ${error}`)
        }
      };


    let title= event.type.toUpperCase();

    return (
        <div id="eventPage" className="main-content">
          <div className="head">
            <h1>I TUOI {title}</h1>
          </div>
          <div id="eventContainer">
            <h1>{event.title }</h1>
            <img src={event.artwork } />
            <p>{event.info}</p>
            <p>{event.date}</p>
            <p>{event.location}</p>

            <SendEmail sendEmail={sendEmail}/>

            <Prenotations addPrenotation={addPrenotation} deletePrenotation={deletePrenotation} personal={event.personal}/>

            </div>
            <h2 id="commentsTitle" >COMMENTI</h2>
            <div id="commentSection">
            <div id="commentList">
               {comments && comments.length > 0 ? (
                    comments.map((c, index) => (
                    <div id="comment" key={index}>
                        <h4 id="user">{c.username}</h4>
                        <p id="text">{c.text}</p>
                    </div>
                    ))
                ) : (
                    <h2 id="emptyComment">Sii tu il primo a commentare</h2>
                    )
                }
                </div>
                <div id="commentForm">
                    <input id="commentInput" type="text" placeholder='Scrivi cosa ne pensi...'/>
                    <button id="comment-btn" onClick={handleComments }>INVIA</button>
                </div>
                
            </div>
            
        </div>
    );
}

EventPage.propTypes = {
    user_id: PropTypes.string
};