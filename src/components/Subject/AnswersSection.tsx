import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { AnswerItem, PYQItem, SubjectId } from '../../types';
import { AnswerModal } from './AnswerModal';
import {
  FileCheck2,
  Plus,
  Search,
  ExternalLink,
  Lightbulb,
  AlertCircle,
  Code,
  Trash2,
  Edit3,
  CheckCircle2
} from 'lucide-react';
import { FileAttachmentList } from '../Common/FileAttachmentList';

interface AnswersSectionProps {
  subjectId: SubjectId;
  initialFocusedAnswerId?: string | null;
}

export const AnswersSection: React.FC<AnswersSectionProps> = ({
  subjectId,
  initialFocusedAnswerId
}) => {
  const { answers, pyqs, addAnswer, updateAnswer, deleteAnswer } = useStudy();

  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerItem | null>(null);
  const [isViewOnly, setIsViewOnly] = useState(false);

  const subjectAnswers = answers.filter(a => a.subjectId === subjectId);

  const filteredAnswers = subjectAnswers.filter(a => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = a.questionTitle.toLowerCase().includes(q);
      const matchSol = a.fullMarkdownSolution.toLowerCase().includes(q);
      const matchText = a.questionText?.toLowerCase().includes(q);
      if (!matchTitle && !matchSol && !matchText) return false;
    }
    return true;
  });

  const handleOpenAdd = () => {
    setSelectedAnswer(null);
    setIsViewOnly(false);
    setModalOpen(true);
  };

  const handleOpenView = (ans: AnswerItem) => {
    setSelectedAnswer(ans);
    setIsViewOnly(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (ans: AnswerItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAnswer(ans);
    setIsViewOnly(false);
    setModalOpen(true);
  };

  const handleSaveAnswer = (answerData: any) => {
    if (answerData.id) {
      updateAnswer(answerData);
    } else {
      addAnswer(answerData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search model answers, proofs, or code..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Model Solution</span>
        </button>
      </div>

      {/* Answers List */}
      {filteredAnswers.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-8 space-y-3">
          <FileCheck2 className="w-8 h-8 text-slate-600 mx-auto" />
          <h4 className="text-sm font-semibold text-slate-300">No model solutions yet</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click "Add Model Solution" or head over to the PYQ tab and click "Add Solution" to write verified step-by-step answers for exam questions.
          </p>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create First Solution</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredAnswers.map(ans => {
            const linkedPyq = pyqs.find(p => p.id === ans.pyqId);
            const isHighlight = initialFocusedAnswerId === ans.id;

            return (
              <div
                key={ans.id}
                onClick={() => handleOpenView(ans)}
                className={`rounded-2xl border p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-md ${
                  isHighlight
                    ? 'border-emerald-500 bg-slate-900 ring-2 ring-emerald-500/30'
                    : 'border-slate-800 bg-slate-900/70 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Solution</span>
                      </span>
                      {linkedPyq && (
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          PYQ {linkedPyq.year} • {linkedPyq.marks}M
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={e => handleOpenEdit(ans, e)}
                        className="p-1.5 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Edit solution"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          if (confirm('Delete this solution?')) deleteAnswer(ans.id);
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Delete solution"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors mb-2 line-clamp-2">
                    {ans.questionTitle}
                  </h3>

                  {/* Step count & summary */}
                  {ans.stepByStepSolution && ans.stepByStepSolution.length > 0 && (
                    <div className="mb-3 space-y-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {ans.stepByStepSolution.length} Derivation Steps:
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 space-y-1 line-clamp-3">
                        {ans.stepByStepSolution.slice(0, 2).map((s, i) => (
                          <div key={i} className="truncate">
                            <strong className="text-emerald-400 font-mono">S{i + 1}:</strong> {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Attachments if any */}
                  {ans.attachments && ans.attachments.length > 0 && (
                    <div className="mb-3">
                      <FileAttachmentList attachments={ans.attachments} compact={true} />
                    </div>
                  )}

                  {/* Tips pill if present */}
                  {ans.examTips && (
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-300/90 truncate mb-2">
                      <Lightbulb className="w-3 h-3 text-amber-400 flex-shrink-0" />
                      <span className="truncate">Tip: {ans.examTips}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    {ans.codeSnippet && (
                      <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        {ans.codeSnippet.language} Code
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400 font-mono">
                      Reviewed: {ans.updatedAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform text-xs">
                    <span>Read Solution</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Answer Modal */}
      <AnswerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        answerToEdit={selectedAnswer}
        subjectId={subjectId}
        onSave={handleSaveAnswer}
        viewOnly={isViewOnly}
      />
    </div>
  );
};
