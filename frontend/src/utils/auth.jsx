import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user", {
          withCredentials: true,
        });
        console.log("User authenticated:", response.data); // Debugging log
        setIsAuthenticated(true);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("User not authenticated, redirecting to login"); // Debugging log
          setIsAuthenticated(false);
          navigate("/");
        } else {
          console.error("Error checking authentication:", error); // Debugging log
        }
      }
    };
    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
};

export default Auth;
