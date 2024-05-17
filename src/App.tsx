import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/Signup";
import Login from "./Components/Login/Login";
import { useEffect, useContext, EffectCallback } from "react";
import FireBaseContext, { authContext } from "./store/FirebaseContext";
import { auth } from "../src/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Create from "./Components/Create/Create";
import { Toast } from "./Pages/Toast";
import View from "./Components/View/View";
import { Details, ProductDetails } from "./store/ProductContext";

function App() {
  const { user, setUser } = useContext(authContext);
  const { firebase } = useContext(FireBaseContext);

  useEffect(() => {
    const isLogged = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

    console.log(user, isLogged);
  });
  return (
    <div>
    <Details>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sell" element={<Create />} />
            <Route path="/view" element={<View />} />
          </Routes>
          <Toast />
        </Router>
        </Details>
    </div>
  );
}

export default App;
