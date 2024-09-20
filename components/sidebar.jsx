import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NewsButton from './newsButton';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Sidebar({ showNews, isLogged }) {

    const logCheck = () => { if (!isLogged) location.href = "/UnavailablePage" }
    const [imgContainer, setImgContainer] = useState([]);
    const [count, setCount] = useState(1);
    const next = ">";
    const prev = "<";
    let lenght;

    const goPrev = () => {
        (count > 0) ?
        setCount(lenght-1) : setCount(count-1) 
        console.log(count)
    }

    const goNext = () => {
        (count < length-1) ?
        setCount(0) : setCount(count+1)
        console.log(count)
    }

    return (
        <aside id="side-menu">
            <h1>Poli Ticket</h1>
            <ul>
                <li onClick={logCheck } ><Link to="/Home">Home</Link></li>
                <li onClick={logCheck } ><Link to="/AreaPersonale">Area Personale</Link></li>
                <li><Link to="/Settings">Impostazioni</Link></li>
                <li><NewsButton showNews={showNews} /></li>
            </ul>
        </aside>
    );
}

Sidebar.propTypes = {
    showNews: PropTypes.func,
    isLogged: PropTypes.bool
};
