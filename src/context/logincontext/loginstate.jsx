import LoginContex from "./CreateLoginContex";
import { React, useState, useEffect } from "react";

const LoginState = (props) => {
  const [loginstate, setLoginState] = useState("false");
  const storedState = localStorage.getItem("loginstate");
  let initialState;

  try {
    initialState = storedState ? JSON.parse(storedState) : null;
  } catch (error) {
    console.error("Error parsing stored state:", error);
    initialState = null;
  }

  // Use state to manage the state value

  // Update local storage when state changes
  useEffect(() => {
    localStorage.setItem("loginState", JSON.stringify(loginstate));
  }, [loginstate]);

  return (
    <LoginContex.Provider value={{ loginstate, setLoginState }}>
      {props.children}
    </LoginContex.Provider>
  );
};

export default LoginState;
