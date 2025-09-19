import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MedicalCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  gradient?: boolean;
}

export function MedicalCard({ 
  title, 
  description, 
  children, 
  className,
  gradient = false 
}: MedicalCardProps) {
  return (
    <Card 
      className={cn(
        "shadow-card border-0",
        gradient && "bg-gradient-card",
        className
      )}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
}