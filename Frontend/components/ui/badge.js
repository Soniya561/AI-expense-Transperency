"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "./utils";

/**
 * Avatar.Root – wraps everything
 */
const Avatar = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    data-slot="avatar"
    className={cn(
      "relative flex size-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  >
    {children}
  </AvatarPrimitive.Root>
));
Avatar.displayName = "Avatar";

/**
 * Avatar.Image – the image part
 */
const AvatarImage = React.forwardRef(({
  className,
  ...props
}, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    data-slot="avatar-image"
    className={cn("aspect-square size-full", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

/**
 * Avatar.Fallback – fallback when image fails or is loading too slow
 */
const AvatarFallback = React.forwardRef(({
  className,
  delayMs = 600,
  children,
  ...props
}, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    data-slot="avatar-fallback"
    delayMs={delayMs}
    className={cn(
      "bg-muted flex size-full items-center justify-center rounded-full",
      className
    )}
    {...props}
  >
    {children}
  </AvatarPrimitive.Fallback>
));
AvatarFallback.displayName = "AvatarFallback";

export {
  Avatar,
  AvatarImage,
  AvatarFallback
};
