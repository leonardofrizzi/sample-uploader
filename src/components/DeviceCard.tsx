import Image from "next/image";

interface DeviceCardProps {
  image: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export function DeviceCard({ image, title, description, onClick }: DeviceCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center w-[256px] h-[230px] px-[18px] py-8 bg-white border border-slate-200 rounded-xl gap-7 hover:border-primary transition-colors"
    >
      <Image
        src={image}
        alt={title}
        width={78}
        height={98}
      />
      <div className="flex flex-col items-center">
        <span className="text-sm-medium text-gray-700 text-center">{title}</span>
        <span className="text-sm-regular text-gray-600 text-center">{description}</span>
      </div>
    </button>
  );
}
