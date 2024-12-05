import FruitItem from "./FruitItem";

interface FruitListProps {
  fruits: string[];
  onUpdate: (oldName: string, newName: string) => Promise<void>;
  onDelete: (name: string) => Promise<void>;
}

function FruitList({ fruits, onUpdate, onDelete }: FruitListProps) {
  return (
    <div className="grid gap-4 max-w-xl mx-auto">
      {fruits.map((fruit) => (
        <FruitItem key={fruit} name={fruit} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default FruitList;
