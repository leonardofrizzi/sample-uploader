import { memo } from "react";
import Image from "next/image";

interface ActionButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "upload" | "submit";
  icon?: "arrow-right" | "upload-cloud";
  iconPosition?: "left" | "right" | "top";
  onClick?: () => void;
}

export const ActionButton = memo(function ActionButton({
  children,
  variant = "primary",
  icon,
  iconPosition = "right",
  onClick,
}: ActionButtonProps) {
  const baseStyles = "flex items-center justify-center transition-colors";

  const variants = {
    primary: "w-full max-w-[544px] h-12 gap-2 bg-white text-gray-700 border border-gray-300 shadow-xs py-3 px-5 rounded-lg text-md-semibold hover:bg-gray-50",
    secondary: "w-full max-w-[544px] h-12 gap-2 bg-white text-gray-700 border border-gray-300 shadow-xs py-[10px] px-0 rounded-[5px] text-sm-medium hover:bg-gray-50",
    upload: "flex-col w-full max-w-[608px] h-[74px] gap-[14px] bg-white text-gray-700 border border-slate-200 py-[10px] rounded-xl text-sm-medium hover:border-primary",
    submit: "w-full max-w-[624px] h-12 gap-2 bg-primary text-white border border-primary shadow-xs py-3 px-5 rounded-lg text-md-semibold hover:opacity-90",
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
});
