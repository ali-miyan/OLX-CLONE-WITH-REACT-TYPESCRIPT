import { useContext } from "react";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { authContext } from "../../store/FirebaseContext";
import { auth } from "../../firebase/config";
import { Link, useNavigate } from "react-router-dom";
function Header() {
  const { user } = useContext(authContext);

  const navigate = useNavigate();
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>

        {user ? (
          <span
            className="bg-slate-600 text-white px-2 py-2 rounded-lg cursor-pointer hover:bg-slate-400 transition duration-300"
            onClick={async () => {
              await auth.signOut();
              navigate("/login");
            }}
          >
            "Logout"
          </span>
        ) : (
          <div className="loginPage bg-slate-600 text-white px-2 py-2 rounded-lg cursor-pointer hover:bg-slate-400 transition duration-300">
            <Link to={"/login"}>
              <span>{user ? user.displayName : "Login"}</span>
            </Link>
          </div>
        )}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <Link to={'/sell'}><span>SELL</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
