import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { X, Mail, Lock, User, GraduationCap, Building2, ArrowRight, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, signup } = useStudy();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('ckrishna122517@gmail.com');
  const [name, setName] = useState('Krishna C.');
  const [university, setUniversity] = useState('National Institute of Technology');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [semester, setSemester] = useState(3);
  const [targetCgpa, setTargetCgpa] = useState(9.0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    if (mode === 'signup') {
      signup({
        email: email.trim(),
        name: name.trim() || 'Engineering Student',
        university: university.trim(),
        branch,
        currentSemester: Number(semester),
        targetCgpa: Number(targetCgpa)
      });
    } else {
      login(email.trim(), name.trim());
    }
    onClose();
  };

  const handleQuickFriendLogin = (friendEmail: string, friendName: string, friendBranch: string) => {
    signup({
      email: friendEmail,
      name: friendName,
      university: 'State Technological University',
      branch: friendBranch,
      currentSemester: 3,
      targetCgpa: 8.8
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 p-6 space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                {mode === 'login' ? 'Student Sign In' : 'Create Student Profile'}
              </h3>
              <p className="text-xs text-slate-400">Personalize your semester notes & PYQs</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@college.edu or gmail"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Student Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Krishna C."
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">University / College</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={university}
                    onChange={e => setUniversity(e.target.value)}
                    placeholder="e.g. National Institute of Technology"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Branch</label>
                  <select
                    value={branch}
                    onChange={e => setBranch(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Computer Science & Engineering">CSE / IT</option>
                    <option value="Electronics & Communication">ECE / EEE</option>
                    <option value="Electrical Engineering">Electrical</option>
                    <option value="Mechanical Engineering">Mechanical</option>
                    <option value="Civil Engineering">Civil</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target CGPA</label>
                  <input
                    type="number"
                    step="0.1"
                    min="5"
                    max="10"
                    value={targetCgpa}
                    onChange={e => setTargetCgpa(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/20 cursor-pointer"
          >
            <span>{mode === 'login' ? 'Continue with Email' : 'Register Profile'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Toggle mode */}
        <div className="text-center text-xs text-slate-400">
          {mode === 'login' ? (
            <span>
              New student?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-indigo-400 hover:underline font-semibold cursor-pointer"
              >
                Create personalized profile
              </button>
            </span>
          ) : (
            <span>
              Already configured?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-indigo-400 hover:underline font-semibold cursor-pointer"
              >
                Sign in with email
              </button>
            </span>
          )}
        </div>

        {/* Quick Friend Profiles for testing & multi-friend use */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
            Or switch to a friend account:
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickFriendLogin('alex.student@gmail.com', 'Alex Rivera', 'Computer Science & Engineering')}
              className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left cursor-pointer group"
            >
              <div className="font-semibold text-white group-hover:text-indigo-300 truncate">
                Alex Rivera
              </div>
              <div className="text-[10px] text-slate-500 truncate">CSE • Sem 3</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFriendLogin('sarah.ece@gmail.com', 'Sarah Chen', 'Electronics & Communication')}
              className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left cursor-pointer group"
            >
              <div className="font-semibold text-white group-hover:text-amber-300 truncate">
                Sarah Chen
              </div>
              <div className="text-[10px] text-slate-500 truncate">ECE • Sem 3</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
