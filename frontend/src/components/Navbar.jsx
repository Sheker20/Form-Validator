export default function Navbar({ onExport, exportDisabled }) {
  return (
    <div className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <div className="font-semibold text-lg">CMS-1500 Form Validator</div>
      <div className="flex items-center gap-3">
        <button
          onClick={onExport}
          disabled={exportDisabled}
          className={`px-3 py-1 rounded ${exportDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-white text-blue-700"}`}
        >
          Export Validation JSON
        </button>
      </div>
    </div>
  );
}
