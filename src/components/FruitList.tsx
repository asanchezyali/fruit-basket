import React from 'react';
import FruitItem from './FruitItem';
import { useFruit } from '../context/FruitContext';

const FruitList: React.FC = () => {
  const { fruits } = useFruit();

  return (
    <div className="grid gap-4 max-w-xl mx-auto">
      {fruits.map((fruit) => (
        <FruitItem key={fruit} name={fruit} />
      ))}
    </div>
  );
};

export default FruitList;

