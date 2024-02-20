import './App.css'


// setting up the navigation bar
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Counter from './Counter';
import Landing from './Landing';
import Signup from './Signup';
import Login from './Login';
import Interface from './Interface';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/Counter' element={<Counter />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Interface' element={<Interface />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
