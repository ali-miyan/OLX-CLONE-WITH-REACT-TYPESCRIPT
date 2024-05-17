import { useState } from 'react';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, firestore } from '../../firebase/config';
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any | string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth,email,password);

      console.log(result);
      
      navigate('/')


    } catch (err) {
      if (err) {
        setError("Invalid email or password");
        setTimeout(() => {
          setError('');
        }, 3000);
      }
      console.log(err);
    }
  };


  return (
    <div>
      <div className="loginParentDiv">
      <p className="text-red-600 text-center mt-3 mb-3">{error}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="border w-full p-2"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="border w-full p-2"
            type="password"
            id="lname"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link className='m-2' to={'/signup'}>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
