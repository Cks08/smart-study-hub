import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  SubjectMeta,
  SyllabusUnit,
  NoteItem,
  PYQItem,
  AnswerItem,
  FormulaItem,
  FlashcardItem,
  ExamDeadline,
  StudyTarget,
  SubjectId,
  UserProfile
} from '../types';
import {
  INITIAL_SUBJECTS,
  INITIAL_SYLLABUS,
  INITIAL_NOTES,
  INITIAL_PYQS,
  INITIAL_ANSWERS,
  INITIAL_FORMULAS,
  INITIAL_FLASHCARDS,
  INITIAL_DEADLINES,
  INITIAL_STUDY_TARGETS
} from '../data/initialData';

interface StudyContextType {
  // Navigation & UI state
  activeSubjectId: SubjectId | 'dashboard';
  setActiveSubjectId: (id: SubjectId | 'dashboard') => void;
  activeTab: 'notes' | 'pyqs' | 'answers' | 'syllabus' | 'formulas' | 'flashcards';
  setActiveTab: (tab: 'notes' | 'pyqs' | 'answers' | 'syllabus' | 'formulas' | 'flashcards') => void;
  focusedAnswerId: string | null;
  setFocusedAnswerId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isPomodoroOpen: boolean;
  setIsPomodoroOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;

  // Semester State
  currentSemester: number;
  setCurrentSemester: (sem: number) => void;

  // User Authentication & Profile
  currentUser: UserProfile | null;
  savedAccounts: UserProfile[];
  login: (email: string, name?: string) => void;
  signup: (profileData: Partial<UserProfile>) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  switchUserAccount: (email: string) => void;
  deleteAccount: (email: string) => void;

  // State data
  subjects: SubjectMeta[];
  activeSubjects: SubjectMeta[];
  syllabus: Record<string, SyllabusUnit[]>;
  notes: NoteItem[];
  pyqs: PYQItem[];
  answers: AnswerItem[];
  formulas: FormulaItem[];
  flashcards: FlashcardItem[];
  deadlines: ExamDeadline[];
  targets: StudyTarget[];

  // Actions
  toggleTopicCompletion: (subjectId: string, unitId: string, topicId: string) => void;
  addTopic: (subjectId: string, unitId: string, title: string, difficulty?: 'Easy' | 'Medium' | 'Hard', hours?: number) => void;
  deleteTopic: (subjectId: string, unitId: string, topicId: string) => void;
  addUnit: (subjectId: string, title: string, weightage?: number) => void;
  deleteUnit: (subjectId: string, unitId: string) => void;
  
  // Notes
  addNote: (note: Omit<NoteItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (note: NoteItem) => void;
  deleteNote: (id: string) => void;
  toggleBookmarkNote: (id: string) => void;

  // PYQs
  addPYQ: (pyq: Omit<PYQItem, 'id'>) => void;
  updatePYQ: (pyq: PYQItem) => void;
  deletePYQ: (id: string) => void;
  updatePYQStatus: (id: string, status: 'unsolved' | 'in-progress' | 'solved') => void;

  // Answers
  addAnswer: (answer: Omit<AnswerItem, 'id' | 'updatedAt'>) => string;
  updateAnswer: (answer: AnswerItem) => void;
  deleteAnswer: (id: string) => void;

  // Formulas & Flashcards
  addFormula: (formula: Omit<FormulaItem, 'id'>) => void;
  toggleFlashcardMastered: (id: string) => void;

  // Deadlines
  updateDeadline: (deadline: ExamDeadline) => void;
  addDeadline: (deadline: Omit<ExamDeadline, 'id'>) => void;

  // Targets
  addTarget: (title: string, subjectId: SubjectId, priority: 'High' | 'Medium' | 'Low', dueDate: string) => void;
  toggleTarget: (id: string) => void;
  deleteTarget: (id: string) => void;

  // Subjects
  addCustomSubject: (meta: SubjectMeta, units: SyllabusUnit[]) => void;

  // Data Modes & Management
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
  clearToBlankSlate: () => void;
  resetToCleanCurriculum: () => void;
  loadReferencePack: () => void;
  resetToDefaults: () => void;

  // Analytics Helpers
  getSubjectProgress: (subjectId: string) => { total: number; completed: number; percentage: number };
  getOverallSemesterProgress: () => { total: number; completed: number; percentage: number };
  getSubjectPYQStats: (subjectId: string) => { total: number; solved: number; inProgress: number; unsolved: number; percentage: number };
  getAllPYQStats: () => { total: number; solved: number; inProgress: number; unsolved: number; percentage: number };
  getDaysRemaining: (dateString: string) => number;
}

const STORAGE_KEY = 'semvault_v3_user_driven';

const DEFAULT_USER: UserProfile = {
  id: 'user-default',
  name: 'Krishna C.',
  email: 'ckrishna122517@gmail.com',
  university: 'Engineering College',
  branch: 'Computer Science & Engineering',
  currentSemester: 3,
  targetCgpa: 9.0,
  avatarColor: '#6366f1',
  bio: 'Ready to master Semester 3 subjects, practice PYQs, and prepare for exams.',
  createdAt: new Date().toISOString().split('T')[0]
};

// Helper: ensure all topics start uncompleted (0% progress)
const cleanTopicsStatus = (rawSyllabus: Record<string, SyllabusUnit[]>): Record<string, SyllabusUnit[]> => {
  const clean: Record<string, SyllabusUnit[]> = {};
  Object.keys(rawSyllabus).forEach(subId => {
    clean[subId] = rawSyllabus[subId].map(unit => ({
      ...unit,
      topics: unit.topics.map(t => ({
        ...t,
        isCompleted: false
      }))
    }));
  });
  return clean;
};

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export const StudyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeSubjectId, setActiveSubjectId] = useState<SubjectId | 'dashboard'>('dashboard');
  const [activeTab, setActiveTab] = useState<'notes' | 'pyqs' | 'answers' | 'syllabus' | 'formulas' | 'flashcards'>('notes');
  const [focusedAnswerId, setFocusedAnswerId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Clear legacy mock cache keys on mount
  useEffect(() => {
    try {
      ['subjects', 'syllabus', 'notes', 'pyqs', 'answers', 'deadlines', 'targets', 'flashcards', 'user_profile', 'current_semester'].forEach(key => {
        localStorage.removeItem(`semvault_engineering_portal_v2_${key}`);
      });
    } catch {
      // ignore
    }
  }, []);

  // Current Semester State (Default to 3 as requested)
  const [currentSemester, setCurrentSemesterState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_current_semester`);
      return saved ? JSON.parse(saved) : 3;
    } catch {
      return 3;
    }
  });

  const setCurrentSemester = (sem: number) => {
    setCurrentSemesterState(sem);
    localStorage.setItem(`${STORAGE_KEY}_current_semester`, JSON.stringify(sem));
    setActiveSubjectId('dashboard');
  };

  // User Profile & Multi-Account list
  const [savedAccounts, setSavedAccounts] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_saved_accounts`);
      return saved ? JSON.parse(saved) : [DEFAULT_USER];
    } catch {
      return [DEFAULT_USER];
    }
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_user_profile`);
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  // Subjects (Semester 3 default core engineering subjects)
  const [subjects, setSubjects] = useState<SubjectMeta[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_subjects`);
      return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
    } catch {
      return INITIAL_SUBJECTS;
    }
  });

  // Syllabus (Initialized with 0% progress - topics unchecked by default!)
  const [syllabus, setSyllabus] = useState<Record<string, SyllabusUnit[]>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_syllabus`);
      return saved ? JSON.parse(saved) : cleanTopicsStatus(INITIAL_SYLLABUS);
    } catch {
      return cleanTopicsStatus(INITIAL_SYLLABUS);
    }
  });

  // Notes: starts empty so user inputs their own notes & uploads files!
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_notes`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // PYQs: starts empty so user inputs their own past questions
  const [pyqs, setPyqs] = useState<PYQItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_pyqs`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Answers: starts empty so user authors their own solutions
  const [answers, setAnswers] = useState<AnswerItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_answers`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Formulas
  const [formulas, setFormulas] = useState<FormulaItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_formulas`);
      return saved ? JSON.parse(saved) : INITIAL_FORMULAS;
    } catch {
      return INITIAL_FORMULAS;
    }
  });

  // Flashcards (all mastered: false by default)
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_flashcards`);
      return saved ? JSON.parse(saved) : INITIAL_FLASHCARDS.map(f => ({ ...f, mastered: false }));
    } catch {
      return INITIAL_FLASHCARDS.map(f => ({ ...f, mastered: false }));
    }
  });

  // Exam Deadlines: realistic upcoming dates, fully editable
  const [deadlines, setDeadlines] = useState<ExamDeadline[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_deadlines`);
      return saved ? JSON.parse(saved) : INITIAL_DEADLINES;
    } catch {
      return INITIAL_DEADLINES;
    }
  });

  // Targets: starts empty so user creates their own goals
  const [targets, setTargets] = useState<StudyTarget[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_targets`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync state changes to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`${STORAGE_KEY}_user_profile`, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(`${STORAGE_KEY}_user_profile`);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_saved_accounts`, JSON.stringify(savedAccounts));
  }, [savedAccounts]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_subjects`, JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_syllabus`, JSON.stringify(syllabus));
  }, [syllabus]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_notes`, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_pyqs`, JSON.stringify(pyqs));
  }, [pyqs]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_answers`, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_formulas`, JSON.stringify(formulas));
  }, [formulas]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_flashcards`, JSON.stringify(flashcards));
  }, [flashcards]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_deadlines`, JSON.stringify(deadlines));
  }, [deadlines]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_targets`, JSON.stringify(targets));
  }, [targets]);

  // Keyboard shortcut for Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered subjects for current semester
  const activeSubjects = useMemo(() => {
    const list = subjects.filter(s => s.semester === currentSemester);
    return list.length > 0 ? list : subjects;
  }, [subjects, currentSemester]);

  // Auth Handlers
  const login = (email: string, name?: string) => {
    const found = savedAccounts.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      return;
    }

    const user: UserProfile = {
      id: `user-${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      university: 'Engineering College',
      branch: 'Computer Science & Engineering',
      currentSemester: currentSemester,
      targetCgpa: 9.0,
      avatarColor: '#6366f1',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(user);
    setSavedAccounts(prev => {
      const exists = prev.some(a => a.email.toLowerCase() === email.toLowerCase());
      return exists ? prev : [user, ...prev];
    });
  };

  const signup = (profileData: Partial<UserProfile>) => {
    const email = profileData.email || 'student@college.edu';
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: profileData.name || email.split('@')[0],
      email,
      university: profileData.university || 'Engineering College',
      branch: profileData.branch || 'Computer Science & Engineering',
      currentSemester: profileData.currentSemester || currentSemester,
      targetCgpa: profileData.targetCgpa || 9.0,
      avatarColor: profileData.avatarColor || '#6366f1',
      bio: profileData.bio,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(newUser);
    setSavedAccounts(prev => {
      const filtered = prev.filter(a => a.email.toLowerCase() !== email.toLowerCase());
      return [newUser, ...filtered];
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setSavedAccounts(prev =>
      prev.map(a => (a.email.toLowerCase() === updated.email.toLowerCase() ? updated : a))
    );
  };

  const switchUserAccount = (email: string) => {
    const target = savedAccounts.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (target) {
      setCurrentUser(target);
    }
  };

  const deleteAccount = (email: string) => {
    setSavedAccounts(prev => prev.filter(a => a.email.toLowerCase() !== email.toLowerCase()));
    if (currentUser?.email.toLowerCase() === email.toLowerCase()) {
      const remaining = savedAccounts.filter(a => a.email.toLowerCase() !== email.toLowerCase());
      setCurrentUser(remaining[0] || null);
    }
  };

  // Syllabus & Topics
  const toggleTopicCompletion = (subjectId: string, unitId: string, topicId: string) => {
    setSyllabus(prev => {
      const subjectUnits = prev[subjectId] || [];
      const updatedUnits = subjectUnits.map(unit => {
        if (unit.id !== unitId) return unit;
        return {
          ...unit,
          topics: unit.topics.map(topic => {
            if (topic.id !== topicId) return topic;
            return { ...topic, isCompleted: !topic.isCompleted };
          })
        };
      });
      return { ...prev, [subjectId]: updatedUnits };
    });
  };

  const addTopic = (
    subjectId: string,
    unitId: string,
    title: string,
    difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium',
    hours: number = 3
  ) => {
    setSyllabus(prev => {
      const subjectUnits = prev[subjectId] || [];
      const updatedUnits = subjectUnits.map(unit => {
        if (unit.id !== unitId) return unit;
        const newTopic = {
          id: `topic-${Date.now()}`,
          title,
          isCompleted: false,
          difficulty,
          estimatedHours: hours
        };
        return {
          ...unit,
          topics: [...unit.topics, newTopic]
        };
      });
      return { ...prev, [subjectId]: updatedUnits };
    });
  };

  const deleteTopic = (subjectId: string, unitId: string, topicId: string) => {
    setSyllabus(prev => {
      const subjectUnits = prev[subjectId] || [];
      return {
        ...prev,
        [subjectId]: subjectUnits.map(unit => {
          if (unit.id !== unitId) return unit;
          return {
            ...unit,
            topics: unit.topics.filter(t => t.id !== topicId)
          };
        })
      };
    });
  };

  const addUnit = (subjectId: string, title: string, weightage: number = 20) => {
    setSyllabus(prev => {
      const subjectUnits = prev[subjectId] || [];
      const nextUnitNum = subjectUnits.length + 1;
      const newUnit: SyllabusUnit = {
        id: `${subjectId}-u${nextUnitNum}-${Date.now()}`,
        unitNumber: nextUnitNum,
        title,
        examWeightageMarks: weightage,
        topics: []
      };
      return { ...prev, [subjectId]: [...subjectUnits, newUnit] };
    });
  };

  const deleteUnit = (subjectId: string, unitId: string) => {
    setSyllabus(prev => {
      const subjectUnits = prev[subjectId] || [];
      return {
        ...prev,
        [subjectId]: subjectUnits.filter(u => u.id !== unitId)
      };
    });
  };

  // Notes CRUD
  const addNote = (noteData: Omit<NoteItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newNote: NoteItem = {
      ...noteData,
      id: `note-${Date.now()}`,
      createdAt: now,
      updatedAt: now
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const updateNote = (updated: NoteItem) => {
    const now = new Date().toISOString().split('T')[0];
    setNotes(prev => prev.map(n => (n.id === updated.id ? { ...updated, updatedAt: now } : n)));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const toggleBookmarkNote = (id: string) => {
    setNotes(prev => prev.map(n => (n.id === id ? { ...n, isBookmarked: !n.isBookmarked } : n)));
  };

  // PYQs CRUD
  const addPYQ = (pyqData: Omit<PYQItem, 'id'>) => {
    const newPyq: PYQItem = {
      ...pyqData,
      id: `pyq-${Date.now()}`
    };
    setPyqs(prev => [newPyq, ...prev]);
  };

  const updatePYQ = (updated: PYQItem) => {
    setPyqs(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  const deletePYQ = (id: string) => {
    setPyqs(prev => prev.filter(p => p.id !== id));
  };

  const updatePYQStatus = (id: string, status: 'unsolved' | 'in-progress' | 'solved') => {
    setPyqs(prev => prev.map(p => (p.id === id ? { ...p, status } : p)));
  };

  // Answers CRUD
  const addAnswer = (answerData: Omit<AnswerItem, 'id' | 'updatedAt'>): string => {
    const newId = `ans-${Date.now()}`;
    const newAnswer: AnswerItem = {
      ...answerData,
      id: newId,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setAnswers(prev => [newAnswer, ...prev]);

    if (newAnswer.pyqId) {
      setPyqs(prev =>
        prev.map(p =>
          p.id === newAnswer.pyqId
            ? { ...p, associatedAnswerId: newId, status: 'solved' }
            : p
        )
      );
    }
    return newId;
  };

  const updateAnswer = (updated: AnswerItem) => {
    const now = new Date().toISOString().split('T')[0];
    setAnswers(prev => prev.map(a => (a.id === updated.id ? { ...updated, updatedAt: now } : a)));
  };

  const deleteAnswer = (id: string) => {
    setAnswers(prev => prev.filter(a => a.id !== id));
  };

  // Formulas & Flashcards
  const addFormula = (formulaData: Omit<FormulaItem, 'id'>) => {
    const newFormula: FormulaItem = {
      ...formulaData,
      id: `f-${Date.now()}`
    };
    setFormulas(prev => [...prev, newFormula]);
  };

  const toggleFlashcardMastered = (id: string) => {
    setFlashcards(prev => prev.map(f => (f.id === id ? { ...f, mastered: !f.mastered } : f)));
  };

  const updateDeadline = (updated: ExamDeadline) => {
    setDeadlines(prev => prev.map(d => (d.id === updated.id ? updated : d)));
  };

  const addDeadline = (deadlineData: Omit<ExamDeadline, 'id'>) => {
    const newDeadline: ExamDeadline = {
      ...deadlineData,
      semester: currentSemester,
      id: `dl-${Date.now()}`
    };
    setDeadlines(prev => [...prev, newDeadline]);
  };

  const addTarget = (
    title: string,
    subjectId: SubjectId,
    priority: 'High' | 'Medium' | 'Low',
    dueDate: string
  ) => {
    const newTarget: StudyTarget = {
      id: `st-${Date.now()}`,
      title,
      subjectId,
      semester: currentSemester,
      dueDate,
      completed: false,
      priority
    };
    setTargets(prev => [newTarget, ...prev]);
  };

  const toggleTarget = (id: string) => {
    setTargets(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTarget = (id: string) => {
    setTargets(prev => prev.filter(t => t.id !== id));
  };

  const addCustomSubject = (meta: SubjectMeta, units: SyllabusUnit[]) => {
    const subjectWithSem: SubjectMeta = {
      ...meta,
      semester: currentSemester
    };
    setSubjects(prev => [...prev, subjectWithSem]);
    setSyllabus(prev => ({ ...prev, [meta.id]: units }));
  };

  const exportDataJSON = () => {
    const payload = {
      user: currentUser,
      currentSemester,
      subjects,
      syllabus,
      notes,
      pyqs,
      answers,
      formulas,
      flashcards,
      deadlines,
      targets,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(payload, null, 2);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.subjects && data.syllabus) {
        if (data.user) setCurrentUser(data.user);
        if (data.currentSemester) setCurrentSemester(data.currentSemester);
        if (data.subjects) setSubjects(data.subjects);
        if (data.syllabus) setSyllabus(data.syllabus);
        if (data.notes) setNotes(data.notes);
        if (data.pyqs) setPyqs(data.pyqs);
        if (data.answers) setAnswers(data.answers);
        if (data.formulas) setFormulas(data.formulas);
        if (data.flashcards) setFlashcards(data.flashcards);
        if (data.deadlines) setDeadlines(data.deadlines);
        if (data.targets) setTargets(data.targets);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Pure clean slate: resets all topics to unchecked (0%), clears notes, pyqs, answers, targets
  const clearToBlankSlate = () => {
    setSyllabus(prev => cleanTopicsStatus(prev));
    setNotes([]);
    setPyqs([]);
    setAnswers([]);
    setTargets([]);
    setFlashcards(prev => prev.map(f => ({ ...f, mastered: false })));
  };

  // Reset to clean curriculum: 5 core subjects for Semester 3 with 0% progress and clean timetable
  const resetToCleanCurriculum = () => {
    setCurrentSemesterState(3);
    setSubjects(INITIAL_SUBJECTS);
    setSyllabus(cleanTopicsStatus(INITIAL_SYLLABUS));
    setNotes([]);
    setPyqs([]);
    setAnswers([]);
    setTargets([]);
    setDeadlines(INITIAL_DEADLINES);
    setFlashcards(INITIAL_FLASHCARDS.map(f => ({ ...f, mastered: false })));
  };

  // Optional: load reference study pack with example notes and PYQs for testing
  const loadReferencePack = () => {
    setNotes(INITIAL_NOTES);
    setPyqs(INITIAL_PYQS);
    setAnswers(INITIAL_ANSWERS);
    setFormulas(INITIAL_FORMULAS);
    setDeadlines(INITIAL_DEADLINES);
  };

  const resetToDefaults = () => {
    resetToCleanCurriculum();
  };

  // Analytics Helpers
  const getSubjectProgress = (subjectId: string) => {
    const units = syllabus[subjectId] || [];
    let total = 0;
    let completed = 0;
    units.forEach(u => {
      u.topics.forEach(t => {
        total++;
        if (t.isCompleted) completed++;
      });
    });
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, percentage };
  };

  const getOverallSemesterProgress = () => {
    let total = 0;
    let completed = 0;
    const currentSubjectIds = activeSubjects.map(s => s.id);
    currentSubjectIds.forEach(subId => {
      const units = syllabus[subId] || [];
      units.forEach(u => {
        u.topics.forEach(t => {
          total++;
          if (t.isCompleted) completed++;
        });
      });
    });
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, percentage };
  };

  const getSubjectPYQStats = (subjectId: string) => {
    const list = pyqs.filter(p => p.subjectId === subjectId);
    const total = list.length;
    const solved = list.filter(p => p.status === 'solved').length;
    const inProgress = list.filter(p => p.status === 'in-progress').length;
    const unsolved = list.filter(p => p.status === 'unsolved').length;
    const percentage = total === 0 ? 0 : Math.round((solved / total) * 100);
    return { total, solved, inProgress, unsolved, percentage };
  };

  const getAllPYQStats = () => {
    const currentSubjectIds = activeSubjects.map(s => s.id);
    const list = pyqs.filter(p => currentSubjectIds.includes(p.subjectId));
    const total = list.length;
    const solved = list.filter(p => p.status === 'solved').length;
    const inProgress = list.filter(p => p.status === 'in-progress').length;
    const unsolved = list.filter(p => p.status === 'unsolved').length;
    const percentage = total === 0 ? 0 : Math.round((solved / total) * 100);
    return { total, solved, inProgress, unsolved, percentage };
  };

  const getDaysRemaining = (dateString: string) => {
    if (!dateString) return 0;
    const target = new Date(dateString).getTime();
    if (isNaN(target)) return 0;
    const today = new Date().setHours(0, 0, 0, 0);
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const value = useMemo(
    () => ({
      activeSubjectId,
      setActiveSubjectId,
      activeTab,
      setActiveTab,
      focusedAnswerId,
      setFocusedAnswerId,
      searchQuery,
      setSearchQuery,
      isSearchOpen,
      setIsSearchOpen,
      isPomodoroOpen,
      setIsPomodoroOpen,
      isAuthOpen,
      setIsAuthOpen,
      isProfileOpen,
      setIsProfileOpen,
      currentSemester,
      setCurrentSemester,
      currentUser,
      savedAccounts,
      login,
      signup,
      logout,
      updateProfile,
      switchUserAccount,
      deleteAccount,
      subjects,
      activeSubjects,
      syllabus,
      notes,
      pyqs,
      answers,
      formulas,
      flashcards,
      deadlines,
      targets,
      toggleTopicCompletion,
      addTopic,
      deleteTopic,
      addUnit,
      deleteUnit,
      addNote,
      updateNote,
      deleteNote,
      toggleBookmarkNote,
      addPYQ,
      updatePYQ,
      deletePYQ,
      updatePYQStatus,
      addAnswer,
      updateAnswer,
      deleteAnswer,
      addFormula,
      toggleFlashcardMastered,
      updateDeadline,
      addDeadline,
      addTarget,
      toggleTarget,
      deleteTarget,
      addCustomSubject,
      exportDataJSON,
      importDataJSON,
      clearToBlankSlate,
      resetToCleanCurriculum,
      loadReferencePack,
      resetToDefaults,
      getSubjectProgress,
      getOverallSemesterProgress,
      getSubjectPYQStats,
      getAllPYQStats,
      getDaysRemaining
    }),
    [
      activeSubjectId,
      activeTab,
      focusedAnswerId,
      searchQuery,
      isSearchOpen,
      isPomodoroOpen,
      isAuthOpen,
      isProfileOpen,
      currentSemester,
      currentUser,
      savedAccounts,
      subjects,
      activeSubjects,
      syllabus,
      notes,
      pyqs,
      answers,
      formulas,
      flashcards,
      deadlines,
      targets
    ]
  );

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};
