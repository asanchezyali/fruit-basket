import React, { useState } from 'react';
import { Pencil, Trash2, X, Check } from 'lucide-react';
import { useFruit } from '../context/FruitContext';

interface FruitItemProps {
  name: string;
}

const FruitItem: React.FC<FruitItemProps> = ({ name: initialName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [newName, setNewName] = useState(initialName);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { updateFruit, deleteFruit } = useFruit();

  const handleUpdate = async () => {
    if (newName === name) {
      setIsEditing(false);
      return;
    }

    setIsUpdating(true);
    try {
      await updateFruit(name, newName);
      setName(newName);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update fruit:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteFruit(name);
    } catch (error) {
      console.error('Failed to delete fruit:', error);
      setIsDeleting(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1 px-3 py-1.5 rounded bg-white/10 border border-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="p-2 rounded-lg bg-accent hover:bg-accent-dark transition-colors disabled:opacity-50"
            title="Save"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            title="Cancel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10 flex items-center justify-between group">
      <span className="font-medium">{name}</span>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 rounded-lg bg-secondary hover:bg-secondary-dark transition-colors"
          title="Edit"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-50"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FruitItem;

