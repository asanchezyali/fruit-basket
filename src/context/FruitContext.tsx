import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

interface FruitContextType {
  fruits: string[];
  loading: boolean;
  error: string | null;
  fetchFruits: () => Promise<void>;
  addFruit: (name: string) => Promise<void>;
  updateFruit: (oldName: string, newName: string) => Promise<void>;
  deleteFruit: (name: string) => Promise<void>;
}

const FruitContext = createContext<FruitContextType | undefined>(undefined);

export const FruitProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fruits, setFruits] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFruits = async () => {
    try {
      const fetchedFruits = await window.BASKET.API.getAll();
      setFruits(fetchedFruits);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch fruits");
      setLoading(false);
    }
  };

  const addFruit = async (name: string) => {
    try {
      const updatedFruits = await window.BASKET.API.add(name);
      setFruits(updatedFruits);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const updateFruit = async (oldName: string, newName: string) => {
    try {
      const updatedFruits = await window.BASKET.API.update(oldName, newName);
      setFruits(updatedFruits);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const deleteFruit = async (name: string) => {
    try {
      const updatedFruits = await window.BASKET.API.delete(name);
      setFruits(updatedFruits);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchFruits();
  }, []);

  return (
    <FruitContext.Provider value={{ fruits, loading, error, fetchFruits, addFruit, updateFruit, deleteFruit }}>
      {children}
    </FruitContext.Provider>
  );
};

export const useFruit = () => {
  const context = useContext(FruitContext);
  if (context === undefined) {
    throw new Error("useFruit must be used within a FruitProvider");
  }
  return context;
};
