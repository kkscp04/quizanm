
import React from 'react';
import type { QuizResult } from '../types';

interface PartSelectorProps {
  onSelectPart: (part: number) => void;
  results: { [key: number]: QuizResult | null };
}

const PartSelector: React.FC<PartSelectorProps> = ({ onSelectPart, results }) => {
  const renderResult = (partNumber: number) => {
    const result = results[partNumber];
    if (!result) return <span className="text-sm text-slate-400">Chưa hoàn thành</span>;

    const percentage = ((result.correct / result.total) * 100).toFixed(0);
    return (
      <span className="text-sm font-semibold text-cyan-400">
        {percentage}% ({result.correct}/{result.total})
      </span>
    );
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-slate-100 mb-6">Chọn Phần Thi</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => onSelectPart(1)}
          className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-6 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
        >
          <span className="text-xl">Phần I</span>
          <div className="mt-2">{renderResult(1)}</div>
        </button>
        <button
          onClick={() => onSelectPart(2)}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-6 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
        >
          <span className="text-xl">Phần II</span>
          <div className="mt-2">{renderResult(2)}</div>
        </button>
      </div>
    </div>
  );
};

export default PartSelector;
