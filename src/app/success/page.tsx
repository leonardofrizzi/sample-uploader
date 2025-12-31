"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4">
        <Card>
          <div className="px-6 pt-6">
            <Badge variant="completed">Uploading Completed</Badge>
            <h1 className="mt-4 text-lg-semibold text-gray-900">
              Files Uploaded Successfully
            </h1>
            <p className="text-sm-regular text-gray-600">
              Files are being processed for review online.
            </p>
          </div>
          <div className="flex flex-col items-center px-6 mt-6">
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
          </div>
          <div className="flex flex-col items-center gap-5 px-6 pt-6 pb-2">
            <Link href="/upload" className="w-full max-w-[624px]">
              <button className="flex items-center justify-center w-full h-12 gap-2 bg-white text-gray-700 border border-gray-300 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] py-3 px-5 rounded-lg text-md-semibold hover:bg-gray-50 transition-colors">
                <Image src="/svg/search-refraction.svg" alt="" width={20} height={20} />
                <span>Share more files</span>
                <Image src="/svg/arrow-right.svg" alt="" width={20} height={20} />
              </button>
            </Link>
            <Link href="/" className="text-md-semibold text-gray-600 hover:opacity-90 transition-opacity">
              Go to Dashboard
            </Link>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
