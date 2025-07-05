const features = [
  {
    title: 'Multi-Grade Lesson Plans',
    desc: 'Generate content tailored for multiple grades from a single input.',
  },
  {
    title: 'AI Personalization',
    desc: 'Adapts explanations to different student levels.',
  },
  {
    title: 'Local Language Support',
    desc: 'Translate lessons into regional languages.',
  },
];

export default function Features() {
  return (
    <section className="bg-white py-16 px-6">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">Key Features</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="bg-indigo-50 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
