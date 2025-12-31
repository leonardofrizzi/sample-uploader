import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { SourceCard } from "@/components/SourceCard";
import { ActionButton } from "@/components/ActionButton";

export default function SourcePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4">
        <Card>
          <div className="px-6 pt-6">
            <Badge>Starting Extraction</Badge>
            <h1 className="mt-4 text-lg-semibold text-gray-900">
              Hearsay Extraction Assistant
            </h1>
            <p className="text-sm-regular text-gray-600">
              Follow the instructions below to prepare for an extraction device.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 px-8 mt-6">
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
          </div>
          <div className="flex flex-col items-center gap-5 px-8 pt-6 pb-6">
            <Link href="/upload" className="w-full flex justify-center">
              <ActionButton variant="upload" icon="upload-cloud" iconPosition="top">
                Or, Upload Files
              </ActionButton>
            </Link>
            <Link href="/" className="text-md-semibold text-gray-700 hover:opacity-90 transition-opacity">
              Back
            </Link>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
