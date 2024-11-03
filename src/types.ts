export interface File {
  id: string;
  name: string;
  size: number;
  type: string;
  isPrivate: boolean;
  hash: string;
  createdAt: string;
  owner: string;
}

export interface User {
  id: string;
  name: string;
  publicKey: string;
}

export interface FileAccess {
  fileId: string;
  userId: string;
  accessType: 'read' | 'write';
}