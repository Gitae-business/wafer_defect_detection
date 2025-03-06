import React from "react";

interface WaferMapDisplayProps {
  waferMap: number[][];
}

function WaferMapDisplay({ waferMap }: WaferMapDisplayProps) {
  const rows = waferMap.length;
  const cols = waferMap[0].length;

  return (
    <div
      className="relative"
      style={{
        width: `100%`,
        height: `100%`,
      }}
    >
      {/* Grid Layout */}
      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          width: "100%",
          height: "100%",
        }}
      >
        {waferMap.flat().map((cell, index) => {
          let color = "bg-white"; // Default color
          if (cell === 1) {
            color = "bg-green-300"; // Light green for cell === 1
          } else if (cell === 2) {
            color = "bg-red-500"; // Red for cell === 2
          }

          return (
            <div
              key={index}
              className={`border border-gray-200 ${color}`}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WaferMapDisplay;
