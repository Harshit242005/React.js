// Login.js

import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess, loginFailure } from './Action';
import { Link } from 'react-router-dom';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [navigate, setNavigate] = useState(false);
  
  const handleLogin = async () => {
    try {
      // Simulating an API call for login
      const response = await axios.post('http://localhost:3000/Login', {
        'username': username,
        'password': password
      });

      const userData = response.data;

      if (response.status == 200) {
        dispatch(loginSuccess(userData));
        // navigate to the Interface
        setNavigate(true);
        
      } else {
        dispatch(loginFailure());
      }
    } catch (error) {
      console.error('Login error:', error);
      dispatch(loginFailure());
    }
  };

  return (
    <div>
        {navigate && <Link to="/Interface"><button>Interface</button></Link>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Type username..."
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Type password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
