"use client";

import Image from "next/image";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { Badge } from "@/components/Badge";
import { useFetchFiles } from "@/hooks/useFetchFiles";
import { formatFileSize } from "@/utils/formatters";

export default function FilesPage() {
  const { files, isLoading, error, deleteFile } = useFetchFiles();

  return (
    <PageLayout>
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
        {error && (
          <p className="text-sm-regular text-red-500 text-center py-4">
            {error}
          </p>
        )}
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
                onClick={() => deleteFile(file.id)}
                aria-label={`Delete ${file.name}`}
              >
                <Image src="/svg/x.svg" alt="" width={20} height={20} />
              </button>
            </article>
          ))
        )}
        <Link href="/upload" className="w-full max-w-[624px] mt-2">
          <button className="flex items-center justify-center w-full h-12 gap-2 bg-primary text-white border border-primary rounded-lg shadow-xs text-md-semibold hover:opacity-90 transition-opacity">
            Upload More Files
          </button>
        </Link>
      </section>
    </PageLayout>
  );
}
