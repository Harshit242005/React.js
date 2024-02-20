import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div>
        <Link to="/Signup"><button>Signup</button></Link>
        <Link to="/Login"><button>Login</button></Link>
    </div>
  )
}

export default Landing