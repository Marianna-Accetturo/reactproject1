import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import UnavailablePage from '../pages/UnavailablePage';
import Home from '../pages/HomePage';
import AreaPersonale from '../pages/AreaPersonale';
import Settings from '../pages/Settings';
import EventPage from '../pages/EventPage';
import Login from './pages/Login';
import Register from './pages/Register';
import "react-toastify/dist/ReactToastify.css";
import NewsPopUp from '../components/NewsPopUp';
import './App.css';
import { useCookies } from "react-cookie";
import { Routes, Route, BrowserRouter} from "react-router-dom";

const App = () => {
    const [view, setView] = useState(true);
    const [viewMode, setViewMode] = useState(true);
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser]=useState('');
    const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  
    const hideNews = () => {
        setView(true);
    };

    const showNews = () => {
        setView(false);
    };

    return (
        <BrowserRouter>
                <div id='app'>
                    <Sidebar showNews={showNews} isLogged={isLogged } />
                    <main id="main-content">
                        <Routes>
                            <Route path="/UnavailablePage" element={<UnavailablePage />} />
                            <Route path="/Home" element={<Home />} />
                            <Route path="/AreaPersonale" element= {<AreaPersonale user_id={user } />}/>
                            <Route path="/" element={<Login user={user } setUser={setUser} setIsLogged={setIsLogged}/>} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/Settings" element={<Settings setViewMode={setViewMode } viewMode={viewMode} setIsLogged={setIsLogged} isLogged={isLogged} removeCookie={removeCookie}/>} />
                            {["/EventPage"].map((path, index) => (
                                <Route path={path} element={<EventPage user_id={user}/>} key={index} />
                            ))}
                        </Routes>
                        
                        <NewsPopUp view={view} hideNews={hideNews} />
                    </main>
                </div>
        </BrowserRouter>
    );
}
export default App;