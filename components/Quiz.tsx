
import React, { useState, useMemo } from 'react';
import type { Question, QuizResult } from '../types';
import QuestionCard from './QuestionCard';
import ResultsChart from './ResultsChart';

interface QuizProps {
  part: number;
  questions: Question[];
  onComplete: (part: number, result: QuizResult) => void;
  onBack: () => void;
}

const Quiz: React.FC<QuizProps> = ({ part, questions, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});

  const score = useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    Object.keys(userAnswers).forEach(indexStr => {
      const index = parseInt(indexStr, 10);
      if (questions[index].dap_an === userAnswers[index]) {
        correct++;
      } else {
        incorrect++;
      }
    });
    return { correct, incorrect };
  }, [userAnswers, questions]);

  const handleAnswer = (selectedOption: string) => {
    if (userAnswers[currentQuestionIndex] !== undefined) return;
    setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: selectedOption }));
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isQuizFinished = Object.keys(userAnswers).length === questions.length;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-cyan-400">Phần {part}</h2>
        <button onClick={onBack} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg transition">
          Về Menu
        </button>
      </div>
      
      <div className="relative pt-1 mb-4">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-700">
          <div style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyan-500 transition-all duration-500"></div>
        </div>
        <p className="text-center text-slate-400">Câu {currentQuestionIndex + 1} / {questions.length}</p>
      </div>

      <QuestionCard
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        userAnswer={userAnswers[currentQuestionIndex] || null}
      />

      <div className="flex justify-between mt-6">
        <button onClick={goToPrevious} disabled={currentQuestionIndex === 0} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
          Trước
        </button>
        {isQuizFinished ? (
           <button onClick={() => onComplete(part, { ...score, total: questions.length })} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg transition">
            Hoàn Thành
          </button>
        ) : (
          <button onClick={goToNext} disabled={currentQuestionIndex === questions.length - 1 || userAnswers[currentQuestionIndex] === undefined} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
            Tiếp
          </button>
        )}
      </div>

      <div className="mt-8 border-t border-slate-700 pt-6">
        <h3 className="text-lg md:text-xl font-bold text-center mb-4 text-slate-300">Thống Kê Trực Tiếp</h3>
        <ResultsChart correct={score.correct} incorrect={score.incorrect} total={questions.length} />
      </div>
    </div>
  );
};

export default Quiz;
