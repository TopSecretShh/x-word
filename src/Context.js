import React from "react";

export default React.createContext({
  rows: "",
  cols: "",
  title: "Untitled",
  author: "Anonymous",
  selectCell: () => {},
});
