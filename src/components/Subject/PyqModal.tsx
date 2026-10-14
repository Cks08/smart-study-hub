import React, { useState, useEffect } from 'react';
import { PYQItem, SubjectId, FileAttachment } from '../../types';
import { X, Save, HelpCircle, Paperclip } from 'lucide-react';
import { FileUploadDropzone } from '../Common/FileUploadDropzone';

interface PyqModalProps {
  isOpen: boolean;
  onClose: () => void;
  pyqToEdit: PYQItem | null;
  subjectId: SubjectId;
  onSave: (pyqData: any) => void;
}

export const PyqModal: React.FC<PyqModalProps> = ({
  isOpen,
  onClose,
  pyqToEdit,
  subjectId,
  onSave
}) => {
  const [year, setYear] = useState<number>(2024);
  const [session, setSession] = useState<'End-Semester' | 'Mid-Semester' | 'Supplementary' | 'Internal Test'>('End-Semester');
  const [unitNumber, setUnitNumber] = useState<number>(1);
  const [topic, setTopic] = useState('');
  const [questionNumber, setQuestionNumber] = useState('Q1');
  const [marks, setMarks] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [status, setStatus] = useState<'unsolved' | 'in-progress' | 'solved'>('unsolved');
  const [questionText, setQuestionText] = useState('');
  const [userNotes, setUserNotes] = useState('');
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);

  useEffect(() => {
    if (pyqToEdit) {
      setYear(pyqToEdit.year);
      setSession(pyqToEdit.session);
      setUnitNumber(pyqToEdit.unitNumber);
      setTopic(pyqToEdit.topic);
      setQuestionNumber(pyqToEdit.questionNumber || 'Q1');
      setMarks(pyqToEdit.marks);
      setDifficulty(pyqToEdit.difficulty);
      setStatus(pyqToEdit.status);
      setQuestionText(pyqToEdit.questionText);
      setUserNotes(pyqToEdit.userNotes || '');
      setAttachments(pyqToEdit.attachments || []);
    } else {
      setYear(2024);
      setSession('End-Semester');
      setUnitNumber(1);
      setTopic('');
      setQuestionNumber('Q1');
      setMarks(10);
      setDifficulty('Medium');
      setStatus('unsolved');
      setQuestionText('');
      setUserNotes('');
      setAttachments([]);
    }
  }, [pyqToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() && attachments.length === 0) return;

    const payload: any = {
      subjectId,
      year: Number(year),
      session,
      unitNumber: Number(unitNumber),
      topic: topic.trim() || 'General Question',
      questionNumber: questionNumber.trim(),
      marks: Number(marks),
      difficulty,
      status,
      questionText: questionText.trim() || (attachments.length > 0 ? 'Question paper / problem sheet attached below.' : ''),
      userNotes: userNotes.trim() || undefined,
      attachments: attachments.length > 0 ? attachments : undefined
    };

    if (pyqToEdit) {
      payload.id = pyqToEdit.id;
      payload.associatedAnswerId = pyqToEdit.associatedAnswerId;
    }

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {pyqToEdit ? 'Edit Previous Year Question' : 'Add Previous Year Question (PYQ)'}
              </h2>
              <p className="text-xs text-slate-400">Input questions or attach actual exam question paper files</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form id="pyq-form" onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Exam Year *</label>
              <input
                type="number"
                required
                min={2015}
                max={2030}
                value={year}
                onChange={e => setYear(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Session</label>
              <select
                value={session}
                onChange={e => setSession(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="End-Semester">End-Semester</option>
                <option value="Mid-Semester">Mid-Semester</option>
                <option value="Supplementary">Supplementary</option>
                <option value="Internal Test">Internal Test</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Unit Number</label>
              <select
                value={unitNumber}
                onChange={e => setUnitNumber(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {[1, 2, 3, 4, 5].map(u => (
                  <option key={u} value={u}>Unit {u}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Marks *</label>
              <select
                value={marks}
                onChange={e => setMarks(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              >
                <option value={2}>2 Marks</option>
                <option value={5}>5 Marks</option>
                <option value={7}>7 Marks</option>
                <option value={10}>10 Marks</option>
                <option value={15}>15 Marks</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Question No.</label>
              <input
                type="text"
                value={questionNumber}
                onChange={e => setQuestionNumber(e.target.value)}
                placeholder="e.g. Q3 (b)"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Topic / Concept</label>
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g. BJT Hybrid-π Model"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Your Practice Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="unsolved">Pending / Unsolved</option>
                <option value="in-progress">In Progress</option>
                <option value="solved">Solved & Mastered</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Question Statement
            </label>
            <textarea
              rows={4}
              value={questionText}
              onChange={e => setQuestionText(e.target.value)}
              placeholder="Paste or write the exam question text, or upload a scanned paper below..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
            />
          </div>

          {/* Question Paper File Attachment */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
              <Paperclip className="w-3.5 h-3.5" />
              <span>Attach Exam Question Paper PDF or Question Photo</span>
            </div>
            <FileUploadDropzone
              attachments={attachments}
              onChange={setAttachments}
              maxFiles={3}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Notes / Hints / Frequency
            </label>
            <input
              type="text"
              value={userNotes}
              onChange={e => setUserNotes(e.target.value)}
              placeholder="e.g. High probability this semester! Repeated in 2024 & 2022."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-800 bg-slate-950/80">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="pyq-form"
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Question</span>
          </button>
        </div>
      </div>
    </div>
  );
};
