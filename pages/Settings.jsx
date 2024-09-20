import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import React, { useEffect} from 'react'


export default function Settings({setViewMode, viewMode, isLogged, setIsLogged, removeCookie}) {
    const navigate = useNavigate();

    const logOut = () => {
        console.log(typeof removeCookie);
        if (isLogged) {
            removeCookie("jwt", { path: "/" }); 
            setIsLogged(false);
            console.log(isLogged);
            navigate("/");
        } else location.href = "/UnavailablePage";
    };

    useEffect(() => {},[])

    const handleViewMode = (e) => {
        setViewMode(!viewMode)
        console.log(viewMode)
        e.target.checked ?
            document.querySelector('body').setAttribute('viewMode', 'dark'): document.querySelector('body').setAttribute('viewMode', 'light')
    }

    return (
        <div id="settings" className="main-content">
            <div className="head">
                <h1>Settings</h1>
            </div>
            <div id="viewModeSwitch" className="body">
                 <span className="option" >Light Mode</span>
                 <label className="switch">
                    <input type="checkbox" onChange={handleViewMode} checked={!viewMode} />
                 <span className="slider round"></span>
                 </label>
                 <span className="option" >Dark Mode</span>
            </div>
            
          <button id="logout-btn" onClick={logOut}>Log Out</button>
        </div>
    )
}

Settings.propTypes = {
    setViewMode: PropTypes.func,
    viewMode: PropTypes.any,
    isLogged: PropTypes.bool,
    setIsLogged: PropTypes.func,
    removeCookie: PropTypes.func
};