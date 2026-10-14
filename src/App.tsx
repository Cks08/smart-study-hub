import React, { useState } from 'react';
import { StudyProvider, useStudy } from './context/StudyContext';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/Dashboard/DashboardView';
import { SubjectDetailView } from './components/Subject/SubjectDetailView';
import { ExamDeadlineModal } from './components/Modals/ExamDeadlineModal';
import { QuickSearchModal } from './components/Modals/QuickSearchModal';
import { PomodoroModal } from './components/Modals/PomodoroModal';
import { DataManagementModal } from './components/Modals/DataManagementModal';
import { AuthModal } from './components/Modals/AuthModal';
import { ProfileModal } from './components/Modals/ProfileModal';
import { ExamDeadline } from './types';
import { GraduationCap } from 'lucide-react';

const MainLayout: React.FC = () => {
  const {
    activeSubjectId,
    isAuthOpen,
    setIsAuthOpen,
    isProfileOpen,
    setIsProfileOpen,
    currentSemester
  } = useStudy();

  const [isDeadlineModalOpen, setIsDeadlineModalOpen] = useState(false);
  const [selectedDeadlineForEdit, setSelectedDeadlineForEdit] = useState<ExamDeadline | null>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleEditDeadline = (dl: ExamDeadline) => {
    setSelectedDeadlineForEdit(dl);
    setIsDeadlineModalOpen(true);
  };

  const handleOpenDeadlineModal = () => {
    setSelectedDeadlineForEdit(null);
    setIsDeadlineModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navbar */}
      <Navbar
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenDeadlineModal={handleOpenDeadlineModal}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeSubjectId === 'dashboard' ? (
          <DashboardView
            onEditDeadline={handleEditDeadline}
            onOpenDeadlineModal={handleOpenDeadlineModal}
          />
        ) : (
          <SubjectDetailView subjectId={activeSubjectId} />
        )}
      </main>

      {/* Global Modals */}
      <ExamDeadlineModal
        isOpen={isDeadlineModalOpen}
        onClose={() => setIsDeadlineModalOpen(false)}
        selectedDeadline={selectedDeadlineForEdit}
      />

      <QuickSearchModal />

      <PomodoroModal />

      <DataManagementModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenAuth={() => {
          setIsProfileOpen(false);
          setIsAuthOpen(true);
        }}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500 space-y-2 mt-auto">
        <div className="flex items-center justify-center gap-2 text-slate-400 font-medium">
          <GraduationCap className="w-4 h-4 text-indigo-400" />
          <span>SemVault • Engineered for Academic Excellence (Semester {currentSemester})</span>
        </div>
        <p className="text-slate-400 text-[11px] max-w-md mx-auto">
          All your notes, custom uploaded files, PYQs, and syllabus records are personalized and saved locally.
        </p>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <StudyProvider>
      <MainLayout />
    </StudyProvider>
  );
}
