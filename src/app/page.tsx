import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { Badge } from "@/components/Badge";
import { DeviceCard } from "@/components/DeviceCard";
import { ActionButton } from "@/components/ActionButton";

export default function Home() {
  return (
    <PageLayout>
      <header className="px-6 pt-6">
        <Badge>Starting Extraction</Badge>
        <h1 className="mt-4 text-lg-semibold text-gray-900">
          Hearsay Extraction Assistant
        </h1>
        <p className="text-sm-regular text-gray-600">
          Follow the instructions below to prepare for an extraction.
        </p>
      </header>
      <section className="flex flex-wrap justify-center gap-8 px-16 mt-6">
        <DeviceCard
          image="/images/iphone.webp"
          title="iPhone"
          description="iOS versions 11.1+"
        />
        <DeviceCard
          image="/images/android.webp"
          title="Android"
          description="OS version 11.1+"
        />
      </section>
      <nav className="flex flex-col items-center gap-5 px-16 pt-8 pb-6">
        <Link href="/source" className="w-full max-w-[544px]">
          <ActionButton icon="arrow-right">
            Extract from a Non-Phone Source
          </ActionButton>
        </Link>
        <Link href="/upload" className="w-full max-w-[544px]">
          <ActionButton variant="secondary" icon="upload-cloud" iconPosition="left">
            Or, Upload Files
          </ActionButton>
        </Link>
      </nav>
    </PageLayout>
  );
}
