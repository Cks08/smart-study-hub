export type SubjectId = 'analog-circuits' | 'maths' | 'control-systems' | 'dbms' | 'java' | string;

export interface FileAttachment {
  id: string;
  name: string;
  size: number; // in bytes
  type: string; // e.g. 'application/pdf', 'image/png', 'image/jpeg', 'text/plain'
  dataUrl: string; // Base64 data URL for in-browser preview and download
  uploadedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  university?: string;
  branch: string; // e.g. "Computer Science & Engineering", "Electronics & Communication"
  currentSemester: number; // e.g. 3
  targetCgpa?: number;
  rollNumber?: string;
  avatarColor: string;
  bio?: string;
  createdAt: string;
}

export interface TopicItem {
  id: string;
  title: string;
  isCompleted: boolean;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  estimatedHours?: number;
  notesRefId?: string;
}

export interface SyllabusUnit {
  id: string;
  unitNumber: number;
  title: string;
  topics: TopicItem[];
  examWeightageMarks?: number;
}

export interface NoteItem {
  id: string;
  subjectId: SubjectId;
  semester?: number;
  unitNumber?: number;
  title: string;
  topic: string;
  content: string; // Markdown / formatted text
  tags: string[];
  priority: 'High' | 'Medium' | 'Low';
  isBookmarked: boolean;
  createdAt: string;
  updatedAt: string;
  keyTakeaways?: string[];
  formulaList?: string[];
  attachments?: FileAttachment[];
  codeSnippet?: {
    language: string;
    code: string;
  };
}

export interface PYQItem {
  id: string;
  subjectId: SubjectId;
  semester?: number;
  year: number; // e.g. 2024, 2023, 2022
  session: 'End-Semester' | 'Mid-Semester' | 'Supplementary' | 'Internal Test';
  unitNumber: number;
  topic: string;
  questionNumber?: string; // e.g. "Q3 (a)"
  questionText: string;
  marks: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'unsolved' | 'in-progress' | 'solved';
  associatedAnswerId?: string; // Direct link to model answer
  userNotes?: string;
  attachments?: FileAttachment[];
}

export interface AnswerItem {
  id: string;
  pyqId?: string;
  subjectId: SubjectId;
  semester?: number;
  questionTitle: string;
  questionText?: string;
  stepByStepSolution: string[];
  fullMarkdownSolution: string;
  examTips?: string;
  commonPitfalls?: string;
  attachments?: FileAttachment[];
  codeSnippet?: {
    language: string;
    code: string;
  };
  authorNotes?: string;
  updatedAt: string;
}

export interface FormulaItem {
  id: string;
  subjectId: SubjectId;
  semester?: number;
  title: string;
  unitNumber?: number;
  formula: string;
  explanation: string;
  variables: string;
  category: string;
}

export interface FlashcardItem {
  id: string;
  subjectId: SubjectId;
  semester?: number;
  question: string;
  answer: string;
  category: string;
  unitNumber?: number;
  mastered: boolean;
}

export interface ExamDeadline {
  id: string;
  subjectId: SubjectId;
  semester?: number;
  examName: string; // e.g. "End-Sem Theory Exam"
  examDate: string; // ISO date string YYYY-MM-DD
  examTime: string; // "09:30 AM"
  venueOrRoom?: string;
  totalMarks: number;
  passingMarks: number;
  notes?: string;
}

export interface StudyTarget {
  id: string;
  title: string;
  subjectId: SubjectId;
  semester?: number;
  dueDate: string; // YYYY-MM-DD
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

export interface SubjectMeta {
  id: SubjectId;
  semester: number;
  name: string;
  code: string;
  credits: number;
  description: string;
  accentColor: string; // hex
  badgeColor: string;
  iconName: string;
}
