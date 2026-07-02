"use client";

import { motion, useDragControls } from "framer-motion";
import { GripVertical } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DraggablePercentProps {
  x: number;
  y: number;
  editable?: boolean;
  onPositionChange?: (x: number, y: number) => void;
  children: ReactNode;
  className?: string;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function DraggablePercent({
  x,
  y,
  editable,
  onPositionChange,
  children,
  className,
}: DraggablePercentProps) {
  const boundsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const canDrag = editable && !!onPositionChange;

  return (
    <div ref={boundsRef} className="absolute inset-0 pointer-events-none">
      <motion.div
        key={`${x}-${y}`}
        drag={canDrag}
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={boundsRef}
        onDragEnd={(_, info) => {
          const el = boundsRef.current;
          if (!el || !onPositionChange) return;
          const rect = el.getBoundingClientRect();
          const nx = clamp(((info.point.x - rect.left) / rect.width) * 100, 2, 88);
          const ny = clamp(((info.point.y - rect.top) / rect.height) * 100, 2, 92);
          onPositionChange(nx, ny);
        }}
        className={cn("absolute z-20 max-w-[88%] pointer-events-auto group", className)}
        style={{ left: `${x}%`, top: `${y}%` }}
      >
        {canDrag && (
          <button
            type="button"
            aria-label="Drag to reposition"
            className="absolute -left-6 top-0 p-0.5 rounded opacity-0 group-hover:opacity-60 hover:!opacity-100 cursor-grab active:cursor-grabbing text-current"
            onPointerDown={(e) => {
              e.preventDefault();
              dragControls.start(e);
            }}
          >
            <GripVertical size={14} />
          </button>
        )}
        {children}
      </motion.div>
    </div>
  );
}
