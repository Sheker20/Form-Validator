export default function SummaryPanel({ results }) {
  if (!Array.isArray(results) || results.length === 0) {
    return <div>No summary available.</div>;
  }

  const summary = results.reduce(
    (acc, cur) => {
      acc[cur.type] = (acc[cur.type] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <div>
      <h3>Summary</h3>
      <ul>
        {Object.entries(summary).map(([type, count]) => (
          <li key={type}>
            {type}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
}
