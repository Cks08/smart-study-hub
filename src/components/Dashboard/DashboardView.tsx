import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { ExamCountdownCard } from './ExamCountdownCard';
import { SyllabusOverview } from './SyllabusOverview';
import { TodayTargets } from './TodayTargets';
import {
  Calendar,
  Sparkles,
  BookOpen,
  HelpCircle,
  FileCheck2,
  AlertTriangle,
  Flame,
  ArrowRight,
  Plus,
  RotateCcw,
  BookMarked
} from 'lucide-react';
import { ExamDeadline, SubjectId } from '../../types';

interface DashboardViewProps {
  onEditDeadline: (deadline: ExamDeadline) => void;
  onOpenDeadlineModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onEditDeadline, onOpenDeadlineModal }) => {
  const {
    deadlines,
    subjects,
    activeSubjects,
    setActiveSubjectId,
    setActiveTab,
    notes,
    pyqs,
    getAllPYQStats,
    getDaysRemaining,
    currentUser,
    currentSemester,
    clearToBlankSlate,
    loadReferencePack
  } = useStudy();

  const sortedDeadlines = [...deadlines]
    .filter(d => activeSubjects.some(s => s.id === d.subjectId))
    .sort((a, b) => {
      return new Date(a.examDate).getTime() - new Date(b.examDate).getTime();
    });

  const pyqStats = getAllPYQStats();
  const bookmarkedNotes = notes.filter(n => n.isBookmarked);

  const nearestExam = sortedDeadlines.find(d => getDaysRemaining(d.examDate) >= 0);
  const nearestDays = nearestExam ? getDaysRemaining(nearestExam.examDate) : null;
  const nearestSubject = nearestExam ? activeSubjects.find(s => s.id === nearestExam.subjectId) : null;

  return (
    <div className="space-y-8 pb-16">
      {/* Welcome & Student Profile Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wider uppercase">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>
              {currentUser ? `Welcome back, ${currentUser.name}` : 'Semester Exam Command Center'} • Semester {currentSemester}
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mt-1">
            Study Hub & Exam Readiness
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {currentUser?.university ? `${currentUser.university} • ` : ''}
            {currentUser?.branch ? `${currentUser.branch} • ` : ''}
            Input your notes, upload PDF/image papers, track model solutions, and manage your exam deadlines.
          </p>
        </div>

        {nearestExam && (
          <div className="flex items-center gap-3 bg-slate-900 border border-amber-500/30 p-3 rounded-2xl shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono">
              {nearestDays}d
            </div>
            <div>
              <span className="text-[10px] text-amber-400 font-mono uppercase tracking-wider block">
                Next Upcoming Exam
              </span>
              <span className="text-sm font-bold text-white">
                {nearestSubject?.name || nearestExam.examName}
              </span>
              <span className="text-xs text-slate-400 block font-mono">
                {nearestExam.examDate} • {nearestExam.examTime.split('-')[0]}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Student Input Mode Banner & Quick Setup Helper */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-white">Student Input Mode: Active</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                100% User-Driven Progress
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              All completion numbers are calculated from what you actually check off or upload. No fake progress or pre-cooked numbers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
          <button
            onClick={() => {
              if (confirm('Reset to 0% clean canvas? All notes, PYQs, and targets will be cleared so you can enter your own data.')) {
                clearToBlankSlate();
              }
            }}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
            title="Wipe mock data and start with 0% blank canvas"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to 0% Blank Canvas</span>
          </button>

          <button
            onClick={() => {
              loadReferencePack();
            }}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-white border border-indigo-500/30 transition-colors cursor-pointer"
            title="Load sample engineering revision notes and PYQs for reference"
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Load Reference Study Pack</span>
          </button>
        </div>
      </div>

      {/* 1. Exam Deadlines & Timetable Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Exam Timetable & Countdown</h2>
              <p className="text-xs text-slate-400">Default schedule provided — click "Manage Timetable" to customize dates and rooms</p>
            </div>
          </div>

          <button
            onClick={onOpenDeadlineModal}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer border border-slate-700"
          >
            Manage Timetable
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {sortedDeadlines.map(deadline => (
            <ExamCountdownCard key={deadline.id} deadline={deadline} onEdit={onEditDeadline} />
          ))}
        </div>
      </section>

      {/* 2. Syllabus Completion Status Section */}
      <section className="space-y-4">
        <SyllabusOverview />
      </section>

      {/* 3. Two-Column Productivity: Today's Study Targets & PYQ Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Today's Targets (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <TodayTargets />
        </div>

        {/* Right Column: PYQ Performance & High-Priority Bookmarks (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* PYQ Performance Summary Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">PYQ Practice Status</h3>
                  <p className="text-xs text-slate-400">Previous year university questions solved</p>
                </div>
              </div>

              <span className="font-mono text-sm font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/20">
                {pyqStats.percentage}% Solved
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="block text-xl font-bold font-mono text-emerald-400">
                  {pyqStats.solved}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Solved</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="block text-xl font-bold font-mono text-amber-400">
                  {pyqStats.inProgress}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">In Progress</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="block text-xl font-bold font-mono text-rose-400">
                  {pyqStats.unsolved}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Pending</span>
              </div>
            </div>

            {/* Quick list of pending PYQs or friendly empty state */}
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Pending University Questions:
              </div>
              {pyqs.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-950/50 border border-dashed border-slate-800 text-center space-y-2">
                  <p className="text-xs text-slate-400">
                    No PYQs entered yet. Add exam questions from your past semesters!
                  </p>
                  <button
                    onClick={() => {
                      if (activeSubjects[0]) {
                        setActiveSubjectId(activeSubjects[0].id);
                        setActiveTab('pyqs');
                      }
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold rounded-lg border border-amber-500/30 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add First PYQ Paper</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {pyqs
                    .filter(p => p.status !== 'solved')
                    .slice(0, 3)
                    .map(pyq => {
                      const sub = subjects.find(s => s.id === pyq.subjectId);
                      return (
                        <button
                          key={pyq.id}
                          onClick={() => {
                            setActiveSubjectId(pyq.subjectId);
                            setActiveTab('pyqs');
                          }}
                          className="w-full text-left p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-850 hover:border-slate-700 transition-colors flex items-center justify-between gap-2 text-xs group cursor-pointer"
                        >
                          <div className="min-w-0">
                            <span
                              className="font-mono text-[10px] font-bold block"
                              style={{ color: sub?.accentColor || '#6366f1' }}
                            >
                              {sub?.name} • {pyq.year} ({pyq.marks}M)
                            </span>
                            <p className="text-slate-300 truncate">{pyq.questionText}</p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-200 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          </div>

          {/* Bookmarked Key Notes */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Starred Exam Notes</h3>
                <p className="text-xs text-slate-400">High-yield cheat sheets & lecture uploads</p>
              </div>
            </div>

            {bookmarkedNotes.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-950/50 border border-dashed border-slate-800 text-center space-y-2">
                <p className="text-xs text-slate-400">
                  {notes.length === 0
                    ? 'No notes added yet. Create notes and upload PDF files in any subject!'
                    : 'No notes starred yet. Star important formulas to access them quickly here.'}
                </p>
                <button
                  onClick={() => {
                    if (activeSubjects[0]) {
                      setActiveSubjectId(activeSubjects[0].id);
                      setActiveTab('notes');
                    }
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-lg border border-indigo-500/30 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Note / Upload File</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {bookmarkedNotes.slice(0, 3).map(note => {
                  const sub = subjects.find(s => s.id === note.subjectId);
                  return (
                    <button
                      key={note.id}
                      onClick={() => {
                        setActiveSubjectId(note.subjectId);
                        setActiveTab('notes');
                      }}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-850 hover:border-slate-700 transition-colors flex items-center justify-between gap-2 text-xs group cursor-pointer"
                    >
                      <div className="min-w-0">
                        <span
                          className="font-mono text-[10px] font-bold block"
                          style={{ color: sub?.accentColor || '#6366f1' }}
                        >
                          {sub?.name} • Unit {note.unitNumber}
                        </span>
                        <p className="text-slate-200 font-medium truncate">{note.title}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-200 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
