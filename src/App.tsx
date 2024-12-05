import React, { useState, useEffect } from "react";
import AddFruit from "./components/AddFruit";
import FruitList from "./components/FruitList";
import LoadingSpinner from "./components/LoadingSpinner";

declare global {
  interface Window {
    BASKET: {
      API: {
        getAll: () => Promise<string[]>;
        add: (name: string) => Promise<string[]>;
        update: (oldName: string, newName: string) => Promise<string[]>;
        delete: (name: string) => Promise<string[]>;
      };
    };
  }
}

const App: React.FC = () => {
  const [fruits, setFruits] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFruits();
  }, []);

  const fetchFruits = async () => {
    try {
      const fetchedFruits = await window.BASKET.API.getAll();
      setFruits(fetchedFruits);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch fruits");
      setLoading(false);
    }
  };

  const handleAddFruit = async (name: string) => {
    try {
      const updatedFruits = await window.BASKET.API.add(name);
      setFruits(updatedFruits);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleUpdateFruit = async (oldName: string, newName: string) => {
    try {
      const updatedFruits = await window.BASKET.API.update(oldName, newName);
      setFruits(updatedFruits);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDeleteFruit = async (name: string) => {
    try {
      const updatedFruits = await window.BASKET.API.delete(name);
      setFruits(updatedFruits);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-background text-white p-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Fruit Basket
        </h1>
        <AddFruit onAdd={handleAddFruit} />
        {error && <div className="text-red-400 mt-4 p-4 bg-red-900/20 rounded-lg text-center">{error}</div>}
        <FruitList fruits={fruits} onUpdate={handleUpdateFruit} onDelete={handleDeleteFruit} />
      </div>
    </div>
  );
};

export default App;
