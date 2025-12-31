"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { ActionButton } from "@/components/ActionButton";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4">
        <Card>
          <div className="px-6 pt-6">
            <Badge>Starting Extraction</Badge>
            <h1 className="mt-4 text-lg-semibold text-gray-900">
              File Upload
            </h1>
            <p className="text-sm-regular text-gray-600">
              Select files to upload for review
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 px-6 mt-6 -mb-4">
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
                className="px-[10px] py-[6px] bg-blue-50 border border-blue-50 rounded-lg shadow-[0px_1px_2px_rgba(16,24,40,0.05)] text-sm-semibold text-blue-600"
              >
                Browse
              </button>
            </div>

            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-2 w-full max-w-[624px]">
                <Image src="/svg/check-circle.svg" alt="" width={20} height={20} />
                <span className="text-md-medium text-black">{file.name}</span>
                <button onClick={() => handleRemoveFile(index)} className="ml-1">
                  <Image src="/svg/x.svg" alt="Remove" width={20} height={20} />
                </button>
              </div>
            ))}

            <Link href="/progress" className="w-full max-w-[624px]">
              <ActionButton variant="submit">
                Upload Now
              </ActionButton>
            </Link>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
