/**
 * Minimal markdown renderer for chat messages.
 *
 * Deliberately NOT using react-markdown + remark/rehype plugins here -
 * that stack pulls in a surprising number of transitive dependencies for
 * what Bholu's answers actually need: bold, italics, inline code, fenced
 * code blocks, links, and bullet lists. This keeps the bundle small per
 * the brief's "no unnecessary heavy libraries" rule.
 */
import React from "react";

function renderInline(text, keyPrefix) {
  // Order matters: code spans first so ** inside `code` isn't touched.
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
        <code key={`${keyPrefix}-${i++}`} className="bg-white/10 text-accent-2 px-1.5 py-0.5 rounded font-mono text-[0.85em]">
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("**")) {
      parts.push(
        <strong key={`${keyPrefix}-${i++}`} className="font-semibold text-ink-hi">
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
          className="text-accent-2 underline underline-offset-2 hover:text-accent-1 transition-colors"
        >
          {linkMatch[1]}
        </a>
      );
    } else {
      parts.push(
        <em key={`${keyPrefix}-${i++}`} className="italic text-ink-hi">
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
        <div key={`code-${blockIdx}`} className="relative my-2 group">
          <pre className="bg-black/40 border border-line rounded-lg p-3 overflow-x-auto font-mono text-sm text-ink-hi">
            {lang && <div className="text-xs text-ink-lo mb-1">{lang}</div>}
            <code>{code.trim()}</code>
          </pre>
          {onCopy && (
            <button
              onClick={() => onCopy(code.trim())}
              className="absolute top-2 right-2 text-xs text-ink-lo opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded bg-white/5 hover:bg-white/10 focus-ring"
              aria-label="Copy code"
            >
              Copy
            </button>
          )}
        </div>
      );
      return;
    }

    // Non-code block: split into lines for bullet/paragraph handling
    const lines = block.split("\n").filter((l) => l.trim().length > 0);
    let listBuffer = [];

    const flushList = (idx) => {
      if (listBuffer.length === 0) return;
      nodes.push(
        <ul key={`list-${blockIdx}-${idx}`} className="list-disc list-inside space-y-1 my-1">
          {listBuffer.map((item, i) => (
            <li key={i} className="text-sm leading-relaxed">
              {renderInline(item, `li-${blockIdx}-${idx}-${i}`)}
            </li>
          ))}
        </ul>
      );
      listBuffer = [];
    };

    lines.forEach((line, idx) => {
      const bulletMatch = line.match(/^[-•*]\s+(.*)/);
      if (bulletMatch) {
        listBuffer.push(bulletMatch[1]);
      } else {
        flushList(idx);
        nodes.push(
          <p key={`p-${blockIdx}-${idx}`} className="text-sm leading-relaxed">
            {renderInline(line, `p-${blockIdx}-${idx}`)}
          </p>
        );
      }
    });
    flushList("end");
  });

  return <div className="space-y-1.5">{nodes}</div>;
}
