export default function SummaryPanel({ summary }) {
  if (!summary) {
    return <div className="bg-white p-4 rounded shadow text-gray-500">No summary yet</div>;
  }

  const percentValid = Math.round((summary.valid / summary.total) * 100);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Summary</h3>
      <div className="text-sm space-y-2">
        <div>Total fields: <strong>{summary.total}</strong></div>
        <div>Valid: <strong>{summary.valid}</strong></div>
        <div>Errors: <strong className="text-red-600">{summary.errors}</strong></div>
        <div>Needs review: <strong>{summary.review}</strong></div>
      </div>

      <div className="mt-4">
        <div className="w-full bg-gray-200 h-2 rounded">
          <div className="h-2 rounded bg-green-400" style={{ width: `${percentValid}%` }} />
        </div>
        <div className="text-xs text-gray-500 mt-1">{percentValid}% valid</div>
      </div>
    </div>
  );
}
