import React, { useState } from 'react';
import './login.css';
import shoppingImg from '../../Images/shopping-image.jpg'
import logo from '../../Images/shopify-logo.png';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate('/');
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
    } catch (error) {
      const swalWithBootstrapButtons = Swal.mixin({
        buttonsStyling: true
      })
      swalWithBootstrapButtons.fire(
        'Login Failed',
        '404: User does not exist',
        'error'
      )
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login">
      <div className="shoppingImage"><img src={shoppingImg} height="500px" width="500px" alt="#" /></div>
      <div className="loginWrapper">
        <motion.div className="loginLeft" initial={{ x: -200 }} animate={{ x: 0 }} transition={{ type: "spring", duration: 0.7 }}>
          <span className="loginDesc noselect">
            Shop freely with . . .
          </span>
          <motion.h3 className="loginLogo noselect" initial={{ scale: 0 }} transition={{ delay: 0.2, type: "spring" }} animate={{ scale: 1 }}>Shopify</motion.h3>
        </motion.div>
        <div className="loginRight">
            <h1 className="loginText noselect">Login</h1>
          <motion.form className="loginBox" onSubmit={handleLoginClick} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 1 }} exit={{ scale: 0 }}>
            <img src={logo} height="300px" width="300px" style={{ marginLeft: "auto", marginRight: "auto", marginTop: "-100px" }} alt="" className="noselect" />
            <input
              placeholder="Email"
              type="email"
              required
              onChange={(event) => {
                setLoginEmail(event.target.value)
              }}
              className="loginInput1 noselect"
            />
            <input
              placeholder="Password"
              type="password"
              required
              onChange={(event) => {
                setLoginPassword(event.target.value)
              }}
              minLength="6"
              className="loginInput2 noselect"
              autoComplete="on"
            />
            <button className="loginButton noselect" id="loginButtonId" type="submit">
              Log In
            </button>
            <button className="loginRegisterButton noselect" onClick={goToRegister} >
              Create a New Account
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  )
};

export default Login;