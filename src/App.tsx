import React from "react";
import AddFruit from "./components/AddFruit";
import FruitList from "./components/FruitList";
import LoadingSpinner from "./components/LoadingSpinner";
import { FruitProvider, useFruit } from "./context/FruitContext";

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

const AppContent: React.FC = () => {
  const { loading, error } = useFruit();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-background text-white p-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Fruit Basket
        </h1>
        <AddFruit />
        {error && <div className="text-red-400 mt-4 p-4 bg-red-900/20 rounded-lg text-center">{error}</div>}
        <FruitList />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <FruitProvider>
      <AppContent />
    </FruitProvider>
  );
};

export default App;
