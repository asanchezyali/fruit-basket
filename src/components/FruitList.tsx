import React from "react";

interface FruitListProps {
  fruits: string[];
}

function FruitList({ fruits }: FruitListProps) {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}

export default FruitList;
