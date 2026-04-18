interface InfoTipProps {
  icon?: string;
  title?: string;
  text: string;
  variant?: "info" | "warning" | "success";
  className?: string;
}

const InfoTip = ({ icon = "ℹ", title, text, variant = "info", className = "" }: InfoTipProps) => {
  const variantClasses =
    variant === "warning"
      ? "border-warning/40 bg-warning/10 text-warning"
      : variant === "success"
      ? "border-success/40 bg-success/10 text-success"
      : "border-info/40 bg-info/10 text-info";

  return (
    <div
      className={`flex items-start gap-2 px-3 py-2 rounded-lg border backdrop-blur-sm text-xs font-mono slide-up ${variantClasses} ${className}`}
    >
      <span className="text-base leading-none mt-0.5">{icon}</span>
      <div className="flex-1">
        {title && <div className="font-bold mb-0.5">{title}</div>}
        <div className="opacity-90">{text}</div>
      </div>
    </div>
  );
};

export default InfoTip;
