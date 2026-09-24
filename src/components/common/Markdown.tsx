"use client";

import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

/** Renders course/news markdown content with the site's typography, no HTML/scripts allowed. */
export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn("text-[14px] leading-relaxed text-ink-soft", className)}>
      <ReactMarkdown
        components={{
          p: (props) => <p className="mb-3 last:mb-0" {...props} />,
          strong: (props) => <strong className="font-bold text-ink" {...props} />,
          ul: (props) => <ul className="mb-3 list-disc space-y-1 pl-5 last:mb-0" {...props} />,
          ol: (props) => <ol className="mb-3 list-decimal space-y-1 pl-5 last:mb-0" {...props} />,
          li: (props) => <li {...props} />,
          a: (props) => (
            <a className="font-semibold text-brand underline underline-offset-2" target="_blank" rel="noopener noreferrer" {...props} />
          ),
          h1: (props) => <h3 className="mb-2 font-display text-lg font-black text-ink" {...props} />,
          h2: (props) => <h3 className="mb-2 font-display text-base font-black text-ink" {...props} />,
          h3: (props) => <h3 className="mb-2 font-display text-[15px] font-black text-ink" {...props} />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
