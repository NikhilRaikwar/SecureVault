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

export interface UploadResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}