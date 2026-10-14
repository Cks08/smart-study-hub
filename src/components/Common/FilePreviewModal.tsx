import React from 'react';
import { FileAttachment } from '../../types';
import { X, Download, FileText, Image, ExternalLink } from 'lucide-react';

interface FilePreviewModalProps {
  file: FileAttachment | null;
  onClose: () => void;
}

export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ file, onClose }) => {
  if (!file) return null;

  const isImage = file.type.startsWith('image/');
  const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = file.dataUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3 truncate">
            {isImage ? (
              <Image className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            ) : (
              <FileText className="w-5 h-5 text-rose-400 flex-shrink-0" />
            )}
            <div className="truncate">
              <h3 className="font-bold text-sm text-white truncate" title={file.name}>
                {file.name}
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                {file.type} • {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950 min-h-[400px]">
          {isImage ? (
            <img
              src={file.dataUrl}
              alt={file.name}
              className="max-h-[70vh] max-w-full rounded-xl object-contain border border-slate-800 shadow-lg"
            />
          ) : isPdf ? (
            <iframe
              src={file.dataUrl}
              title={file.name}
              className="w-full h-[70vh] rounded-xl border border-slate-800 bg-white"
            />
          ) : (
            <div className="text-center p-8 space-y-4">
              <FileText className="w-12 h-12 text-slate-500 mx-auto" />
              <div>
                <p className="text-sm font-semibold text-slate-200">
                  Document Preview Available for Download
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Click download to view this {file.name.split('.').pop()?.toUpperCase()} document in your local editor.
                </p>
              </div>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download {file.name}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
