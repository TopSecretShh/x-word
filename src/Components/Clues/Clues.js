import React, { useState, useEffect } from "react";
import "./Clues.css";

function Clues({
  cellOrientation,
  cellNumber,
  selectCell,
  handleDoubleClick,
  new_puzzle,
  savedCluesAcross,
  savedCluesDown,
}) {
  /*
  TODO list
  - puzzle in progress save: save this.state.cells for blocks and letters; save clues and clue inputs
  - puzzle completed save:
    - should save everything, just like in progress save, but there will be two display options, depending on use:
      - option one: dev save. same as in progress save
      - option two: ready to solve save. saves this.state.cells for blocks only. saves clues but not as inputs. this puzzle should look like any published puzzle, ready for solving.

  - so for this component I need to find a way to save clues as an array. each clue needs:
    - #
    - across/down
    - input (if any)

  - it seems like it would be easiest to capture all of the information at the same time, when the user hits a save btn.

  - save btn should be in controls component
  
  */

  const [cluesAcross, setCluesAcross] = useState([]);
  const [cluesDown, setCluesDown] = useState([]);

  // this creates across/down clues in state
  useEffect(() => {
    if (new_puzzle) {
      cellOrientation.forEach((b, i) => {
        const clueId = cellNumber[i];
        if (b === "across") {
          let newClueAcross = {
            id: clueId + " across",
            clue: "",
          };
          setCluesAcross((cluesAcross) => [...cluesAcross, newClueAcross]);
        } else if (b === "down") {
          let newClueDown = {
            id: clueId + " down",
            clue: "",
          };
          setCluesDown((cluesDown) => [...cluesDown, newClueDown]);
        } else if (b === "acrossdown") {
          let newClueAcross = {
            id: clueId + " across",
            clue: "",
          };
          let newClueDown = {
            id: clueId + " down",
            clue: "",
          };
          setCluesAcross((cluesAcross) => [...cluesAcross, newClueAcross]);
          setCluesDown((cluesDown) => [...cluesDown, newClueDown]);
        }
      });
    } else if (!new_puzzle) {
      setCluesAcross(savedCluesAcross);
      setCluesDown(savedCluesDown);
    }
  }, [
    new_puzzle,
    cellNumber,
    cellOrientation,
    savedCluesAcross,
    savedCluesDown,
  ]);

  // this creates the html for the dom
  let across = [];
  let down = [];

  cellOrientation.forEach((b, i) => {
    const clueId = cellNumber[i];
    if (b === "across") {
      const clue = cluesAcross.filter((c) => c.id === clueId + " across")[0];
      across.push(
        <li key={i} onClick={() => handleClick(i, true)}>
          <label>
            {clueId}{" "}
            <input
              type="text"
              id={clueId + " across"}
              name={clueId + " across"}
              value={clue ? clue.clue : ""}
              onChange={(e) => updateClueAcross(clueId, e.target.value)}
            />
          </label>
        </li>
      );
    } else if (b === "down") {
      const clue = cluesDown.filter((c) => c.id === clueId + " down")[0];
      down.push(
        <li key={i} onClick={() => handleClick(i, false)}>
          <label>
            {clueId}{" "}
            <input
              type="text"
              id={clueId + " down"}
              name={clueId + " down"}
              value={clue ? clue.clue : ""}
              onChange={(e) => updateCluesDown(clueId, e.target.value)}
            />
          </label>
        </li>
      );
    } else if (b === "acrossdown") {
      const clueAcross = cluesAcross.filter(
        (c) => c.id === clueId + " across"
      )[0];
      const clueDown = cluesDown.filter((c) => c.id === clueId + " down")[0];
      across.push(
        <li key={i} onClick={() => handleClick(i, true)}>
          <label>
            {clueId}{" "}
            <input
              type="text"
              id={clueId + " across"}
              name={clueId + " across"}
              value={clueAcross ? clueAcross.clue : ""}
              onChange={(e) => updateClueAcross(clueId, e.target.value)}
            />
          </label>
        </li>
      );
      down.push(
        <li key={i} onClick={() => handleClick(i, false)}>
          {clueId}{" "}
          <input
            type="text"
            id={clueId + " down"}
            name={clueId + " down"}
            value={clueDown ? clueDown.clue : ""}
            onChange={(e) => updateCluesDown(clueId, e.target.value)}
          />
        </li>
      );
    }
  });

  function handleClick(i, direction) {
    selectCell(i);
    handleDoubleClick(direction);
  }

  function updateClueAcross(id, value) {
    const newClueValue = [{ id: id + " across", clue: value }];
    const newCluesAcross = cluesAcross.map(
      (clue) => newClueValue.find((c) => c.id === clue.id) || clue
    );
    setCluesAcross(newCluesAcross);
  }

  function updateCluesDown(id, value) {
    const newClueValue = [{ id: id + " down", clue: value }];
    const newCluesDown = cluesDown.map(
      (clue) => newClueValue.find((c) => c.id === clue.id) || clue
    );
    setCluesDown(newCluesDown);
  }

  function handleSubmit() {
    console.log(cluesAcross, cluesDown);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="clues__container">
        <div>
          <h3>Across</h3>
          <ul className="clues__list">{across}</ul>
        </div>

        <div>
          <h3>Down</h3>
          <ul className="clues__list">{down}</ul>
        </div>
      </div>

      <button type="submit">Save</button>
    </form>
  );
}
export default Clues;
