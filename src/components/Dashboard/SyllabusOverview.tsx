import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { CheckCircle2, BookOpen, HelpCircle, FileText, ArrowRight, TrendingUp } from 'lucide-react';
import { SubjectId } from '../../types';

export const SyllabusOverview: React.FC = () => {
  const {
    activeSubjects,
    setActiveSubjectId,
    setActiveTab,
    getSubjectProgress,
    getSubjectPYQStats,
    notes,
    getOverallSemesterProgress,
    currentSemester
  } = useStudy();

  const overall = getOverallSemesterProgress();

  const handleOpenSubject = (subjectId: SubjectId, tab: 'notes' | 'pyqs' | 'answers' | 'syllabus' = 'syllabus') => {
    setActiveSubjectId(subjectId);
    setActiveTab(tab);
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Semester Exam Readiness Index</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              Syllabus Completion & Revision Status
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Track your syllabus completion status before the exams. Check off units, master previous year questions (PYQs), and review verified solutions.
            </p>
          </div>

          <div className="flex items-center gap-6 bg-slate-950/60 px-6 py-4 rounded-xl border border-slate-800">
            <div className="text-center">
              <div className="text-3xl font-black text-indigo-400 font-mono">
                {overall.percentage}%
              </div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Completed</div>
            </div>
            <div className="h-10 w-[1px] bg-slate-800" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white font-mono">
                {overall.completed} <span className="text-slate-500 text-sm">/ {overall.total}</span>
              </div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Topics Mastered</div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-5 w-full bg-slate-800/80 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700/50">
          <div
            className="bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 h-full rounded-full transition-all duration-700 shadow-sm"
            style={{ width: `${overall.percentage}%` }}
          />
        </div>
      </div>

      {/* Per-Subject Completion Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {activeSubjects.map(subject => {
          const progress = getSubjectProgress(subject.id);
          const pyqStats = getSubjectPYQStats(subject.id);
          const subjectNotesCount = notes.filter(n => n.subjectId === subject.id).length;

          return (
            <div
              key={subject.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-700 hover:bg-slate-900 transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Subject Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-inner"
                      style={{
                        backgroundColor: `${subject.accentColor}20`,
                        color: subject.accentColor,
                        border: `1px solid ${subject.accentColor}40`
                      }}
                    >
                      {subject.code.split('-')[0] || 'SUB'}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-medium text-slate-400">
                        {subject.code} • {subject.credits} Credits
                      </span>
                      <h3 className="font-bold text-slate-100 group-hover:text-white transition-colors">
                        {subject.name}
                      </h3>
                    </div>
                  </div>

                  <span
                    className="font-mono text-sm font-bold px-2 py-0.5 rounded-lg"
                    style={{
                      backgroundColor: `${subject.accentColor}15`,
                      color: subject.accentColor
                    }}
                  >
                    {progress.percentage}%
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                  {subject.description}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Syllabus Covered</span>
                    <span className="font-mono font-medium text-slate-300">
                      {progress.completed} of {progress.total} topics
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${progress.percentage}%`,
                        backgroundColor: subject.accentColor
                      }}
                    />
                  </div>
                </div>

                {/* Mini Metric Chips */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <div className="truncate">
                      <span className="text-slate-400 block text-[10px]">PYQs Solved</span>
                      <strong className="text-slate-200 font-mono">
                        {pyqStats.solved} / {pyqStats.total}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                    <div className="truncate">
                      <span className="text-slate-400 block text-[10px]">Revision Notes</span>
                      <strong className="text-slate-200 font-mono">
                        {subjectNotesCount} {subjectNotesCount === 1 ? 'Note' : 'Notes'}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Jump Buttons to Sections */}
              <div className="pt-3 border-t border-slate-800/80">
                <div className="grid grid-cols-4 gap-1 text-[11px] font-medium text-slate-300 mb-2">
                  <button
                    onClick={() => handleOpenSubject(subject.id, 'notes')}
                    className="py-1.5 px-1 text-center rounded bg-slate-800/80 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                  >
                    Notes
                  </button>
                  <button
                    onClick={() => handleOpenSubject(subject.id, 'pyqs')}
                    className="py-1.5 px-1 text-center rounded bg-slate-800/80 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                  >
                    PYQs
                  </button>
                  <button
                    onClick={() => handleOpenSubject(subject.id, 'answers')}
                    className="py-1.5 px-1 text-center rounded bg-slate-800/80 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                  >
                    Answers
                  </button>
                  <button
                    onClick={() => handleOpenSubject(subject.id, 'syllabus')}
                    className="py-1.5 px-1 text-center rounded bg-slate-800/80 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                  >
                    Syllabus
                  </button>
                </div>

                <button
                  onClick={() => handleOpenSubject(subject.id, 'syllabus')}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Open Subject Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
