import { useReducer, useEffect } from "react";
import AuthContext from "./AuthContext";
import { AuthReducer, initialState } from "./AuthReducer";
import { getCurrentUser } from "../../services/authService";

function AuthProvider({ children }) {

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // load user on refresh
  useEffect(() => {
    const loadUser = async () => {

      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        dispatch({ type: "LOGOUT" });
        return;
      }

      try {

        const data = await getCurrentUser(token);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: data.user,
            token
          }
        });

      } catch {

        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });

      }

    };

    loadUser();

  }, []);

  // login action
  const login = (user, token, rememberUser = true) => {

    if (rememberUser) {
      localStorage.setItem("token", token);
      sessionStorage.removeItem("token");
    } else {
      sessionStorage.setItem("token", token);
      localStorage.removeItem("token");
    }

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: { user, token }
    });

  };

  // logout action
const logout = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  localStorage.removeItem("rememberedEmail");

  dispatch({ type: "LOGOUT" });
};

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}

export default AuthProvider;