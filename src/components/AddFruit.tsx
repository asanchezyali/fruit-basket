import React, { useState } from "react";

interface AddFruitProps {
  onAdd: (name: string) => Promise<void>;
}

function AddFruit({ onAdd }: AddFruitProps) {
  const [name, setName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      return;
    }

    setIsAdding(true);
    setError(null);

    try {
      await onAdd(name);
      setName("");
    } catch (err) {
      console.error(err);
      setError("Error adding fruit");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter fruit name"
        className="border p-2 mr-2"
      />
      <button type="submit" disabled={isAdding} className="bg-blue-500 text-white p-2 rounded disabled:opacity-50">
        {isAdding ? "Adding..." : "Add"}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
}

export default AddFruit;
