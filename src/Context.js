import React from "react";

export default React.createContext({
  users: [],
  addNewUser: () => {},
  setCurrentUser: () => {},
  currentUser: "",
  rows: "",
  cols: "",
  custom: false,
  blocks: [],
  title: "Untitled",
  selectedCell: "",

  handleKeyDown: () => {},
  handleDoubleClick: () => {},
});
