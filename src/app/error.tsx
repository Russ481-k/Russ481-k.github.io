"use client";

import { useEffect } from "react";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root error boundary caught:", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(14, 41, 84, 0.65)",
          borderRadius: "12px",
          padding: "3rem 2.5rem",
          maxWidth: "480px",
          width: "100%",
          border: "1px solid rgba(183, 237, 246, 0.15)",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "1rem",
            color: "#b7edf6",
          }}
        >
          Something went wrong
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            color: "#adb5bd",
            lineHeight: 1.6,
            marginBottom: "2rem",
          }}
        >
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            backgroundColor: "#0e2954",
            color: "#b7edf6",
            border: "1px solid rgba(183, 237, 246, 0.3)",
            borderRadius: "8px",
            padding: "0.75rem 2rem",
            fontSize: "0.95rem",
            cursor: "pointer",
            width: "auto",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#1f6e8c")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#0e2954")
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}
