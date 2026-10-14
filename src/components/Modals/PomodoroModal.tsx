import React, { useState, useEffect } from 'react';
import { useStudy } from '../../context/StudyContext';
import { X, Play, Pause, RotateCcw, Timer, Sparkles, BookOpen } from 'lucide-react';
import { SubjectId } from '../../types';

export const PomodoroModal: React.FC = () => {
  const { isPomodoroOpen, setIsPomodoroOpen, subjects, activeSubjectId } = useStudy();

  const [mode, setMode] = useState<'study' | 'shortBreak' | 'longBreak'>('study');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>(
    activeSubjectId !== 'dashboard' ? activeSubjectId : subjects[0]?.id || 'analog-circuits'
  );

  // Time in seconds
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  // Mode durations
  const durations = {
    study: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === 'study') {
        setSessionsCompleted(prev => prev + 1);
        setMode('shortBreak');
        setTimeLeft(durations.shortBreak);
      } else {
        setMode('study');
        setTimeLeft(durations.study);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  if (!isPomodoroOpen) return null;

  const handleSwitchMode = (newMode: 'study' | 'shortBreak' | 'longBreak') => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(durations[newMode]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(durations[mode]);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const currentSubjectObj = subjects.find(s => s.id === selectedSubject);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 text-center space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Timer className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-sm text-white">Focus Study Session</h3>
              <p className="text-[11px] text-slate-400">Beat exam stress with timed focus blocks</p>
            </div>
          </div>

          <button
            onClick={() => setIsPomodoroOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preset Modes */}
        <div className="flex items-center justify-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => handleSwitchMode('study')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
              mode === 'study'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            25m Focus
          </button>
          <button
            onClick={() => handleSwitchMode('shortBreak')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
              mode === 'shortBreak'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            5m Break
          </button>
          <button
            onClick={() => handleSwitchMode('longBreak')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
              mode === 'longBreak'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            15m Rest
          </button>
        </div>

        {/* Subject Selection for Focus */}
        <div className="text-left bg-slate-950/60 p-3 rounded-2xl border border-slate-800 space-y-1">
          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            Studying Subject
          </label>
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value as SubjectId)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            {subjects.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.code})
              </option>
            ))}
          </select>
        </div>

        {/* Circular Display / Big Timer */}
        <div className="py-2">
          <div className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-white drop-shadow-md">
            {formattedTime}
          </div>
          <div className="text-xs text-slate-400 font-mono mt-2">
            {mode === 'study' ? (
              <span className="text-indigo-400">⚡ In Deep Focus Session</span>
            ) : (
              <span className="text-emerald-400">☕ Take a breath & hydrate</span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsRunning(prev => !prev)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold text-sm shadow-lg transition-all cursor-pointer ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Start Studying</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
            title="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
          Completed sessions today: <strong className="text-white font-mono">{sessionsCompleted}</strong>
        </div>
      </div>
    </div>
  );
};
