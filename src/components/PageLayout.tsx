import { memo } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Card } from "./Card";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = memo(function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4">
        <Card>{children}</Card>
      </main>
      <Footer />
    </div>
  );
});
