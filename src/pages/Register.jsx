import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/register");
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
        const response = await fetch("http://localhost:3000/register", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
    
        if (!response.ok) {
          // Handle the HTTP error
          const errorText = await response.text();
          console.error('HTTP Error:', response.status, errorText);
          generateError('Registration failed. Please try again.');
          return;
        }
    
        const data = await response.json();
    
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          if (password) generateError(password);
        } else {
          navigate("/");
        }
      } catch (ex) {
        console.error('Fetch Error:', ex);
        generateError('Failed to connect to the server. Please try again.');
      }
    };

  return (
    <div className="main-content">
       <div className="head">
       <h2>Sei nuovo in app? Registrati qui</h2>
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
        <button className="log-btn" type="submit">Registra</button>
        <span>
          Hai già un account? Effettua il <Link to="/">login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
