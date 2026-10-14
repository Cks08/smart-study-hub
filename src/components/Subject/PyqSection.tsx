import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { PYQItem, SubjectId } from '../../types';
import { PyqModal } from './PyqModal';
import {
  HelpCircle,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit3,
  Trash2,
  FileCheck2,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

import { FileAttachmentList } from '../Common/FileAttachmentList';

interface PyqSectionProps {
  subjectId: SubjectId;
  onOpenAnswer: (answerId: string) => void;
  onCreateAnswerForPyq: (pyq: PYQItem) => void;
}

export const PyqSection: React.FC<PyqSectionProps> = ({
  subjectId,
  onOpenAnswer,
  onCreateAnswerForPyq
}) => {
  const {
    pyqs,
    addPYQ,
    updatePYQ,
    deletePYQ,
    updatePYQStatus,
    answers,
    getSubjectPYQStats
  } = useStudy();

  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPyq, setEditingPyq] = useState<PYQItem | null>(null);

  const subjectPyqs = pyqs.filter(p => p.subjectId === subjectId);
  const stats = getSubjectPYQStats(subjectId);

  // Available years in dataset
  const uniqueYears = Array.from(new Set(subjectPyqs.map(p => p.year))).sort((a, b) => b - a);

  const filteredPyqs = subjectPyqs.filter(p => {
    if (selectedYear !== 'all' && p.year !== Number(selectedYear)) return false;
    if (selectedUnit !== 'all' && p.unitNumber !== Number(selectedUnit)) return false;
    if (selectedStatus !== 'all' && p.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = p.questionText.toLowerCase().includes(q);
      const matchTopic = p.topic.toLowerCase().includes(q);
      const matchNotes = p.userNotes?.toLowerCase().includes(q);
      if (!matchText && !matchTopic && !matchNotes) return false;
    }
    return true;
  });

  const handleOpenAdd = () => {
    setEditingPyq(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pyq: PYQItem) => {
    setEditingPyq(pyq);
    setIsModalOpen(true);
  };

  const handleSavePyq = (pyqData: any) => {
    if (pyqData.id) {
      updatePYQ(pyqData);
    } else {
      addPYQ(pyqData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <span className="text-xl font-bold font-mono text-white block">{stats.total}</span>
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
            Total PYQs
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-center">
          <span className="text-xl font-bold font-mono text-emerald-400 block">{stats.solved}</span>
          <span className="text-[11px] text-emerald-400/80 uppercase tracking-wider font-medium">
            Solved & Mastered
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/20 text-center">
          <span className="text-xl font-bold font-mono text-amber-400 block">{stats.inProgress}</span>
          <span className="text-[11px] text-amber-400/80 uppercase tracking-wider font-medium">
            In Progress
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-center">
          <span className="text-xl font-bold font-mono text-rose-400 block">{stats.unsolved}</span>
          <span className="text-[11px] text-rose-400/80 uppercase tracking-wider font-medium">
            Pending Practice
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search questions by topic, formula, or text..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="all">All Exam Years</option>
            {uniqueYears.map(yr => (
              <option key={yr} value={yr}>
                {yr} Papers
              </option>
            ))}
          </select>

          {/* Unit Filter */}
          <select
            value={selectedUnit}
            onChange={e => setSelectedUnit(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="all">All Units</option>
            <option value="1">Unit 1</option>
            <option value="2">Unit 2</option>
            <option value="3">Unit 3</option>
            <option value="4">Unit 4</option>
            <option value="5">Unit 5</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="solved">Solved</option>
            <option value="in-progress">In Progress</option>
            <option value="unsolved">Pending</option>
          </select>

          {/* Add PYQ Button */}
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add PYQ</span>
          </button>
        </div>
      </div>

      {/* PYQ List */}
      {filteredPyqs.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-8 space-y-3">
          <HelpCircle className="w-8 h-8 text-slate-600 mx-auto" />
          <h4 className="text-sm font-semibold text-slate-300">No questions found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your year/unit filters, or click "Add PYQ" to add questions from past university papers.
          </p>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New PYQ</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPyqs.map(pyq => {
            const hasAnswer = Boolean(
              pyq.associatedAnswerId && answers.some(a => a.id === pyq.associatedAnswerId)
            );

            return (
              <div
                key={pyq.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 hover:border-slate-700 transition-all duration-200 space-y-3 group shadow-sm"
              >
                {/* PYQ Header */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {pyq.year} {pyq.session}
                    </span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      Unit {pyq.unitNumber}
                    </span>
                    {pyq.questionNumber && (
                      <span className="font-mono text-xs text-slate-400">
                        {pyq.questionNumber}
                      </span>
                    )}
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {pyq.marks} Marks
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status Pill Switcher */}
                    <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-xs">
                      <button
                        onClick={() => updatePYQStatus(pyq.id, 'unsolved')}
                        className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                          pyq.status === 'unsolved'
                            ? 'bg-rose-500/20 text-rose-300 font-semibold'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                        title="Mark as Pending / Unsolved"
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => updatePYQStatus(pyq.id, 'in-progress')}
                        className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                          pyq.status === 'in-progress'
                            ? 'bg-amber-500/20 text-amber-300 font-semibold'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                        title="Mark as In Progress"
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => updatePYQStatus(pyq.id, 'solved')}
                        className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                          pyq.status === 'solved'
                            ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                        title="Mark as Solved"
                      >
                        Solved ✓
                      </button>
                    </div>

                    <button
                      onClick={() => handleOpenEdit(pyq)}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Edit PYQ"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this question?')) deletePYQ(pyq.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Delete PYQ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Topic Subtitle */}
                <div className="text-xs font-semibold text-slate-400">
                  Topic: <span className="text-slate-200">{pyq.topic}</span>
                </div>

                {/* Question Text */}
                <p className="text-sm font-medium text-slate-100 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  {pyq.questionText}
                </p>

                {/* Attached Question Papers / Scans */}
                {pyq.attachments && pyq.attachments.length > 0 && (
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <FileAttachmentList attachments={pyq.attachments} />
                  </div>
                )}

                {/* Optional User Notes */}
                {pyq.userNotes && (
                  <p className="text-xs text-amber-300/80 italic flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Exam note: {pyq.userNotes}</span>
                  </p>
                )}

                {/* Footer Actions: Link to Model Answer */}
                <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800/60">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="font-mono text-[11px]">Difficulty: {pyq.difficulty}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasAnswer ? (
                      <button
                        onClick={() => onOpenAnswer(pyq.associatedAnswerId!)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer group/btn"
                      >
                        <FileCheck2 className="w-3.5 h-3.5 text-indigo-200" />
                        <span>View Verified Answer</span>
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onCreateAnswerForPyq(pyq)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Solution / Answer</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit PYQ Modal */}
      <PyqModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pyqToEdit={editingPyq}
        subjectId={subjectId}
        onSave={handleSavePyq}
      />
    </div>
  );
};
