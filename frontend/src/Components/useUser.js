import { useState } from "react";

const useUser = () => {
  const getUser = () => {
    const theUser = localStorage.getItem("user");
    return theUser;
  };

  const [signedInUser, setSignedInUser] = useState(getUser());

  const saveUser = (theUser) => {
    localStorage.setItem("user", theUser);
    setSignedInUser(theUser);
  };

  const signOutUser = () => {
    localStorage.removeItem("user");
    setSignedInUser(null);
  };

  return {
    setSignedInUser: saveUser,
    signedInUser,
    signOutUser,
  };
};

export default useUser;
