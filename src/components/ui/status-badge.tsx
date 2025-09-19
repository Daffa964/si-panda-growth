import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusType = "normal" | "berisiko" | "gizi-kurang" | "gizi-lebih";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  normal: {
    label: "Normal",
    variant: "default" as const,
    className: "bg-success text-success-foreground hover:bg-success/90",
  },
  berisiko: {
    label: "Berisiko",
    variant: "destructive" as const,
    className: "bg-warning text-warning-foreground hover:bg-warning/90",
  },
  "gizi-kurang": {
    label: "Gizi Kurang",
    variant: "destructive" as const,
    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  },
  "gizi-lebih": {
    label: "Gizi Lebih",
    variant: "secondary" as const,
    className: "bg-warning text-warning-foreground hover:bg-warning/90",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant={config.variant}
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
}