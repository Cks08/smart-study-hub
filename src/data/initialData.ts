import { SubjectMeta, SyllabusUnit, NoteItem, PYQItem, AnswerItem, FormulaItem, FlashcardItem, ExamDeadline, StudyTarget } from '../types';

export const getFutureDate = (daysAhead: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
};

export const INITIAL_SUBJECTS: SubjectMeta[] = [
  {
    id: 'analog-circuits',
    semester: 3,
    name: 'Analog Circuits',
    code: 'EC-301',
    credits: 4,
    description: 'Diode applications, BJT/MOSFET small-signal modeling, feedback amplifiers, op-amps, oscillators, and active filters.',
    accentColor: '#f59e0b',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    iconName: 'Cpu'
  },
  {
    id: 'maths',
    semester: 3,
    name: 'Engineering Mathematics',
    code: 'MA-301',
    credits: 4,
    description: 'Linear algebra, eigenvalues, differential equations, complex variables, contour integration, and probability theory.',
    accentColor: '#0ea5e9',
    badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    iconName: 'Sigma'
  },
  {
    id: 'control-systems',
    semester: 3,
    name: 'Control Systems',
    code: 'EE-302',
    credits: 4,
    description: 'Transfer functions, block reduction, time response, Routh-Hurwitz, Root Locus, Bode plots, and state space analysis.',
    accentColor: '#6366f1',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    iconName: 'Sliders'
  },
  {
    id: 'dbms',
    semester: 3,
    name: 'Database Management Systems',
    code: 'CS-303',
    credits: 4,
    description: 'ER modeling, relational algebra, SQL optimization, normalization 1NF-BCNF, transactions, ACID, and B+ Tree indexing.',
    accentColor: '#10b981',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    iconName: 'Database'
  },
  {
    id: 'java',
    semester: 3,
    name: 'Java & Object-Oriented Software',
    code: 'CS-304',
    credits: 4,
    description: 'OOP design, JVM memory model, Collections Framework, Concurrency & multithreading, and Java 8 Streams.',
    accentColor: '#f43f5e',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    iconName: 'Code2'
  }
];

export const INITIAL_SYLLABUS: Record<string, SyllabusUnit[]> = {
  'analog-circuits': [
    {
      id: 'ac-u1',
      unitNumber: 1,
      title: 'Diode Circuits & Power Supplies',
      examWeightageMarks: 15,
      topics: [
        { id: 'ac-u1-t1', title: 'PN Junction Diode & Zener Voltage Regulators', isCompleted: false, difficulty: 'Easy', estimatedHours: 3 },
        { id: 'ac-u1-t2', title: 'Full-Wave Bridge Rectifier & Filter Capacitors', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 },
        { id: 'ac-u1-t3', title: 'Clipping and Clamping Circuits (Biased & Unbiased)', isCompleted: false, difficulty: 'Medium', estimatedHours: 3 }
      ]
    },
    {
      id: 'ac-u2',
      unitNumber: 2,
      title: 'BJT Amplifiers & Biasing',
      examWeightageMarks: 20,
      topics: [
        { id: 'ac-u2-t1', title: 'Operating Point Q and Voltage Divider Bias Stability', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 },
        { id: 'ac-u2-t2', title: 'Small-Signal Hybrid-π Model (gm, r_pi, ro)', isCompleted: false, difficulty: 'Hard', estimatedHours: 6 },
        { id: 'ac-u2-t3', title: 'Common Emitter (CE) with unbypassed emitter resistor Re', isCompleted: false, difficulty: 'Hard', estimatedHours: 5 }
      ]
    },
    {
      id: 'ac-u3',
      unitNumber: 3,
      title: 'MOSFET Amplifiers & Current Mirrors',
      examWeightageMarks: 20,
      topics: [
        { id: 'ac-u3-t1', title: 'MOSFET Small-Signal Parameters & High-Frequency Model', isCompleted: false, difficulty: 'Medium', estimatedHours: 5 },
        { id: 'ac-u3-t2', title: 'Common Source (CS) Amplifier with Active Load', isCompleted: false, difficulty: 'Hard', estimatedHours: 4 },
        { id: 'ac-u3-t3', title: 'Basic & Cascode Current Mirrors', isCompleted: false, difficulty: 'Hard', estimatedHours: 4 }
      ]
    },
    {
      id: 'ac-u4',
      unitNumber: 4,
      title: 'Feedback Amplifiers & Oscillators',
      examWeightageMarks: 20,
      topics: [
        { id: 'ac-u4-t1', title: 'Four Feedback Topologies (Voltage/Current Series & Shunt)', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 },
        { id: 'ac-u4-t2', title: 'Barkhausen Criterion for Oscillation', isCompleted: false, difficulty: 'Easy', estimatedHours: 2 },
        { id: 'ac-u4-t3', title: 'RC Phase Shift & Wien Bridge Oscillators', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 }
      ]
    },
    {
      id: 'ac-u5',
      unitNumber: 5,
      title: 'Operational Amplifiers & Active Filters',
      examWeightageMarks: 25,
      topics: [
        { id: 'ac-u5-t1', title: 'Ideal vs Practical Op-Amp Characteristics & Golden Rules', isCompleted: false, difficulty: 'Easy', estimatedHours: 3 },
        { id: 'ac-u5-t2', title: 'Schmitt Trigger (Inverting and Non-Inverting Hysteresis)', isCompleted: false, difficulty: 'Hard', estimatedHours: 5 },
        { id: 'ac-u5-t3', title: '1st & 2nd Order Butterworth Low-Pass / High-Pass Filters', isCompleted: false, difficulty: 'Hard', estimatedHours: 5 },
        { id: 'ac-u5-t4', title: '555 Timer IC: Astable & Monostable Multivibrators', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 }
      ]
    }
  ],
  'maths': [
    {
      id: 'ma-u1',
      unitNumber: 1,
      title: 'Linear Algebra & Matrix Decompositions',
      examWeightageMarks: 20,
      topics: [
        { id: 'ma-u1-t1', title: 'Rank of Matrix & Consistency of Linear Equations', isCompleted: false, difficulty: 'Easy', estimatedHours: 3 },
        { id: 'ma-u1-t2', title: 'Eigenvalues and Eigenvectors of 3x3 Matrices', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 },
        { id: 'ma-u1-t3', title: 'Cayley-Hamilton Theorem & Inverse Calculation', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 },
        { id: 'ma-u1-t4', title: 'Diagonalization & Quadratic Forms to Canonical Form', isCompleted: false, difficulty: 'Hard', estimatedHours: 5 }
      ]
    },
    {
      id: 'ma-u2',
      unitNumber: 2,
      title: 'Differential Calculus & Optimization',
      examWeightageMarks: 20,
      topics: [
        { id: 'ma-u2-t1', title: 'Rolle’s & Lagrange’s Mean Value Theorems', isCompleted: false, difficulty: 'Easy', estimatedHours: 3 },
        { id: 'ma-u2-t2', title: 'Partial Derivatives & Taylor Series for Two Variables', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 },
        { id: 'ma-u2-t3', title: 'Maxima & Minima of Two Variables using Lagrange Multipliers', isCompleted: false, difficulty: 'Hard', estimatedHours: 5 }
      ]
    },
    {
      id: 'ma-u3',
      unitNumber: 3,
      title: 'Ordinary Differential Equations & Laplace',
      examWeightageMarks: 20,
      topics: [
        { id: 'ma-u3-t1', title: 'Higher Order Linear ODEs with Constant Coefficients', isCompleted: false, difficulty: 'Medium', estimatedHours: 5 },
        { id: 'ma-u3-t2', title: 'Method of Variation of Parameters', isCompleted: false, difficulty: 'Hard', estimatedHours: 4 },
        { id: 'ma-u3-t3', title: 'Laplace Transforms & Inverse Transforms using Partial Fractions', isCompleted: false, difficulty: 'Medium', estimatedHours: 5 }
      ]
    },
    {
      id: 'ma-u4',
      unitNumber: 4,
      title: 'Complex Analysis & Contour Integration',
      examWeightageMarks: 20,
      topics: [
        { id: 'ma-u4-t1', title: 'Cauchy-Riemann Equations & Analytic Functions', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 },
        { id: 'ma-u4-t2', title: 'Cauchy Integral Theorem and Formula', isCompleted: false, difficulty: 'Hard', estimatedHours: 4 },
        { id: 'ma-u4-t3', title: 'Residue Theorem & Evaluating Real Improper Integrals', isCompleted: false, difficulty: 'Hard', estimatedHours: 6 }
      ]
    },
    {
      id: 'ma-u5',
      unitNumber: 5,
      title: 'Probability & Statistical Inference',
      examWeightageMarks: 20,
      topics: [
        { id: 'ma-u5-t1', title: 'Conditional Probability & Bayes’ Theorem', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 },
        { id: 'ma-u5-t2', title: 'Binomial, Poisson, and Normal Distributions', isCompleted: false, difficulty: 'Medium', estimatedHours: 5 },
        { id: 'ma-u5-t3', title: 'Hypothesis Testing (t-test, z-test, Chi-square)', isCompleted: false, difficulty: 'Hard', estimatedHours: 5 }
      ]
    }
  ],
  'control-systems': [
    {
      id: 'cs-u1',
      unitNumber: 1,
      title: 'Mathematical Modeling & Transfer Functions',
      examWeightageMarks: 15,
      topics: [
        { id: 'cs-u1-t1', title: 'Open Loop vs Closed Loop Systems & Feedback Effects', isCompleted: false, difficulty: 'Easy', estimatedHours: 2 },
        { id: 'cs-u1-t2', title: 'Block Diagram Algebra & Reduction Techniques', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 },
        { id: 'cs-u1-t3', title: 'Signal Flow Graphs & Mason’s Gain Formula', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 }
      ]
    },
    {
      id: 'cs-u2',
      unitNumber: 2,
      title: 'Time Response Analysis',
      examWeightageMarks: 20,
      topics: [
        { id: 'cs-u2-t1', title: 'Standard Test Inputs (Step, Ramp, Parabolic, Impulse)', isCompleted: false, difficulty: 'Easy', estimatedHours: 2 },
        { id: 'cs-u2-t2', title: 'Second Order Transient Specs: tr, tp, Mp, ts', isCompleted: false, difficulty: 'Medium', estimatedHours: 5 },
        { id: 'cs-u2-t3', title: 'Steady-State Errors & Static Error Constants (Kp, Kv, Ka)', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 }
      ]
    },
    {
      id: 'cs-u3',
      unitNumber: 3,
      title: 'Stability & Routh-Hurwitz Criterion',
      examWeightageMarks: 20,
      topics: [
        { id: 'cs-u3-t1', title: 'Concept of Absolute & Relative Stability', isCompleted: false, difficulty: 'Easy', estimatedHours: 2 },
        { id: 'cs-u3-t2', title: 'Routh-Hurwitz Array Construction & Rules', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 },
        { id: 'cs-u3-t3', title: 'Special Cases: Zero in First Column & Row of All Zeros', isCompleted: false, difficulty: 'Hard', estimatedHours: 4 },
        { id: 'cs-u3-t4', title: 'Range of Gain K for Stable Operation', isCompleted: false, difficulty: 'Hard', estimatedHours: 4 }
      ]
    },
    {
      id: 'cs-u4',
      unitNumber: 4,
      title: 'Root Locus & Frequency Response Analysis',
      examWeightageMarks: 25,
      topics: [
        { id: 'cs-u4-t1', title: 'Root Locus Construction Rules (Angles, Centroid, Breakaway)', isCompleted: false, difficulty: 'Hard', estimatedHours: 6 },
        { id: 'cs-u4-t2', title: 'Bode Plot: Magnitude & Phase Angle Asymptotes', isCompleted: false, difficulty: 'Hard', estimatedHours: 6 },
        { id: 'cs-u4-t3', title: 'Gain Margin (GM) and Phase Margin (PM) from Bode Plots', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 }
      ]
    },
    {
      id: 'cs-u5',
      unitNumber: 5,
      title: 'Nyquist Criterion & State Space Analysis',
      examWeightageMarks: 20,
      topics: [
        { id: 'cs-u5-t1', title: 'Nyquist Stability Criterion (N = P - Z)', isCompleted: false, difficulty: 'Hard', estimatedHours: 5 },
        { id: 'cs-u5-t2', title: 'State Variable Modeling of Physical Systems', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 },
        { id: 'cs-u5-t3', title: 'State Transition Matrix e^(At) and Solution', isCompleted: false, difficulty: 'Hard', estimatedHours: 5 }
      ]
    }
  ],
  'dbms': [
    {
      id: 'db-u1',
      unitNumber: 1,
      title: 'Database Architecture & ER Modeling',
      examWeightageMarks: 15,
      topics: [
        { id: 'db-u1-t1', title: 'Three-Schema Architecture & Data Independence', isCompleted: false, difficulty: 'Easy', estimatedHours: 2 },
        { id: 'db-u1-t2', title: 'Entity-Relationship (ER) & Enhanced ER (EER) Modeling', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 },
        { id: 'db-u1-t3', title: 'Mapping ER Diagrams to Relational Tables', isCompleted: false, difficulty: 'Medium', estimatedHours: 3 }
      ]
    },
    {
      id: 'db-u2',
      unitNumber: 2,
      title: 'Relational Model, Algebra & Advanced SQL',
      examWeightageMarks: 25,
      topics: [
        { id: 'db-u2-t1', title: 'Relational Algebra Operators (Select, Project, Joins, Division)', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 },
        { id: 'db-u2-t2', title: 'Complex SQL: Subqueries, Correlated Subqueries & CTEs', isCompleted: false, difficulty: 'Medium', estimatedHours: 5 },
        { id: 'db-u2-t3', title: 'Window Functions (ROW_NUMBER, DENSE_RANK, LEAD/LAG)', isCompleted: false, difficulty: 'Hard', estimatedHours: 4 }
      ]
    },
    {
      id: 'db-u3',
      unitNumber: 3,
      title: 'Relational Database Design & Normalization',
      examWeightageMarks: 25,
      topics: [
        { id: 'db-u3-t1', title: 'Functional Dependencies & Attribute Closure Algorithm', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 },
        { id: 'db-u3-t2', title: 'Finding Candidate Keys from FD Sets', isCompleted: false, difficulty: 'Medium', estimatedHours: 3 },
        { id: 'db-u3-t3', title: 'Normal Forms: 1NF, 2NF, 3NF vs BCNF', isCompleted: false, difficulty: 'Hard', estimatedHours: 6 },
        { id: 'db-u3-t4', title: 'Lossless Join & Dependency Preserving Decompositions', isCompleted: false, difficulty: 'Hard', estimatedHours: 5 }
      ]
    },
    {
      id: 'db-u4',
      unitNumber: 4,
      title: 'Transactions & Concurrency Control',
      examWeightageMarks: 20,
      topics: [
        { id: 'db-u4-t1', title: 'ACID Properties and Transaction State Diagram', isCompleted: false, difficulty: 'Easy', estimatedHours: 3 },
        { id: 'db-u4-t2', title: 'Conflict Serializability & Precedence Graph Test', isCompleted: false, difficulty: 'Hard', estimatedHours: 5 },
        { id: 'db-u4-t3', title: 'Two-Phase Locking (2PL, Strict 2PL, Rigorous 2PL)', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 },
        { id: 'db-u4-t4', title: 'Deadlock Handling: Wait-Die vs Wound-Wait', isCompleted: false, difficulty: 'Medium', estimatedHours: 3 }
      ]
    },
    {
      id: 'db-u5',
      unitNumber: 5,
      title: 'Storage, Indexing & Query Processing',
      examWeightageMarks: 15,
      topics: [
        { id: 'db-u5-t1', title: 'File Organization & Primary vs Secondary Indexing', isCompleted: false, difficulty: 'Medium', estimatedHours: 3 },
        { id: 'db-u5-t2', title: 'B-Trees vs B+ Trees (Insertion, Search, and Splitting)', isCompleted: false, difficulty: 'Hard', estimatedHours: 5 },
        { id: 'db-u5-t3', title: 'Query Execution Plan & Cost-Based Optimizer Basics', isCompleted: false, difficulty: 'Medium', estimatedHours: 3 }
      ]
    }
  ],
  'java': [
    {
      id: 'jv-u1',
      unitNumber: 1,
      title: 'Object-Oriented Paradigms & JVM Internal Architecture',
      examWeightageMarks: 20,
      topics: [
        { id: 'jv-u1-t1', title: 'Encapsulation, Polymorphism (Static vs Dynamic), Abstraction', isCompleted: false, difficulty: 'Easy', estimatedHours: 3 },
        { id: 'jv-u1-t2', title: 'JVM Architecture: ClassLoader, Method Area, Heap, Stack, PC', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 },
        { id: 'jv-u1-t3', title: 'Garbage Collection: Generational Collection & GC Algorithms', isCompleted: false, difficulty: 'Hard', estimatedHours: 4 }
      ]
    },
    {
      id: 'jv-u2',
      unitNumber: 2,
      title: 'Strings, Memory & Exception Handling',
      examWeightageMarks: 15,
      topics: [
        { id: 'jv-u2-t1', title: 'String Constant Pool, Immutability & StringBuilder vs StringBuffer', isCompleted: false, difficulty: 'Easy', estimatedHours: 3 },
        { id: 'jv-u2-t2', title: 'Checked vs Unchecked Exceptions & Custom Exceptions', isCompleted: false, difficulty: 'Medium', estimatedHours: 3 },
        { id: 'jv-u2-t3', title: 'try-with-resources and AutoCloseable Interface', isCompleted: false, difficulty: 'Medium', estimatedHours: 3 }
      ]
    },
    {
      id: 'jv-u3',
      unitNumber: 3,
      title: 'Java Collections Framework',
      examWeightageMarks: 25,
      topics: [
        { id: 'jv-u3-t1', title: 'Collection Hierarchy: List (ArrayList, LinkedList, Vector)', isCompleted: false, difficulty: 'Easy', estimatedHours: 3 },
        { id: 'jv-u3-t2', title: 'HashMap Internal Implementation (Buckets, HashCode, Treeify)', isCompleted: false, difficulty: 'Hard', estimatedHours: 6 },
        { id: 'jv-u3-t3', title: 'Set (HashSet, TreeSet) & Comparable vs Comparator', isCompleted: false, difficulty: 'Medium', estimatedHours: 4 },
        { id: 'jv-u3-t4', title: 'ConcurrentHashMap & Fail-Fast vs Fail-Safe Iterators', isCompleted: false, difficulty: 'Hard', estimatedHours: 4 }
      ]
    },
    {
      id: 'jv-u4',
      unitNumber: 4,
      title: 'Multithreading & Concurrency',
      examWeightageMarks: 20,
      topics: [
        { id: 'jv-u4-t1', title: 'Thread Life Cycle & Creating Threads (Thread vs Runnable)', isCompleted: false, difficulty: 'Easy', estimatedHours: 3 },
        { id: 'jv-u4-t2', title: 'Synchronization, Race Conditions & Deadlocks', isCompleted: false, difficulty: 'Hard', estimatedHours: 5 },
        { id: 'jv-u4-t3', title: 'Inter-thread Communication: wait(), notify(), notifyAll()', isCompleted: false, difficulty: 'Hard', estimatedHours: 4 },
        { id: 'jv-u4-t4', title: 'ExecutorService, ThreadPools & Callable/Future', isCompleted: false, difficulty: 'Hard', estimatedHours: 5 }
      ]
    },
    {
      id: 'jv-u5',
      unitNumber: 5,
      title: 'Java 8+ Features & Functional Programming',
      examWeightageMarks: 20,
      topics: [
        { id: 'jv-u5-t1', title: 'Lambda Expressions & Functional Interfaces (@FunctionalInterface)', isCompleted: false, difficulty: 'Medium', estimatedHours: 3 },
        { id: 'jv-u5-t2', title: 'Stream API: map, filter, reduce, collect, flatMap', isCompleted: false, difficulty: 'Medium', estimatedHours: 5 },
        { id: 'jv-u5-t3', title: 'Optional Class & Default/Static Methods in Interfaces', isCompleted: false, difficulty: 'Easy', estimatedHours: 3 }
      ]
    }
  ]
};

export const INITIAL_DEADLINES: ExamDeadline[] = [
  {
    id: 'dl-maths',
    subjectId: 'maths',
    semester: 3,
    examName: 'End-Semester Theory Exam',
    examDate: getFutureDate(14),
    examTime: '09:30 AM - 12:30 PM',
    venueOrRoom: 'Main Academic Block (Hall 102)',
    totalMarks: 100,
    passingMarks: 40,
    notes: 'Calculators permitted (Casio fx-991EX).'
  },
  {
    id: 'dl-analog',
    subjectId: 'analog-circuits',
    semester: 3,
    examName: 'End-Semester Theory Exam',
    examDate: getFutureDate(18),
    examTime: '09:30 AM - 12:30 PM',
    venueOrRoom: 'Electronics Wing (Hall 204)',
    totalMarks: 100,
    passingMarks: 40,
    notes: 'Units 2 and 5 carry highest weightage.'
  },
  {
    id: 'dl-control',
    subjectId: 'control-systems',
    semester: 3,
    examName: 'End-Semester Theory Exam',
    examDate: getFutureDate(22),
    examTime: '02:00 PM - 05:00 PM',
    venueOrRoom: 'Engineering Block (Room 301)',
    totalMarks: 100,
    passingMarks: 40,
    notes: 'Semi-log and normal graph sheets will be provided.'
  },
  {
    id: 'dl-dbms',
    subjectId: 'dbms',
    semester: 3,
    examName: 'End-Semester Theory Exam',
    examDate: getFutureDate(26),
    examTime: '09:30 AM - 12:30 PM',
    venueOrRoom: 'IT Complex (Lecture Theatre 3)',
    totalMarks: 100,
    passingMarks: 40,
    notes: 'Focus on Normalization and Concurrency schedules.'
  },
  {
    id: 'dl-java',
    subjectId: 'java',
    semester: 3,
    examName: 'End-Semester Theory + Coding Exam',
    examDate: getFutureDate(30),
    examTime: '02:00 PM - 05:00 PM',
    venueOrRoom: 'CS Department Lab & Hall A',
    totalMarks: 100,
    passingMarks: 40,
    notes: 'Producer-Consumer and Collections expected.'
  }
];

export const INITIAL_STUDY_TARGETS: StudyTarget[] = [];

export const INITIAL_PYQS: PYQItem[] = [
  // ANALOG CIRCUITS PYQs
  {
    id: 'pyq-ac-1',
    subjectId: 'analog-circuits',
    year: 2024,
    session: 'End-Semester',
    unitNumber: 2,
    topic: 'BJT Amplifiers & Small-Signal',
    questionNumber: 'Q3 (a)',
    questionText: 'Derive expressions for the voltage gain (Av), input resistance (Rin), and output resistance (Rout) of a Common Emitter (CE) amplifier with an unbypassed emitter resistance Re using the Hybrid-π equivalent model.',
    marks: 10,
    difficulty: 'Hard',
    status: 'unsolved',
    associatedAnswerId: 'ans-ac-1',
    userNotes: 'Very important! Appeared in 2024, 2022, and 2019.'
  },
  {
    id: 'pyq-ac-2',
    subjectId: 'analog-circuits',
    year: 2024,
    session: 'End-Semester',
    unitNumber: 4,
    topic: 'Oscillators & Barkhausen Criterion',
    questionNumber: 'Q5 (b)',
    questionText: 'State the Barkhausen criterion for sustained oscillations. Explain the working of a Wien Bridge Oscillator with circuit diagram and derive the frequency of oscillation and required loop gain.',
    marks: 10,
    difficulty: 'Medium',
    status: 'unsolved',
    associatedAnswerId: 'ans-ac-2',
    userNotes: 'Condition is A * Beta = 1 angle 0 deg. Required amplifier gain >= 3.'
  },
  {
    id: 'pyq-ac-3',
    subjectId: 'analog-circuits',
    year: 2023,
    session: 'End-Semester',
    unitNumber: 5,
    topic: 'Schmitt Trigger & Op-Amps',
    questionNumber: 'Q7 (a)',
    questionText: 'Explain the operation of an inverting Schmitt trigger using an Op-Amp. Draw the transfer characteristic and derive expressions for the Upper Threshold Point (VUTP) and Lower Threshold Point (VLTP).',
    marks: 10,
    difficulty: 'Hard',
    status: 'unsolved',
    associatedAnswerId: 'ans-ac-3',
    userNotes: 'Used for noise elimination in digital signals.'
  },
  {
    id: 'pyq-ac-4',
    subjectId: 'analog-circuits',
    year: 2023,
    session: 'Mid-Semester',
    unitNumber: 2,
    topic: 'BJT Configurations Comparison',
    questionNumber: 'Q2',
    questionText: 'Compare Common Emitter (CE), Common Base (CB), and Common Collector (CC) configurations in terms of input impedance, output impedance, voltage gain, current gain, and typical application.',
    marks: 5,
    difficulty: 'Easy',
    status: 'unsolved',
    associatedAnswerId: 'ans-ac-4',
    userNotes: 'CC is buffer, CB is high freq / current buffer, CE is general amp.'
  },
  {
    id: 'pyq-ac-5',
    subjectId: 'analog-circuits',
    year: 2022,
    session: 'End-Semester',
    unitNumber: 5,
    topic: 'Active Filters',
    questionNumber: 'Q8',
    questionText: 'Design a first-order active low-pass Butterworth filter having a 3-dB cutoff frequency of 2 kHz and a passband voltage gain of 2. Select C = 0.01 µF.',
    marks: 5,
    difficulty: 'Medium',
    status: 'unsolved',
    associatedAnswerId: 'ans-ac-5'
  },

  // MATHS PYQs
  {
    id: 'pyq-ma-1',
    subjectId: 'maths',
    year: 2024,
    session: 'End-Semester',
    unitNumber: 1,
    topic: 'Eigenvalues & Cayley-Hamilton',
    questionNumber: 'Q1 (a)',
    questionText: 'Find the eigenvalues and eigenvectors of the matrix A = [[2, 1, 1], [2, 3, 2], [3, 3, 4]]. Hence, verify the Cayley-Hamilton theorem and compute A^-1.',
    marks: 10,
    difficulty: 'Hard',
    status: 'unsolved',
    associatedAnswerId: 'ans-ma-1',
    userNotes: 'Characteristic equation: det(A - lambda*I) = 0. Lambda = 1, 1, 7.'
  },
  {
    id: 'pyq-ma-2',
    subjectId: 'maths',
    year: 2024,
    session: 'End-Semester',
    unitNumber: 4,
    topic: 'Contour Integration & Residue Theorem',
    questionNumber: 'Q4 (b)',
    questionText: 'Evaluate the integral ∮_C (z^2 + 1) / ((z - 1)(z - 2)) dz where C is the circle |z| = 3 oriented counterclockwise, using Cauchy’s Residue Theorem.',
    marks: 10,
    difficulty: 'Medium',
    status: 'unsolved',
    associatedAnswerId: 'ans-ma-2',
    userNotes: 'Poles at z=1 and z=2 lie inside |z| = 3.'
  },
  {
    id: 'pyq-ma-3',
    subjectId: 'maths',
    year: 2023,
    session: 'End-Semester',
    unitNumber: 3,
    topic: 'Higher Order ODEs',
    questionNumber: 'Q3',
    questionText: 'Solve the second-order ordinary differential equation: (D^2 - 4D + 4)y = 8x^2 + e^(2x) + sin(2x).',
    marks: 10,
    difficulty: 'Hard',
    status: 'unsolved',
    associatedAnswerId: 'ans-ma-3',
    userNotes: 'Complementary Function CF = (c1 + c2*x)e^(2x). Particular Integral PI split into 3 parts.'
  },
  {
    id: 'pyq-ma-4',
    subjectId: 'maths',
    year: 2023,
    session: 'Mid-Semester',
    unitNumber: 2,
    topic: 'Lagrange Multipliers Optimization',
    questionNumber: 'Q2 (a)',
    questionText: 'Find the minimum and maximum distances from the origin to the plane curve given by x^2 + 2xy + 3y^2 = 10 using the method of Lagrange multipliers.',
    marks: 10,
    difficulty: 'Hard',
    status: 'unsolved',
    associatedAnswerId: 'ans-ma-4'
  },
  {
    id: 'pyq-ma-5',
    subjectId: 'maths',
    year: 2022,
    session: 'End-Semester',
    unitNumber: 5,
    topic: 'Bayes Theorem',
    questionNumber: 'Q6',
    questionText: 'Three machines A, B, and C produce 50%, 30%, and 20% of the total output of a factory. The percentages of defective items are 3%, 4%, and 5% respectively. An item is selected at random and found defective. What is the probability that it was produced by machine A?',
    marks: 5,
    difficulty: 'Easy',
    status: 'unsolved',
    associatedAnswerId: 'ans-ma-5'
  },

  // CONTROL SYSTEMS PYQs
  {
    id: 'pyq-cs-1',
    subjectId: 'control-systems',
    year: 2024,
    session: 'End-Semester',
    unitNumber: 3,
    topic: 'Routh-Hurwitz Stability',
    questionNumber: 'Q3 (a)',
    questionText: 'A unity feedback control system has open-loop transfer function G(s) = K / [s(s + 2)(s^2 + 6s + 25)]. Using the Routh-Hurwitz stability criterion, find the range of K for stability and the frequency of sustained oscillations when K is on the margin of stability.',
    marks: 10,
    difficulty: 'Hard',
    status: 'unsolved',
    associatedAnswerId: 'ans-cs-1',
    userNotes: 'Characteristic equation: s^4 + 8s^3 + 37s^2 + 50s + K = 0.'
  },
  {
    id: 'pyq-cs-2',
    subjectId: 'control-systems',
    year: 2024,
    session: 'End-Semester',
    unitNumber: 4,
    topic: 'Root Locus Construction',
    questionNumber: 'Q5',
    questionText: 'Sketch the Root Locus for a unity feedback system with G(s) = K / [s(s + 1)(s + 4)]. Calculate: (a) Angles of asymptotes, (b) Centroid, (c) Breakaway points, (d) Points of intersection with imaginary axis.',
    marks: 10,
    difficulty: 'Hard',
    status: 'unsolved',
    associatedAnswerId: 'ans-cs-2'
  },
  {
    id: 'pyq-cs-3',
    subjectId: 'control-systems',
    year: 2023,
    session: 'End-Semester',
    unitNumber: 4,
    topic: 'Bode Plot & Stability Margins',
    questionNumber: 'Q6',
    questionText: 'Draw the asymptotic Bode magnitude and phase plot for G(s) = 200 / [s(s + 2)(s + 10)]. From the plot, determine Gain Crossover Frequency (ωgc), Phase Crossover Frequency (ωpc), Gain Margin (GM), and Phase Margin (PM).',
    marks: 15,
    difficulty: 'Hard',
    status: 'unsolved',
    associatedAnswerId: 'ans-cs-3'
  },
  {
    id: 'pyq-cs-4',
    subjectId: 'control-systems',
    year: 2023,
    session: 'Mid-Semester',
    unitNumber: 2,
    topic: 'Second Order Transient Specs',
    questionNumber: 'Q2',
    questionText: 'A second-order position control system has open-loop transfer function G(s) = 25 / [s(s + 6)] with unity feedback. Calculate: (a) Natural frequency ωn and damping ratio ζ, (b) Rise time tr, (c) Peak time tp, (d) Percentage maximum overshoot Mp, (e) Settling time ts (2% criterion).',
    marks: 10,
    difficulty: 'Medium',
    status: 'unsolved',
    associatedAnswerId: 'ans-cs-4'
  },

  // DBMS PYQs
  {
    id: 'pyq-db-1',
    subjectId: 'dbms',
    year: 2024,
    session: 'End-Semester',
    unitNumber: 3,
    topic: 'Functional Dependencies & BCNF',
    questionNumber: 'Q4',
    questionText: 'Given relation schema R(A, B, C, D, E) and functional dependencies F = { A -> BC, CD -> E, B -> D, E -> A }: (a) Find all candidate keys of R, (b) Determine the highest normal form of R, (c) Decompose R into BCNF ensuring lossless join property.',
    marks: 10,
    difficulty: 'Hard',
    status: 'unsolved',
    associatedAnswerId: 'ans-db-1'
  },
  {
    id: 'pyq-db-2',
    subjectId: 'dbms',
    year: 2024,
    session: 'End-Semester',
    unitNumber: 4,
    topic: 'Conflict Serializability & ACID',
    questionNumber: 'Q5',
    questionText: 'Define Conflict Serializability. Consider schedule S: r1(A); r2(A); w1(A); r1(B); w2(A); w1(B); r2(B); w2(B). Draw the precedence (serialization) graph and test if S is conflict serializable. If yes, state an equivalent serial schedule.',
    marks: 10,
    difficulty: 'Medium',
    status: 'unsolved',
    associatedAnswerId: 'ans-db-2'
  },
  {
    id: 'pyq-db-3',
    subjectId: 'dbms',
    year: 2023,
    session: 'End-Semester',
    unitNumber: 2,
    topic: 'Advanced SQL Queries',
    questionNumber: 'Q2',
    questionText: 'Consider tables: Employee(emp_id, emp_name, salary, dept_id, manager_id) and Department(dept_id, dept_name). Write standard SQL queries to: (a) Find the 3rd highest salary without using LIMIT, (b) Find departments where average salary exceeds $80,000, (c) Find all employees earning more than their managers.',
    marks: 10,
    difficulty: 'Medium',
    status: 'unsolved',
    associatedAnswerId: 'ans-db-3'
  },
  {
    id: 'pyq-db-4',
    subjectId: 'dbms',
    year: 2023,
    session: 'Mid-Semester',
    unitNumber: 5,
    topic: 'B+ Tree Indexing vs B-Tree',
    questionNumber: 'Q5',
    questionText: 'Compare B-Tree and B+ Tree data structures for disk-based database indexing. Why are B+ trees preferred in modern RDBMS? Show the B+ tree resulting from inserting keys: 10, 20, 30, 40, 50 with order m = 3.',
    marks: 10,
    difficulty: 'Hard',
    status: 'unsolved',
    associatedAnswerId: 'ans-db-4'
  },

  // JAVA PYQs
  {
    id: 'pyq-jv-1',
    subjectId: 'java',
    year: 2024,
    session: 'End-Semester',
    unitNumber: 4,
    topic: 'Multithreading & Producer-Consumer',
    questionNumber: 'Q4',
    questionText: 'Explain the inter-thread communication mechanism in Java. Write a complete, thread-safe Producer-Consumer implementation using wait(), notifyAll(), and synchronized blocks on a shared bounded buffer.',
    marks: 10,
    difficulty: 'Hard',
    status: 'unsolved',
    associatedAnswerId: 'ans-jv-1'
  },
  {
    id: 'pyq-jv-2',
    subjectId: 'java',
    year: 2024,
    session: 'End-Semester',
    unitNumber: 3,
    topic: 'HashMap Internals & Hash Collisions',
    questionNumber: 'Q3',
    questionText: 'Describe in detail how Java HashMap works internally in Java 8+. Explain hash function, bucket array, load factor (0.75), collision resolution using linked list, and the treeification threshold (TREEIFY_THRESHOLD = 8).',
    marks: 10,
    difficulty: 'Medium',
    status: 'unsolved',
    associatedAnswerId: 'ans-jv-2'
  },
  {
    id: 'pyq-jv-3',
    subjectId: 'java',
    year: 2023,
    session: 'End-Semester',
    unitNumber: 5,
    topic: 'Java 8 Streams API',
    questionNumber: 'Q5',
    questionText: 'Explain the Streams API in Java 8. Given a class Employee(name, age, department, salary), write Stream pipelines to: (a) Group employees by department, (b) Find highest earner in each department, (c) Calculate total company salary expense.',
    marks: 10,
    difficulty: 'Medium',
    status: 'unsolved',
    associatedAnswerId: 'ans-jv-3'
  },
  {
    id: 'pyq-jv-4',
    subjectId: 'java',
    year: 2023,
    session: 'Mid-Semester',
    unitNumber: 1,
    topic: 'JVM Memory Architecture & GC',
    questionNumber: 'Q1',
    questionText: 'Diagram the JVM runtime data areas (Heap, Stack, Method Area / Metaspace, Program Counter Register, Native Method Stack). Explain the Generational Garbage Collection hypothesis (Eden, Survivor S0/S1, Tenured/Old Gen).',
    marks: 10,
    difficulty: 'Hard',
    status: 'unsolved',
    associatedAnswerId: 'ans-jv-4'
  }
];

export const INITIAL_ANSWERS: AnswerItem[] = [
  // ANALOG CIRCUITS ANSWERS
  {
    id: 'ans-ac-1',
    pyqId: 'pyq-ac-1',
    subjectId: 'analog-circuits',
    questionTitle: 'Derivation: CE Amplifier with Unbypassed Re (Av, Rin, Rout)',
    questionText: 'Derive expressions for the voltage gain (Av), input resistance (Rin), and output resistance (Rout) of a Common Emitter (CE) amplifier with an unbypassed emitter resistance Re using the Hybrid-π equivalent model.',
    stepByStepSolution: [
      'Step 1: Draw the AC small-signal equivalent circuit by replacing the BJT with its Hybrid-π model (r_pi between base and emitter, voltage-controlled current source gm*v_be between collector and emitter).',
      'Step 2: Note that the emitter is not connected directly to ground; an unbypassed resistor Re is connected from the emitter node to ground.',
      'Step 3: Relate input voltage Vin to base current Ib: Vin = Ib * r_pi + (Ib + gm * v_be) * Re. Since v_be = Ib * r_pi, substitute: Vin = Ib * [r_pi + (1 + gm * r_pi) * Re] = Ib * [r_pi + (1 + beta) * Re].',
      'Step 4: Input resistance Rin seen from the base: Rin = Vin / Ib = r_pi + (1 + beta) * Re ≈ r_pi + beta * Re.',
      'Step 5: Output voltage Vout is developed across collector load Rc: Vout = - Ic * Rc = - (gm * v_be) * Rc = - beta * Ib * Rc.',
      'Step 6: Voltage Gain Av = Vout / Vin = [ - beta * Ib * Rc ] / [ Ib * (r_pi + (1 + beta) * Re) ].',
      'Step 7: Dividing numerator and denominator by beta (where r_pi / beta = 1 / gm = re): Av ≈ - Rc / (re + Re). If Re >> re, Av ≈ - Rc / Re.',
      'Step 8: Output resistance Rout looking into the collector (with Vin = 0 => Ib = 0): Rout = Rc (or Rc || ro*[1 + gm*(Re || r_pi)] when ro is considered).'
    ],
    fullMarkdownSolution: `### Small-Signal AC Analysis of CE with Unbypassed $R_E$

**1. Circuit Equations:**
Let base current be $i_b$. The emitter current $i_e$ through $R_E$ is:
$$i_e = i_b + i_c = (1 + \\beta) i_b$$

Applying KVL at the input loop:
$$v_{in} = i_b r_\\pi + i_e R_E = i_b [r_\\pi + (1 + \\beta) R_E]$$

**2. Input Resistance ($R_{in}$):**
$$R_{in} = \\frac{v_{in}}{i_b} = r_\\pi + (1 + \\beta) R_E \\approx r_\\pi + \\beta R_E$$
*Physical intuition:* The resistance $R_E$ in the emitter branch appears magnified by $(1 + \\beta)$ when viewed from the base terminal!

**3. Voltage Gain ($A_v$):**
$$v_{out} = - i_c R_C = - \\beta i_b R_C$$
$$A_v = \\frac{v_{out}}{v_{in}} = \\frac{-\\beta i_b R_C}{i_b [r_\\pi + (1 + \\beta) R_E]} = \\frac{-\\beta R_C}{r_\\pi + (1 + \\beta) R_E}$$

Dividing numerator & denominator by $\\beta$ (recalling $r_\\pi / \\beta = r_e = V_T / I_E$):
$$A_v = -\\frac{R_C}{r_e + R_E} \\approx -\\frac{R_C}{R_E} \\quad (\\text{when } R_E \\gg r_e)$$

**4. Key Trade-off:**
Adding unbypassed $R_E$ introduces negative series-series feedback. It lowers voltage gain, but stabilizes gain against temperature variations ($\beta$ drift) and significantly boosts input impedance $R_{in}$.`,
    examTips: 'Always state assumptions: ro is assumed very large (infinite) unless explicitly specified in the exam problem.',
    commonPitfalls: 'Forgetting the negative sign in Av! The Common Emitter amplifier introduces a 180° phase inversion between input and output.',
    updatedAt: '2026-10-10'
  },
  {
    id: 'ans-ac-2',
    pyqId: 'pyq-ac-2',
    subjectId: 'analog-circuits',
    questionTitle: 'Barkhausen Criterion & Wien Bridge Oscillator',
    stepByStepSolution: [
      'Step 1: State Barkhausen Criterion: For sustained sinusoidal oscillations at frequency ω0, the loop gain must satisfy: |A * β| = 1 and phase angle ∠(A * β) = 0° or 2π * n.',
      'Step 2: Draw the Wien Bridge lead-lag network consisting of a series RC (R1, C1) and parallel RC (R2, C2) branch.',
      'Step 3: Derive feedback factor β(s) = Z_parallel / (Z_series + Z_parallel). When R1=R2=R and C1=C2=C, β(jω) = 1 / [ 3 + j(ωRC - 1/(ωRC)) ].',
      'Step 4: For zero phase shift across feedback network, the imaginary part must vanish: ωRC - 1/(ωRC) = 0 => ω0 = 1 / (RC) => f0 = 1 / (2πRC).',
      'Step 5: At resonance ω = ω0, β = 1 / 3.',
      'Step 6: By Barkhausen criterion |A * β| = 1 => A * (1/3) = 1 => Required non-inverting amplifier gain A >= 3.',
      'Step 7: For op-amp non-inverting configuration: A = 1 + Rf / R1 >= 3 => Rf >= 2 * R1.'
    ],
    fullMarkdownSolution: `### Wien Bridge Oscillator Analysis

**1. Barkhausen Criterion:**
1. **Magnitude Condition:** The magnitude of loop gain $|A\\beta| \\ge 1$ (set to exactly 1 in steady state via amplitude stabilization).
2. **Phase Condition:** The total phase shift around the closed loop must be $0^\\circ$ or integer multiple of $360^\\circ$.

**2. Transfer Function of Lead-Lag Network:**
With $Z_s = R + \\frac{1}{sC}$ and $Z_p = \\frac{R \\cdot \\frac{1}{sC}}{R + \\frac{1}{sC}} = \\frac{R}{sRC + 1}$:
$$\\beta(s) = \\frac{Z_p}{Z_s + Z_p} = \\frac{sRC}{(sRC)^2 + 3sRC + 1}$$

Substituting $s = j\\omega$:
$$\\beta(j\\omega) = \\frac{j\\omega RC}{1 - \\omega^2 R^2 C^2 + 3j\\omega RC} = \\frac{1}{3 + j\\left(\\omega RC - \\frac{1}{\\omega RC}\\right)}$$

**3. Frequency of Oscillation:**
For $\\angle \\beta(j\\omega) = 0^\\circ$, imaginary component in denominator must equal 0:
$$\\omega RC - \\frac{1}{\\omega RC} = 0 \\implies \\omega_0 = \\frac{1}{RC} \\implies f_0 = \\frac{1}{2\\pi RC}$$

**4. Minimum Amplifier Gain:**
At $\\omega_0$, $\\beta(j\\omega_0) = 1/3$.
To satisfy $|A\\beta| = 1$:
$$A_v = 1 + \\frac{R_f}{R_1} \\ge 3 \\implies R_f \\ge 2R_1$$`,
    examTips: 'Draw the op-amp circuit with R_f and R_1 connected to inverting terminal and lead-lag RC connected to non-inverting terminal.',
    updatedAt: '2026-10-11'
  },

  // MATHS ANSWERS
  {
    id: 'ans-ma-1',
    pyqId: 'pyq-ma-1',
    subjectId: 'maths',
    questionTitle: 'Eigenvalues, Eigenvectors & Cayley-Hamilton for 3x3 Matrix',
    stepByStepSolution: [
      'Step 1: Write characteristic equation det(A - λI) = 0.',
      'Step 2: Expand det([[2-λ, 1, 1], [2, 3-λ, 2], [3, 3, 4-λ]]) = 0.',
      'Step 3: Simplifying polynomial: -λ^3 + 9λ^2 - 15λ + 7 = 0 => (λ - 1)^2 * (λ - 7) = 0.',
      'Step 4: Eigenvalues are λ1 = 1 (multiplicity 2) and λ2 = 7.',
      'Step 5: For λ = 7: (A - 7I)X = 0 => row reduction gives eigenvector X1 = [1, 2, 3]^T.',
      'Step 6: For λ = 1: (A - 1I)X = 0 => row reduction yields x + y + z = 0, giving two linearly independent eigenvectors X2 = [-1, 1, 0]^T and X3 = [-1, 0, 1]^T.',
      'Step 7: Verification of Cayley-Hamilton: compute A^3 - 9A^2 + 15A - 7I and show it equals 0 matrix.',
      'Step 8: Compute A^-1: From A^3 - 9A^2 + 15A - 7I = 0, multiply by A^-1: 7*A^-1 = A^2 - 9A + 15I => A^-1 = (1/7)(A^2 - 9A + 15I).'
    ],
    fullMarkdownSolution: `### Complete Solution: Eigenvalues & Cayley-Hamilton

**Matrix:**
$$A = \\begin{pmatrix} 2 & 1 & 1 \\\\ 2 & 3 & 2 \\\\ 3 & 3 & 4 \\end{pmatrix}$$

**1. Characteristic Equation:**
$$\\det(A - \\lambda I) = \\begin{vmatrix} 2-\\lambda & 1 & 1 \\\\ 2 & 3-\\lambda & 2 \\\\ 3 & 3 & 4-\\lambda \\end{vmatrix} = 0$$

Using standard invariants:
- $S_1 = \\text{Trace}(A) = 2 + 3 + 4 = 9$
- $S_2 = \\text{Sum of principal minors} = (12-6) + (8-3) + (6-2) = 6 + 5 + 4 = 15$
- $S_3 = \\det(A) = 2(12-6) - 1(8-6) + 1(6-9) = 12 - 2 - 3 = 7$

Characteristic Equation:
$$\\lambda^3 - S_1 \\lambda^2 + S_2 \\lambda - S_3 = 0 \\implies \\lambda^3 - 9\\lambda^2 + 15\\lambda - 7 = 0$$

Factoring: $(\\lambda - 1)^2 (\\lambda - 7) = 0$
$$\\mathbf{\\lambda = 1, 1, 7}$$

**2. Inverse via Cayley-Hamilton:**
Since $A$ satisfies its own characteristic equation:
$$A^3 - 9A^2 + 15A - 7I = 0$$
Pre-multiplying by $A^{-1}$:
$$A^2 - 9A + 15I - 7A^{-1} = 0 \\implies A^{-1} = \\frac{1}{7} (A^2 - 9A + 15I)$$`,
    examTips: 'Using Trace(A) and sum of minors (S1, S2, S3) saves 10 minutes of error-prone 3x3 determinant expansion!',
    updatedAt: '2026-10-12'
  },
  {
    id: 'ans-ma-2',
    pyqId: 'pyq-ma-2',
    subjectId: 'maths',
    questionTitle: 'Cauchy Residue Theorem: ∮ (z^2 + 1)/((z-1)(z-2)) dz',
    stepByStepSolution: [
      'Step 1: Identify integrand f(z) = (z^2 + 1) / ((z - 1)(z - 2)).',
      'Step 2: Find poles of f(z): denominator (z - 1)(z - 2) = 0 => simple poles at z = 1 and z = 2.',
      'Step 3: Contour C is circle |z| = 3 centered at origin with radius 3. Both poles z = 1 (|1| < 3) and z = 2 (|2| < 3) lie inside C.',
      'Step 4: Calculate Residue at z = 1: Res(f, 1) = lim_{z->1} (z - 1)*f(z) = (1^2 + 1)/(1 - 2) = 2 / (-1) = -2.',
      'Step 5: Calculate Residue at z = 2: Res(f, 2) = lim_{z->2} (z - 2)*f(z) = (2^2 + 1)/(2 - 1) = 5 / 1 = 5.',
      'Step 6: Apply Cauchy Residue Theorem: ∮_C f(z) dz = 2πi * ∑ Res = 2πi * [Res(f, 1) + Res(f, 2)] = 2πi * (-2 + 5) = 2πi * 3 = 6πi.'
    ],
    fullMarkdownSolution: `### Cauchy's Residue Theorem Evaluation

**Integral:**
$$\\oint_C \\frac{z^2 + 1}{(z - 1)(z - 2)} \\, dz \\quad \\text{along } C: |z| = 3$$

**1. Locate Singularities:**
$f(z) = \\frac{P(z)}{Q(z)}$ has simple poles at $z = 1$ and $z = 2$.
Since $|1| = 1 < 3$ and $|2| = 2 < 3$, both poles lie strictly **inside** $C$.

**2. Residue Calculation:**
$$\\text{Res}(f, 1) = \\lim_{z \\to 1} (z - 1) \\frac{z^2 + 1}{(z - 1)(z - 2)} = \\frac{1 + 1}{1 - 2} = -2$$
$$\\text{Res}(f, 2) = \\lim_{z \\to 2} (z - 2) \\frac{z^2 + 1}{(z - 1)(z - 2)} = \\frac{4 + 1}{2 - 1} = +5$$

**3. Apply Residue Theorem:**
$$\\oint_C f(z) \\, dz = 2\\pi i \\sum \\text{Res} = 2\\pi i [(-2) + 5] = 2\\pi i (3) = \\mathbf{6\\pi i}$$`,
    examTips: 'Always state whether poles are inside, outside, or on the contour before calculating residues.',
    updatedAt: '2026-10-12'
  },

  // CONTROL SYSTEMS ANSWERS
  {
    id: 'ans-cs-1',
    pyqId: 'pyq-cs-1',
    subjectId: 'control-systems',
    questionTitle: 'Routh-Hurwitz Stability: Range of K & Oscillation Frequency',
    stepByStepSolution: [
      'Step 1: Write characteristic equation 1 + G(s)H(s) = 0 => s(s + 2)(s^2 + 6s + 25) + K = 0.',
      'Step 2: Expand denominator: s(s + 2)(s^2 + 6s + 25) = (s^2 + 2s)(s^2 + 6s + 25) = s^4 + 8s^3 + 37s^2 + 50s + K = 0.',
      'Step 3: Construct Routh Array:',
      '  s^4: 1,      37,   K',
      '  s^3: 8,      50,   0',
      '  s^2: (8*37 - 50)/8 = (296 - 50)/8 = 246/8 = 30.75,   K',
      '  s^1: (30.75*50 - 8*K) / 30.75 = (1537.5 - 8K) / 30.75,   0',
      '  s^0: K',
      'Step 4: For stability, all elements in the first column must be strictly positive (> 0):',
      '  From s^0 row: K > 0',
      '  From s^1 row: 1537.5 - 8K > 0 => K < 1537.5 / 8 => K < 192.1875.',
      'Step 5: Stable Range of K: 0 < K < 192.19.',
      'Step 6: Marginal Stability & Oscillation Frequency: At K_marginal = 192.19, s^1 row becomes all zeros.',
      'Step 7: Form auxiliary equation from s^2 row: 30.75*s^2 + K = 0 => 30.75*s^2 + 192.19 = 0 => s^2 = -192.19 / 30.75 = -6.25 => s = ± j 2.5 rad/s.',
      'Step 8: Frequency of sustained oscillations ω_osc = 2.5 rad/s.'
    ],
    fullMarkdownSolution: `### Routh-Hurwitz Array Solution

**Characteristic Equation:**
$$q(s) = s^4 + 8s^3 + 37s^2 + 50s + K = 0$$

**Routh Table:**
| Row | Column 1 | Column 2 | Column 3 |
|---|---|---|---|
| $s^4$ | $1$ | $37$ | $K$ |
| $s^3$ | $8$ | $50$ | $0$ |
| $s^2$ | $\\frac{8(37) - 50}{8} = 30.75$ | $K$ | $0$ |
| $s^1$ | $\\frac{30.75(50) - 8K}{30.75} = \\frac{1537.5 - 8K}{30.75}$ | $0$ | $0$ |
| $s^0$ | $K$ | $0$ | $0$ |

**1. Range of $K$ for Stability:**
For no sign changes in Column 1:
1. $K > 0$
2. $1537.5 - 8K > 0 \\implies K < 192.1875$

$$\\mathbf{0 < K < 192.19}$$

**2. Frequency of Sustained Oscillations:**
At $K = 192.1875$, the $s^1$ row becomes zero.
Auxiliary equation $A(s) = 0$ from $s^2$ row:
$$30.75 s^2 + 192.1875 = 0 \\implies s^2 = -\\frac{192.1875}{30.75} = -6.25$$
$$s = \\pm j 2.5 \\implies \\mathbf{\\omega_{osc} = 2.5 \\text{ rad/sec}}$$`,
    examTips: 'Always specify the unit "rad/sec" for sustained oscillation frequency.',
    updatedAt: '2026-10-12'
  },

  // DBMS ANSWERS
  {
    id: 'ans-db-1',
    pyqId: 'pyq-db-1',
    subjectId: 'dbms',
    questionTitle: 'Candidate Keys, Highest Normal Form & BCNF Decomposition',
    stepByStepSolution: [
      'Step 1: Given schema R(A, B, C, D, E) and FDs: F = { A -> BC, CD -> E, B -> D, E -> A }.',
      'Step 2: Find Candidate Keys via attribute closure: (A)+ = {A, B, C, D, E} => A is candidate key.',
      'Step 3: Check other attributes: From E -> A, (E)+ = {E, A, B, C, D} => E is candidate key.',
      'Step 4: Check (CD)+ = {C, D, E, A, B} => CD is candidate key. Check (BC)+: since B -> D, (BC)+ = (BCD)+ = {B, C, D, E, A} => BC is candidate key.',
      'Step 5: Candidate Keys: { A, E, BC, CD }. Prime attributes: { A, B, C, D, E } (all attributes are prime!).',
      'Step 6: Test Normal Forms: Since all attributes are prime, 2NF and 3NF conditions are satisfied! (In 3NF, for X -> Y, either X is superkey or Y is prime).',
      'Step 7: Check BCNF: In BCNF, for every non-trivial X -> Y, X must be a superkey. For B -> D, B is NOT a superkey. Therefore, R is in 3NF, but NOT in BCNF.',
      'Step 8: Decompose into BCNF: Violating FD is B -> D. Decompose R into: R1(B, D) with FD {B -> D} (B is key of R1, in BCNF) and R2(A, B, C, E) with FDs {A -> BC, E -> A}. Both R1 and R2 are in BCNF with lossless join.'
    ],
    fullMarkdownSolution: `### Normalization & BCNF Decomposition Analysis

**Schema & FDs:**
$R(A, B, C, D, E)$
$F = \\{ A \\to BC, \\, CD \\to E, \\, B \\to D, \\, E \\to A \\}$

**1. Candidate Keys:**
- $(A)^+ = \\{A, B, C, D, E\\} \\implies \\mathbf{A}$
- $(E)^+ = \\{E, A, B, C, D\\} \\implies \\mathbf{E}$
- $(CD)^+ = \\{C, D, E, A, B\\} \\implies \\mathbf{CD}$
- $(BC)^+ = \\{B, C, D, E, A\\} \\implies \\mathbf{BC}$

**Prime Attributes:** $\\{A, B, C, D, E\\}$ (All attributes in $R$ are prime).

**2. Highest Normal Form:**
- **3NF Check:** For every $X \\to Y$, either $X$ is a superkey OR $Y$ is a prime attribute. Since every attribute in $R$ is prime, every FD trivially satisfies 3NF! Thus, **$R$ is in 3NF**.
- **BCNF Check:** For $B \\to D$, $B$ is NOT a superkey (since $(B)^+ = \\{B, D\\} \\neq R$).
- Hence, **Highest Normal Form is 3NF**.

**3. BCNF Decomposition:**
Violating dependency: $B \\to D$.
1. $R_1(B, D)$ with key $B$. (In BCNF)
2. $R_2 = R - (D - B) = (A, B, C, E)$ with keys $A, E, BC$. (In BCNF)
Check: $R_1 \\cap R_2 = \\{B\\}$, which is key of $R_1$. Lossless join is guaranteed!`,
    examTips: 'Common viva/exam trap: students assume 3NF must fail if BCNF fails. Remember that all prime attributes automatically make the schema 3NF!',
    updatedAt: '2026-10-12'
  },
  {
    id: 'ans-db-3',
    pyqId: 'pyq-db-3',
    subjectId: 'dbms',
    questionTitle: 'Advanced SQL: Nth Highest Salary, HAVING, Self Join',
    stepByStepSolution: [
      'Step 1: (a) Find 3rd Highest Salary without LIMIT: Use DENSE_RANK() window function or correlated subquery.',
      'Step 2: Method 1 (Window function): SELECT salary FROM (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk FROM Employee) t WHERE rnk = 3;',
      'Step 3: Method 2 (Subquery without window function): SELECT MAX(salary) FROM Employee e1 WHERE 2 = (SELECT COUNT(DISTINCT e2.salary) FROM Employee e2 WHERE e2.salary > e1.salary);',
      'Step 4: (b) Departments with Average Salary > $80,000: Use GROUP BY dept_id and HAVING AVG(salary) > 80000.',
      'Step 5: (c) Employees earning more than their manager: Use Self Join on Employee table e (employee) and m (manager) where e.manager_id = m.emp_id AND e.salary > m.salary.'
    ],
    fullMarkdownSolution: `### SQL Solutions

**Query (a): 3rd Highest Salary (Standard & Portable)**
\`\`\`sql
-- Approach 1: Modern SQL Window Functions (Preferred)
WITH RankedSalaries AS (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rank_pos
    FROM Employee
)
SELECT DISTINCT salary 
FROM RankedSalaries 
WHERE rank_pos = 3;

-- Approach 2: Pure Correlated Subquery (Universal ANSI SQL)
SELECT MAX(salary) AS ThirdHighestSalary
FROM Employee e1
WHERE 2 = (
    SELECT COUNT(DISTINCT e2.salary)
    FROM Employee e2
    WHERE e2.salary > e1.salary
);
\`\`\`

**Query (b): Departments with Average Salary > $80,000**
\`\`\`sql
SELECT d.dept_name, ROUND(AVG(e.salary), 2) AS avg_dept_salary, COUNT(e.emp_id) AS total_staff
FROM Department d
JOIN Employee e ON d.dept_id = e.dept_id
GROUP BY d.dept_id, d.dept_name
HAVING AVG(e.salary) > 80000
ORDER BY avg_dept_salary DESC;
\`\`\`

**Query (c): Employees earning more than their manager**
\`\`\`sql
SELECT 
    e.emp_name AS employee_name,
    e.salary AS employee_salary,
    m.emp_name AS manager_name,
    m.salary AS manager_salary,
    (e.salary - m.salary) AS salary_difference
FROM Employee e
INNER JOIN Employee m ON e.manager_id = m.emp_id
WHERE e.salary > m.salary;
\`\`\``,
    examTips: 'Always use DENSE_RANK() instead of RANK() so duplicate salaries do not skip the 3rd rank position.',
    updatedAt: '2026-10-12'
  },

  // JAVA ANSWERS
  {
    id: 'ans-jv-1',
    pyqId: 'pyq-jv-1',
    subjectId: 'java',
    questionTitle: 'Thread-Safe Producer-Consumer using wait() & notifyAll()',
    stepByStepSolution: [
      'Step 1: Create a shared bounded buffer class with capacity N and an internal LinkedList or ArrayDeque queue.',
      'Step 2: Add synchronized methods produce(int value) and consume().',
      'Step 3: Always check buffer condition in a WHILE loop, NOT an if statement, to prevent spurious wakeups!',
      'Step 4: While buffer is full (queue.size() == capacity), calling thread executes wait().',
      'Step 5: While buffer is empty (queue.isEmpty()), consuming thread executes wait().',
      'Step 6: Always call notifyAll() after producing or consuming to wake up waiting threads in the opposite role.',
      'Step 7: Provide main driver code demonstrating producer and consumer threads.'
    ],
    fullMarkdownSolution: `### Production-Grade Producer-Consumer in Java

\`\`\`java
import java.util.LinkedList;
import java.util.Queue;

public class BoundedBuffer<T> {
    private final Queue<T> queue = new LinkedList<>();
    private final int capacity;

    public BoundedBuffer(int capacity) {
        this.capacity = capacity;
    }

    // Producer method
    public synchronized void produce(T item) throws InterruptedException {
        // Critical: MUST use while loop, never 'if', to guard against spurious wakeups
        while (queue.size() == capacity) {
            System.out.println(Thread.currentThread().getName() + " waiting: Buffer is FULL");
            wait();
        }
        
        queue.add(item);
        System.out.println(Thread.currentThread().getName() + " produced: " + item + " [Size: " + queue.size() + "]");
        
        // Notify all waiting consumers
        notifyAll();
    }

    // Consumer method
    public synchronized T consume() throws InterruptedException {
        while (queue.isEmpty()) {
            System.out.println(Thread.currentThread().getName() + " waiting: Buffer is EMPTY");
            wait();
        }

        T item = queue.poll();
        System.out.println(Thread.currentThread().getName() + " consumed: " + item + " [Size: " + queue.size() + "]");

        // Notify all waiting producers
        notifyAll();
        return item;
    }
}
\`\`\`

**Why \`notifyAll()\` over \`notify()\`?**
\`notify()\` wakes up a single arbitrary thread. If a producer thread wakes up another producer while the queue is still full, both will sleep and cause a fatal deadlock. \`notifyAll()\` ensures all threads check their loop conditions.`,
    examTips: 'Exam invigilators strictly check for the `while` loop around `wait()`. Using an `if` statement loses 30-50% of marks.',
    updatedAt: '2026-10-12'
  },
  {
    id: 'ans-jv-2',
    pyqId: 'pyq-jv-2',
    subjectId: 'java',
    questionTitle: 'HashMap Internal Architecture (Java 8+)',
    stepByStepSolution: [
      'Step 1: Explain data structure: Node<K,V>[] table array (bucket array). Default initial capacity = 16.',
      'Step 2: Explain hash code distribution: h = key.hashCode() ^ (h >>> 16) (XOR high and low bits to minimize collision).',
      'Step 3: Bucket index calculation: index = (n - 1) & hash, where n is power-of-two capacity.',
      'Step 4: Collision handling: When index collision occurs, elements are appended as a Singly Linked List.',
      'Step 5: Treeification in Java 8: When a bucket chain length reaches TREEIFY_THRESHOLD (8) and total table capacity >= 64 (MIN_TREEIFY_CAPACITY), the linked list transforms into a balanced Red-Black Tree (TreeNode<K,V>).',
      'Step 6: Time Complexity: O(1) average lookup/insert; worst case improves from O(n) in linked list to O(log n) in Red-Black Tree.',
      'Step 7: Re-hashing & Resizing: When size exceeds threshold = capacity * loadFactor (16 * 0.75 = 12), capacity doubles to 32.'
    ],
    fullMarkdownSolution: `### Java 8 HashMap Deep-Dive

**1. Primary Components:**
- **Table:** \`Node<K,V>[] table\` array with default initial capacity of $16$.
- **Load Factor:** Default $0.75$. Threshold for doubling capacity is $16 \\times 0.75 = 12$.

**2. Index Computation:**
\`\`\`java
// Step 1: Perturbation function spreads bits evenly
int h = key.hashCode();
int hash = h ^ (h >>> 16);

// Step 2: Bitwise AND with power-of-two mask (equivalent to hash % capacity)
int index = (capacity - 1) & hash;
\`\`\`

**3. Java 8 Treeification Architecture:**
- When collisions happen at an index, nodes are chained in a linked list.
- **Treeify Condition:** If a single chain length reaches $\\ge 8$ (\`TREEIFY_THRESHOLD\`) AND total array capacity $\\ge 64$ (\`MIN_TREEIFY_CAPACITY\`), the bucket converts to a **Red-Black Tree**.
- Search time complexity drops from $O(n)$ worst-case to $O(\\log n)$.
- If elements are removed and drop to $\\le 6$ (\`UNTREEIFY_THRESHOLD\`), the tree converts back to a linked list.`,
    examTips: 'Mention both TREEIFY_THRESHOLD (8) AND MIN_TREEIFY_CAPACITY (64); if table size is under 64, HashMap resizes instead of treeifying.',
    updatedAt: '2026-10-12'
  }
];

export const INITIAL_NOTES: NoteItem[] = [
  // ANALOG CIRCUITS NOTES
  {
    id: 'note-ac-1',
    subjectId: 'analog-circuits',
    unitNumber: 2,
    title: 'BJT Hybrid-π Parameter Cheat Sheet & Equivalencies',
    topic: 'Small Signal Analysis',
    tags: ['Formulas', 'Exam High Yield', 'Derivation'],
    priority: 'High',
    isBookmarked: true,
    createdAt: '2026-10-08',
    updatedAt: '2026-10-12',
    keyTakeaways: [
      'Transconductance gm = Ic / VT ≈ Ic(mA) / 26mV at 300K',
      'Input base resistance r_pi = beta / gm = beta * VT / Ic',
      'Emitter resistance re = VT / Ie = alpha / gm ≈ 1 / gm',
      'Output Early resistance ro = VA / Ic'
    ],
    formulaList: [
      'g_m = I_C / V_T',
      'r_\\pi = \\beta / g_m',
      'r_e = \\alpha / g_m = r_\\pi / (1 + \\beta)',
      'A_v \\approx -g_m (R_C \\parallel R_L)'
    ],
    content: `## Hybrid-π Small Signal Model Essentials

In small-signal regime ($v_{be} \\ll V_T = 26\\text{ mV}$ at room temperature), the BJT linearizes around the DC Operating point $Q(V_{CE}, I_C)$.

### The Core Parameters
1. **Transconductance ($g_m$):**
   $$g_m = \\frac{\\partial i_C}{\\partial v_{BE}} = \\frac{I_C}{V_T}$$
   For $I_C = 1\\text{ mA}$, $g_m = 1\\text{ mA} / 26\\text{ mV} \\approx 38.5\\text{ mA/V}$.

2. **Base-Emitter Resistance ($r_\\pi$):**
   $$r_\\pi = \\frac{\\beta}{g_m} = \\frac{\\beta V_T}{I_C}$$
   For $\\beta = 100$ and $I_C = 1\\text{ mA}$, $r_\\pi \\approx 2.6\\text{ k}\\Omega$.

3. **Output Resistance ($r_o$ due to Early Effect):**
   $$r_o = \\frac{V_A + V_{CE}}{I_C} \\approx \\frac{V_A}{I_C}$$
   Where $V_A$ is the Early voltage (typically $50\\text{V} - 100\\text{V}$).`
  },
  {
    id: 'note-ac-2',
    subjectId: 'analog-circuits',
    unitNumber: 5,
    title: 'Op-Amp Golden Rules & Classic Configurations',
    topic: 'Operational Amplifiers',
    tags: ['Must Know', 'Theory', 'Circuit Analysis'],
    priority: 'High',
    isBookmarked: true,
    createdAt: '2026-10-09',
    updatedAt: '2026-10-11',
    keyTakeaways: [
      'Golden Rule 1: No current flows into either input terminal (Rin = infinity, I+ = I- = 0)',
      'Golden Rule 2: In negative feedback, V+ = V- (Virtual Short Concept)',
      'Inverting Gain: Av = -Rf / R1',
      'Non-Inverting Gain: Av = 1 + Rf / R1'
    ],
    content: `## The Two Golden Rules for Ideal Op-Amps in Negative Feedback

1. **Virtual Short (Zero Differential Voltage):**
   $$V_+ = V_-$$
   Because open-loop gain $A_{OL} \\to \\infty$, in a stable negative feedback loop, any finite output $V_{out}$ requires $(V_+ - V_-) = V_{out} / A_{OL} = 0$.

2. **Zero Input Current:**
   $$I_+ = I_- = 0$$
   Because input resistance $R_{in} \\to \\infty$.

### Quick Summary of Core Circuits
- **Inverting Amplifier:** $V_{out} = -\\frac{R_f}{R_{in}} V_{in}$
- **Non-Inverting Amplifier:** $V_{out} = \\left(1 + \\frac{R_f}{R_1}\\right) V_{in}$
- **Voltage Follower (Buffer):** $R_f = 0 \\implies V_{out} = V_{in}$, $R_{in} = \\infty, R_{out} = 0$
- **Integrator:** $V_{out} = -\\frac{1}{RC} \\int V_{in}(t) dt$
- **Differentiator:** $V_{out} = -RC \\frac{dV_{in}(t)}{dt}$`
  },

  // MATHS NOTES
  {
    id: 'note-ma-1',
    subjectId: 'maths',
    unitNumber: 1,
    title: 'Linear Algebra: Eigenvalues & Diagonalization Mastery',
    topic: 'Matrices & Linear Transformations',
    tags: ['High Yield', 'Calculations', 'End-Sem Target'],
    priority: 'High',
    isBookmarked: true,
    createdAt: '2026-10-05',
    updatedAt: '2026-10-12',
    keyTakeaways: [
      'Trace of matrix = Sum of eigenvalues',
      'Determinant of matrix = Product of eigenvalues',
      'Symmetric matrices always have real eigenvalues and orthogonal eigenvectors',
      'Matrix is diagonalizable iff it has n linearly independent eigenvectors'
    ],
    content: `## Fundamental Matrix Properties for Exams

### Quick Invariants
For any $n \\times n$ matrix $A$:
$$\\text{Trace}(A) = \\sum_{i=1}^n \\lambda_i$$
$$\\det(A) = \\prod_{i=1}^n \\lambda_i$$

### Cayley-Hamilton Theorem
Every square matrix satisfies its own characteristic polynomial:
If $P(\\lambda) = \\det(A - \\lambda I) = (-1)^n (\\lambda^n - c_1 \\lambda^{n-1} + \\dots + (-1)^n c_n) = 0$, then:
$$A^n - c_1 A^{n-1} + \\dots + (-1)^n c_n I = 0$$

### Finding $A^{-1}$ using Cayley-Hamilton:
Multiply entire equation by $A^{-1}$:
$$A^{-1} = \\frac{1}{c_n} [c_1 A^{n-2} - A^{n-1} - \\dots]$$`
  },

  // CONTROL SYSTEMS NOTES
  {
    id: 'note-cs-1',
    subjectId: 'control-systems',
    unitNumber: 2,
    title: 'Second-Order System Transient Response Formula Bank',
    topic: 'Time Response Analysis',
    tags: ['Formulas', 'Numerical Problems', 'Must Remember'],
    priority: 'High',
    isBookmarked: true,
    createdAt: '2026-10-06',
    updatedAt: '2026-10-10',
    keyTakeaways: [
      'Closed loop TF = wn^2 / (s^2 + 2*zeta*wn*s + wn^2)',
      'Rise time tr = (pi - beta) / wd, where wd = wn*sqrt(1 - zeta^2)',
      'Peak time tp = pi / wd',
      'Maximum overshoot Mp = exp(-pi*zeta / sqrt(1 - zeta^2)) * 100%',
      'Settling time ts = 4 / (zeta*wn) for 2% tolerance band'
    ],
    formulaList: [
      '\\omega_d = \\omega_n \\sqrt{1 - \\zeta^2}',
      't_p = \\frac{\\pi}{\\omega_d}',
      'M_p = e^{-\\frac{\\pi \\zeta}{\\sqrt{1-\\zeta^2}}} \\times 100\\%',
      't_s(2\\%) \\approx \\frac{4}{\\zeta \\omega_n}'
    ],
    content: `## Standard Second-Order Underdamped System ($0 < \\zeta < 1$)

Transfer Function:
$$T(s) = \\frac{C(s)}{R(s)} = \\frac{\\omega_n^2}{s^2 + 2\\zeta\\omega_n s + \\omega_n^2}$$

### Key Transient Specifications:
1. **Damped Frequency of Oscillation ($\\omega_d$):**
   $$\\omega_d = \\omega_n \\sqrt{1 - \\zeta^2}$$

2. **Peak Time ($t_p$):**
   Time taken to reach the first (largest) peak of overshoot:
   $$t_p = \\frac{\\pi}{\\omega_d} = \\frac{\\pi}{\\omega_n \\sqrt{1 - \\zeta^2}}$$

3. **Percentage Maximum Peak Overshoot ($M_p$):**
   $$M_p = e^{-\\frac{\\pi \\zeta}{\\sqrt{1-\\zeta^2}}} \\times 100\\%$$
   *Notice:* $M_p$ depends ONLY on the damping ratio $\\zeta$, completely independent of $\\omega_n$!

4. **Settling Time ($t_s$):**
   - For $2\\%$ tolerance band: $t_s = \\frac{4}{\\zeta \\omega_n} = 4\\tau$
   - For $5\\%$ tolerance band: $t_s = \\frac{3}{\\zeta \\omega_n} = 3\\tau$`
  },

  // DBMS NOTES
  {
    id: 'note-db-1',
    subjectId: 'dbms',
    unitNumber: 3,
    title: 'Normalization Hierarchy & Roadmap (1NF -> BCNF)',
    topic: 'Relational Database Design',
    tags: ['Theory', 'High Yield', 'Exam Favorite'],
    priority: 'High',
    isBookmarked: true,
    createdAt: '2026-10-07',
    updatedAt: '2026-10-12',
    keyTakeaways: [
      '1NF: All attribute values must be atomic (no multi-valued or composite attributes)',
      '2NF: Must be 1NF + No Partial Dependency (no non-prime attribute depends on part of a candidate key)',
      '3NF: Must be 2NF + No Transitive Dependency (for X -> Y, X is superkey OR Y is prime attribute)',
      'BCNF: Strictly: for every non-trivial X -> Y, X MUST be a superkey!'
    ],
    content: `## Normal Forms Cheat Sheet

### 1NF (First Normal Form)
- No repeating groups or nested arrays.
- Every column contains atomic (indivisible) scalar values.

### 2NF (Second Normal Form)
- Must be in 1NF.
- **Rule:** No Non-Prime attribute can be functionally dependent on a **proper subset** of any candidate key.
- *Check:* If all candidate keys are single attributes (composite keys don't exist), the table is automatically in 2NF!

### 3NF (Third Normal Form)
- Must be in 2NF.
- **Rule:** For every non-trivial functional dependency $X \\to Y$:
  1. $X$ is a Super Key, **OR**
  2. $Y$ is a Prime Attribute (member of candidate key).

### BCNF (Boyce-Codd Normal Form)
- Stricter than 3NF.
- **Rule:** For every non-trivial functional dependency $X \\to Y$, $X$ **MUST** be a Super Key!
- *Trade-off:* 3NF guarantees both Lossless Join and Dependency Preservation. BCNF guarantees Lossless Join, but **may not preserve dependencies**!`
  },

  // JAVA NOTES
  {
    id: 'note-jv-1',
    subjectId: 'java',
    unitNumber: 4,
    title: 'Java Concurrency Primitives: volatile, synchronized & Locks',
    topic: 'Multithreading & JVM Memory',
    tags: ['Concurrency', 'Code', 'Viva Questions'],
    priority: 'High',
    isBookmarked: true,
    createdAt: '2026-10-08',
    updatedAt: '2026-10-12',
    keyTakeaways: [
      'volatile guarantees Visibility (flushes from CPU cache to main RAM), but NOT Atomicity (e.g. count++ is not atomic)',
      'synchronized guarantees both Visibility AND Mutual Exclusion (Atomicity)',
      'ReentrantLock allows tryLock(), fair lock queues, and multiple condition variables',
      'Thread safe collections: ConcurrentHashMap vs Collections.synchronizedMap()'
    ],
    codeSnippet: {
      language: 'java',
      code: `// Classic double-checked locking singleton
public class Singleton {
    // volatile is mandatory to avoid instruction reordering!
    private static volatile Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}`
    },
    content: `## Concurrency & Memory Visibility in Java

### The Difference between \`volatile\` and \`synchronized\`

1. **\`volatile\` keyword:**
   - Guarantees **visibility**: Reads and writes go directly to/from main memory (L1/L2 CPU caches are synchronized).
   - Prevents **compiler instruction reordering**.
   - Does **NOT** ensure atomicity! The operation \`count++\` consists of 3 machine instructions: read, increment, write. Multiple threads executing \`volatile int count\` will still experience race conditions.

2. **\`synchronized\` block / method:**
   - Acquires the object's intrinsic monitor lock (**mutex**).
   - Guarantees **mutual exclusion** (only one thread executes the block at a time).
   - Guarantees **visibility**: on lock acquisition, local cache is invalidated; on lock release, changes are flushed to main RAM.`
  }
];

export const INITIAL_FORMULAS: FormulaItem[] = [
  {
    id: 'f-ac-1',
    subjectId: 'analog-circuits',
    title: 'BJT Transconductance (gm)',
    formula: 'g_m = I_C / V_T = I_C / 26mV',
    explanation: 'Relates small-signal collector current to base-emitter voltage at room temperature (300K).',
    variables: 'I_C = DC Collector Current; V_T = Thermal voltage (25.86 mV ≈ 26 mV)',
    category: 'BJT Small Signal'
  },
  {
    id: 'f-ac-2',
    subjectId: 'analog-circuits',
    title: 'Wien Bridge Oscillation Frequency',
    formula: 'f_0 = 1 / (2 * \\pi * R * C)',
    explanation: 'Resonant frequency of Wien Bridge lead-lag network where phase shift equals 0° and loop attenuation is 1/3.',
    variables: 'R = Bridge resistor (Ohms); C = Bridge capacitor (Farads)',
    category: 'Oscillators'
  },
  {
    id: 'f-ac-3',
    subjectId: 'analog-circuits',
    title: 'First-Order Butterworth Low Pass Cutoff',
    formula: 'f_c = 1 / (2 * \\pi * R * C)',
    explanation: 'Cutoff frequency where filter gain drops by 3dB (-3dB point). Passband gain Av = 1 + Rf / R1.',
    variables: 'R, C = Filter components; f_c = Cutoff frequency in Hz',
    category: 'Active Filters'
  },
  {
    id: 'f-ma-1',
    subjectId: 'maths',
    title: 'Trace and Determinant Invariant with Eigenvalues',
    formula: '\\sum \\lambda_i = \\text{Trace}(A), \\quad \\prod \\lambda_i = \\det(A)',
    explanation: 'Sum of eigenvalues always equals the trace; product of eigenvalues equals determinant.',
    variables: '\\lambda_i = Eigenvalues of matrix A',
    category: 'Linear Algebra'
  },
  {
    id: 'f-ma-2',
    subjectId: 'maths',
    title: 'Cauchy’s Residue Theorem',
    formula: '\\oint_C f(z) dz = 2 * \\pi * i * \\sum_{k=1}^m \\text{Res}(f, z_k)',
    explanation: 'Contour integral around closed curve C equals 2πi times sum of residues at poles enclosed by C.',
    variables: 'z_k = Isolated singular points enclosed by contour C',
    category: 'Complex Analysis'
  },
  {
    id: 'f-ma-3',
    subjectId: 'maths',
    title: 'Bayes Theorem Formula',
    formula: 'P(A_i | B) = [ P(B | A_i) * P(A_i) ] / [ \\sum_{j} P(B | A_j) * P(A_j) ]',
    explanation: 'Computes posterior probability of cause Ai given observed evidence B.',
    variables: 'P(Ai) = Prior; P(B|Ai) = Likelihood; P(Ai|B) = Posterior',
    category: 'Probability'
  },
  {
    id: 'f-cs-1',
    subjectId: 'control-systems',
    title: 'Percentage Maximum Peak Overshoot (Mp)',
    formula: 'M_p = e^{-\\frac{\\pi \\zeta}{\\sqrt{1 - \\zeta^2}}} \\times 100\\%',
    explanation: 'Peak transient overshoot of second-order underdamped closed loop system.',
    variables: '\\zeta = Damping ratio (0 < \\zeta < 1)',
    category: 'Time Response'
  },
  {
    id: 'f-cs-2',
    subjectId: 'control-systems',
    title: 'Mason’s Gain Formula',
    formula: 'T = \\frac{1}{\\Delta} \\sum_k P_k \\Delta_k',
    explanation: 'Computes overall transfer function from Signal Flow Graph without block reduction.',
    variables: 'Pk = Path gain of k-th forward path; Delta = Graph determinant',
    category: 'Signal Flow'
  },
  {
    id: 'f-db-1',
    subjectId: 'dbms',
    title: 'B+ Tree Maximum Pointers in Node of Order m',
    formula: '\\text{Max Keys} = m - 1, \\quad \\text{Min Keys (Internal)} = \\lceil m / 2 \\rceil - 1',
    explanation: 'Capacity limits for internal and leaf nodes in a B+ Tree of order m.',
    variables: 'm = Fanout order of the B+ Tree',
    category: 'Storage & Indexing'
  },
  {
    id: 'f-jv-1',
    subjectId: 'java',
    title: 'HashMap Bucket Index Calculation',
    formula: '\\text{index} = (n - 1) \\& (h \\oplus (h \\gg 16))',
    explanation: 'High-performance bitwise bucket index calculation where n is table capacity (power of 2).',
    variables: 'h = key.hashCode(); n = table capacity (16, 32, 64, ...)',
    category: 'Collections'
  }
];

export const INITIAL_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-ac-1',
    subjectId: 'analog-circuits',
    question: 'What is the phase difference between input and output in a BJT Common Emitter amplifier?',
    answer: '180 degrees (inversion). When base voltage rises, collector current increases, which pulls the collector voltage downward.',
    category: 'BJT Amplifiers',
    mastered: false
  },
  {
    id: 'fc-ac-2',
    subjectId: 'analog-circuits',
    question: 'What are the two conditions for sustained oscillation (Barkhausen Criterion)?',
    answer: '1. Loop gain magnitude |Aβ| >= 1 (exactly 1 for steady oscillation).\n2. Total loop phase shift around the closed loop must be 0° or 360°.',
    category: 'Oscillators',
    mastered: false
  },
  {
    id: 'fc-ma-1',
    subjectId: 'maths',
    question: 'What is the sum of the eigenvalues of any square matrix equal to?',
    answer: 'The Trace of the matrix (the sum of the main diagonal elements). Also, the product of eigenvalues equals the Determinant.',
    category: 'Linear Algebra',
    mastered: false
  },
  {
    id: 'fc-cs-1',
    subjectId: 'control-systems',
    question: 'If damping ratio zeta = 1, what is the system classification?',
    answer: 'Critically Damped. (zeta = 0 is Undamped, 0 < zeta < 1 is Underdamped, zeta > 1 is Overdamped).',
    category: 'Time Response',
    mastered: false
  },
  {
    id: 'fc-db-1',
    subjectId: 'dbms',
    question: 'What is the primary difference between 3NF and BCNF?',
    answer: 'For dependency X -> Y, 3NF allows Y to be a prime attribute even if X is not a superkey. BCNF strictly demands that X MUST be a superkey for every non-trivial FD.',
    category: 'Normalization',
    mastered: false
  },
  {
    id: 'fc-jv-1',
    subjectId: 'java',
    question: 'Why should wait() always be called inside a while loop rather than an if condition?',
    answer: 'To protect against Spurious Wakeups (threads waking up without notify) and race conditions where another thread consumed the item first.',
    category: 'Concurrency',
    mastered: false
  }
];
