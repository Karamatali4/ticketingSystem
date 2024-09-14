import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import CryptoJS from "crypto-js";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    let mySec =
      Cookie.get("authTicket") || sessionStorage.getItem("authTicket");
   // console.log(mySec, "fromcontext auth");
    // console.log(Cookie.get("authTicket"), "from cookie");
    if (mySec) {
      const decSec = CryptoJS.AES.decrypt(mySec, import.meta.env.VITE_KEY);

      setAuth(JSON.parse(decSec.toString(CryptoJS.enc.Utf8)));
    }
  }, []);

  // axios.defaults.baseURL = 'http://localhost:8000'
  axios.defaults.headers.common["Cookies"] = auth?.token;

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
