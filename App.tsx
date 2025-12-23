
import React, { useState, useMemo } from 'react';
import PartSelector from './components/PartSelector';
import Quiz from './components/Quiz';
import { quizData } from './data/quizData';
import type { QuizResult } from './types';
import { PART_ONE_QUESTIONS, PART_TWO_QUESTIONS } from './constants';

const App: React.FC = () => {
  const [activePart, setActivePart] = useState<number | null>(null);
  const [results, setResults] = useState<{ [key: number]: QuizResult | null }>({
    1: null,
    2: null,
  });

  const partOneQuestions = useMemo(() => quizData['PHẦN I'].slice(0, PART_ONE_QUESTIONS), []);
  const partTwoQuestions = useMemo(() => quizData['PHẦN I'].slice(PART_ONE_QUESTIONS, PART_ONE_QUESTIONS + PART_TWO_QUESTIONS), []);

  const handleSelectPart = (part: number) => {
    setActivePart(part);
  };

  const handleQuizComplete = (part: number, result: QuizResult) => {
    setResults(prevResults => ({ ...prevResults, [part]: result }));
    setActivePart(null);
  };

  const handleBackToMenu = () => {
    setActivePart(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-400">Trắc Nghiệm An Toàn Thông Tin</h1>
          <p className="text-slate-400 mt-2">Kiểm tra kiến thức của bạn về Bảo mật Web và Pháp y số</p>
        </header>

        <main className="bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8">
          {activePart === null ? (
            <PartSelector onSelectPart={handleSelectPart} results={results} />
          ) : activePart === 1 ? (
            <Quiz
              part={1}
              questions={partOneQuestions}
              onComplete={handleQuizComplete}
              onBack={handleBackToMenu}
            />
          ) : (
            <Quiz
              part={2}
              questions={partTwoQuestions}
              onComplete={handleQuizComplete}
              onBack={handleBackToMenu}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
