"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

interface StoredFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FilesPage() {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch("/api/upload");
        const data = await response.json();
        setFiles(data.files || []);
      } catch (error) {
        console.error("Failed to fetch files:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFiles();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/upload?id=${id}`, { method: "DELETE" });
      setFiles((prev) => prev.filter((f) => f.id !== id));
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4">
        <Card>
          <header className="px-6 pt-6">
            <Badge>File Management</Badge>
            <h1 className="mt-4 text-lg-semibold text-gray-900">
              Uploaded Files
            </h1>
            <p className="text-sm-regular text-gray-600">
              View and manage your uploaded files
            </p>
          </header>
          <section className="flex flex-col gap-3 px-6 mt-6 pb-6">
            {isLoading ? (
              <p className="text-sm-regular text-gray-500 text-center py-4">
                Loading files...
              </p>
            ) : files.length === 0 ? (
              <p className="text-sm-regular text-gray-500 text-center py-4">
                No files uploaded yet
              </p>
            ) : (
              files.map((file) => (
                <article
                  key={file.id}
                  className="flex items-center justify-between w-full max-w-[624px] px-4 py-3 bg-white border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Image src="/svg/check-circle.svg" alt="" width={20} height={20} />
                    <div className="flex flex-col">
                      <span className="text-sm-medium text-gray-900">{file.name}</span>
                      <span className="text-xs-regular text-gray-500">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(file.id)}
                    aria-label={`Delete ${file.name}`}
                  >
                    <Image src="/svg/x.svg" alt="" width={20} height={20} />
                  </button>
                </article>
              ))
            )}
            <Link href="/upload" className="w-full max-w-[624px] mt-2">
              <button className="flex items-center justify-center w-full h-12 gap-2 bg-primary text-white border border-primary rounded-lg shadow-[0px_1px_2px_rgba(16,24,40,0.05)] text-md-semibold hover:opacity-90 transition-opacity">
                Upload More Files
              </button>
            </Link>
          </section>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
