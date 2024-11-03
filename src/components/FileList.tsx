import React from 'react';
import { Trash2, Share2, Download } from 'lucide-react';
import type { File } from '../types';

interface FileListProps {
  files: File[];
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
  onDownload: (id: string) => void;
}

export function FileList({ files, onDelete, onShare, onDownload }: FileListProps) {
  return (
    <div className="space-y-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900">{file.name}</h3>
            <p className="text-sm text-gray-500">
              {new Date(file.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onDownload(file.id)}
              className="p-1 text-gray-400 hover:text-gray-500"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => onShare(file.id)}
              className="p-1 text-gray-400 hover:text-gray-500"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(file.id)}
              className="p-1 text-gray-400 hover:text-gray-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}