import Image from "next/image";

interface ActionButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "upload";
  icon?: "arrow-right" | "upload-cloud";
  iconPosition?: "left" | "right" | "top";
  onClick?: () => void;
}

export function ActionButton({
  children,
  variant = "primary",
  icon,
  iconPosition = "right",
  onClick,
}: ActionButtonProps) {
  const baseStyles = "flex items-center justify-center bg-white text-gray-700 hover:bg-gray-50 transition-colors";

  const variants = {
    primary: "w-full max-w-[544px] h-12 gap-2 border border-gray-300 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] py-3 px-5 rounded-lg text-md-semibold",
    secondary: "w-full max-w-[544px] h-12 gap-2 border border-gray-300 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] py-[10px] px-0 rounded-[5px] text-sm-medium",
    upload: "flex-col w-full max-w-[608px] h-[74px] gap-[14px] border border-slate-200 py-[10px] rounded-xl text-sm-medium hover:border-primary hover:bg-white",
  };

  const isUpload = variant === "upload";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {icon && (iconPosition === "left" || (isUpload && iconPosition === "top")) && (
        <Image src={`/svg/${icon}.svg`} alt="" width={20} height={20} />
      )}
      {!isUpload && icon && iconPosition === "top" && (
        <Image src={`/svg/${icon}.svg`} alt="" width={20} height={20} />
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && !isUpload && (
        <Image src={`/svg/${icon}.svg`} alt="" width={20} height={20} />
      )}
    </button>
  );
}
