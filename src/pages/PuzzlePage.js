import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Context from '../Context/Context';

import PuzzleBoard from "../components/PuzzleBoard/PuzzleBoard";
import PuzzleHeader from '../components/PuzzleHeader';
import PuzzleOptionsBar from "../components/PuzzleOptionsBar";
import Clues from "../components/Clues";
// import Fills from "./Fills";

const PuzzlePage = () => {
  const { currentUser } = useContext(Context);

  return currentUser ? (
    <div>
      <PuzzleHeader />
      <PuzzleOptionsBar />
      
      <main>
        <PuzzleBoard />
        <Clues />
        {/* <Fills word={word} /> */}
      </main>
    </div>
  ) : (
      <Redirect to={{ pathname: "/" }} />
    );

}
export default PuzzlePage;
