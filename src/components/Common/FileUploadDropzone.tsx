import React, { useRef, useState } from 'react';
import { FileAttachment } from '../../types';
import { UploadCloud, FileText, Image, File, X, Download, Eye, Check } from 'lucide-react';

interface FileUploadDropzoneProps {
  attachments: FileAttachment[];
  onChange: (attachments: FileAttachment[]) => void;
  maxFiles?: number;
}

export const FileUploadDropzone: React.FC<FileUploadDropzoneProps> = ({
  attachments,
  onChange,
  maxFiles = 5
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const processFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);

    const remainingSlots = maxFiles - attachments.length;
    const filesToRead = Array.from(files).slice(0, remainingSlots);

    const readers: Promise<FileAttachment>[] = filesToRead.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => {
          resolve({
            id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            name: file.name,
            size: file.size,
            type: file.type || 'application/octet-stream',
            dataUrl: (e.target?.result as string) || '',
            uploadedAt: new Date().toISOString().split('T')[0]
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(newAttachments => {
      onChange([...attachments, ...newAttachments]);
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleRemove = (id: string) => {
    onChange(attachments.filter(a => a.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <Image className="w-4 h-4 text-emerald-400" />;
    if (type.includes('pdf')) return <FileText className="w-4 h-4 text-rose-400" />;
    return <File className="w-4 h-4 text-sky-400" />;
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.sql,.java,.doc,.docx"
        className="hidden"
        onChange={e => processFiles(e.target.files)}
      />

      {/* Drop area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-indigo-400 bg-indigo-500/10'
            : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60'
        }`}
      >
        <UploadCloud className="w-7 h-7 text-indigo-400 mx-auto mb-1.5" />
        <div className="text-xs font-semibold text-slate-200">
          {isProcessing ? 'Processing files...' : 'Upload Notes / Question Papers / Solution Files'}
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Drag & drop PDFs, scans, images, or documents (up to 15MB each)
        </p>
      </div>

      {/* Attachment previews / list */}
      {attachments.length > 0 && (
        <div className="space-y-2">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Attached Files ({attachments.length}/{maxFiles})
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {attachments.map(file => (
              <div
                key={file.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs gap-2 group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 flex-shrink-0">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="truncate">
                    <div className="text-slate-200 font-medium truncate" title={file.name}>
                      {file.name}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      handleRemove(file.id);
                    }}
                    className="p-1 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                    title="Remove file"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
