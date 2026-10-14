import React, { useState, useEffect, useRef } from 'react';
import { useStudy } from '../../context/StudyContext';
import { Search, X, BookOpen, HelpCircle, FileCheck2, Zap, ArrowRight } from 'lucide-react';
import { SubjectId } from '../../types';

export const QuickSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    notes,
    pyqs,
    answers,
    formulas,
    subjects,
    setActiveSubjectId,
    setActiveTab,
    setFocusedAnswerId
  } = useStudy();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  // Search Results
  const matchedNotes = q
    ? notes.filter(
        n =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          n.topic.toLowerCase().includes(q) ||
          n.tags.some(t => t.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  const matchedPyqs = q
    ? pyqs.filter(
        p =>
          p.questionText.toLowerCase().includes(q) ||
          p.topic.toLowerCase().includes(q) ||
          p.year.toString().includes(q)
      ).slice(0, 4)
    : [];

  const matchedAnswers = q
    ? answers.filter(
        a =>
          a.questionTitle.toLowerCase().includes(q) ||
          a.fullMarkdownSolution.toLowerCase().includes(q) ||
          a.questionText?.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const matchedFormulas = q
    ? formulas.filter(
        f =>
          f.title.toLowerCase().includes(q) ||
          f.formula.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const totalResults =
    matchedNotes.length + matchedPyqs.length + matchedAnswers.length + matchedFormulas.length;

  const handleSelectNote = (subjectId: SubjectId) => {
    setActiveSubjectId(subjectId);
    setActiveTab('notes');
    setIsSearchOpen(false);
  };

  const handleSelectPyq = (subjectId: SubjectId) => {
    setActiveSubjectId(subjectId);
    setActiveTab('pyqs');
    setIsSearchOpen(false);
  };

  const handleSelectAnswer = (subjectId: SubjectId, answerId: string) => {
    setActiveSubjectId(subjectId);
    setFocusedAnswerId(answerId);
    setActiveTab('answers');
    setIsSearchOpen(false);
  };

  const handleSelectFormula = (subjectId: SubjectId) => {
    setActiveSubjectId(subjectId);
    setActiveTab('formulas');
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950/80">
          <Search className="w-5 h-5 text-indigo-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search notes, PYQs, model answers, formulas..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-500 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline font-mono text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Search Results Container */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {!query.trim() ? (
            <div className="py-8 text-center text-xs text-slate-500 space-y-2">
              <Search className="w-8 h-8 text-slate-700 mx-auto" />
              <p>Type keywords like <span className="text-slate-300 font-mono">Bode</span>, <span className="text-slate-300 font-mono">Barkhausen</span>, <span className="text-slate-300 font-mono">Eigenvalue</span>, <span className="text-slate-300 font-mono">BCNF</span>, or <span className="text-slate-300 font-mono">Streams</span></p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No results found for "{query}".
            </div>
          ) : (
            <div className="space-y-4">
              {/* Notes Results */}
              {matchedNotes.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono uppercase font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Notes ({matchedNotes.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedNotes.map(n => {
                      const sub = subjects.find(s => s.id === n.subjectId);
                      return (
                        <button
                          key={n.id}
                          onClick={() => handleSelectNote(n.subjectId)}
                          className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-850 hover:border-slate-700 transition-colors flex items-center justify-between gap-3 text-xs group cursor-pointer"
                        >
                          <div className="min-w-0">
                            <span className="font-mono text-[10px] font-semibold text-indigo-400 block">
                              {sub?.name} • Unit {n.unitNumber}
                            </span>
                            <div className="text-white font-medium truncate">{n.title}</div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform flex-shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PYQ Results */}
              {matchedPyqs.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono uppercase font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Previous Year Questions ({matchedPyqs.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedPyqs.map(p => {
                      const sub = subjects.find(s => s.id === p.subjectId);
                      return (
                        <button
                          key={p.id}
                          onClick={() => handleSelectPyq(p.subjectId)}
                          className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-850 hover:border-slate-700 transition-colors flex items-center justify-between gap-3 text-xs group cursor-pointer"
                        >
                          <div className="min-w-0">
                            <span className="font-mono text-[10px] font-semibold text-amber-400 block">
                              {sub?.name} • {p.year} ({p.marks} Marks)
                            </span>
                            <div className="text-slate-200 truncate">{p.questionText}</div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform flex-shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Model Answers Results */}
              {matchedAnswers.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono uppercase font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Model Answers & Solutions ({matchedAnswers.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedAnswers.map(a => {
                      const sub = subjects.find(s => s.id === a.subjectId);
                      return (
                        <button
                          key={a.id}
                          onClick={() => handleSelectAnswer(a.subjectId, a.id)}
                          className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-850 hover:border-slate-700 transition-colors flex items-center justify-between gap-3 text-xs group cursor-pointer"
                        >
                          <div className="min-w-0">
                            <span className="font-mono text-[10px] font-semibold text-emerald-400 block">
                              {sub?.name}
                            </span>
                            <div className="text-white font-medium truncate">{a.questionTitle}</div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform flex-shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Formulas Results */}
              {matchedFormulas.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono uppercase font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Formulas & Cheatsheet ({matchedFormulas.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedFormulas.map(f => {
                      const sub = subjects.find(s => s.id === f.subjectId);
                      return (
                        <button
                          key={f.id}
                          onClick={() => handleSelectFormula(f.subjectId)}
                          className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-850 hover:border-slate-700 transition-colors flex items-center justify-between gap-3 text-xs group cursor-pointer"
                        >
                          <div className="min-w-0">
                            <span className="font-mono text-[10px] font-semibold text-indigo-400 block">
                              {sub?.name} • {f.category}
                            </span>
                            <div className="text-amber-300 font-mono font-medium truncate">
                              {f.formula} ({f.title})
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform flex-shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-500">
          <span>Click any item to jump directly to that subject</span>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
