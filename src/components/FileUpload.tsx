import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import type { File } from '../types';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  isPrivate: boolean;
}

export function FileUpload({ onUpload, isPrivate }: FileUploadProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      onUpload(files as unknown as File[]);
    },
    [onUpload]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        onUpload(files as unknown as File[]);
      }
    },
    [onUpload]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer"
    >
      <input
        type="file"
        multiple
        onChange={handleChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop files here, or click to select files
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Files will be stored {isPrivate ? 'privately' : 'publicly'}
        </p>
      </label>
    </div>
  );
}