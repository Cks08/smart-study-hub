import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { NotesSection } from './NotesSection';
import { PyqSection } from './PyqSection';
import { AnswersSection } from './AnswersSection';
import { SyllabusSection } from './SyllabusSection';
import { FormulaSheetSection } from './FormulaSheetSection';
import { FlashcardSection } from './FlashcardSection';
import { AnswerModal } from './AnswerModal';
import {
  BookOpen,
  HelpCircle,
  FileCheck2,
  Layers,
  Zap,
  Sparkles,
  Calendar,
  Clock,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { PYQItem, SubjectId } from '../../types';

interface SubjectDetailViewProps {
  subjectId: SubjectId;
}

export const SubjectDetailView: React.FC<SubjectDetailViewProps> = ({ subjectId }) => {
  const {
    subjects,
    setActiveSubjectId,
    activeTab,
    setActiveTab,
    notes,
    pyqs,
    answers,
    deadlines,
    getSubjectProgress,
    getSubjectPYQStats,
    getDaysRemaining,
    addAnswer
  } = useStudy();

  const currentSubject = subjects.find(s => s.id === subjectId);
  const subjectDeadline = deadlines.find(d => d.subjectId === subjectId);
  const daysRemaining = subjectDeadline ? getDaysRemaining(subjectDeadline.examDate) : null;

  const progress = getSubjectProgress(subjectId);
  const pyqStats = getSubjectPYQStats(subjectId);
  const subjectNotes = notes.filter(n => n.subjectId === subjectId);
  const subjectAnswers = answers.filter(a => a.subjectId === subjectId);

  // Cross-tab interaction: Opening answer from PYQ tab
  const [activeAnswerIdToFocus, setActiveAnswerIdToFocus] = useState<string | null>(null);
  const [answerModalOpen, setAnswerModalOpen] = useState(false);
  const [pyqToAnswer, setPyqToAnswer] = useState<PYQItem | null>(null);

  const handleOpenAnswerFromPyq = (answerId: string) => {
    setActiveAnswerIdToFocus(answerId);
    setActiveTab('answers');
  };

  const handleCreateAnswerForPyq = (pyq: PYQItem) => {
    setPyqToAnswer(pyq);
    setAnswerModalOpen(true);
  };

  const handleSaveModalAnswer = (answerData: any) => {
    const newId = addAnswer(answerData);
    setActiveAnswerIdToFocus(newId);
    setActiveTab('answers');
  };

  if (!currentSubject) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-white">Subject not found</h2>
        <button
          onClick={() => setActiveSubjectId('dashboard')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Subject Header Hero Banner */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Subtle background glow with subject accent color */}
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ backgroundColor: currentSubject.accentColor }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSubjectId('dashboard')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span>Dashboard</span>
              </button>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="font-mono text-xs font-semibold text-slate-300">
                {currentSubject.code}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">{currentSubject.credits} Academic Credits</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: currentSubject.accentColor }}
              />
              {currentSubject.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {currentSubject.description}
            </p>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {subjectDeadline && (
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left min-w-[140px]">
                <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-semibold uppercase tracking-wider mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Exam In</span>
                </div>
                <div className="text-xl font-black font-mono text-white">
                  {daysRemaining !== null && daysRemaining >= 0
                    ? `${daysRemaining} Days`
                    : 'Done'}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {subjectDeadline.examDate}
                </div>
              </div>
            )}

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left min-w-[140px]">
              <div className="flex items-center gap-1.5 text-[11px] text-indigo-400 font-semibold uppercase tracking-wider mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Syllabus Done</span>
              </div>
              <div className="text-xl font-black font-mono text-white">
                {progress.percentage}%
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {progress.completed}/{progress.total} Topics
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left min-w-[140px]">
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold uppercase tracking-wider mb-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>PYQ Solved</span>
              </div>
              <div className="text-xl font-black font-mono text-white">
                {pyqStats.solved} / {pyqStats.total}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {pyqStats.percentage}% Solved
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar across bottom of hero */}
        <div className="mt-6 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${progress.percentage}%`,
              backgroundColor: currentSubject.accentColor
            }}
          />
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 no-scrollbar">
        <button
          onClick={() => setActiveTab('notes')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'notes'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Notes Section</span>
          <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-black/30">
            {subjectNotes.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('pyqs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'pyqs'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>PYQ Section</span>
          <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-black/30">
            {pyqStats.total}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('answers')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'answers'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Answers Section</span>
          <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-black/30">
            {subjectAnswers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('syllabus')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'syllabus'
              ? 'bg-slate-800 text-white shadow-md border border-slate-700'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Syllabus & Status</span>
          <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-black/30">
            {progress.percentage}%
          </span>
        </button>

        <button
          onClick={() => setActiveTab('formulas')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'formulas'
              ? 'bg-slate-800 text-white shadow-md border border-slate-700'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Formula Cheatsheet</span>
        </button>

        <button
          onClick={() => setActiveTab('flashcards')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'flashcards'
              ? 'bg-slate-800 text-white shadow-md border border-slate-700'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span>Flashcards</span>
        </button>
      </div>

      {/* Render Active Sub-Tab */}
      <div className="pt-2">
        {activeTab === 'notes' && <NotesSection subjectId={subjectId} />}
        {activeTab === 'pyqs' && (
          <PyqSection
            subjectId={subjectId}
            onOpenAnswer={handleOpenAnswerFromPyq}
            onCreateAnswerForPyq={handleCreateAnswerForPyq}
          />
        )}
        {activeTab === 'answers' && (
          <AnswersSection
            subjectId={subjectId}
            initialFocusedAnswerId={activeAnswerIdToFocus}
          />
        )}
        {activeTab === 'syllabus' && <SyllabusSection subjectId={subjectId} />}
        {activeTab === 'formulas' && <FormulaSheetSection subjectId={subjectId} />}
        {activeTab === 'flashcards' && <FlashcardSection subjectId={subjectId} />}
      </div>

      {/* Modal for adding answer directly from PYQ tab */}
      <AnswerModal
        isOpen={answerModalOpen}
        onClose={() => {
          setAnswerModalOpen(false);
          setPyqToAnswer(null);
        }}
        answerToEdit={null}
        subjectId={subjectId}
        associatedPyq={pyqToAnswer}
        onSave={handleSaveModalAnswer}
      />
    </div>
  );
};
