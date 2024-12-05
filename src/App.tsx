import { useState, useEffect } from "react";
import AddFruit from "./components/AddFruit";
import FruitList from "./components/FruitList";
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
  }


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fruit Basket</h1>
      <AddFruit onAdd={handleAddFruit} />
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <FruitList fruits={fruits} />
    </div>
  );
}

export default App;
