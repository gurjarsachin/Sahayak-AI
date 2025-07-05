export default function ContentOutput({ content }: { content: string }) {
  if (!content) return null;

  return (
    <div className="mt-6 p-4 bg-white border rounded-md shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-indigo-700">Generated Content</h3>
      <p className="text-gray-800 whitespace-pre-line">{content}</p>
    </div>
  );
}
