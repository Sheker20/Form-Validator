export default function ResultsPanel({ results }) {
  if (!Array.isArray(results) || results.length === 0) {
    return <div>No validation results yet.</div>;
  }

  return (
    <div>
      {results.map((res, idx) => (
        <div key={idx}>
          <strong>{res.message}</strong>
          <br />
          <em>{res.suggestion}</em>
        </div>
      ))}
    </div>
  );
}
