import React from "react";

function BlockStats({ blocks }) {
  const allBlocks = blocks.filter((c) => !c);
  let percentage = (allBlocks.length / blocks.length) * 100;
  percentage = parseFloat(percentage.toFixed(1));

  return (
    <div>
      <p>
        Blocks: {allBlocks.length} / {blocks.length} ({percentage}%)
      </p>
    </div>
  );
}

export default BlockStats;
