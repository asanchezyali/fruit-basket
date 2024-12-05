import FruitItem from "./FruitItem";

interface FruitListProps {
  fruits: string[];
  onUpdate: (oldName: string, newName: string) => Promise<void>;
  onDelete: (name: string) => Promise<void>;
}

function FruitList({ fruits, onUpdate, onDelete }: FruitListProps) {
  return (
    <ul className="space-y-2">
      {fruits.map((fruit) => (
        <FruitItem key={fruit} name={fruit} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default FruitList;
