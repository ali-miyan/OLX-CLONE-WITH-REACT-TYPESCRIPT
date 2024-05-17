import ReactDOM from "react-dom";
import App from "./App";
import FireBaseContext, { Context } from "./store/FirebaseContext";
import { Firebase } from "./firebase/config";

ReactDOM.render(
  <FireBaseContext.Provider value={Firebase}>
    <Context>
      <App />
    </Context>
  </FireBaseContext.Provider>,
  document.getElementById("root")
);
