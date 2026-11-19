import React from "react";

function renderInline(text, keyPrefix) {
  const parts = [];
  let remaining = text;
  let i = 0;

  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/;

  while (remaining.length > 0) {
    const match = remaining.match(pattern);
    if (!match) {
      parts.push(remaining);
      break;
    }
    const idx = match.index;
    if (idx > 0) parts.push(remaining.slice(0, idx));

    const token = match[0];
    if (token.startsWith("`")) {
      parts.push(
        <code
          key={`${keyPrefix}-${i++}`}
          className="bg-stone/90 text-gold-light border border-line px-1.5 py-0.5 rounded font-mono text-[0.85em]"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("**")) {
      parts.push(
        <strong key={`${keyPrefix}-${i++}`} className="font-semibold text-parchment">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("[")) {
      const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      parts.push(
        <a
          key={`${keyPrefix}-${i++}`}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold underline underline-offset-2 hover:text-gold-bright transition-colors"
        >
          {linkMatch[1]}
        </a>
      );
    } else {
      parts.push(
        <em key={`${keyPrefix}-${i++}`} className="italic text-parchment">
          {token.slice(1, -1)}
        </em>
      );
    }
    remaining = remaining.slice(idx + token.length);
  }
  return parts;
}

export function renderMarkdown(text, onCopy) {
  if (!text) return null;
  const blocks = text.split(/```/);
  const nodes = [];

  blocks.forEach((block, blockIdx) => {
    const isCode = blockIdx % 2 === 1;
    if (isCode) {
      const firstNewline = block.indexOf("\n");
      const lang = firstNewline > -1 ? block.slice(0, firstNewline).trim() : "";
      const code = firstNewline > -1 ? block.slice(firstNewline + 1) : block;
      nodes.push(
        <div key={`code-${blockIdx}`} className="relative my-2.5 group">
          <pre className="bg-midnight/95 border border-line rounded-xl p-3.5 overflow-x-auto font-mono text-xs text-parchment">
            {lang && <div className="text-[10px] text-gold-light font-mono mb-1">{lang}</div>}
            <code>{code.trim()}</code>
          </pre>
          {onCopy && (
            <button
              onClick={() => onCopy(code.trim())}
              className="absolute top-2.5 right-2.5 text-[11px] font-mono text-parchment-faint hover:text-gold transition-colors px-2 py-0.5 rounded bg-chamber border border-line focus-ring"
              aria-label="Copy code snippet"
            >
              Copy
            </button>
          )}
        </div>
      );
      return;
    }

    const lines = block.split("\n").filter((l) => l.trim().length > 0);
    let listBuffer = [];

    const flushList = (idx) => {
      if (listBuffer.length === 0) return;
      nodes.push(
        <ul key={`list-${blockIdx}-${idx}`} className="list-disc list-inside space-y-1 my-1.5 text-parchment/90">
          {listBuffer.map((item, i) => (
            <li key={i} className="text-xs sm:text-sm leading-relaxed">
              {renderInline(item, `li-${blockIdx}-${idx}-${i}`)}
            </li>
          ))}
        </ul>
      );
      listBuffer = [];
    };

    lines.forEach((line, idx) => {
      // Check for headings
      const headingMatch = line.match(/^(#{1,3})\s+(.*)/);
      if (headingMatch) {
        flushList(idx);
        nodes.push(
          <h4 key={`h-${blockIdx}-${idx}`} className="font-cinzel text-sm sm:text-base font-bold text-gold mt-3 mb-1">
            {renderInline(headingMatch[2], `h-${blockIdx}-${idx}`)}
          </h4>
        );
        return;
      }

      const bulletMatch = line.match(/^[-•*]\s+(.*)/);
      if (bulletMatch) {
        listBuffer.push(bulletMatch[1]);
      } else {
        flushList(idx);
        nodes.push(
          <p key={`p-${blockIdx}-${idx}`} className="text-xs sm:text-sm leading-relaxed text-parchment/90">
            {renderInline(line, `p-${blockIdx}-${idx}`)}
          </p>
        );
      }
    });
    flushList("end");
  });

  return <div className="space-y-2">{nodes}</div>;
}
