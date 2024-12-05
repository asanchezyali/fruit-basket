import { useState, useEffect } from "react";
import AddFruit from "./components/AddFruit";
import FruitList from "./components/FruitList";
import LoadingSpinner from "./components/LoadingSpinner";
import "./index.css";

declare global {
  interface Window {
    BASKET: {
      API: {
        getAll: () => Promise<string[]>;
        add: (fruitName: string) => Promise<string[]>;
        update: (oldFruitName: string, newFruitName: string) => Promise<string[]>;
        delete: (fruitName: string) => Promise<string[]>;
      };
    };
  }
}

function App() {
  const [fruits, setFruits] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFruits();
  }, []);

  const fetchFruits = async () => {
    try {
      const fruits = await window.BASKET.API.getAll();
      setFruits(fruits);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Error fetching fruits");
      setLoading(false);
    }
  };

  const handleAddFruit = async (name: string) => {
    try {
      const updatedFruits = await window.BASKET.API.add(name);
      setFruits(updatedFruits);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error adding fruit");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFruit = async (oldName: string, newName: string) => {
    try {
      const updatedFruits = await window.BASKET.API.update(oldName, newName);
      setFruits(updatedFruits);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error updating fruit");
    }
  };

  const handleDeleteFruit = async (name: string) => {
    try {
      const updatedFruits = await window.BASKET.API.delete(name);
      setFruits(updatedFruits);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error deleting fruit");
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
}

export default App;
