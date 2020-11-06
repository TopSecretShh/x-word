import React from "react";

export default React.createContext({
  users: [],
  currentUser: "",
  userPuzzles: [],
  addNewUser: () => {},
  setCurrentUser: () => {},
  setUserPuzzles: () => {},
  signOut: () => {},
});
