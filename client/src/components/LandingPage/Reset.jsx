import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth, sendPasswordResetEmail } from '../../authentication/firebase';

function Reset() {
  const [email, setEmail] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/dashboard');
  }, [user, loading]);
  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          type="button"
          className="reset__btn"
          onClick={() => sendPasswordResetEmail(email)}
        >
          Send password reset email
        </button>
        <div>
          Don't have an account?
          <button
            type="button"
            className="login__btn"
            onClick={() => alert('closes model')}
          >
            Register now
          </button>
        </div>
      </div>
    </div>
  );
}
export default Reset;
