// Login.js
import styles from './Styles/Login.module.css';
import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess, loginFailure } from './Action';
import { Link } from 'react-router-dom';
//import io from 'socket.io-client';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [navigate, setNavigate] = useState(false);

  //const socket = io('http://localhost:3000'); 
  
  
  const handleLogin = async () => {
    try {
      // Simulating an API call for login
      const response = await axios.post('http://localhost:3001/Login', {
        'username': username,
        'password': password
      });

      const userData = response.data;

      if (response.status == 200) {
        console.log(userData);
        console.log(userData.user);
        console.log(userData.user._id.toString());
        
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
    <div className={styles.body}>
        {navigate && <Link to="/Interface"><button
        className={styles.loginButton}
        >Interface</button></Link>}
      <input
      className={styles.inputBox}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Type username..."
      />
      <input
      className={styles.inputBox}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Type password"
      />
      <button className={styles.loginButton} onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
