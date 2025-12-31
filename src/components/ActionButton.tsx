import Image from "next/image";

interface ActionButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  icon?: "arrow-right" | "upload-cloud";
  iconPosition?: "left" | "right";
  onClick?: () => void;
}

export function ActionButton({
  children,
  variant = "primary",
  icon,
  iconPosition = "right",
  onClick,
}: ActionButtonProps) {
  const variants = {
    primary: "py-3 px-5 rounded-lg text-md-semibold",
    secondary: "py-[10px] px-0 rounded-[5px] text-sm-medium",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-full max-w-[544px] h-12 gap-2 bg-white border border-gray-300 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] text-gray-700 hover:bg-gray-50 transition-colors ${variants[variant]}`}
    >
      {icon && iconPosition === "left" && (
        <Image src={`/svg/${icon}.svg`} alt="" width={20} height={20} />
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <Image src={`/svg/${icon}.svg`} alt="" width={20} height={20} />
      )}
    </button>
  );
}
