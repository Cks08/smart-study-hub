# Implementation Plan: SemVault Multi-User, File Upload & Semester Switcher Upgrade

Transform SemVault into a personal and collaborative engineering portal where students and friends can log in with their emails, personalize profiles, switch semesters (1st through 8th, defaulting to 3rd semester), upload actual PDF/image files for notes and PYQs with direct in-browser preview and download, and input their own custom subjects, notes, solutions, and exam deadlines.

---

## 1. Key User Decisions & Architecture

- **Default Semester**: Defaults to **Semester 3** with the user's 5 core engineering subjects (*Analog Circuits, Engineering Mathematics, Control Systems, DBMS, Java*), with an instant **Semester Switcher** (Sem 1 to Sem 8) that supports adding, editing, or resetting subjects for any semester.
- **User-Driven Notes & File Storage**: Notes, PYQs, and Model Answers can be authored from scratch or imported with **direct file attachments** (PDF documents, image sheets, handwritten scans, text files). Includes an in-browser document viewer, file metadata (file size, type, upload date), and one-click download.
- **Email Login & Personalized Profile**:
  - Secure authentication modal with Email sign-in / registration.
  - Profile personalization: Student Name, Email, University/College Name, Engineering Branch (e.g. CSE, ECE, EEE, ME, IT), Avatar/Color theme, Target CGPA/GPA, and Bio.
  - Multi-profile support: Switch between personal study vaults so multiple friends or teammates can use the application without mixing their data.
  - Quick share & export: Export personal notes as shareable study bundles for friends.
- **Customizable Exam Deadlines**:
  - Realistic default exam schedule for Semester 3 with full customization (add, edit dates, times, venues, target marks, and syllabus weightage).

---

## 2. Proposed Changes

### Data Layer & Types
#### `src/types/index.ts`
- Add `UserProfile` interface (`id`, `name`, `email`, `university`, `branch`, `semester`, `targetCgpa`, `avatarColor`, `joinedAt`).
- Expand `NoteItem`, `PYQItem`, and `AnswerItem` with `fileAttachments`:
  - `id`, `fileName`, `fileType`, `fileSize`, `dataUrl` (Base64 data / blob URL for in-browser preview & download), `uploadedAt`.
- Add `Semester` support (`semNumber: number`, `subjects: SubjectMeta[]`, `syllabus: Record<string, SyllabusUnit[]>`).

#### `src/context/StudyContext.tsx`
- Add User Profile & Authentication state:
  - `currentUser: UserProfile | null`
  - `login(email: string, name?: string, profileData?: Partial<UserProfile>)`
  - `signup(email: string, name: string, branch: string, university: string)`
  - `logout()`
  - `updateProfile(data: Partial<UserProfile>)`
- Add Semester management:
  - `currentSemester: number` (defaults to 3)
  - `setCurrentSemester(sem: number)`
  - Per-semester subject catalog and persistence.
- File upload handlers:
  - Base64 file converter supporting PDFs, images (PNG/JPG), and text files.
  - Direct preview trigger and file download helper.

---

### UI Components

#### 1. Header & Profile Personalization
#### `src/components/Navbar.tsx` & `src/components/Modals/ProfileModal.tsx`
- Top navbar displays:
  - **Semester Dropdown Switcher** (`Semester 3 (Active)`, with quick jump to Sem 1 through 8).
  - **User Profile Pill**: Avatar circle, user name/branch, and quick modal to view/edit profile (University, target CGPA, email).
  - Login / Logout button.
- Profile modal:
  - Edit student details, university, college roll number, branch, semester.
  - Statistics overview (Total notes authored, PYQs solved, files uploaded, study streak).

#### 2. File Upload & In-Browser Preview
#### `src/components/Common/FileUploadDropzone.tsx` & `src/components/Common/FilePreviewModal.tsx`
- Drag-and-drop file upload zone supporting:
  - PDF documents (`.pdf`)
  - Images / diagrams / handwritten notes (`.png`, `.jpg`, `.jpeg`, `.webp`)
  - Code & text files (`.txt`, `.java`, `.sql`)
- Visual file attachment card showing format badge, file size in KB/MB, preview button, download button, and remove option.
- Interactive file preview modal:
  - In-app PDF/image reader with zoom and fullscreen mode.

#### 3. Note, PYQ & Answer Editors with File Support
#### `src/components/Subject/NoteModal.tsx`, `PyqModal.tsx`, `AnswerModal.tsx`
- Integrate `FileUploadDropzone` directly inside the note, PYQ, and model answer creation modals.
- Allow users to attach syllabus sheets, exam question paper PDFs, and handwritten model solution scans.

#### 4. Semester Switcher & Customizer
#### `src/components/Subject/SemesterSwitcher.tsx`
- Sleek dropdown / switcher bar allowing users to jump between semesters.
- Provides default engineering curriculum for Semester 3 (Analog Circuits, Maths, Control Systems, DBMS, Java), while allowing any semester to have customized subjects and syllabi.

---

## 3. Verification Plan

### Build & Integrity Check
- Run `compile_applet` to ensure full TypeScript typing and zero build regressions.
- Run `lint_applet` to check for clean imports and lint standards.

### User Flow Verification
1. **Semester Switcher**:
   - Verify initial launch opens in **Semester 3** with the 5 subjects.
   - Switch to another semester (e.g. Sem 4 or Sem 2) and verify workspace state updates cleanly.
2. **Profile & Email Login**:
   - Log in with email `ckrishna122517@gmail.com` or custom student profile.
   - Update university name and target CGPA; verify changes reflect across dashboard and navbar.
3. **File Upload & Preview**:
   - Attach a sample PDF / image in a note or PYQ.
   - Verify in-browser preview renders and download button downloads the exact file.
4. **Deadline Customization**:
   - Verify deadlines can be customized and default dates reflect user input.
