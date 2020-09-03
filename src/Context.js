import React from "react";

export default React.createContext({
  users: [],
  rows: "",
  cols: "",
  custom: false,
  blocks: [],
  title: "Untitled",
  author: "Anonymous",
  selectCell: () => {},
  selectedCell: "",
  setSize: () => {},
  handleSubmitCustom: () => {},
  handlePatternBtn: () => {},
  handleKeyDown: () => {},
});
