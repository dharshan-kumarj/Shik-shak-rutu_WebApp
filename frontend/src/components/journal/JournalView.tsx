import { useState, useEffect, type MouseEvent } from 'react';
import toast from 'react-hot-toast';

const MOCK_ENTRIES = [
  {
    id: "j1", date: "2026-04-08", dayBadge: "Week 1",
    title: "First Chemical Equations Class", mood: "😊",
    wentWellPreview: "Students enjoyed the bead activity for balancing equations...",
    tags: ["#Class10", "#Science", "#ChemicalReactions"],
    wentWell: "Students really enjoyed the colored bead activity for balancing chemical equations. Using blue beads for H and red for O made it click visually. 28 out of 35 students could balance H₂ + O₂ → H₂O correctly by the end of class.",
    improve: "I spent too long on the bead activity and couldn't cover the homework problems. Need to time-manage better — 15 mins max for hands-on activities.",
    studentResponse: "Very engaged. The quiet students in the back row also participated actively. Two students asked if we could do bead activities every day!"
  },
  {
    id: "j2", date: "2026-04-15", dayBadge: "Week 2",
    title: "Redox Reactions — OIL RIG", mood: "😐",
    wentWellPreview: "The OIL RIG mnemonic helped but some students still confused...",
    tags: ["#Class10", "#Science", "#Redox"],
    wentWell: "The OIL RIG (Oxidation Is Loss, Reduction Is Gain) mnemonic story worked well. Students remembered the concept during the quick quiz — 22/35 got it right.",
    improve: "Need more practice problems. Students struggled when asked to identify both oxidation and reduction happening simultaneously in the same reaction.",
    studentResponse: "Some students said 'Ma'am, if both are happening together, how do we write them separately?' This showed me they were thinking deeply but needed more scaffolding."
  },
  {
    id: "j3", date: "2026-04-25", dayBadge: "Week 3",
    title: "pH Scale Confusion Cleared", mood: "😊",
    wentWellPreview: "Using the number line analogy for pH scale was effective...",
    tags: ["#Class10", "#Science", "#AcidsBases"],
    wentWell: "The number line analogy for pH scale worked brilliantly. I drew a horizontal line with 0-14 and color-coded red (acids, 0-6), green (neutral, 7), blue (bases, 8-14). Students could instantly tell which direction was acidic vs basic.",
    improve: "I should have prepared more household substances for testing. Only brought lemon, soap, and vinegar. Next time I'll bring baking soda, orange juice, and shampoo too.",
    studentResponse: "One student asked 'Ma'am, is our blood acidic or basic?' — led to a great discussion about pH in daily life. This curiosity was wonderful to see."
  },
  {
    id: "j4", date: "2026-05-10", dayBadge: "Week 5",
    title: "Metals Reactivity Demo", mood: "😊",
    wentWellPreview: "The sodium-water demo was a hit! Students were awestruck...",
    tags: ["#Class10", "#Science", "#Metals"],
    wentWell: "The sodium reaction with water demonstration was spectacular! Students were completely focused. The reactivity series ladder story (K > Na > Ca > Mg > Al > Zn > Fe > Pb > H > Cu > Hg > Ag > Au) with the 'KNaCaMgAlZnFePbHCuHgAgAu' mnemonic really helped.",
    improve: "Safety briefing could have been more thorough. Though I took all precautions, I should emphasize safety goggles more strongly before demos.",
    studentResponse: "Students were fascinated. 'Ma'am, can we try sodium at home?' — had to explain why that's extremely dangerous. This led to a good discussion about lab safety."
  },
  {
    id: "j5", date: "2026-06-05", dayBadge: "Week 8",
    title: "Carbon Bonding — Model Kit Magic", mood: "😊",
    wentWellPreview: "Using molecular model kits for carbon compounds was transformative...",
    tags: ["#Class10", "#Science", "#Carbon"],
    wentWell: "The molecular model kits were transformative. Students built methane (CH₄), ethane (C₂H₆), and even tried ethene (C₂H₄) with double bonds. Physically connecting the atoms made covalent bonding concrete.",
    improve: "Need more model kits — groups of 5 were too large, some students were passive observers. Ideally groups of 3 with one kit each.",
    studentResponse: "Students didn't want to stop! 'Ma'am, 5 more minutes please!' A group of girls built C₆H₆ (benzene) ring structure on their own. This self-directed learning was amazing to witness."
  },
  {
    id: "j6", date: "2026-06-22", dayBadge: "Week 10",
    title: "Photosynthesis — Starch Test Lab", mood: "😊",
    wentWellPreview: "The variegated leaf starch test proved chlorophyll's role visually...",
    tags: ["#Class10", "#Science", "#LifeProcesses"],
    wentWell: "The variegated leaf starch test experiment was perfectly timed. Students saw white parts (no chlorophyll) → no starch, green parts (chlorophyll present) → starch present. The 'aha' moment was unforgettable.",
    improve: "Setup took longer than expected — the alcohol bath and boiling water bath preparation ate into observation time. Will prep everything before class next time.",
    studentResponse: "Students were amazed. 'So the white parts didn't do photosynthesis at all!' The visual proof was much more powerful than any diagram. Several students drew detailed diagrams in their notebooks."
  }
];

const JournalView = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeEntry, setActiveEntry] = useState<any | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEntries(MOCK_ENTRIES);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayback = (e: MouseEvent) => {
    e.stopPropagation();
    toast.success("▶️ Audio reflection is being generated from your journal entry...");
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading journal...</div>;

  if (activeEntry) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <button onClick={() => setActiveEntry(null)} className="text-[var(--color-primary)] font-medium mb-4 flex items-center gap-2 hover:underline">
          &larr; Back to Journal
        </button>
        <div className="card shadow-md">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium bg-orange-100 text-[var(--color-accent)] px-3 py-1 rounded">{activeEntry.dayBadge}</span>
            <span className="text-gray-500 text-sm">{activeEntry.date}</span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)] flex items-center gap-2 mb-6">
            {activeEntry.mood} {activeEntry.title}
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">What went well</h3>
              <p className="text-gray-800 bg-green-50 p-3 rounded-md border border-green-100">{activeEntry.wentWell}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">What to improve</h3>
              <p className="text-gray-800 bg-red-50 p-3 rounded-md border border-red-100">{activeEntry.improve}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Students' response</h3>
              <p className="text-gray-800 bg-blue-50 p-3 rounded-md border border-blue-100">{activeEntry.studentResponse}</p>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
            <button onClick={(e) => handlePlayback(e)} className="btn-primary flex items-center gap-2">
              ▶ Play Audio Reflection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[var(--color-primary)]">My Teaching Journal</h2>
        <button className="btn-primary"> + New Entry</button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <span className="px-3 py-1 bg-[var(--color-primary)] text-white rounded-full text-sm cursor-pointer">All Dates</span>
        <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm cursor-pointer hover:bg-gray-50">😄 Happy</span>
        <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm cursor-pointer hover:bg-gray-50">😐 Mixed</span>
        <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm cursor-pointer hover:bg-gray-50">#Science</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entries.map((entry) => (
          <div key={entry.id} onClick={() => setActiveEntry(entry)} className="card flex flex-col h-full hover:border-[var(--color-primary)] border border-transparent transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-medium bg-orange-100 text-[var(--color-accent)] px-2 py-1 rounded">{entry.dayBadge}</span>
              <span className="text-gray-500 text-sm">{entry.date}</span>
            </div>
            <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
              {entry.mood} {entry.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
              {entry.wentWellPreview}
            </p>
            <div className="flex flex-wrap gap-1 mb-4">
              {entry.tags.map((tag: string) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{tag}</span>
              ))}
            </div>
            <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-auto">
              <span className="text-[var(--color-primary)] text-sm font-medium">View Full Entry</span>
              <button onClick={(e) => handlePlayback(e)} className="text-[var(--color-accent)] text-sm font-medium hover:underline flex items-center gap-1">
                ▶ Playback
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalView;
