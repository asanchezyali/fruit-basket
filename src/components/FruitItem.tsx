import { useState } from "react";

interface FruitItemProps {
  name: string;
  onUpdate: (oldName: string, newName: string) => Promise<void>;
  onDelete: (name: string) => Promise<void>;
}

function FruitItem({ name, onUpdate, onDelete }: FruitItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    if (newName === name) {
      setIsEditing(false);
      return;
    }

    setIsUpdating(true);
    setError(null);

    try {
      await onUpdate(name, newName);
      setIsEditing(false);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await onDelete(name);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isEditing) {
    return (
      <li className="flex items-center space-x-2">
        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="border p-1" />
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className="bg-green-500 text-white p-1 rounded disabled:opacity-50"
        >
          {isUpdating ? "Saving..." : "Save"}
        </button>
        <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-1 rounded">
          Cancel
        </button>
        {error && <div className="text-red-500 ml-2">{error}</div>}
      </li>
    );
  }

  return (
    <li className="flex items-center space-x-2">
      <span>{name}</span>
      <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-1 rounded">
        Edit
      </button>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="bg-red-500 text-white p-1 rounded disabled:opacity-50"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
      {error && <div className="text-red-500 ml-2">{error}</div>}
    </li>
  );
}

export default FruitItem;
