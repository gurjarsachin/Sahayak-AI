'use client';

import { useState } from 'react';

export default function GradeSelector({ onSelect }: { onSelect: (grade: string) => void }) {
  const [selected, setSelected] = useState('');

  const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'];

  return (
    <div className="my-6">
      <label className="block mb-2 font-medium text-gray-700">Select Grade</label>
      <select
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          onSelect(e.target.value);
        }}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      >
        <option value="">-- Choose Grade --</option>
        {grades.map((grade) => (
          <option key={grade} value={grade}>
            {grade}
          </option>
        ))}
      </select>
    </div>
  );
}
