import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../../authentication/firebase';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  // const history = useHistory();
  const register = () => {
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password, displayName, photoURL);
    //
    navigate('/UserMain');
  };

  // const putUserindb = () => {
  //   axios.post('/users', {
  //     name, email, password,
  //   })
  //     .then(() => console.log('registered successfully'))
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   if (loading) return;
  //   if (user) history.replace('/');
  // }, [user, loading]);

  return (
    <div className="register">
      <nav className="nav-bar">
        <h3>Games Collection</h3>
        <br />
        <Link className="link" to="/">Home</Link>
      </nav>
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
        />
        <input
          type="text"
          className="register__textBox"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="DisplayName"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="text"
          className="register__textBox"
          value={photoURL || ''}
          onChange={(e) => setPhotoURL(e.target.value)}
          placeholder="Profile Pic URL"
        />
        <button type="button" className="register__btn" onClick={register}>
          Register
        </button>
        <button
          type="button"
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account?
          <Link className="link" to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}
export default Register;
