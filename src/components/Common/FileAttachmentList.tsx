import React, { useState } from 'react';
import { FileAttachment } from '../../types';
import { FileText, Image, File, Eye, Download } from 'lucide-react';
import { FilePreviewModal } from './FilePreviewModal';

interface FileAttachmentListProps {
  attachments?: FileAttachment[];
  compact?: boolean;
}

export const FileAttachmentList: React.FC<FileAttachmentListProps> = ({
  attachments,
  compact = false
}) => {
  const [previewFile, setPreviewFile] = useState<FileAttachment | null>(null);

  if (!attachments || attachments.length === 0) return null;

  const handleDownload = (e: React.MouseEvent, file: FileAttachment) => {
    e.stopPropagation();
    const a = document.createElement('a');
    a.href = file.dataUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <Image className="w-3.5 h-3.5 text-emerald-400" />;
    if (type.includes('pdf')) return <FileText className="w-3.5 h-3.5 text-rose-400" />;
    return <File className="w-3.5 h-3.5 text-sky-400" />;
  };

  if (compact) {
    return (
      <>
        <div className="flex items-center gap-1.5 flex-wrap">
          {attachments.map(file => (
            <button
              key={file.id}
              onClick={e => {
                e.stopPropagation();
                setPreviewFile(file);
              }}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[10px] text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer group"
              title={`Preview ${file.name}`}
            >
              {getFileIcon(file.type)}
              <span className="truncate max-w-[110px]">{file.name}</span>
            </button>
          ))}
        </div>
        <FilePreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
      </>
    );
  }

  return (
    <>
      <div className="space-y-1.5">
        <div className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
          Attached Resources ({attachments.length}):
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {attachments.map(file => (
            <div
              key={file.id}
              onClick={e => {
                e.stopPropagation();
                setPreviewFile(file);
              }}
              className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-slate-700 flex items-center justify-between gap-2 text-xs transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1 rounded-md bg-slate-900 border border-slate-800 flex-shrink-0">
                  {getFileIcon(file.type)}
                </div>
                <div className="truncate">
                  <div className="text-slate-200 font-medium truncate group-hover:text-indigo-300">
                    {file.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {(file.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => setPreviewFile(file)}
                  className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                  title="Preview"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={e => handleDownload(e, file)}
                  className="p-1 text-slate-400 hover:text-indigo-400 rounded hover:bg-slate-800 transition-colors"
                  title="Download file"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FilePreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
    </>
  );
};
