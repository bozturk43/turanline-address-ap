'use client';

import { useState } from 'react';
import { bulkImportAddresses } from '@/lib/actions';

type ModalProps = {
  onClose: () => void;
};

export default function BulkImportModal({ onClose }: ModalProps) {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const lines = text.split('\n').filter(line => line.trim() !== '');
      if (lines.length === 0) {
        alert("Please paste some address text.");
        return;
      }
      await bulkImportAddresses(lines);
      onClose();
    } catch (error) {
      console.error(error);
      alert("An error occurred during import.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Bulk Import Addresses</h2>
        <p className="text-gray-600 mb-4">
          Paste the addresses below, each on a new line.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Запорізька обл., Запоріжжя, Відділення №16..."
          className="w-full h-48 p-2 border rounded-md font-mono text-sm"
        />
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={onClose} disabled={isLoading} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={isLoading} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            {isLoading ? 'Importing...' : 'Import Addresses'}
          </button>
        </div>
      </div>
    </div>
  );
}