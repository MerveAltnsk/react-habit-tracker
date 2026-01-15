function StatsBar({ total, completed, remaining, skor }) {
  return (
    <div style={{ 
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      marginBottom: "20px",
      display: "flex",
      gap: "20px"
    }}>
      <div>📋 Total: <strong>{total}</strong></div>
      <div>✅ Completed: <strong>{completed}</strong></div>
      <div>⏳ Remaining: <strong>{remaining}</strong></div>
      <div>⭐ Score: <strong>{skor}</strong></div>
    </div>
  );
}

export default StatsBar;
