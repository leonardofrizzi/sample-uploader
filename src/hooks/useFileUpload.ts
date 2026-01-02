import { useState, useRef, useCallback } from "react";
import { createDefaultValidator } from "@/validators/fileValidators";
import { FileWithId } from "@/types";

interface UseFileUploadReturn {
  files: FileWithId[];
  isUploading: boolean;
  error: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleBrowseClick: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: (id: string) => void;
  uploadFiles: () => Promise<boolean>;
}

const validator = createDefaultValidator();

export function useFileUpload(): UseFileUploadReturn {
  const [files, setFiles] = useState<FileWithId[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filesRef = useRef<FileWithId[]>(files);
  filesRef.current = files;

  const handleBrowseClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles: FileWithId[] = [];
      for (const file of Array.from(selectedFiles)) {
        const result = validator.validate(file);
        if (!result.isValid) {
          setError(result.error || "Invalid file");
          return;
        }
        newFiles.push({ id: crypto.randomUUID(), file });
      }
      setError(null);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  }, []);

  const handleRemoveFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const uploadFiles = useCallback(async (): Promise<boolean> => {
    const currentFiles = filesRef.current;
    if (currentFiles.length === 0) return false;

    setIsUploading(true);

    const formData = new FormData();
    currentFiles.forEach(({ file }) => formData.append("files", file));

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Failed to upload files");
        setIsUploading(false);
        return false;
      }

      setError(null);
      return true;
    } catch {
      setError("Network error. Please try again.");
      setIsUploading(false);
      return false;
    }
  }, []);

  return {
    files,
    isUploading,
    error,
    fileInputRef,
    handleBrowseClick,
    handleFileChange,
    handleRemoveFile,
    uploadFiles,
  };
}
