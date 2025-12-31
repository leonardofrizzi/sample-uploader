import Image from "next/image";

interface SourceCardProps {
  image: string;
  title: string;
  selected?: boolean;
  onClick?: () => void;
}

export function SourceCard({ image, title, selected, onClick }: SourceCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-[165px] h-[152px] p-[10px] bg-white border rounded-xl gap-[14px] transition-colors ${selected ? "border-primary border-2" : "border-slate-200 hover:border-primary"}`}
    >
      <Image
        src={image}
        alt={title}
        width={78}
        height={98}
      />
      <span className="text-sm-medium text-gray-700 text-center">{title}</span>
    </button>
  );
}
