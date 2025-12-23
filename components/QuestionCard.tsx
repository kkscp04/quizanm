
import React, { useMemo } from 'react';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (selectedOption: string) => void;
  userAnswer: string | null;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, userAnswer }) => {
  const shuffledOptions = useMemo(() => {
    const options = Object.entries(question.lua_chon).map(([key, value]) => ({ key, value }));
    // Thuật toán xáo trộn Fisher-Yates
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }, [question]);

  const getButtonClass = (optionKey: string) => {
    if (!userAnswer) {
      return 'bg-slate-700 hover:bg-slate-600';
    }
    const isCorrectAnswer = optionKey === question.dap_an;
    const isSelectedAnswer = optionKey === userAnswer;

    if (isCorrectAnswer) {
      return 'bg-green-600 border-green-400';
    }
    if (isSelectedAnswer && !isCorrectAnswer) {
      return 'bg-red-600 border-red-400';
    }
    return 'bg-slate-700 opacity-70 cursor-not-allowed';
  };

  return (
    <div className="bg-slate-900/50 p-6 rounded-lg">
      <h3 className="text-lg md:text-xl font-semibold mb-6 text-slate-100">{question.noi_dung}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shuffledOptions.map(({ key, value }) => (
          <button
            key={key}
            onClick={() => onAnswer(key)}
            disabled={userAnswer !== null}
            className={`w-full text-left p-4 rounded-lg border-2 border-transparent transition duration-300 ${getButtonClass(key)}`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
