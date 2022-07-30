import React, { createContext, useState } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [token,setToken] = useState("");
  const [assured,setAssured] = useState(false);
  const [author, setAuthor] = useState("");
  const [id1, setId] = useState("");
  const [avatar,setAvatar] = useState("")
  const [emailOne, setEmailOne] = useState("");
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        assured,
        setAssured,
        id1,
        setId,
        author,
        setAuthor,
        emailOne,
        setEmailOne,
        avatar,
        setAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
