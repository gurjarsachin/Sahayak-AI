'use client';

import { useState } from 'react';

export default function TopicInput({ onSubmit }: { onSubmit: (topic: string) => void }) {
  const [topic, setTopic] = useState('');

  const handleSubmit = () => {
    if (topic.trim()) {
      onSubmit(topic.trim());
    }
  };

  return (
    <div className="my-6">
      <label className="block mb-2 font-medium text-gray-700">Enter Topic</label>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g. Water Cycle"
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleSubmit}
        className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        Generate Content
      </button>
    </div>
  );
}
