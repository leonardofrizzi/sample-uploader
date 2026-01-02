"use client";

import Image from "next/image";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { Badge } from "@/components/Badge";

export default function SuccessPage() {
  return (
    <PageLayout>
      <header className="px-6 pt-6">
        <Badge variant="completed">Uploading Completed</Badge>
        <h1 className="mt-4 text-lg-semibold text-gray-900">
          Files Uploaded Successfully
        </h1>
        <p className="text-sm-regular text-gray-600">
          Files are being processed for review online.
        </p>
      </header>
      <section className="flex flex-col items-center px-6 mt-6">
        <Image
          src="/images/uploaded.webp"
          alt="Uploaded"
          width={160}
          height={160}
        />

        <div className="flex flex-col items-center gap-[6px] mt-4">
          <h2 className="text-lg-semibold text-gray-900">
            You&apos;re all set!
          </h2>
          <p className="text-sm-regular text-gray-600">
            Share more files or head back to the dashboard
          </p>
        </div>
      </section>
      <footer className="flex flex-col items-center gap-5 px-6 pt-6 pb-6">
        <Link
          href="/upload"
          className="flex items-center justify-center w-full max-w-[624px] h-12 gap-2 bg-white text-gray-700 border border-gray-300 shadow-xs py-3 px-5 rounded-lg text-md-semibold hover:bg-gray-50 transition-colors"
        >
          <Image src="/svg/search-refraction.svg" alt="" width={20} height={20} />
          <span>Share more files</span>
          <Image src="/svg/arrow-right.svg" alt="" width={20} height={20} />
        </Link>
        <Link href="/files" className="text-md-semibold text-gray-600 hover:opacity-90 transition-opacity">
          Go to Dashboard
        </Link>
      </footer>
    </PageLayout>
  );
}
