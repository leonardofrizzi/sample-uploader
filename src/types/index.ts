export interface FileData {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  status: "pending" | "uploading" | "completed" | "error";
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
