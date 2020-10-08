import React from "react";

export default React.createContext({
  users: [],
  currentUser: "",
  addNewUser: () => {},
  setCurrentUser: () => {},
  signOut: () => {},
});
