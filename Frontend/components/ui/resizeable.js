"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "./utils";

function ResizablePanelGroup({ className, direction = "horizontal", ...props }) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      direction={direction}
      className={cn(
        "flex h-full w-full", 
        direction === "vertical" ? "flex-col" : "",
        className
      )}
      {...props}
    />
  );
}

function ResizablePanel({ className, ...props }) {
  return (
    <ResizablePrimitive.Panel
      data-slot="resizable-panel"
      className={cn(className)}
      {...props}
    />
  );
}

function ResizableHandle({ className, withHandle, ...props }) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex items-center justify-center",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
