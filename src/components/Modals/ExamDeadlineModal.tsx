import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { ExamDeadline, SubjectId } from '../../types';
import { X, Calendar, Clock, MapPin, Save, Plus, Trash2, AlertCircle } from 'lucide-react';

interface ExamDeadlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDeadline?: ExamDeadline | null;
}

export const ExamDeadlineModal: React.FC<ExamDeadlineModalProps> = ({
  isOpen,
  onClose,
  selectedDeadline
}) => {
  const { deadlines, updateDeadline, addDeadline, subjects, getDaysRemaining } = useStudy();

  const [editingId, setEditingId] = useState<string | null>(selectedDeadline?.id || null);
  const [subjectId, setSubjectId] = useState<SubjectId>(selectedDeadline?.subjectId || subjects[0]?.id || 'analog-circuits');
  const [examName, setExamName] = useState(selectedDeadline?.examName || 'End-Semester Exam');
  const [examDate, setExamDate] = useState(selectedDeadline?.examDate || new Date().toISOString().split('T')[0]);
  const [examTime, setExamTime] = useState(selectedDeadline?.examTime || '09:30 AM - 12:30 PM');
  const [venueOrRoom, setVenueOrRoom] = useState(selectedDeadline?.venueOrRoom || '');
  const [totalMarks, setTotalMarks] = useState(selectedDeadline?.totalMarks || 100);
  const [passingMarks, setPassingMarks] = useState(selectedDeadline?.passingMarks || 40);
  const [notes, setNotes] = useState(selectedDeadline?.notes || '');

  // Reset form when selectedDeadline changes or modal opens
  React.useEffect(() => {
    if (selectedDeadline) {
      setEditingId(selectedDeadline.id);
      setSubjectId(selectedDeadline.subjectId);
      setExamName(selectedDeadline.examName);
      setExamDate(selectedDeadline.examDate);
      setExamTime(selectedDeadline.examTime);
      setVenueOrRoom(selectedDeadline.venueOrRoom || '');
      setTotalMarks(selectedDeadline.totalMarks);
      setPassingMarks(selectedDeadline.passingMarks);
      setNotes(selectedDeadline.notes || '');
    } else if (deadlines[0]) {
      setEditingId(deadlines[0].id);
      setSubjectId(deadlines[0].subjectId);
      setExamName(deadlines[0].examName);
      setExamDate(deadlines[0].examDate);
      setExamTime(deadlines[0].examTime);
      setVenueOrRoom(deadlines[0].venueOrRoom || '');
      setTotalMarks(deadlines[0].totalMarks);
      setPassingMarks(deadlines[0].passingMarks);
      setNotes(deadlines[0].notes || '');
    }
  }, [selectedDeadline, isOpen]);

  if (!isOpen) return null;

  const handleSelectDeadline = (dl: ExamDeadline) => {
    setEditingId(dl.id);
    setSubjectId(dl.subjectId);
    setExamName(dl.examName);
    setExamDate(dl.examDate);
    setExamTime(dl.examTime);
    setVenueOrRoom(dl.venueOrRoom || '');
    setTotalMarks(dl.totalMarks);
    setPassingMarks(dl.passingMarks);
    setNotes(dl.notes || '');
  };

  const handleAddNewDraft = () => {
    setEditingId(null);
    setSubjectId(subjects[0]?.id || 'analog-circuits');
    setExamName('Mid-Semester Exam');
    setExamDate(new Date().toISOString().split('T')[0]);
    setExamTime('09:30 AM - 12:30 PM');
    setVenueOrRoom('Exam Hall 1');
    setTotalMarks(50);
    setPassingMarks(20);
    setNotes('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examDate) return;

    if (editingId) {
      updateDeadline({
        id: editingId,
        subjectId,
        examName,
        examDate,
        examTime,
        venueOrRoom: venueOrRoom.trim() || undefined,
        totalMarks: Number(totalMarks),
        passingMarks: Number(passingMarks),
        notes: notes.trim() || undefined
      });
    } else {
      addDeadline({
        subjectId,
        examName,
        examDate,
        examTime,
        venueOrRoom: venueOrRoom.trim() || undefined,
        totalMarks: Number(totalMarks),
        passingMarks: Number(passingMarks),
        notes: notes.trim() || undefined
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Semester Exam Timetable & Deadlines</h2>
              <p className="text-xs text-slate-400">Configure exam dates, venues, and timings for live countdowns</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Layout: Sidebar of deadlines + editor form */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
          {/* Deadlines list (5 cols) */}
          <div className="md:col-span-5 p-4 border-r border-slate-800 bg-slate-950/40 space-y-2">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-xs">
              <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px]">
                Configured Exams ({deadlines.length})
              </span>
              <button
                type="button"
                onClick={handleAddNewDraft}
                className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Exam</span>
              </button>
            </div>

            <div className="space-y-1.5 overflow-y-auto max-h-[320px]">
              {deadlines.map(dl => {
                const sub = subjects.find(s => s.id === dl.subjectId);
                const isSelected = editingId === dl.id;
                const days = getDaysRemaining(dl.examDate);

                return (
                  <button
                    key={dl.id}
                    onClick={() => handleSelectDeadline(dl)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-500/40 bg-amber-500/10'
                        : 'border-slate-850 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="font-mono text-[10px] font-bold"
                        style={{ color: sub?.accentColor || '#f59e0b' }}
                      >
                        {sub?.code || 'CORE'}
                      </span>
                      <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-slate-950 text-slate-400">
                        {days < 0 ? 'Passed' : days === 0 ? 'Today' : `${days}d left`}
                      </span>
                    </div>
                    <div className="font-semibold text-xs text-white truncate mt-0.5">
                      {sub?.name || dl.examName}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono mt-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{dl.examDate}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Edit Form (7 cols) */}
          <form onSubmit={handleSubmit} className="md:col-span-7 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{editingId ? 'Edit Exam Schedule' : 'Schedule New Exam'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject *</label>
                <select
                  value={subjectId}
                  onChange={e => setSubjectId(e.target.value as SubjectId)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Exam Type / Name</label>
                <input
                  type="text"
                  required
                  value={examName}
                  onChange={e => setExamName(e.target.value)}
                  placeholder="e.g. End-Semester Theory Exam"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Exam Date *</label>
                <input
                  type="date"
                  required
                  value={examDate}
                  onChange={e => setExamDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Time Slot</label>
                <input
                  type="text"
                  value={examTime}
                  onChange={e => setExamTime(e.target.value)}
                  placeholder="09:30 AM - 12:30 PM"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Venue / Examination Hall</label>
              <input
                type="text"
                value={venueOrRoom}
                onChange={e => setVenueOrRoom(e.target.value)}
                placeholder="e.g. Main Academic Block - Hall 204"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Max Marks</label>
                <input
                  type="number"
                  value={totalMarks}
                  onChange={e => setTotalMarks(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Passing Marks</label>
                <input
                  type="number"
                  value={passingMarks}
                  onChange={e => setPassingMarks(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Instructions / Notes</label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g. Scientific calculator permitted, graph papers provided"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Timetable</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
