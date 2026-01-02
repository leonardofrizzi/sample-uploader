"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { FileData, UploadState } from "@/types";

type UploadAction =
  | { type: "ADD_FILES"; payload: FileData[] }
  | { type: "REMOVE_FILE"; payload: string }
  | { type: "UPDATE_FILE_STATUS"; payload: { id: string; status: FileData["status"] } }
  | { type: "SET_PROGRESS"; payload: number }
  | { type: "SET_UPLOADING"; payload: boolean }
  | { type: "CLEAR_FILES" };

const initialState: UploadState = {
  files: [],
  isUploading: false,
  progress: 0,
};

function uploadReducer(state: UploadState, action: UploadAction): UploadState {
  switch (action.type) {
    case "ADD_FILES":
      return { ...state, files: [...state.files, ...action.payload] };
    case "REMOVE_FILE":
      return { ...state, files: state.files.filter((f) => f.id !== action.payload) };
    case "UPDATE_FILE_STATUS":
      return {
        ...state,
        files: state.files.map((f) =>
          f.id === action.payload.id ? { ...f, status: action.payload.status } : f
        ),
      };
    case "SET_PROGRESS":
      return { ...state, progress: action.payload };
    case "SET_UPLOADING":
      return { ...state, isUploading: action.payload };
    case "CLEAR_FILES":
      return { ...state, files: [], progress: 0 };
    default:
      return state;
  }
}

interface UploadContextValue extends UploadState {
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  updateFileStatus: (id: string, status: FileData["status"]) => void;
  setProgress: (progress: number) => void;
  setUploading: (isUploading: boolean) => void;
  clearFiles: () => void;
  totalSize: number;
}

const UploadContext = createContext<UploadContextValue | null>(null);

export function UploadProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(uploadReducer, initialState);

  const addFiles = useCallback((files: File[]) => {
    const fileData: FileData[] = files.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
      status: "pending" as const,
    }));
    dispatch({ type: "ADD_FILES", payload: fileData });
  }, []);

  const removeFile = useCallback((id: string) => {
    dispatch({ type: "REMOVE_FILE", payload: id });
  }, []);

  const updateFileStatus = useCallback((id: string, status: FileData["status"]) => {
    dispatch({ type: "UPDATE_FILE_STATUS", payload: { id, status } });
  }, []);

  const setProgress = useCallback((progress: number) => {
    dispatch({ type: "SET_PROGRESS", payload: progress });
  }, []);

  const setUploading = useCallback((isUploading: boolean) => {
    dispatch({ type: "SET_UPLOADING", payload: isUploading });
  }, []);

  const clearFiles = useCallback(() => {
    dispatch({ type: "CLEAR_FILES" });
  }, []);

  const totalSize = useMemo(
    () => state.files.reduce((acc, file) => acc + file.size, 0),
    [state.files]
  );

  const value = useMemo(
    () => ({
      ...state,
      addFiles,
      removeFile,
      updateFileStatus,
      setProgress,
      setUploading,
      clearFiles,
      totalSize,
    }),
    [state, addFiles, removeFile, updateFileStatus, setProgress, setUploading, clearFiles, totalSize]
  );

  return (
    <UploadContext.Provider value={value}>{children}</UploadContext.Provider>
  );
}

export function useUpload() {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUpload must be used within UploadProvider");
  }
  return context;
}
