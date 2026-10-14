import React, { useState, useEffect } from 'react';
import { NoteItem, SubjectId, FileAttachment } from '../../types';
import { X, Save, Bookmark, Tag, BookOpen, Code, ListChecks, Paperclip } from 'lucide-react';
import { FileUploadDropzone } from '../Common/FileUploadDropzone';
import { FileAttachmentList } from '../Common/FileAttachmentList';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  noteToEdit: NoteItem | null;
  subjectId: SubjectId;
  onSave: (noteData: any) => void;
  viewOnly?: boolean;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  noteToEdit,
  subjectId,
  onSave,
  viewOnly = false
}) => {
  const [isEditing, setIsEditing] = useState(!viewOnly || !noteToEdit);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [unitNumber, setUnitNumber] = useState<number>(1);
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [tagsInput, setTagsInput] = useState('');
  const [content, setContent] = useState('');
  const [keyTakeawaysInput, setKeyTakeawaysInput] = useState('');
  const [codeLang, setCodeLang] = useState('java');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setTopic(noteToEdit.topic);
      setUnitNumber(noteToEdit.unitNumber || 1);
      setPriority(noteToEdit.priority);
      setTagsInput(noteToEdit.tags.join(', '));
      setContent(noteToEdit.content);
      setKeyTakeawaysInput(noteToEdit.keyTakeaways ? noteToEdit.keyTakeaways.join('\n') : '');
      setCodeLang(noteToEdit.codeSnippet?.language || 'java');
      setCodeSnippet(noteToEdit.codeSnippet?.code || '');
      setIsBookmarked(noteToEdit.isBookmarked);
      setAttachments(noteToEdit.attachments || []);
      setIsEditing(!viewOnly);
    } else {
      setTitle('');
      setTopic('');
      setUnitNumber(1);
      setPriority('High');
      setTagsInput('Exam High Yield, Derivation');
      setContent('');
      setKeyTakeawaysInput('');
      setCodeLang('java');
      setCodeSnippet('');
      setIsBookmarked(false);
      setAttachments([]);
      setIsEditing(true);
    }
  }, [noteToEdit, viewOnly, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const keyTakeaways = keyTakeawaysInput
      .split('\n')
      .map(k => k.trim())
      .filter(Boolean);

    const payload: any = {
      subjectId,
      title: title.trim(),
      topic: topic.trim() || 'General Revision',
      unitNumber: Number(unitNumber),
      priority,
      tags,
      content: content.trim() || (attachments.length > 0 ? 'Document notes attached below.' : ''),
      isBookmarked,
      keyTakeaways: keyTakeaways.length > 0 ? keyTakeaways : undefined,
      attachments: attachments.length > 0 ? attachments : undefined,
      codeSnippet: codeSnippet.trim()
        ? {
            language: codeLang,
            code: codeSnippet.trim()
          }
        : undefined
    };

    if (noteToEdit) {
      payload.id = noteToEdit.id;
      payload.createdAt = noteToEdit.createdAt;
    }

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {isEditing ? (noteToEdit ? 'Edit Note' : 'Create New Note') : 'Note Details'}
              </h2>
              <span className="text-xs text-slate-400">Unit {unitNumber} • {topic || 'Subject Note'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => setIsBookmarked(prev => !prev)}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title="Bookmark this note"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {isEditing ? (
            <form id="note-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Note Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Small-Signal Hybrid-π BJT Derivations & Gain Analysis"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Unit Number</label>
                  <select
                    value={unitNumber}
                    onChange={e => setUnitNumber(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    {[1, 2, 3, 4, 5].map(u => (
                      <option key={u} value={u}>
                        Unit {u}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Topic / Chapter</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    placeholder="e.g. BJT Modeling"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Exam Priority</label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="High">High Priority (Exam Guarantee)</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>

              {/* File Upload Dropzone for user PDF / images */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Attach PDF Documents, Photos, or Reference Sheets</span>
                </div>
                <FileUploadDropzone
                  attachments={attachments}
                  onChange={setAttachments}
                  maxFiles={5}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={e => setTagsInput(e.target.value)}
                  placeholder="e.g. High Yield, Derivation, End-Sem"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Key Takeaways (one per line)
                </label>
                <textarea
                  rows={2}
                  value={keyTakeawaysInput}
                  onChange={e => setKeyTakeawaysInput(e.target.value)}
                  placeholder="gm = Ic / VT&#10;Input impedance Rin = r_pi + beta * Re"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Note Content & Explanations
                </label>
                <textarea
                  rows={6}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Write detailed explanations, step-by-step notes, formulas, or copy-paste lecture notes..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Optional Code Snippet (Java / SQL)
                  </label>
                  <select
                    value={codeLang}
                    onChange={e => setCodeLang(e.target.value)}
                    className="px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-[11px] text-slate-300"
                  >
                    <option value="java">Java</option>
                    <option value="sql">SQL</option>
                    <option value="cpp">C / C++</option>
                    <option value="matlab">MATLAB</option>
                  </select>
                </div>
                <textarea
                  rows={3}
                  value={codeSnippet}
                  onChange={e => setCodeSnippet(e.target.value)}
                  placeholder="// Paste your Java or SQL code snippet here..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-emerald-400 font-mono placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </form>
          ) : (
            /* View Mode */
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Unit {noteToEdit?.unitNumber}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded font-medium ${
                      noteToEdit?.priority === 'High'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {noteToEdit?.priority} Priority
                  </span>
                  <span className="text-xs text-slate-400">• Updated {noteToEdit?.updatedAt}</span>
                </div>
                <h1 className="text-2xl font-bold text-white">{noteToEdit?.title}</h1>
              </div>

              {/* Tags */}
              {noteToEdit?.tags && noteToEdit.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  {noteToEdit.tags.map(t => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Attached Files & Documents */}
              {noteToEdit?.attachments && noteToEdit.attachments.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <FileAttachmentList attachments={noteToEdit.attachments} />
                </div>
              )}

              {/* Key Takeaways Box */}
              {noteToEdit?.keyTakeaways && noteToEdit.keyTakeaways.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 space-y-2">
                  <div className="flex items-center gap-1.5 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                    <ListChecks className="w-4 h-4 text-indigo-400" />
                    <span>Key Takeaways & Exam Points</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-200">
                    {noteToEdit.keyTakeaways.map((item, i) => (
                      <li key={i} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Main Content Body */}
              {noteToEdit?.content && (
                <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
                  {noteToEdit.content}
                </div>
              )}

              {/* Code Snippet Box */}
              {noteToEdit?.codeSnippet && (
                <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
                  <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-indigo-400 font-semibold uppercase">
                      {noteToEdit.codeSnippet.language} Code
                    </span>
                  </div>
                  <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    <code>{noteToEdit.codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/80">
          <span className="text-xs text-slate-400">All files are stored and previewable directly in your browser</span>
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
                form="note-form"
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Note</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
