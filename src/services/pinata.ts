import axios from 'axios';
import type { File } from '../types';

const PINATA_API_URL = 'https://api.pinata.cloud';

const pinataApi = axios.create({
  baseURL: PINATA_API_URL,
  headers: {
    'pinata_api_key': import.meta.env.VITE_PINATA_API_KEY,
    'pinata_secret_api_key': import.meta.env.VITE_PINATA_SECRET_API_KEY,
  },
});

export const uploadFile = async (file: File, isPrivate: boolean) => {
  const formData = new FormData();
  formData.append('file', file);

  const metadata = {
    name: file.name,
    keyvalues: {
      isPrivate: isPrivate,
      owner: file.owner,
    },
  };

  formData.append('pinataMetadata', JSON.stringify(metadata));

  const options = {
    cidVersion: 1,
    wrapWithDirectory: false,
  };

  formData.append('pinataOptions', JSON.stringify(options));

  const response = await pinataApi.post('/pinning/pinFileToIPFS', formData, {
    maxBodyLength: Infinity,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const removeFile = async (hash: string) => {
  const response = await pinataApi.delete(`/pinning/unpin/${hash}`);
  return response.data;
};