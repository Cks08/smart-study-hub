import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import {
  X,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Settings2,
  Check,
  AlertTriangle,
  FolderArchive
} from 'lucide-react';
import { SubjectMeta, SyllabusUnit } from '../../types';

interface DataManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataManagementModal: React.FC<DataManagementModalProps> = ({ isOpen, onClose }) => {
  const { exportDataJSON, importDataJSON, resetToDefaults, clearToBlankSlate, loadReferencePack, addCustomSubject, currentSemester } = useStudy();

  const [activeTab, setActiveTab] = useState<'backup' | 'addSubject'>('backup');
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // New Subject Form
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [credits, setCredits] = useState(4);
  const [description, setDescription] = useState('');
  const [accentColor, setAccentColor] = useState('#8b5cf6');

  if (!isOpen) return null;

  const handleDownloadBackup = () => {
    const dataStr = exportDataJSON();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SemVault_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText.trim()) return;
    const success = importDataJSON(importText.trim());
    if (success) {
      setImportStatus('Backup restored successfully!');
      setTimeout(() => {
        setImportStatus(null);
        onClose();
      }, 1000);
    } else {
      setImportStatus('Error: Invalid JSON format. Please verify the backup file.');
    }
  };

  const handleResetData = () => {
    if (
      confirm(
        'Are you sure you want to restore the default sample dataset for Analog Circuits, Maths, Control Systems, DBMS, and Java? This will overwrite recent local edits.'
      )
    ) {
      resetToDefaults();
      onClose();
    }
  };

  const handleAddSubjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName.trim() || !subjectCode.trim()) return;

    const id = subjectName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newSubjectMeta: SubjectMeta = {
      id,
      semester: currentSemester,
      name: subjectName.trim(),
      code: subjectCode.trim(),
      credits: Number(credits),
      description: description.trim() || 'Engineering core course',
      accentColor,
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      iconName: 'BookOpen'
    };

    const initialUnits: SyllabusUnit[] = [
      {
        id: `${id}-u1`,
        unitNumber: 1,
        title: 'Unit 1: Fundamentals & Concepts',
        examWeightageMarks: 20,
        topics: [
          { id: `${id}-u1-t1`, title: 'Introduction and Core Architecture', isCompleted: false, difficulty: 'Easy', estimatedHours: 3 }
        ]
      },
      {
        id: `${id}-u2`,
        unitNumber: 2,
        title: 'Unit 2: Modeling & Analysis',
        examWeightageMarks: 20,
        topics: [
          { id: `${id}-u2-t1`, title: 'Mathematical Formulation', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 }
        ]
      }
    ];

    addCustomSubject(newSubjectMeta, initialUnits);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Settings2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Data Management & Custom Subjects</h2>
              <p className="text-xs text-slate-400">Backup your notes, restore data, or add new subjects</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-800 bg-slate-950 px-6 pt-2 gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('backup')}
            className={`pb-2.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'backup'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Backup & Restore
          </button>
          <button
            onClick={() => setActiveTab('addSubject')}
            className={`pb-2.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'addSubject'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            + Add Custom Subject
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'backup' ? (
            <div className="space-y-6">
              {/* Export Card */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Download JSON Backup</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Exports all notes, solved PYQs, syllabus marks, and deadlines to a portable JSON file.
                  </p>
                </div>
                <button
                  onClick={handleDownloadBackup}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Backup</span>
                </button>
              </div>

              {/* Import Card */}
              <form onSubmit={handleImportSubmit} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-indigo-400" />
                  <span>Restore from JSON Backup</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Paste the JSON backup text below to restore your notes and questions.
                </p>
                <textarea
                  rows={4}
                  value={importText}
                  onChange={e => setImportText(e.target.value)}
                  placeholder="Paste JSON content here..."
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
                {importStatus && (
                  <div className="text-xs font-medium text-emerald-400">{importStatus}</div>
                )}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer shadow-sm"
                  >
                    Restore Data
                  </button>
                </div>
              </form>

              {/* Start Clean Slate (0% Progress) */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-emerald-400" />
                    <span>Reset to 0% Blank Canvas</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Wipes all notes, PYQs, and study targets, and resets all syllabus topic checkboxes to 0%. Pure user-driven workspace!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset to 0% clean canvas? All notes, PYQs, and targets will be cleared.')) {
                      clearToBlankSlate();
                      onClose();
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors"
                >
                  Clear to 0%
                </button>
              </div>

              {/* Load Reference Study Pack */}
              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-indigo-300 flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-indigo-400" />
                    <span>Load Reference Study Pack</span>
                  </h4>
                  <p className="text-xs text-indigo-300/80 mt-0.5">
                    Loads sample revision notes, past year questions, and model answers for Analog Circuits, Maths, Control Systems, DBMS, and Java.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    loadReferencePack();
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-500/40 text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors"
                >
                  Load Examples
                </button>
              </div>
            </div>
          ) : (
            /* Add Custom Subject Form */
            <form onSubmit={handleAddSubjectSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Subject Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={subjectName}
                    onChange={e => setSubjectName(e.target.value)}
                    placeholder="e.g. Artificial Intelligence"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={subjectCode}
                    onChange={e => setSubjectCode(e.target.value)}
                    placeholder="e.g. CS-305"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Academic Credits
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={credits}
                    onChange={e => setCredits(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Color Accent
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={e => setAccentColor(e.target.value)}
                      className="w-9 h-8 bg-slate-950 border border-slate-700 rounded-lg cursor-pointer"
                    />
                    <span className="font-mono text-xs text-slate-400">{accentColor}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Subject Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Topics, professor reference, textbook notes..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm"
                >
                  Add Subject
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
