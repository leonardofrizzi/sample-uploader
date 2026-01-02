"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/PageLayout";
import { Badge } from "@/components/Badge";
import { ActionButton } from "@/components/ActionButton";
import { useFileUpload } from "@/hooks/useFileUpload";

export default function UploadPage() {
  const router = useRouter();
  const {
    files,
    isUploading,
    error,
    fileInputRef,
    handleBrowseClick,
    handleFileChange,
    handleRemoveFile,
    uploadFiles,
  } = useFileUpload();

  const handleUpload = async () => {
    const success = await uploadFiles();
    if (success) {
      router.push("/progress");
    }
  };

  return (
    <PageLayout>
      <header className="px-6 pt-6">
        <Badge>Starting Extraction</Badge>
        <h1 className="mt-4 text-lg-semibold text-gray-900">
          File Upload
        </h1>
        <p className="text-sm-regular text-gray-600">
          Select files to upload for review
        </p>
      </header>
      <section className="flex flex-col items-center gap-3 px-6 mt-6 pb-6">
        {error && (
          <p className="text-sm-regular text-red-500 text-center w-full max-w-[624px]">
            {error}
          </p>
        )}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex items-center justify-between w-full max-w-[624px] h-16 px-[18px] py-4 bg-white border border-gray-300 rounded-xl">
          <div className="flex items-center gap-4">
            <Image src="/svg/folder.svg" alt="" width={20} height={20} />
            <span className="text-sm-medium text-gray-700">
              Find files to upload
            </span>
          </div>
          <button
            onClick={handleBrowseClick}
            className="px-[10px] py-[6px] bg-blue-50 border border-blue-50 rounded-lg shadow-xs text-sm-semibold text-blue-600"
          >
            Browse
          </button>
        </div>

        {files.map(({ id, file }) => (
          <article key={id} className="flex items-center gap-2 w-full max-w-[624px]">
            <Image src="/svg/check-circle.svg" alt="" width={20} height={20} />
            <span className="text-md-medium text-black">{file.name}</span>
            <button
              onClick={() => handleRemoveFile(id)}
              className="ml-1"
              aria-label={`Remove ${file.name}`}
            >
              <Image src="/svg/x.svg" alt="" width={20} height={20} />
            </button>
          </article>
        ))}

        <button
          onClick={handleUpload}
          disabled={files.length === 0 || isUploading}
          className="w-full max-w-[624px]"
        >
          <ActionButton variant="submit">
            {isUploading ? "Uploading..." : "Upload Now"}
          </ActionButton>
        </button>
      </section>
    </PageLayout>
  );
}
