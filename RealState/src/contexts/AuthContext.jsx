import { createContext, useContext, useState } from "react";

const AuthContext=createContext();

export const AuthProvider=({children})=>{

    const [user, setUser]= useState(null);
    const [token, setToken]= useState(null);
    const [role, setRole]=useState(null);

    const login=(userData)=>{
        setUser(userData)
        setRole(userData.role)
    }
    const logout=()=>{
        setUser(null);
        setRole(null)
        console.log("user outing");
    }
    console.log("roleeerr", role);
    const Token=(userToken)=>{
        setToken(userToken)
    }
    console.log("user for global is", user);

    const value={
        user, login ,Token ,token, role, logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export const useAuth=()=>{
    const context=useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
      }
      return context;
}