import Link from "next/link";

export default function NotFound() {
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
            fontSize: "4rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            color: "#b7edf6",
            lineHeight: 1,
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 500,
            marginBottom: "1rem",
            color: "#ffffff",
          }}
        >
          Page not found
        </h2>
        <p
          style={{
            fontSize: "0.95rem",
            color: "#adb5bd",
            lineHeight: 1.6,
            marginBottom: "2rem",
          }}
        >
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            backgroundColor: "#0e2954",
            color: "#b7edf6",
            border: "1px solid rgba(183, 237, 246, 0.3)",
            borderRadius: "8px",
            padding: "0.75rem 2rem",
            fontSize: "0.95rem",
            textDecoration: "none",
          }}
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
