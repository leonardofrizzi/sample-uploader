import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { Badge } from "@/components/Badge";
import { SourceCard } from "@/components/SourceCard";
import { ActionButton } from "@/components/ActionButton";

export default function SourcePage() {
  return (
    <PageLayout>
      <header className="px-6 pt-6">
        <Badge>Starting Extraction</Badge>
        <h1 className="mt-4 text-lg-semibold text-gray-900">
          Hearsay Extraction Assistant
        </h1>
        <p className="text-sm-regular text-gray-600">
          Follow the instructions below to prepare for an extraction device.
        </p>
      </header>
      <section className="flex flex-wrap justify-center gap-8 px-8 mt-6">
        <SourceCard
          image="/images/facebook.webp"
          title="Facebook"
        />
        <SourceCard
          image="/images/instagram.webp"
          title="Instagram"
        />
        <SourceCard
          image="/images/snapchat.webp"
          title="Snapchat"
        />
      </section>
      <nav className="flex flex-col items-center gap-5 px-8 pt-6 pb-6">
        <Link href="/upload" className="w-full flex justify-center">
          <ActionButton variant="upload" icon="upload-cloud" iconPosition="top">
            Or, Upload Files
          </ActionButton>
        </Link>
        <Link href="/" className="text-md-semibold text-gray-700 hover:opacity-90 transition-opacity">
          Back
        </Link>
      </nav>
    </PageLayout>
  );
}
