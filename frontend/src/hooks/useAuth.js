import { useContext } from "react";
import AuthContext from "../context/AuthContext";

/**
 * useAuth hook allows any component to access authentication state and methods
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
