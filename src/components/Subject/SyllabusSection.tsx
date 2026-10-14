import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { SubjectId, SyllabusUnit } from '../../types';
import {
  CheckSquare,
  Square,
  Plus,
  ChevronDown,
  ChevronUp,
  Clock,
  Layers,
  Sparkles,
  Award,
  Trash2,
  FolderPlus
} from 'lucide-react';

interface SyllabusSectionProps {
  subjectId: SubjectId;
}

export const SyllabusSection: React.FC<SyllabusSectionProps> = ({ subjectId }) => {
  const {
    syllabus,
    toggleTopicCompletion,
    addTopic,
    deleteTopic,
    addUnit,
    deleteUnit,
    getSubjectProgress,
    subjects
  } = useStudy();

  const currentSubject = subjects.find(s => s.id === subjectId);
  const units: SyllabusUnit[] = syllabus[subjectId] || [];

  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    units.forEach(u => {
      initial[u.id] = true;
    });
    return initial;
  });

  const [addingToUnitId, setAddingToUnitId] = useState<string | null>(null);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicDiff, setNewTopicDiff] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [newTopicHours, setNewTopicHours] = useState(3);

  // Add unit state
  const [showAddUnitForm, setShowAddUnitForm] = useState(false);
  const [newUnitTitle, setNewUnitTitle] = useState('');
  const [newUnitMarks, setNewUnitMarks] = useState(20);

  const progress = getSubjectProgress(subjectId);

  const toggleExpand = (unitId: string) => {
    setExpandedUnits(prev => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const handleAddTopicSubmit = (unitId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) return;
    addTopic(subjectId, unitId, newTopicTitle.trim(), newTopicDiff, newTopicHours);
    setNewTopicTitle('');
    setAddingToUnitId(null);
  };

  const handleAddUnitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUnitTitle.trim()) return;
    addUnit(subjectId, newUnitTitle.trim(), Number(newUnitMarks));
    setNewUnitTitle('');
    setShowAddUnitForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Subject Syllabus Completion Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/90 border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Syllabus Tracking & Unit Checklist</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            {currentSubject?.name} Curriculum Coverage
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Check off topics as you study them before the exam. All progress is calculated in real time based on your inputs.
          </p>
        </div>

        <div className="flex items-center gap-6 bg-slate-950/80 px-6 py-3.5 rounded-xl border border-slate-800">
          <div>
            <div className="text-3xl font-black font-mono" style={{ color: currentSubject?.accentColor || '#6366f1' }}>
              {progress.percentage}%
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Subject Progress
            </div>
          </div>
          <div className="h-10 w-[1px] bg-slate-800" />
          <div>
            <div className="text-xl font-bold text-white font-mono">
              {progress.completed} <span className="text-slate-500 text-xs">/ {progress.total}</span>
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Topics Mastered
            </div>
          </div>
        </div>
      </div>

      {/* Units List */}
      <div className="space-y-4">
        {units.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-8 space-y-3">
            <Layers className="w-8 h-8 text-slate-600 mx-auto" />
            <h4 className="text-sm font-semibold text-slate-300">No syllabus units yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Add your syllabus units and chapters to start tracking your completion before the exams.
            </p>
            <button
              onClick={() => setShowAddUnitForm(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add First Unit</span>
            </button>
          </div>
        ) : (
          units.map(unit => {
            const isExpanded = expandedUnits[unit.id] ?? true;
            const completedInUnit = unit.topics.filter(t => t.isCompleted).length;
            const totalInUnit = unit.topics.length;
            const unitPct = totalInUnit === 0 ? 0 : Math.round((completedInUnit / totalInUnit) * 100);

            return (
              <div
                key={unit.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden shadow-sm transition-all"
              >
                {/* Unit Header Bar */}
                <div
                  onClick={() => toggleExpand(unit.id)}
                  className="px-6 py-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-850/60 transition-colors select-none"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs"
                      style={{
                        backgroundColor: `${currentSubject?.accentColor || '#6366f1'}20`,
                        color: currentSubject?.accentColor || '#6366f1'
                      }}
                    >
                      U{unit.unitNumber}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-white">{unit.title}</h3>
                        {unit.examWeightageMarks && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            ~{unit.examWeightageMarks} Marks in Exam
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">
                        {completedInUnit} of {totalInUnit} topics completed ({unitPct}%)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Unit Progress Bar */}
                    <div className="w-24 sm:w-32 bg-slate-800 rounded-full h-2 overflow-hidden hidden sm:block">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${unitPct}%`,
                          backgroundColor: currentSubject?.accentColor || '#6366f1'
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        if (confirm(`Delete Unit ${unit.unitNumber}: ${unit.title}?`)) {
                          deleteUnit(subjectId, unit.id);
                        }
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Delete unit"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      className="p-1 text-slate-400 hover:text-white transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Topics Container */}
                {isExpanded && (
                  <div className="px-6 pb-5 pt-1 space-y-2 border-t border-slate-800/60 bg-slate-950/40">
                    {unit.topics.length === 0 ? (
                      <div className="text-center py-4 text-xs text-slate-500">
                        No topics in this unit yet. Add topics below to track your revision.
                      </div>
                    ) : (
                      unit.topics.map(topic => (
                        <div
                          key={topic.id}
                          onClick={() => toggleTopicCompletion(subjectId, unit.id, topic.id)}
                          className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer group ${
                            topic.isCompleted
                              ? 'bg-slate-950/30 border-slate-850 opacity-70'
                              : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <button
                              type="button"
                              className="flex-shrink-0 text-slate-500 group-hover:text-emerald-400 transition-colors"
                            >
                              {topic.isCompleted ? (
                                <CheckSquare className="w-5 h-5 text-emerald-400" />
                              ) : (
                                <Square className="w-5 h-5 text-slate-600 group-hover:text-slate-400" />
                              )}
                            </button>
                            <span
                              className={`text-xs font-medium transition-colors ${
                                topic.isCompleted ? 'line-through text-slate-500' : 'text-slate-200'
                              }`}
                            >
                              {topic.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {topic.estimatedHours && (
                              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono hidden sm:flex">
                                <Clock className="w-3 h-3" />
                                <span>{topic.estimatedHours}h study</span>
                              </span>
                            )}

                            {topic.difficulty && (
                              <span
                                className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                                  topic.difficulty === 'Hard'
                                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                    : topic.difficulty === 'Medium'
                                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                }`}
                              >
                                {topic.difficulty}
                              </span>
                            )}

                            <button
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                deleteTopic(subjectId, unit.id, topic.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-all cursor-pointer"
                              title="Delete topic"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}

                    {/* Add Topic Inline Form */}
                    {addingToUnitId === unit.id ? (
                      <form
                        onSubmit={e => handleAddTopicSubmit(unit.id, e)}
                        className="mt-3 p-3 rounded-xl bg-slate-900 border border-indigo-500/30 space-y-3"
                      >
                        <div>
                          <input
                            type="text"
                            required
                            value={newTopicTitle}
                            onChange={e => setNewTopicTitle(e.target.value)}
                            placeholder="Topic title (e.g. Current mirror active load analysis)..."
                            className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                            autoFocus
                          />
                        </div>
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <select
                              value={newTopicDiff}
                              onChange={e => setNewTopicDiff(e.target.value as any)}
                              className="px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-300"
                            >
                              <option value="Easy">Easy</option>
                              <option value="Medium">Medium</option>
                              <option value="Hard">Hard</option>
                            </select>
                            <input
                              type="number"
                              min={1}
                              max={20}
                              value={newTopicHours}
                              onChange={e => setNewTopicHours(Number(e.target.value))}
                              className="w-16 px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-300 font-mono"
                              title="Estimated hours"
                            />
                            <span className="text-xs text-slate-400">hours</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setAddingToUnitId(null)}
                              className="text-xs text-slate-400 hover:text-white px-2 py-1 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="text-xs font-semibold px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg cursor-pointer"
                            >
                              Add to Unit
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <button
                        onClick={() => setAddingToUnitId(unit.id)}
                        className="mt-2 w-full py-2 px-3 border border-dashed border-slate-800 rounded-xl text-xs text-slate-400 hover:text-slate-200 hover:border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Topic to Unit {unit.unitNumber}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Add New Unit Section */}
        {showAddUnitForm ? (
          <form
            onSubmit={handleAddUnitSubmit}
            className="p-5 rounded-2xl border border-indigo-500/30 bg-slate-900/80 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <FolderPlus className="w-4 h-4 text-indigo-400" />
                <span>Add New Syllabus Unit</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowAddUnitForm(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Unit Title *</label>
                <input
                  type="text"
                  required
                  value={newUnitTitle}
                  onChange={e => setNewUnitTitle(e.target.value)}
                  placeholder="e.g. Unit 6: Advanced Topics & State Estimation"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Exam Weightage (Marks)</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={newUnitMarks}
                  onChange={e => setNewUnitMarks(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddUnitForm(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Create Unit
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowAddUnitForm(true)}
            className="w-full py-3 border border-dashed border-slate-800 hover:border-slate-700 rounded-2xl bg-slate-900/30 text-xs font-semibold text-slate-400 hover:text-indigo-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <FolderPlus className="w-4 h-4 text-indigo-400" />
            <span>+ Add New Unit to {currentSubject?.name} Syllabus</span>
          </button>
        )}
      </div>
    </div>
  );
};
