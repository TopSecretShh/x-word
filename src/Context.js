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
  selectCell: () => {},
  selectedCell: "",
  setSize: () => {},
  handleSubmitCustom: () => {},
  handlePatternBtn: () => {},
  handleKeyDown: () => {},
  handleDoubleClick: () => {},
  selectWord: () => {},
});
