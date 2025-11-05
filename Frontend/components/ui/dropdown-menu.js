"use client";

import * as React from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";  // no version suffix
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

function MyDropdownMenu({ options = [] }) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <button>Open Menu ▼</button>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content
          sideOffset={5}
          className="min-w-[200px] bg-white border rounded shadow-lg p-1"
        >
          {options.map((opt, idx) => (
            <ContextMenu.Item
              key={idx}
              onSelect={() => opt.onSelect && opt.onSelect(opt.value)}
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer select-none"
            >
              {opt.icon && <opt.icon className="w-4 h-4 mr-2" />}
              {opt.label}
            </ContextMenu.Item>
          ))}

          <ContextMenu.Separator className="h-px bg-gray-200 my-1" />

          <ContextMenu.Sub>
            <ContextMenu.SubTrigger className="px-2 py-1 hover:bg-gray-100 select-none flex items-center justify-between">
              More Options
              <ChevronRightIcon className="w-4 h-4 ml-2" />
            </ContextMenu.SubTrigger>
            <ContextMenu.Portal>
              <ContextMenu.SubContent
                sideOffset={2}
                className="min-w-[150px] bg-white border rounded shadow-lg p-1"
              >
                <ContextMenu.Item className="px-2 py-1 hover:bg-gray-100 select-none">
                  Sub Option 1
                </ContextMenu.Item>
                <ContextMenu.Item className="px-2 py-1 hover:bg-gray-100 select-none">
                  Sub Option 2
                </ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

export default MyDropdownMenu;
