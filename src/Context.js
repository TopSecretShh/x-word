import React from "react";

export default React.createContext({
  rows: "",
  cols: "",
  custom: false,
  blocks: "",
  title: "Untitled",
  author: "Anonymous",
  selectCell: () => {},
  selectedCell: "",
  setSize: () => {},
  handleSubmitCustom: () => {},
  handlePatternBtn: () => {},
});
