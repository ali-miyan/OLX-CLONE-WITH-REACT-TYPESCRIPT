import React, { useContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firestore } from "../../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import FireBaseContext from "../../store/FirebaseContext";

export default function Signup() {
  const { firebase } = useContext(FireBaseContext);
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      await updateProfile(user, {
        displayName: name
      });

      await addDoc(collection(firestore, "users"), {
        name: name,
        email: email,
        phone: phone,
        uid: user.uid,
      });

      navigate('/login');

    } catch (err) {
      setError("This email is already in use.");
      console.error(err);
    }
  };

  // Function to validate email format
  const validateEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div>
      <div className="signupParentDiv w-32">
        <p className="text-red-600 text-center mt-3 mb-3">{error}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="border w-full p-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="border w-full p-2"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="border w-full p-2"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <button type="submit">Signup</button>
        </form>
        <Link className="pt-2" to={'/login'}>Login</Link>
      </div>
    </div>
  );
}
