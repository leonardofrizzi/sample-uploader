import { useEffect, useState, useCallback } from "react";
import { StoredFile } from "@/types";

interface UseFetchFilesReturn {
  files: StoredFile[];
  isLoading: boolean;
  error: string | null;
  deleteFile: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useFetchFiles(): UseFetchFilesReturn {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/upload");
      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }
      const data = await response.json();
      setFiles(data.files || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch files");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteFile = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/upload?id=${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete file");
      }
      setFiles((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete file");
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return { files, isLoading, error, deleteFile, refetch: fetchFiles };
}
