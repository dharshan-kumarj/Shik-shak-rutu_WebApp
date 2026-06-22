import { useState, useEffect } from 'react';

const MOCK_RESOURCES = [
  {
    id: "r1", title: "Chemical Reactions — Balancing Equations", subject: "Science", grade: "Class 10",
    type: "Interactive", duration: "20 mins", difficulty: "Beginner",
    dikshaUrl: "https://diksha.gov.in/explore?subject=Science&grade=10&q=balancing+chemical+equations",
    description: "Step-by-step interactive module on balancing chemical equations with practice problems"
  },
  {
    id: "r2", title: "pH Scale & Indicators — Lab Manual", subject: "Science", grade: "Class 10",
    type: "PDF", duration: "15 pages", difficulty: "Beginner",
    dikshaUrl: "https://diksha.gov.in/explore?subject=Science&grade=10&q=pH+scale+indicators",
    description: "NCERT-aligned lab manual with turmeric, litmus, and universal indicator experiments"
  },
  {
    id: "r3", title: "Life Processes — Human Digestive System", subject: "Science", grade: "Class 10",
    type: "Video", duration: "12 mins", difficulty: "Intermediate",
    dikshaUrl: "https://diksha.gov.in/explore?subject=Science&grade=10&q=human+digestive+system",
    description: "Animated video explaining the complete digestive system with 3D visuals"
  },
  {
    id: "r4", title: "Carbon Compounds — Model Building Kit Guide", subject: "Science", grade: "Class 10",
    type: "PDF", duration: "8 pages", difficulty: "Advanced",
    dikshaUrl: "https://diksha.gov.in/explore?subject=Science&grade=10&q=carbon+compounds+models",
    description: "Teacher guide for using molecular model kits to teach covalent bonding and hydrocarbons"
  },
  {
    id: "r5", title: "Light — Mirror Formula Numericals", subject: "Science", grade: "Class 10",
    type: "Interactive", duration: "25 mins", difficulty: "Advanced",
    dikshaUrl: "https://diksha.gov.in/explore?subject=Science&grade=10&q=mirror+formula+numericals",
    description: "Practice module with 20 mirror formula numericals — step-by-step solutions with sign convention"
  },
  {
    id: "r6", title: "Fractions — Pizza Activity Lesson Plan", subject: "Mathematics", grade: "Class 5",
    type: "Lesson Plan", duration: "40 mins", difficulty: "Beginner",
    dikshaUrl: "https://diksha.gov.in/explore?subject=Mathematics&grade=5&q=fractions+pizza+activity",
    description: "Complete lesson plan with pizza-cutting activity, worksheets, and assessment rubric"
  },
  {
    id: "r7", title: "Area & Perimeter — Grid Paper Activities", subject: "Mathematics", grade: "Class 5",
    type: "Interactive", duration: "30 mins", difficulty: "Intermediate",
    dikshaUrl: "https://diksha.gov.in/explore?subject=Mathematics&grade=5&q=area+perimeter+grid",
    description: "Hands-on grid paper activities to teach area of rectangles, squares, and irregular shapes"
  },
  {
    id: "r8", title: "NCERT Science Textbook — Class 10 PDF", subject: "Science", grade: "Class 10",
    type: "PDF", duration: "Full Book", difficulty: "Beginner",
    dikshaUrl: "https://diksha.gov.in/explore?subject=Science&grade=10&q=NCERT+textbook",
    description: "Official NCERT Science textbook for Class 10 — full PDF with all chapters"
  }
];

const ResourcesView = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResources(MOCK_RESOURCES);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading resources...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-100 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-lg shrink-0">📚</div>
          <div>
            <p className="text-sm font-bold text-[var(--color-accent)] mb-1">Curated from DIKSHA — India's Digital Education Platform</p>
            <p className="text-gray-700 text-sm">Resources recommended based on your academic plan. Click any resource to open it directly on DIKSHA.</p>
            <a href="https://diksha.gov.in" target="_blank" rel="noreferrer" className="text-xs text-[var(--color-primary)] font-medium hover:underline inline-flex items-center gap-1 mt-1">
              Visit DIKSHA Portal ↗
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[var(--color-primary)]">DIKSHA Resource Shelf</h2>
        <span className="text-sm text-gray-500">{resources.length} resources</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => (
          <div key={res.id} className="card p-0 overflow-hidden flex flex-col h-full border border-gray-200 hover:shadow-md transition-shadow">
            <div className="h-32 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)]/80 relative flex items-center justify-center text-white">
              <span className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded">DIKSHA</span>
              <span className="text-4xl opacity-30">
                {res.type === 'Video' ? '🎥' : res.type === 'Interactive' ? '🖥️' : res.type === 'Lesson Plan' ? '📋' : '📄'}
              </span>
              <span className="absolute bottom-2 left-2 text-xs bg-black/20 px-2 py-0.5 rounded">{res.type}</span>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-bold text-md leading-tight mb-2">{res.title}</h3>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{res.description}</p>
              <div className="text-xs text-gray-500 mb-3 space-x-2">
                <span className="bg-gray-100 px-2 py-1 rounded">{res.subject}</span>
                <span className="bg-gray-100 px-2 py-1 rounded">{res.grade}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600 mb-4 mt-auto">
                <span className="flex items-center gap-1">⏱ {res.duration}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  res.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                  res.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>{res.difficulty}</span>
              </div>
              <a 
                href={res.dikshaUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-outline text-center w-full block text-sm py-2"
              >
                Open in DIKSHA ↗
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-500">
          Powered by <a href="https://diksha.gov.in" target="_blank" rel="noreferrer" className="text-[var(--color-primary)] font-medium hover:underline">DIKSHA</a> — National Digital Education Architecture (NDEAR) compliant.
          All resources are aligned to NCERT curriculum.
        </p>
      </div>
    </div>
  );
};

export default ResourcesView;
