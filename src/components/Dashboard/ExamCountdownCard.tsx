import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { Calendar, Clock, MapPin, ArrowRight, AlertCircle, Edit3, Plus } from 'lucide-react';
import { ExamDeadline } from '../../types';

interface ExamCountdownCardProps {
  deadline: ExamDeadline;
  onEdit: (deadline: ExamDeadline) => void;
}

export const ExamCountdownCard: React.FC<ExamCountdownCardProps> = ({ deadline, onEdit }) => {
  const { subjects, setActiveSubjectId, setActiveTab, getDaysRemaining } = useStudy();

  const subject = subjects.find(s => s.id === deadline.subjectId);
  const hasDate = Boolean(deadline.examDate && deadline.examDate.trim());
  const daysLeft = hasDate ? getDaysRemaining(deadline.examDate) : null;

  // Status styling
  let urgencyBg = 'border-slate-800 bg-slate-900/60';
  let badgeStyle = 'bg-slate-800 text-slate-300';
  let daysColor = 'text-slate-100';

  if (!hasDate) {
    badgeStyle = 'bg-slate-800/80 text-amber-400 border border-amber-500/30';
    daysColor = 'text-amber-400';
  } else if (daysLeft !== null && daysLeft < 0) {
    badgeStyle = 'bg-slate-800 text-slate-400';
    daysColor = 'text-slate-500';
  } else if (daysLeft !== null && daysLeft <= 3) {
    urgencyBg = 'border-rose-500/40 bg-gradient-to-br from-rose-950/30 via-slate-900/80 to-slate-900/60';
    badgeStyle = 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse';
    daysColor = 'text-rose-400';
  } else if (daysLeft !== null && daysLeft <= 7) {
    urgencyBg = 'border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-slate-900/80 to-slate-900/60';
    badgeStyle = 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
    daysColor = 'text-amber-400';
  } else if (daysLeft !== null && daysLeft <= 15) {
    urgencyBg = 'border-indigo-500/30 bg-gradient-to-br from-indigo-950/20 via-slate-900/80 to-slate-900/60';
    badgeStyle = 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30';
    daysColor = 'text-indigo-400';
  } else {
    badgeStyle = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
    daysColor = 'text-emerald-400';
  }

  const handleSubjectClick = (tab: 'notes' | 'pyqs' | 'answers' | 'syllabus' = 'notes') => {
    setActiveSubjectId(deadline.subjectId);
    setActiveTab(tab);
  };

  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-200 hover:shadow-xl relative flex flex-col justify-between group ${urgencyBg}`}
    >
      {/* Top row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: subject?.accentColor || '#6366f1' }}
            />
            <div>
              <span className="text-xs font-mono font-semibold tracking-wider text-slate-400">
                {subject?.code || 'CORE'}
              </span>
              <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                {subject?.name || deadline.examName}
              </h3>
            </div>
          </div>

          <button
            onClick={() => onEdit(deadline)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Edit exam date, venue, or marks"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Countdown display */}
        <div className="my-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Exam Date</div>
            <div className="text-sm font-semibold text-slate-200 flex items-center gap-1.5 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {hasDate ? (
                new Date(deadline.examDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })
              ) : (
                <span className="text-slate-400 italic text-xs">Date Pending</span>
              )}
            </div>
          </div>

          <div className="text-right">
            {!hasDate ? (
              <button
                onClick={() => onEdit(deadline)}
                className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 font-semibold cursor-pointer transition-colors"
              >
                + Set Date
              </button>
            ) : daysLeft !== null && daysLeft < 0 ? (
              <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${badgeStyle}`}>
                Completed
              </span>
            ) : daysLeft === 0 ? (
              <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${badgeStyle}`}>
                🔥 Exam Today!
              </span>
            ) : daysLeft === 1 ? (
              <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${badgeStyle}`}>
                ⚠️ Tomorrow!
              </span>
            ) : (
              <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${badgeStyle}`}>
                <span className={`text-sm ${daysColor}`}>{daysLeft}</span> Days Left
              </span>
            )}
          </div>
        </div>

        {/* Timings, Venue & Marks */}
        <div className="space-y-1.5 text-xs text-slate-400 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{deadline.examTime}</span>
          </div>
          {deadline.venueOrRoom && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span className="truncate">{deadline.venueOrRoom}</span>
            </div>
          )}
          {deadline.notes && (
            <p className="text-[11px] text-slate-500 line-clamp-2 italic pt-1 border-t border-slate-800/60">
              💡 {deadline.notes}
            </p>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div className="text-[11px] text-slate-400">
          Target: <strong className="text-slate-200">{deadline.totalMarks} Marks</strong>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleSubjectClick('pyqs')}
            className="text-[11px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            PYQs
          </button>
          <button
            onClick={() => handleSubjectClick('notes')}
            className="text-[11px] px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Notes</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
