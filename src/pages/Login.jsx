import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function Login({user, setUser, setIsLogged }) {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.errors) {
        const { email, password } = data.errors;
        if (email) generateError(email);
        if (password) generateError(password);
      } else {
        setUser(data.user);
        setIsLogged(true);
        navigate("/Home");
      }
    } catch (ex) {
      console.log(ex);
      generateError("Si è verificato un errore. Per favore riprova.");
    }
  };

  return (
    <div className="main-content">
       <div className="head">
       <h2>Entra in app e scopri le novità</h2>
            </div>
      <form className="log-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button className="log-btn" type="submit">Accedi</button>
        <span>
          Non hai un account? Registrati<Link to="/register"> qui</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;