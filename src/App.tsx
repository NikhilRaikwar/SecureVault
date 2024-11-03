import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { FileList } from './components/FileList';
import { WalletConnect } from './components/WalletConnect';
import { Shield, Upload } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { uploadFile, removeFile } from './services/pinata';
import type { File } from './types';

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [isPrivateUpload, setIsPrivateUpload] = useState(true);
  const { isAuthorized, address } = useAuth();

  const handleUpload = async (uploadedFiles: File[]) => {
    if (!isAuthorized || !address) {
      alert('Please connect your wallet to upload files');
      return;
    }

    try {
      for (const file of uploadedFiles) {
        const result = await uploadFile(file, isPrivateUpload);
        const newFile: File = {
          id: result.IpfsHash,
          name: file.name,
          size: file.size,
          type: file.type,
          isPrivate: isPrivateUpload,
          hash: result.IpfsHash,
          createdAt: new Date().toISOString(),
          owner: address
        };
        setFiles(prev => [...prev, newFile]);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAuthorized) return;
    try {
      await removeFile(id);
      setFiles(files.filter(file => file.id !== id));
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file. Please try again.');
    }
  };

  const handleShare = async (id: string) => {
    if (!isAuthorized) return;
    const file = files.find(f => f.id === id);
    if (file?.isPrivate) {
      // For private files, generate a sharing link
      const shareUrl = `https://gateway.pinata.cloud/ipfs/${file.hash}`;
      await navigator.clipboard.writeText(shareUrl);
      alert('Share link copied to clipboard!');
    }
  };

  const handleDownload = async (id: string) => {
    if (!isAuthorized) return;
    const file = files.find(f => f.id === id);
    if (file) {
      window.open(`https://gateway.pinata.cloud/ipfs/${file.hash}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">SecureVault</span>
            </div>
            <div className="flex items-center">
              <WalletConnect />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isAuthorized ? (
          <div className="text-center py-12">
            <Shield className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Connect Your Wallet</h3>
            <p className="mt-1 text-sm text-gray-500">Please connect your wallet to access SecureVault</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Upload Files</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Storage Type:</span>
                  <button
                    onClick={() => setIsPrivateUpload(true)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      isPrivateUpload
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Private
                  </button>
                  <button
                    onClick={() => setIsPrivateUpload(false)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      !isPrivateUpload
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Public
                  </button>
                </div>
              </div>
              <FileUpload onUpload={handleUpload} isPrivate={isPrivateUpload} />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Your Files</h2>
              <FileList
                files={files}
                onDelete={handleDelete}
                onShare={handleShare}
                onDownload={handleDownload}
              />
              {files.length === 0 && (
                <div className="text-center py-12">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No files</h3>
                  <p className="mt-1 text-sm text-gray-500">Upload files to get started</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;