import React, { useContext } from 'react';
import Context from '../Context/Context';

const PuzzleOptionsBar = () => {
    const { setSize, custom, createCustom, clearLetters, clearGrid, patternButton } = useContext(Context);
    
    return (
        <div className="puzzle-options">
            <div className="size-btns">
                <h3>Size</h3>
                <button
                    type="button"
                    value="daily"
                    onClick={(e) => setSize(e.target.value)}
                >
                    Daily
                            </button>
                <button
                    type="button"
                    value="sunday"
                    onClick={(e) => setSize(e.target.value)}
                >
                    Sunday
                            </button>
                <button
                    type="button"
                    value="custom"
                    onClick={(e) => setSize(e.target.value)}
                >
                    Custom
                            </button>


                {custom ? (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        createCustom(e.target)
                    }}>
                        <fieldset className="custom-size">
                            <label># of rows:{"  "}</label>
                            <input type="number" name="rows" min={3} max={25} />

                            <br />
                            <label># of columns:{" "}</label>
                            <input type="number" name="cols" min={3} max={25} />

                            <br />
                            <button type="submit">Enter</button>
                        </fieldset>
                    </form>
                ) : (
                        ""
                    )}
            </div>
            <div className="pattern-btn">
                <h3>Pattern</h3>
                <button type="button" onClick={() => patternButton()}>
                    Pattern
                        </button>
            </div>
            <div className="clear-grid-btn">
                <h3>Clear</h3>
                <button type="button" onClick={() => clearLetters()}>
                    Clear Letters
                        </button>
                <button type="button" onClick={() => clearGrid()}>
                    Clear Grid
                        </button>
            </div>
        </div>
    )
}

export default PuzzleOptionsBar;