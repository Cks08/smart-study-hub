import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import {
  GraduationCap,
  LayoutDashboard,
  Search,
  Timer,
  Settings2,
  Calendar,
  User,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  onOpenSettings: () => void;
  onOpenDeadlineModal: () => void;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSettings,
  onOpenDeadlineModal,
  onOpenProfile,
  onOpenAuth
}) => {
  const {
    activeSubjectId,
    setActiveSubjectId,
    activeSubjects,
    setIsSearchOpen,
    setIsPomodoroOpen,
    getOverallSemesterProgress,
    deadlines,
    getDaysRemaining,
    currentSemester,
    setCurrentSemester,
    currentUser
  } = useStudy();

  const [isSemDropdownOpen, setIsSemDropdownOpen] = useState(false);
  const overallProgress = getOverallSemesterProgress();

  // Find the next upcoming exam for current semester
  const upcomingExams = [...deadlines]
    .map(d => ({ ...d, days: getDaysRemaining(d.examDate) }))
    .filter(d => d.days >= 0)
    .sort((a, b) => a.days - b.days);

  const nearestExam = upcomingExams[0];
  const nearestSubject = nearestExam ? activeSubjects.find(s => s.id === nearestExam.subjectId) : null;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      {/* Top utility ticker banner */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-slate-300">
            {currentUser?.university || 'Engineering Portal'}
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-indigo-400 font-semibold">Semester {currentSemester}</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-slate-400">{currentUser?.branch || 'Core Subjects'}</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          {nearestExam && (
            <button
              onClick={onOpenDeadlineModal}
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer group"
              title="Click to view full exam timetable"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>
                Next Exam: <strong className="text-amber-400">{nearestSubject?.name || nearestExam.examName}</strong>
              </span>
              <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono text-[11px] border border-amber-500/30">
                {nearestExam.days === 0 ? 'Today!' : nearestExam.days === 1 ? 'Tomorrow!' : `${nearestExam.days}d left`}
              </span>
            </button>
          )}

          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-800">
            <span className="text-slate-400">Syllabus:</span>
            <div className="w-16 bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${overallProgress.percentage}%` }}
              />
            </div>
            <span className="font-semibold text-emerald-400">{overallProgress.percentage}%</span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Semester Switcher Dropdown */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSubjectId('dashboard')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/10 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
                  SemVault
                  <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Sem {currentSemester}
                  </span>
                </span>
                <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">Notes • PYQ • Answers • Syllabus</p>
              </div>
            </button>

            {/* Semester Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSemDropdownOpen(prev => !prev)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-indigo-300 font-semibold cursor-pointer transition-colors"
                title="Change active semester"
              >
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Sem {currentSemester}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isSemDropdownOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50">
                  <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 mb-1">
                    Select Semester
                  </div>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                    <button
                      key={sem}
                      onClick={() => {
                        setCurrentSemester(sem);
                        setIsSemDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 cursor-pointer ${
                        currentSemester === sem
                          ? 'text-indigo-400 font-bold bg-indigo-500/10'
                          : 'text-slate-300'
                      }`}
                    >
                      <span>Semester {sem}</span>
                      {currentSemester === sem && (
                        <span className="text-[10px] font-mono px-1 rounded bg-indigo-500/20 text-indigo-300">
                          Active
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Subject Switcher Buttons (Desktop / Tablet) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setActiveSubjectId('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeSubjectId === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            {activeSubjects.map(subject => {
              const isActive = activeSubjectId === subject.id;
              return (
                <button
                  key={subject.id}
                  onClick={() => setActiveSubjectId(subject.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                  style={{
                    borderLeft: isActive ? `3px solid ${subject.accentColor}` : undefined
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: subject.accentColor }}
                  />
                  <span>{subject.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Tools: Search, Pomodoro, Profile, Settings */}
          <div className="flex items-center gap-2">
            {/* Quick Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg hover:text-slate-200 transition-colors cursor-pointer"
              title="Search notes, questions, and solutions (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Focus / Pomodoro Timer */}
            <button
              onClick={() => setIsPomodoroOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg hover:text-white transition-colors cursor-pointer"
              title="Focus Study Timer"
            >
              <Timer className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden md:inline">Focus</span>
            </button>

            {/* Exam Deadlines Schedule */}
            <button
              onClick={onOpenDeadlineModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg hover:text-white transition-colors cursor-pointer"
              title="View and edit Exam Dates"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Dates</span>
            </button>

            {/* Personalized Profile / Email Login Pill */}
            {currentUser ? (
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-medium text-slate-200 hover:text-white transition-all cursor-pointer group"
                title="View & customize student profile"
              >
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-sm"
                  style={{ backgroundColor: currentUser.avatarColor || '#6366f1' }}
                >
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left truncate max-w-[90px]">
                  <div className="truncate font-semibold text-white leading-tight">
                    {currentUser.name.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-indigo-400 font-mono leading-tight">
                    {currentUser.targetCgpa ? `${currentUser.targetCgpa} CGPA` : 'Profile'}
                  </div>
                </div>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Data & Backup Settings */}
            <button
              onClick={onOpenSettings}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Backup, Restore & Custom Subjects"
            >
              <Settings2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Scrollable Subject Tabs */}
        <div className="flex lg:hidden overflow-x-auto pb-2.5 pt-1 gap-1.5 no-scrollbar border-t border-slate-800/60">
          <button
            onClick={() => setActiveSubjectId('dashboard')}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              activeSubjectId === 'dashboard'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
          {activeSubjects.map(s => {
            const isActive = activeSubjectId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSubjectId(s.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
                style={{
                  borderLeft: isActive ? `3px solid ${s.accentColor}` : undefined
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: s.accentColor }}
                />
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
