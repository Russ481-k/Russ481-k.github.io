export default function LangLoading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "3px solid rgba(183, 237, 246, 0.15)",
          borderTopColor: "#b7edf6",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p
        style={{
          marginTop: "1.5rem",
          color: "#adb5bd",
          fontSize: "0.95rem",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        Loading...
      </p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
