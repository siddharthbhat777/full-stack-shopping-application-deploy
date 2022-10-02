import React, { useRef, useState } from 'react';
import './register.css';
import shoppingImg from '../../Images/shopping-image.jpg';
import logo from '../../Images/shopify-logo.png';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const navigate = useNavigate();

  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      try {
        await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
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
          title: 'Signed up successfully'
        })
      } catch (error) {
        const swalWithBootstrapButtons = Swal.mixin({
          buttonsStyling: true
        })
        swalWithBootstrapButtons.fire(
          'Sign up failed',
          'Unknown error occured',
          'error'
        )
      }
    }
  };

  const goToLogin = () => {
    navigate('/');
  };

  return (
    <div className="register">
      <div className="shoppingImage"><img src={shoppingImg} height="500px" width="500px" alt="#" /></div>
      <div className="registerWrapper">
        <motion.div className="registerLeft" initial={{ x: -200 }} animate={{ x: 0 }} transition={{ type: "spring", duration: 0.7 }}>
          <span className="registerDesc noselect">
            Shop freely with . . .
          </span>
          <motion.h3 className="registerLogo noselect" initial={{ scale: 0 }} transition={{ delay: 0.2, type: "spring" }} animate={{ scale: 1 }}>Shopify</motion.h3>
        </motion.div>
        <div className="registerRight">
        <h1 className="registerText noselect">Register</h1>
          <motion.form className="registerBox" onSubmit={handleClick} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 1 }} exit={{ scale: 0 }}>
            <img src={logo} height="300px" width="300px" style={{ marginLeft: "auto", marginRight: "auto", marginTop: "-100px" }} alt="" className="noselect" />
            <input
              placeholder="Email"
              type="email"
              required
              ref={email}
              onChange={(event) => {
                setRegisterEmail(event.target.value)
              }}
              className="registerInput1 noselect"
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              ref={password}
              onChange={(event) => {
                setRegisterPassword(event.target.value)
              }}
              className="registerInput2 noselect"
              autoComplete="on"
            />
            <input
              placeholder="Confirm Password"
              required
              ref={passwordAgain}
              className="registerInput2 noselect"
              type="password"
            />
            <button className="registerButton noselect" type="submit">
              Sign Up
            </button>
            <button className="registerLoginButton noselect" onClick={goToLogin} >
              Log into Account
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  )
};

export default Register;