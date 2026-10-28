import UserContext from "./userContext.js";
import React, { useState, useEffect } from "react";
import API from "../../Api.axios.js";

const Userstate = ({ children }) => {
  const [auth, setAuth] = useState(Boolean(localStorage.getItem("token")));
  const [loginMode, setLoginMode] = useState(false);
  const [img, setImg] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const GetUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const res = await API.get("user/getuser");
      if (res.status === 200 && res.data?.data) {
        setUser(res.data.data);
        if (res.data.data.image) {
          setImg(res.data.data.image);
        }
        return res.data;
      }
      return null;
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        setAuth(false);
        setUser(null);
        setImg(null);
      }
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
      GetUser();
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await API.post("user/login", { email, password });
      if (res.status === 200 && res.data?.data?.token) {
        localStorage.setItem("token", res.data.data.token);
        setAuth(true);
        setUser(res.data.data.user);
        if (res.data.data.user?.image) {
          setImg(res.data.data.user.image);
        }
        return { success: true, message: res.data.message || "Logged in successfully" };
      }
      return { success: false, message: "Invalid response from server" };
    } catch (error) {
      const message = error.response?.data?.message || "Invalid email or password";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, phone, name, username, password) => {
    setLoading(true);
    try {
      const res = await API.post("user/register", {
        email,
        phone,
        name,
        username,
        password,
      });

      if (res.status === 201 || res.status === 200) {
        return {
          success: true,
          message: res.data?.message || "Registration successful! Please log in.",
        };
      }
      return { success: false, message: "Unexpected response from server" };
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await API.post("user/logout");
    } catch (err) {
      console.warn("Logout request failed or timed out:", err.message);
    } finally {
      localStorage.removeItem("token");
      setAuth(false);
      setUser(null);
      setImg(null);
      setLoginMode(true);
    }
  };

  const Profilepic = async (formData) => {
    try {
      const res = await API.post("user/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200 && res.data?.data) {
        if (res.data.data.user) {
          setUser(res.data.data.user);
        }
        if (res.data.data.imageUrl) {
          setImg(res.data.data.imageUrl);
        }
        return { success: true, data: res.data.data, message: "Profile picture updated!" };
      }
      return { success: false, message: "Failed to upload image" };
    } catch (error) {
      const message = error.response?.data?.message || "Image upload failed";
      return { success: false, message };
    }
  };

  return (
    <UserContext.Provider
      value={{
        login,
        signup,
        auth,
        setAuth,
        loginMode,
        setLoginMode,
        logout,
        GetUser,
        Profilepic,
        img,
        setImg,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Userstate;
