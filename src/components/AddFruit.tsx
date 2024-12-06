import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useFruit } from '../context/FruitContext';

const AddFruit: React.FC = () => {
  const [name, setName] = useState('');
  const { addFruit } = useFruit();
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsAdding(true);
    setError(null);

    try {
      await addFruit(name.trim());
      setName('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-4 max-w-xl mx-auto">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter fruit name"
          className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={isAdding}
          className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isAdding ? 'Adding...' : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </>
          )}
        </button>
      </div>
      {error && (
        <div className="text-red-400 mt-2 text-center text-sm" data-testid="error-message">{error}</div>
      )}
    </form>
  );
};

export default AddFruit;

