import React from "react";

function BlockStats({ cells }) {
  const blocks = cells.filter((c) => !c);
  let percentage = (blocks.length / cells.length) * 100;
  percentage = parseFloat(percentage.toFixed(1));

  return (
    <div>
      <p>
        Blocks: {blocks.length} / {cells.length} ({percentage}%)
      </p>
    </div>
  );
}

export default BlockStats;
