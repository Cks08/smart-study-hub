import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { FlashcardItem, SubjectId } from '../../types';
import { RotateCw, CheckCircle2, ChevronLeft, ChevronRight, Sparkles, BookOpen } from 'lucide-react';

interface FlashcardSectionProps {
  subjectId: SubjectId;
}

export const FlashcardSection: React.FC<FlashcardSectionProps> = ({ subjectId }) => {
  const { flashcards, toggleFlashcardMastered, subjects } = useStudy();
  const currentSubject = subjects.find(s => s.id === subjectId);

  const subjectCards = flashcards.filter(f => f.subjectId === subjectId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (subjectCards.length === 0) {
    return (
      <div className="text-center py-16 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-8 space-y-3">
        <Sparkles className="w-8 h-8 text-slate-600 mx-auto" />
        <h4 className="text-sm font-semibold text-slate-300">No flashcards for this subject yet</h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Flashcards allow rapid active recall for critical exam definitions and formulas.
        </p>
      </div>
    );
  }

  const card = subjectCards[currentIndex] || subjectCards[0];
  const masteredCount = subjectCards.filter(c => c.mastered).length;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % subjectCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + subjectCards.length) % subjectCards.length);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold text-white">
            Card {currentIndex + 1} of {subjectCards.length}
          </span>
          <span>•</span>
          <span className="text-emerald-400 font-medium">
            {masteredCount} Mastered
          </span>
        </div>

        <button
          onClick={() => toggleFlashcardMastered(card.id)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
            card.mastered
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{card.mastered ? 'Mastered' : 'Mark as Mastered'}</span>
        </button>
      </div>

      {/* Interactive Flip Card */}
      <div
        onClick={() => setIsFlipped(prev => !prev)}
        className="w-full min-h-[300px] p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 shadow-xl hover:border-slate-700 transition-all duration-300 cursor-pointer flex flex-col justify-between select-none relative group"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-lg border border-indigo-500/20">
            {card.category}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1 group-hover:text-slate-300 transition-colors">
            <RotateCw className="w-3.5 h-3.5" />
            <span>Click to flip</span>
          </span>
        </div>

        <div className="py-6 text-center">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2">
            {isFlipped ? 'Answer & Explanation' : 'Question / Concept'}
          </div>
          <p
            className={`font-semibold leading-relaxed transition-all ${
              isFlipped
                ? 'text-base sm:text-lg text-emerald-300 font-sans'
                : 'text-lg sm:text-xl text-white'
            }`}
          >
            {isFlipped ? card.answer : card.question}
          </p>
        </div>

        <div className="text-center text-[11px] text-slate-500">
          {isFlipped ? 'Click card again to view question' : 'Click anywhere on card to reveal answer'}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Card</span>
        </button>

        <button
          onClick={() => setIsFlipped(prev => !prev)}
          className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
        >
          {isFlipped ? 'Show Question' : 'Reveal Answer'}
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors cursor-pointer"
        >
          <span>Next Card</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
