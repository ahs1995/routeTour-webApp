import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticate: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticate: true,
      };

    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticate: false,
      };

    default:
      throw new Error("Error in setting state data");
  }
}

const FAKE_USER = {
  name: "John",
  email: "john@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/150?u=19",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticate }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (FAKE_USER.email === email && FAKE_USER.password === password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticate, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
