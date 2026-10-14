import React, { useState, useEffect } from 'react';
import { AnswerItem, PYQItem, SubjectId, FileAttachment } from '../../types';
import { X, Save, Copy, Check, FileCheck2, AlertCircle, Lightbulb, Code, Paperclip } from 'lucide-react';
import { FileUploadDropzone } from '../Common/FileUploadDropzone';
import { FileAttachmentList } from '../Common/FileAttachmentList';

interface AnswerModalProps {
  isOpen: boolean;
  onClose: () => void;
  answerToEdit: AnswerItem | null;
  subjectId: SubjectId;
  associatedPyq?: PYQItem | null;
  onSave: (answerData: any) => void;
  viewOnly?: boolean;
}

export const AnswerModal: React.FC<AnswerModalProps> = ({
  isOpen,
  onClose,
  answerToEdit,
  subjectId,
  associatedPyq,
  onSave,
  viewOnly = false
}) => {
  const [isEditing, setIsEditing] = useState(!viewOnly || !answerToEdit);
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [stepsInput, setStepsInput] = useState('');
  const [fullSolution, setFullSolution] = useState('');
  const [examTips, setExamTips] = useState('');
  const [commonPitfalls, setCommonPitfalls] = useState('');
  const [codeLang, setCodeLang] = useState('java');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (answerToEdit) {
      setQuestionTitle(answerToEdit.questionTitle);
      setQuestionText(answerToEdit.questionText || '');
      setStepsInput(answerToEdit.stepByStepSolution.join('\n'));
      setFullSolution(answerToEdit.fullMarkdownSolution);
      setExamTips(answerToEdit.examTips || '');
      setCommonPitfalls(answerToEdit.commonPitfalls || '');
      setCodeLang(answerToEdit.codeSnippet?.language || 'java');
      setCodeSnippet(answerToEdit.codeSnippet?.code || '');
      setAttachments(answerToEdit.attachments || []);
      setIsEditing(!viewOnly);
    } else if (associatedPyq) {
      setQuestionTitle(`Solution: ${associatedPyq.topic} (${associatedPyq.year} - ${associatedPyq.marks}M)`);
      setQuestionText(associatedPyq.questionText);
      setStepsInput('Step 1: State the governing equations and assumptions.\nStep 2: Apply the relevant theorem or mathematical formula.\nStep 3: Simplify and state final result with units.');
      setFullSolution('### Detailed Derivation / Working\n\n');
      setExamTips('');
      setCommonPitfalls('');
      setCodeLang('java');
      setCodeSnippet('');
      setAttachments([]);
      setIsEditing(true);
    } else {
      setQuestionTitle('');
      setQuestionText('');
      setStepsInput('');
      setFullSolution('');
      setExamTips('');
      setCommonPitfalls('');
      setCodeLang('java');
      setCodeSnippet('');
      setAttachments([]);
      setIsEditing(true);
    }
  }, [answerToEdit, associatedPyq, viewOnly, isOpen]);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    if (!codeSnippet) return;
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionTitle.trim()) return;

    const steps = stepsInput
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const payload: any = {
      subjectId,
      pyqId: associatedPyq?.id || answerToEdit?.pyqId,
      questionTitle: questionTitle.trim(),
      questionText: questionText.trim() || undefined,
      stepByStepSolution: steps.length > 0 ? steps : ['Step 1: Solution provided in attached files and notes below.'],
      fullMarkdownSolution: fullSolution.trim() || (attachments.length > 0 ? 'Model solution document attached below.' : ''),
      examTips: examTips.trim() || undefined,
      commonPitfalls: commonPitfalls.trim() || undefined,
      attachments: attachments.length > 0 ? attachments : undefined,
      codeSnippet: codeSnippet.trim()
        ? {
            language: codeLang,
            code: codeSnippet.trim()
          }
        : undefined
    };

    if (answerToEdit) {
      payload.id = answerToEdit.id;
    }

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {isEditing ? (answerToEdit ? 'Edit Answer' : 'Add Model Solution') : 'Verified Model Answer'}
              </h2>
              <span className="text-xs text-slate-400">Step-by-step breakdown & exam marking guide</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              >
                Edit Solution
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {isEditing ? (
            <form id="answer-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Question / Solution Title *
                </label>
                <input
                  type="text"
                  required
                  value={questionTitle}
                  onChange={e => setQuestionTitle(e.target.value)}
                  placeholder="e.g. CE Amplifier with unbypassed Re (Av, Rin, Rout derivation)"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Associated Question Statement
                </label>
                <textarea
                  rows={2}
                  value={questionText}
                  onChange={e => setQuestionText(e.target.value)}
                  placeholder="The original university exam question statement..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>

              {/* Attach Solution PDF / Image */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Attach Handwritten Solution Photos, Derivation PDF, or Diagrams</span>
                </div>
                <FileUploadDropzone
                  attachments={attachments}
                  onChange={setAttachments}
                  maxFiles={5}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Step-by-Step Breakdown (one step per line)
                </label>
                <textarea
                  rows={3}
                  value={stepsInput}
                  onChange={e => setStepsInput(e.target.value)}
                  placeholder="Step 1: Draw Hybrid-pi small signal equivalent circuit&#10;Step 2: Formulate KVL around the input loop&#10;Step 3: Calculate Av = Vout / Vin"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Detailed Solution & Derivations (Markdown / Equations)
                </label>
                <textarea
                  rows={6}
                  value={fullSolution}
                  onChange={e => setFullSolution(e.target.value)}
                  placeholder="Provide complete mathematical working, circuit equations, or proofs..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    Exam Marking Tip (How to get full marks)
                  </label>
                  <input
                    type="text"
                    value={examTips}
                    onChange={e => setExamTips(e.target.value)}
                    placeholder="e.g. Always write units for oscillation frequency!"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-rose-300 mb-1">
                    Common Pitfall / Exam Trap
                  </label>
                  <input
                    type="text"
                    value={commonPitfalls}
                    onChange={e => setCommonPitfalls(e.target.value)}
                    placeholder="e.g. Missing the negative sign in voltage gain Av"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Optional Code / Query Solution (Java / SQL)
                  </label>
                  <select
                    value={codeLang}
                    onChange={e => setCodeLang(e.target.value)}
                    className="px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-[11px] text-slate-300"
                  >
                    <option value="java">Java</option>
                    <option value="sql">SQL</option>
                    <option value="cpp">C++</option>
                  </select>
                </div>
                <textarea
                  rows={3}
                  value={codeSnippet}
                  onChange={e => setCodeSnippet(e.target.value)}
                  placeholder="// Paste tested Java code or SQL query..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-emerald-400 font-mono placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </form>
          ) : (
            /* View Mode */
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-bold text-white mb-2">{answerToEdit?.questionTitle}</h1>
                {answerToEdit?.questionText && (
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed italic">
                    "{answerToEdit.questionText}"
                  </div>
                )}
              </div>

              {/* Solution Attachments */}
              {answerToEdit?.attachments && answerToEdit.attachments.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <FileAttachmentList attachments={answerToEdit.attachments} />
                </div>
              )}

              {/* Step by step checklist */}
              {answerToEdit?.stepByStepSolution && answerToEdit.stepByStepSolution.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                    Step-by-Step Derivation Flow
                  </span>
                  <div className="space-y-2">
                    {answerToEdit.stepByStepSolution.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3 text-xs text-slate-200"
                      >
                        <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div className="leading-relaxed font-sans">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Markdown Solution */}
              {answerToEdit?.fullMarkdownSolution && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Complete Model Solution
                  </span>
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                    {answerToEdit.fullMarkdownSolution}
                  </div>
                </div>
              )}

              {/* Code Snippet Box */}
              {answerToEdit?.codeSnippet && (
                <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
                  <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-emerald-400 font-semibold uppercase flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5" />
                      {answerToEdit.codeSnippet.language} Solution
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 text-[11px]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span className="text-[11px]">Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    <code>{answerToEdit.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {/* Tips & Pitfalls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {answerToEdit?.examTips && (
                  <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Exam Tip</span>
                    </div>
                    <p className="text-amber-200/90 leading-relaxed">{answerToEdit.examTips}</p>
                  </div>
                )}

                {answerToEdit?.commonPitfalls && (
                  <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-rose-400 font-bold uppercase tracking-wider text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Common Exam Pitfall</span>
                    </div>
                    <p className="text-rose-200/90 leading-relaxed">{answerToEdit.commonPitfalls}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/80">
          <span className="text-xs text-slate-400">
            {answerToEdit?.updatedAt ? `Last reviewed: ${answerToEdit.updatedAt}` : 'Save to store in vault'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close
            </button>
            {isEditing && (
              <button
                type="submit"
                form="answer-form"
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer shadow-lg shadow-emerald-600/20"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Model Answer</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
