"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/PageLayout";
import { Badge } from "@/components/Badge";
import { useProgress } from "@/hooks/useProgress";
import { formatTime } from "@/utils/formatters";

export default function ProgressPage() {
  const router = useRouter();
  const { progress, seconds } = useProgress({
    onComplete: () => router.push("/success"),
  });

  return (
    <PageLayout>
      <div className="px-6 pt-6">
        <Badge variant="progress">Uploading In Progress</Badge>
        <h1 className="mt-4 text-lg-semibold text-gray-900">
          Facebook Extraction Assistant
        </h1>
        <p className="text-sm-regular text-gray-600">
          Facebook extraction in progress
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 px-6 mt-6">
        <Image
          src="/images/uploading-cloud.webp"
          alt="Uploading"
          width={160}
          height={160}
        />

        <span className="text-lg-semibold text-gray-900">
          {formatTime(seconds)}
        </span>

        <div className="relative w-[320px] h-2">
          <div className="absolute inset-0 bg-gray-200 rounded" />
          <div
            className="absolute h-2 bg-primary rounded"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-[6px]">
          <Image
            src="/svg/loading.svg"
            alt=""
            width={24}
            height={24}
            className="animate-spin"
          />
          <span className="text-xs-medium text-black">Uploading</span>
        </div>
      </div>
      <div className="flex justify-center px-6 pt-6 pb-6">
        <span className="text-sm-bold text-primary-700">
          Do Not Close App While Processing
        </span>
      </div>
    </PageLayout>
  );
}
