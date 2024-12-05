import React, { useState } from "react";

interface FruitItemProps {
  name: string;
  onUpdate: (oldName: string, newName: string) => Promise<void>;
  onDelete: (name: string) => Promise<void>;
}

function FruitItem({ name, onUpdate, onDelete }: FruitItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleUpdate = async () => {
    await onUpdate(name, newName);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
          <button onClick={handleUpdate}>Update</button>
        </>
      ) : (
        <>
          <span>{name}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(name)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default FruitItem;
