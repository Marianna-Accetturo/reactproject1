import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import NewsCard from './NewsCard'
export default function NewsPopUp({ view, hideNews }) {

    const [news, setNews] = useState([]);
    
    useEffect(() => {
        const eventSource = new EventSource("http://localhost:3000/");
        eventSource.onopen = () => { console.log("connessione aperta") }
        eventSource.onmessage = (e) => {
            const parsedData = JSON.parse(e.data)
            const dataArray = JSON.parse(parsedData.data)
           if (Array.isArray(dataArray)) {
                setNews(dataArray)
            } else {
                console.error("I dati sono nel formato sbagliato")
            }
        }

        eventSource.onerror = (e) => {
            console.error("Errore con EventSource:", e);
        };

        return () => { eventSource.close() }
    }, [])

    return (
        <footer className="footer" hidden={view }>
        <div id="news">
            <div id="newsHeader">
            <button onClick={hideNews }>X</button>
            <h2>News</h2>
            </div>
            <div id="newsContent">
            {news?.map((n, index) => <NewsCard key={index} title={n.title} location={n.location} date={n.date } artwork={n.artwork} />) }
            </div>
        </div>
       </footer>
    )
}

NewsPopUp.propTypes = {
    hideNews: PropTypes.func,
    view: PropTypes.bool
}