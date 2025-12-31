import Image from "next/image";
import Link from "next/link";

interface SourceCardProps {
  image: string;
  title: string;
  href?: string;
}

export function SourceCard({ image, title, href = "/upload" }: SourceCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center w-[165px] h-[152px] p-[10px] bg-white border border-slate-200 rounded-xl gap-[14px] transition-colors hover:border-primary"
    >
      <Image
        src={image}
        alt={title}
        width={78}
        height={98}
      />
      <span className="text-sm-medium text-gray-700 text-center">{title}</span>
    </Link>
  );
}
