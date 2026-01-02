import { memo } from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "progress" | "completed";
}

export const Badge = memo(function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "bg-primary-100 border-primary-100 text-primary-700",
    progress: "bg-green-50 border-green-100 text-green-700",
    completed: "bg-green-700 border-green-700 text-green-25",
  };

  return (
    <span
      className={`inline-flex items-center px-[10px] py-[6px] border rounded-lg shadow-xs text-sm-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  );
});
