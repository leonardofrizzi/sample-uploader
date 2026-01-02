export type FileStatus = "pending" | "uploading" | "completed" | "error";

/** Base interface for file metadata */
export interface BaseFileData {
  id: string;
  name: string;
  size: number;
  type: string;
}

/** File with upload status tracking (client-side) */
export interface FileData extends BaseFileData {
  uploadedAt: Date;
  status: FileStatus;
}

/** File stored in the system (API response) */
export interface StoredFile extends BaseFileData {
  uploadedAt: string;
}

/** File selected for upload (with native File object) */
export interface FileWithId {
  id: string;
  file: File;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface UploadState {
  files: FileData[];
  isUploading: boolean;
  progress: number;
}
