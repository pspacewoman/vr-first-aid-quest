import { ReactNode } from "react";

interface VRPanelProps {
  children: ReactNode;
  title?: string;
  sceneLabel?: string;
  className?: string;
  floating?: boolean;
}

const VRPanel = ({ children, title, sceneLabel, className = "", floating = true }: VRPanelProps) => {
  return (
    <div className={`${floating ? "wireframe-panel-floating" : "wireframe-panel"} fade-in ${className}`}>
      {sceneLabel && <div className="scene-label mb-3">{sceneLabel}</div>}
      {title && (
        <h2 className="font-mono text-xl font-bold tracking-wide text-foreground mb-4 border-b border-border/40 pb-3">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default VRPanel;
