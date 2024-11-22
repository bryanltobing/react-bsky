"use client";
import { useEffect, useMemo, useState } from "react";
import { BskyPost } from "react-bsky";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function extractBskyDetails(
  url: string
): { handle: string; id: string } | undefined {
  const regex = /bsky\.app\/profile\/([\w.]+)\/post\/([\w]+)/;
  const match = url.match(regex);
  if (match && match[1] && match[2]) {
    return {
      handle: match[1],
      id: match[2],
    };
  }
}

const DEFAULT_BSKY_POST_URI =
  "https://bsky.app/profile/bryanprim.us/post/3la4tcw2npv2a";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [postURI, setPostURI] = useState(DEFAULT_BSKY_POST_URI);

  const debouncedPostURI = useDebounce(postURI, 500);

  const extractedBskyDetails = extractBskyDetails(
    debouncedPostURI ?? DEFAULT_BSKY_POST_URI
  );
  const bskyPostProps = extractedBskyDetails ? extractedBskyDetails : undefined;

  const code = useMemo(() => {
    if (bskyPostProps) {
      return `<BskyPost handle="${bskyPostProps.handle}" id="${bskyPostProps.id}" />`;
    }
    return "";
  }, []);

  const copyCode = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <h1>Embed Bluesky post in your React application.</h1>

        <a
          href="https://github.com/bryanltobing/react-bsky"
          style={{ textAlign: "center" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          View source code on GitHub
        </a>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            placeholder={DEFAULT_BSKY_POST_URI}
            value={postURI}
            onChange={(e) => setPostURI(e.target.value)}
            style={{ padding: "16px", borderRadius: "8px", width: "100%" }}
          />

          {code && (
            <button
              style={{
                flexShrink: "0",
                paddingLeft: "2rem",
                paddingRight: "2rem",
                borderRadius: "8px",
                color: "white",
                backgroundColor: "#0A7AFF",
                border: 0,
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#0862CC")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0A7AFF")
              }
              onClick={copyCode}
            >
              {copied ? "Code Copied!" : "Copy Code"}
            </button>
          )}
        </div>

        <span style={{ textAlign: "center" }}>Result: </span>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {bskyPostProps ? (
            <BskyPost {...bskyPostProps} />
          ) : (
            <p style={{ color: "red" }}>URL most likely invalid</p>
          )}
        </div>

        <div
          style={{
            paddingTop: "2rem",
            lineHeight: "1.5",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#333" }}>
            Usage
          </h1>
          <p style={{ marginBottom: "1rem", fontSize: "1rem", color: "#555" }}>
            Install the package:
          </p>
          <code
            style={{
              display: "block",
              marginBottom: "1rem",
              backgroundColor: "#f4f4f4",
              padding: "0.5rem",
              borderRadius: "4px",
              fontSize: "0.9rem",
              color: "#c7254e",
              fontFamily: "monospace",
            }}
          >
            npm install react-bsky
          </code>
          <p style={{ marginBottom: "1rem", fontSize: "1rem", color: "#555" }}>
            Import the component:
          </p>
          <code
            style={{
              display: "block",
              marginBottom: "1rem",
              backgroundColor: "#f4f4f4",
              padding: "0.5rem",
              borderRadius: "4px",
              fontSize: "0.9rem",
              color: "#c7254e",
              fontFamily: "monospace",
            }}
          >
            import &#123; BskyPost &#125; from "react-bsky";
          </code>
          <p style={{ marginBottom: "1rem", fontSize: "1rem", color: "#555" }}>
            Use the component:
          </p>
          <code
            style={{
              display: "block",
              backgroundColor: "#f4f4f4",
              padding: "0.5rem",
              borderRadius: "4px",
              fontSize: "0.9rem",
              color: "#c7254e",
              fontFamily: "monospace",
            }}
          >
            &lt;BskyPost handle="{bskyPostProps?.handle}" id="
            {bskyPostProps?.id}" /&gt;
          </code>
        </div>
      </div>
    </div>
  );
}
