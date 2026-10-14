import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { NoteItem, SubjectId } from '../../types';
import { NoteModal } from './NoteModal';
import {
  BookOpen,
  Plus,
  Search,
  Bookmark,
  Tag,
  Trash2,
  Edit3,
  ExternalLink,
  Code,
  ListChecks,
  Filter
} from 'lucide-react';
import { FileAttachmentList } from '../Common/FileAttachmentList';

interface NotesSectionProps {
  subjectId: SubjectId;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ subjectId }) => {
  const { notes, addNote, updateNote, deleteNote, toggleBookmarkNote, subjects } = useStudy();
  const currentSubject = subjects.find(s => s.id === subjectId);

  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [activeNote, setActiveNote] = useState<NoteItem | null>(null);
  const [isViewOnly, setIsViewOnly] = useState(false);

  const subjectNotes = notes.filter(n => n.subjectId === subjectId);

  const filteredNotes = subjectNotes.filter(n => {
    if (selectedUnit !== 'all' && n.unitNumber !== selectedUnit) return false;
    if (selectedPriority !== 'all' && n.priority !== selectedPriority) return false;
    if (onlyBookmarked && !n.isBookmarked) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = n.title.toLowerCase().includes(q);
      const matchContent = n.content.toLowerCase().includes(q);
      const matchTopic = n.topic.toLowerCase().includes(q);
      const matchTags = n.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchContent && !matchTopic && !matchTags) return false;
    }
    return true;
  });

  const handleOpenCreate = () => {
    setActiveNote(null);
    setIsViewOnly(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (note: NoteItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveNote(note);
    setIsViewOnly(false);
    setModalOpen(true);
  };

  const handleOpenView = (note: NoteItem) => {
    setActiveNote(note);
    setIsViewOnly(true);
    setModalOpen(true);
  };

  const handleSaveNote = (noteData: any) => {
    if (noteData.id) {
      updateNote(noteData);
    } else {
      addNote(noteData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search notes, formulas, or concepts..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Unit Filter */}
          <select
            value={selectedUnit}
            onChange={e => setSelectedUnit(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">All Units (1-5)</option>
            <option value="1">Unit 1</option>
            <option value="2">Unit 2</option>
            <option value="3">Unit 3</option>
            <option value="4">Unit 4</option>
            <option value="5">Unit 5</option>
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={e => setSelectedPriority(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          {/* Starred Filter */}
          <button
            onClick={() => setOnlyBookmarked(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
              onlyBookmarked
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Starred</span>
          </button>

          {/* Create Note Button */}
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Note</span>
          </button>
        </div>
      </div>

      {/* Notes List / Cards Grid */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-8 space-y-3">
          <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
          <h4 className="text-sm font-semibold text-slate-300">No notes found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No notes match your active filters. Click "Create Note" to document revision topics, derivations, and formulas for this subject.
          </p>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add First Note</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              onClick={() => handleOpenView(note)}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-700 hover:bg-slate-900/90 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Card Top Row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      Unit {note.unitNumber || 1}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded font-mono ${
                        note.priority === 'High'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {note.priority}
                    </span>
                  </div>

                  <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => toggleBookmarkNote(note.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        note.isBookmarked
                          ? 'text-amber-400 hover:text-amber-300'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={note.isBookmarked ? 'Starred' : 'Star this note'}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={e => handleOpenEdit(note, e)}
                      className="p-1.5 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Edit note"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        if (confirm('Delete this note?')) deleteNote(note.id);
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Delete note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors mb-1 line-clamp-2">
                  {note.title}
                </h3>
                <span className="text-[11px] text-slate-400 block mb-3 font-medium">
                  {note.topic}
                </span>

                {/* Key Takeaways preview if present */}
                {note.keyTakeaways && note.keyTakeaways.length > 0 && (
                  <div className="mb-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                    <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-indigo-400">
                      <ListChecks className="w-3 h-3" />
                      <span>Key Rules / Insights:</span>
                    </div>
                    <ul className="text-[11px] text-slate-300 space-y-0.5 line-clamp-2">
                      {note.keyTakeaways.slice(0, 2).map((k, i) => (
                        <li key={i} className="truncate">• {k}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Attached files preview */}
                {note.attachments && note.attachments.length > 0 && (
                  <div className="mb-3">
                    <FileAttachmentList attachments={note.attachments} compact={true} />
                  </div>
                )}

                {/* Content snippet */}
                {note.content && (
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {note.content}
                  </p>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-400 truncate">
                  {note.codeSnippet && (
                    <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      <Code className="w-2.5 h-2.5" />
                      {note.codeSnippet.language}
                    </span>
                  )}
                  {note.tags && note.tags.length > 0 && (
                    <span className="truncate">#{note.tags[0]}</span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>View Details</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Note Modal */}
      <NoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        noteToEdit={activeNote}
        subjectId={subjectId}
        onSave={handleSaveNote}
        viewOnly={isViewOnly}
      />
    </div>
  );
};
