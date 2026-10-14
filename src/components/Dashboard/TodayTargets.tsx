import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { CheckSquare, Square, Plus, Trash2, Calendar, Sparkles, Filter } from 'lucide-react';
import { SubjectId } from '../../types';

export const TodayTargets: React.FC = () => {
  const { targets, toggleTarget, deleteTarget, addTarget, subjects } = useStudy();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubjectId, setNewSubjectId] = useState<SubjectId>(subjects[0]?.id || 'analog-circuits');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [newDueDate, setNewDueDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [filterMode, setFilterMode] = useState<'all' | 'pending' | 'completed'>('all');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTarget(newTitle.trim(), newSubjectId, newPriority, newDueDate);
    setNewTitle('');
    setShowAddForm(false);
  };

  const filteredTargets = targets.filter(t => {
    if (filterMode === 'pending') return !t.completed;
    if (filterMode === 'completed') return t.completed;
    return true;
  });

  const completedCount = targets.filter(t => t.completed).length;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Daily Study Targets & Checklist</h3>
            <p className="text-xs text-slate-400">
              {completedCount} of {targets.length} goals achieved today
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Pills */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                filterMode === 'all' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterMode('pending')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                filterMode === 'pending' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pending ({targets.length - completedCount})
            </button>
            <button
              onClick={() => setFilterMode('completed')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                filterMode === 'completed' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Done ({completedCount})
            </button>
          </div>

          <button
            onClick={() => setShowAddForm(prev => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Target</span>
          </button>
        </div>
      </div>

      {/* Add Target Inline Form */}
      {showAddForm && (
        <form onSubmit={handleAdd} className="mb-4 p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Target Description</label>
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="e.g. Master Bode plot asymptote rules and solve 2024 PYQ"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Subject</label>
              <select
                value={newSubjectId}
                onChange={e => setNewSubjectId(e.target.value as SubjectId)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Priority</label>
              <select
                value={newPriority}
                onChange={e => setNewPriority(e.target.value as 'High' | 'Medium' | 'Low')}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Target Date</label>
              <input
                type="date"
                value={newDueDate}
                onChange={e => setNewDueDate(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
            >
              Save Target
            </button>
          </div>
        </form>
      )}

      {/* Target Items List */}
      <div className="space-y-2">
        {filteredTargets.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs">
            No targets found in this view. Add a target to stay ahead of your exam prep!
          </div>
        ) : (
          filteredTargets.map(target => {
            const subject = subjects.find(s => s.id === target.subjectId);
            return (
              <div
                key={target.id}
                className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 group ${
                  target.completed
                    ? 'bg-slate-950/40 border-slate-850 opacity-60'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => toggleTarget(target.id)}
                    className="flex-shrink-0 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    {target.completed ? (
                      <CheckSquare className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-500 hover:text-slate-300" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <p
                      className={`text-xs font-medium transition-colors ${
                        target.completed ? 'line-through text-slate-500' : 'text-slate-200'
                      }`}
                    >
                      {target.title}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: subject?.accentColor || '#6366f1' }}
                        />
                        <span>{subject?.name || 'General'}</span>
                      </span>
                      <span>•</span>
                      <span className="font-mono text-[10px] text-slate-400">{target.dueDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded font-mono ${
                      target.priority === 'High'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : target.priority === 'Medium'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {target.priority}
                  </span>

                  <button
                    onClick={() => deleteTarget(target.id)}
                    className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    title="Delete target"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
