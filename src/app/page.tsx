import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-start justify-center pt-12 px-4">
        <Card>
          <div className="px-6 pt-6">
            <Badge>Starting Extraction</Badge>
            <h1 className="mt-4 text-lg-semibold text-gray-900">
              Hearsay Extraction Assistant
            </h1>
            <p className="text-sm-regular text-gray-600">
              Follow the instructions below to prepare for an extraction.
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}
