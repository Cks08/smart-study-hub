import React, { useState, useEffect } from 'react';
import { useStudy } from '../../context/StudyContext';
import {
  X,
  User,
  Mail,
  Building2,
  BookOpen,
  Award,
  CheckCircle2,
  LogOut,
  Save,
  Users,
  Plus,
  Palette
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
}

const AVATAR_COLORS = [
  '#6366f1', // Indigo
  '#f59e0b', // Amber
  '#10b981', // Emerald
  '#0ea5e9', // Sky
  '#f43f5e', // Rose
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#14b8a6'  // Teal
];

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onOpenAuth }) => {
  const {
    currentUser,
    updateProfile,
    logout,
    savedAccounts,
    switchUserAccount,
    notes,
    pyqs,
    getOverallSemesterProgress,
    currentSemester
  } = useStudy();

  const [name, setName] = useState(currentUser?.name || '');
  const [university, setUniversity] = useState(currentUser?.university || '');
  const [branch, setBranch] = useState(currentUser?.branch || 'Computer Science & Engineering');
  const [targetCgpa, setTargetCgpa] = useState(currentUser?.targetCgpa || 9.0);
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [avatarColor, setAvatarColor] = useState(currentUser?.avatarColor || '#6366f1');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setUniversity(currentUser.university || '');
      setBranch(currentUser.branch);
      setTargetCgpa(currentUser.targetCgpa || 9.0);
      setBio(currentUser.bio || '');
      setAvatarColor(currentUser.avatarColor || '#6366f1');
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim(),
      university: university.trim(),
      branch,
      targetCgpa: Number(targetCgpa),
      bio: bio.trim(),
      avatarColor
    });
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const progress = getOverallSemesterProgress();
  const solvedCount = pyqs.filter(p => p.status === 'solved').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 p-6 space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black text-white shadow-lg transition-colors"
              style={{ backgroundColor: avatarColor }}
            >
              {name.charAt(0) || 'U'}
            </div>
            <div>
              <h3 className="font-bold text-base text-white">{currentUser?.name || 'Student Profile'}</h3>
              <p className="text-xs text-slate-400 font-mono">{currentUser?.email || 'Not logged in'}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Academic Stats Ribbon */}
        <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
          <div>
            <span className="block text-lg font-bold font-mono text-indigo-400">
              {notes.length}
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Notes Authored</span>
          </div>
          <div>
            <span className="block text-lg font-bold font-mono text-emerald-400">
              {solvedCount}
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">PYQs Solved</span>
          </div>
          <div>
            <span className="block text-lg font-bold font-mono text-amber-400">
              {progress.percentage}%
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Syllabus Done</span>
          </div>
        </div>

        {/* Multi-Account & Friends Switcher */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Switch Student / Friends:</span>
            </div>
            <button
              type="button"
              onClick={onOpenAuth}
              className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Friend Account</span>
            </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {savedAccounts.map(account => {
              const isActive = currentUser?.email.toLowerCase() === account.email.toLowerCase();
              return (
                <button
                  key={account.id}
                  type="button"
                  onClick={() => switchUserAccount(account.email)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white font-bold"
                    style={{ backgroundColor: account.avatarColor || '#6366f1' }}
                  >
                    {account.name.charAt(0)}
                  </span>
                  <span>{account.name}</span>
                  {isActive && (
                    <span className="text-[10px] text-emerald-400 font-mono">Active</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target CGPA / GPA</label>
              <input
                type="number"
                step="0.1"
                min="5"
                max="10"
                value={targetCgpa}
                onChange={e => setTargetCgpa(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">University / College</label>
            <input
              type="text"
              value={university}
              onChange={e => setUniversity(e.target.value)}
              placeholder="e.g. National Institute of Technology"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Branch / Department</label>
            <select
              value={branch}
              onChange={e => setBranch(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
              <option value="Electronics & Communication">Electronics & Communication (ECE)</option>
              <option value="Electrical & Electronics">Electrical & Electronics (EEE)</option>
              <option value="Information Technology">Information Technology (IT)</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
            </select>
          </div>

          {/* Color theme picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Avatar Color Theme</label>
            <div className="flex items-center gap-2 pt-1">
              {AVATAR_COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setAvatarColor(color)}
                  className={`w-6 h-6 rounded-full cursor-pointer transition-transform ${
                    avatarColor === color ? 'ring-2 ring-white scale-110' : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Bio / Goals</label>
            <input
              type="text"
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="e.g. Aiming for 9+ CGPA in Sem 3 and mastering core subjects."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 border border-rose-500/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>

            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
