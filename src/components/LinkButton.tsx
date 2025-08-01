import type { ComponentProps } from "react";
import { createLink } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const LinkButtonComponent = createLink(Button);

export function LinkButton({ children, ...props }: ComponentProps<typeof LinkButtonComponent>) {
  return <LinkButtonComponent {...props}>{children}</LinkButtonComponent>;
}
