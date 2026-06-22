import { useState, type FormEvent } from 'react';
import { DEMO_PLANS, CLASS_SUBJECT_OPTIONS, type AcademicPlan } from '../../data/academicPlannerData';
import { ClipboardList, BookOpen, AlertTriangle, Lightbulb, FileText, RefreshCw, ChevronDown, ChevronRight, CheckCircle, Clock, AlertCircle, BarChart3, Plus, GraduationCap, Target, Calendar, Layers } from 'lucide-react';
import toast from 'react-hot-toast';

type TabId = 'plan' | 'difficulties' | 'strategies' | 'assessments' | 'revision';

const AcademicPlannerView = () => {
  const [plans, setPlans] = useState<AcademicPlan[]>([]);
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('plan');
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const [formClass, setFormClass] = useState('Class 10');
  const [formSubject, setFormSubject] = useState('Science');
  const [formBoard, setFormBoard] = useState('CBSE');
  const [formPeriods, setFormPeriods] = useState(6);

  const activePlan = plans.find(p => p.id === activePlanId) || null;

  const handleGenerate = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const match = CLASS_SUBJECT_OPTIONS.find(
        opt => opt.className === formClass && opt.subject === formSubject && opt.board === formBoard
      );
      const foundPlan = match?.planId ? DEMO_PLANS.find(p => p.id === match.planId) : null;

      if (foundPlan) {
        const exists = plans.find(p => p.id === foundPlan.id);
        if (!exists) {
          setPlans(prev => [...prev, foundPlan]);
        }
        setActivePlanId(foundPlan.id);
        toast.success(`AI Academic Plan generated for ${foundPlan.className} ${foundPlan.subject}!`);
      } else {
        const defaultPlan = DEMO_PLANS[0];
        const exists = plans.find(p => p.id === defaultPlan.id);
        if (!exists) {
          setPlans(prev => [...prev, defaultPlan]);
        }
        setActivePlanId(defaultPlan.id);
        toast.success(`Showing demo plan for ${defaultPlan.className} ${defaultPlan.subject}`, { icon: 'ℹ️' });
      }
      setLoading(false);
    }, 1500);
  };

  const addNewPlan = () => {
    setActivePlanId(null);
    setActiveTab('plan');
  };

  const switchPlan = (planId: string) => {
    setActivePlanId(planId);
    setExpandedChapter(null);
    setExpandedTopic(null);
  };

  const getDifficultyColor = (d: string) => {
    if (d === 'Easy') return 'bg-green-100 text-green-700';
    if (d === 'Medium') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getStatusIcon = (s: string) => {
    if (s === 'completed') return <CheckCircle size={16} className="text-green-500 shrink-0" />;
    if (s === 'in-progress') return <Clock size={16} className="text-blue-500 shrink-0" />;
    return <AlertCircle size={16} className="text-gray-300 shrink-0" />;
  };

  const getStatusBadge = (s: string) => {
    if (s === 'completed') return <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Completed</span>;
    if (s === 'in-progress') return <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">In Progress</span>;
    return <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">Pending</span>;
  };

  if (!activePlan) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList size={32} className="text-[var(--color-primary)]" />
            </div>
            <h1 className="text-3xl font-bold text-[var(--color-primary)]">AI Academic Planner</h1>
            <p className="text-gray-600 mt-2">Generate a complete day-by-day teaching plan for the entire academic year</p>
          </div>

          {plans.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm font-medium text-[var(--color-accent)] mb-3">Your Saved Plans</p>
              <div className="flex flex-wrap gap-3">
                {plans.map(p => (
                  <button key={p.id} onClick={() => switchPlan(p.id)} className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium hover:border-[var(--color-primary)] transition-colors flex items-center gap-2">
                    <BookOpen size={14} className="text-[var(--color-primary)]" />
                    {p.className} {p.subject} ({p.board})
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleGenerate} className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Target size={20} className="text-[var(--color-primary)]" />
              Teacher Setup
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class / Grade</label>
                <select value={formClass} onChange={e => setFormClass(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white">
                  {['Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select value={formSubject} onChange={e => setFormSubject(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white">
                  {['Science','Mathematics','English','Social Studies','Hindi','Sanskrit'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Board / Curriculum</label>
                <select value={formBoard} onChange={e => setFormBoard(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white">
                  {['CBSE','State Board','ICSE'].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teaching Periods / Week</label>
                <input type="number" value={formPeriods} onChange={e => setFormPeriods(Number(e.target.value))} min={1} max={10} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 flex items-start gap-3">
              <Layers size={18} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800 mb-1">Academic Year: 2026-27</p>
                <p>AI will distribute {formSubject} syllabus for {formClass} ({formBoard}) across {formPeriods} periods per week. Available demo plans: Class 10 Science (10 chapters) and Class 5 Maths (6 chapters).</p>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-base disabled:opacity-70">
              {loading ? (
                <><RefreshCw size={18} className="animate-spin" /> Generating AI Plan...</>
              ) : (
                <><ClipboardList size={18} /> Generate AI Academic Plan</>
              )}
            </button>
          </form>

          <div className="text-center text-xs text-gray-400">
            AI analyzes syllabus weightage, topic complexity, exam patterns &amp; available teaching hours
          </div>
        </div>
      </div>
    );
  }

  const tabs: { id: TabId; label: string; icon: typeof ClipboardList }[] = [
    { id: 'plan', label: 'Academic Plan', icon: ClipboardList },
    { id: 'difficulties', label: 'Student Difficulties', icon: AlertTriangle },
    { id: 'strategies', label: 'Teaching Strategies', icon: Lightbulb },
    { id: 'assessments', label: 'Assessments', icon: FileText },
    { id: 'revision', label: 'Revision Plan', icon: RefreshCw },
  ];

  return (
    <div className="space-y-6">
      {/* Plan Info Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
              <GraduationCap size={24} className="text-[var(--color-primary)]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--color-primary)]">{activePlan.className} {activePlan.subject}</h1>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{activePlan.board}</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">{activePlan.academicYear}</span>
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">{activePlan.periodsPerWeek} periods/week</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">Section {activePlan.section}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {plans.length > 1 && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-500">Switch:</span>
                <select value={activePlanId!} onChange={e => switchPlan(e.target.value)} className="text-sm border border-gray-300 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] bg-white">
                  {plans.map(p => (
                    <option key={p.id} value={p.id}>{p.className} {p.subject}</option>
                  ))}
                </select>
              </div>
            )}
            <button onClick={addNewPlan} className="text-sm flex items-center gap-1.5 text-[var(--color-primary)] font-medium hover:underline">
              <Plus size={16} /> New Plan
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Chapters</span>
            <BookOpen size={18} className="text-[var(--color-primary)]" />
          </div>
          <p className="text-2xl font-bold text-[var(--color-primary)]">{activePlan.chapters.length}</p>
          <p className="text-xs text-gray-500 mt-1">Across {activePlan.subject}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Topics</span>
            <ClipboardList size={18} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{activePlan.progress.completedTopics}/{activePlan.progress.totalTopics}</p>
          <p className="text-xs text-gray-500 mt-1">{activePlan.progress.inProgressTopics} in progress</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Assessments</span>
            <FileText size={18} className="text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-orange-600">{activePlan.assessments.length} total</p>
          <p className="text-xs text-gray-500 mt-1">{activePlan.progress.completedAssessments} completed</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Progress</span>
            <BarChart3 size={18} className="text-green-500" />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-green-600">{activePlan.progress.completionPercentage}%</p>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${activePlan.progress.completionPercentage}%` }}></div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 md:px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 shrink-0 ${
                isActive ? 'border-[var(--color-accent)] text-[var(--color-primary)]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}>
                <Icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        <div className="p-4 md:p-6">
          {/* TAB: Academic Plan */}
          {activeTab === 'plan' && (
            <div className="space-y-4">
              {activePlan.chapters.map(ch => (
                <div key={ch.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => setExpandedChapter(expandedChapter === ch.id ? null : ch.id)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(ch.status)}
                      <div className="text-left">
                        <span className="font-semibold text-gray-800">{ch.name}</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {getStatusBadge(ch.status)}
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getDifficultyColor(ch.difficulty)}`}>{ch.difficulty}</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{ch.marksDistribution} marks</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Weightage: {ch.weightage}%</span>
                        </div>
                      </div>
                    </div>
                    {expandedChapter === ch.id ? <ChevronDown size={18} className="text-gray-400 shrink-0" /> : <ChevronRight size={18} className="text-gray-400 shrink-0" />}
                  </button>

                  {expandedChapter === ch.id && (
                    <div className="border-t border-gray-100 bg-gray-50">
                      {ch.topics.map(t => (
                        <div key={t.id}>
                          <button onClick={() => setExpandedTopic(expandedTopic === t.id ? null : t.id)} className="w-full flex items-center justify-between px-4 md:px-6 py-3 hover:bg-white transition-colors border-b border-gray-100 last:border-0">
                            <div className="flex items-center gap-3 min-w-0">
                              {getStatusIcon(t.status)}
                              <div className="text-left min-w-0">
                                <span className="font-medium text-gray-800 text-sm">{t.name}</span>
                                <div className="flex flex-wrap gap-1.5 mt-0.5">
                                  {getStatusBadge(t.status)}
                                  <span className="text-xs text-gray-500">{t.periodsRequired} period{t.periodsRequired > 1 ? 's' : ''}</span>
                                  <span className="text-xs text-gray-500">Due: {t.completionDate}</span>
                                </div>
                              </div>
                            </div>
                            {expandedTopic === t.id ? <ChevronDown size={14} className="text-gray-400 shrink-0" /> : <ChevronRight size={14} className="text-gray-400 shrink-0" />}
                          </button>

                          {expandedTopic === t.id && (
                            <div className="px-4 md:px-6 py-4 bg-white border-b border-gray-100">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Subtopics</h4>
                                  <ul className="space-y-1">
                                    {t.subtopics.map((st, i) => (
                                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-1.5 shrink-0"></span>
                                        {st}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Learning Objectives</h4>
                                  <ul className="space-y-1">
                                    {t.learningObjectives.map((lo, i) => (
                                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                        <Target size={12} className="text-[var(--color-primary)] mt-1 shrink-0" />
                                        {lo}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB: Student Difficulties */}
          {activeTab === 'difficulties' && (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">AI-Predicted Student Challenges</p>
                  <p className="text-xs text-red-600 mt-1">Based on topic complexity, historical data, and common misconceptions for {activePlan.className} {activePlan.subject}</p>
                </div>
              </div>

              {activePlan.chapters.filter(ch => ch.topics.some(t => t.studentDifficulties.length > 0)).map(ch => (
                <div key={ch.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800 text-sm">{ch.name}</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {ch.topics.filter(t => t.studentDifficulties.length > 0).map(t => (
                      <div key={t.id} className="p-4">
                        <h4 className="font-medium text-gray-800 text-sm mb-3">{t.name}</h4>
                        <div className="space-y-3">
                          {t.studentDifficulties.map((d, i) => (
                            <div key={i} className="bg-red-50/50 border border-red-100 rounded-lg p-3">
                              <div className="flex items-start gap-2">
                                <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-red-800">{d.area}</p>
                                  <p className="text-xs text-red-600 mt-1">
                                    <span className="font-medium">Why?</span> {d.reason}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: Teaching Strategies */}
          {activeTab === 'strategies' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-start gap-3">
                <Lightbulb size={20} className="text-yellow-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">AI-Recommended Teaching Strategies</p>
                  <p className="text-xs text-yellow-700 mt-1">Best approaches for each difficult concept — visual, activity-based, experiments, and real-life connections</p>
                </div>
              </div>

              {activePlan.chapters.map(ch => (
                <div key={ch.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 text-sm">{ch.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getDifficultyColor(ch.difficulty)}`}>{ch.difficulty}</span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {ch.topics.filter(t => t.teachingStrategies.length > 0).map(t => (
                      <div key={t.id} className="p-4">
                        <h4 className="font-medium text-gray-800 text-sm mb-2">{t.name}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {t.teachingStrategies.map((s, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-lg p-3 hover:border-[var(--color-primary)] transition-colors">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-xs font-bold bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-2 py-0.5 rounded-full">{s.type}</span>
                              </div>
                              <p className="text-sm text-gray-700">{s.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: Assessments */}
          {activeTab === 'assessments' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                <Calendar size={20} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">AI-Scheduled Assessments</p>
                  <p className="text-xs text-blue-600 mt-1">Tests are automatically allocated based on syllabus completion, exam schedule, and chapter difficulty</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>
                <div className="space-y-6">
                  {activePlan.assessments.map((a) => (
                    <div key={a.id} className="relative pl-0 md:pl-12">
                      <div className="hidden md:block absolute left-2.5 top-2 w-3 h-3 rounded-full bg-white border-2 border-[var(--color-primary)]"></div>
                      <div className={`border rounded-lg p-4 ${a.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                              a.type === 'Unit Test' ? 'bg-purple-100 text-purple-700' :
                              a.type === 'Half-Yearly Exam' ? 'bg-blue-100 text-blue-700' :
                              a.type === 'Pre-Board Exam' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>{a.type}</span>
                            <h3 className="font-semibold text-gray-800 text-sm">{a.title}</h3>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar size={12} />
                            <span>{a.scheduledDate}</span>
                            <span className="font-medium text-[var(--color-primary)]">Weightage: {a.weightage}%</span>
                            {a.status === 'completed' && <span className="text-green-600 font-medium">✓ Completed</span>}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {a.chaptersCovered.map(ch => (
                            <span key={ch} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{ch}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: Revision Plan */}
          {activeTab === 'revision' && (
            <div className="space-y-6">
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <RefreshCw size={20} className="text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-orange-800">AI-Generated Revision Plan</p>
                    <p className="text-xs text-orange-600 mt-1">Designed for exam preparation — focuses on high-weightage chapters and frequently tested concepts</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                  <div className="bg-white rounded-lg p-3 border border-orange-200">
                    <p className="text-xs text-gray-500">Start Date</p>
                    <p className="font-bold text-gray-800 text-sm">{activePlan.revisionPlan.startDate}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-orange-200">
                    <p className="text-xs text-gray-500">End Date</p>
                    <p className="font-bold text-gray-800 text-sm">{activePlan.revisionPlan.endDate}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-orange-200">
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-bold text-gray-800 text-sm">{activePlan.revisionPlan.dailySchedule.length} days</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-orange-200">
                    <p className="text-xs text-gray-500">Chapters</p>
                    <p className="font-bold text-gray-800 text-sm">{activePlan.chapters.length}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <AlertTriangle size={14} className="text-orange-500" /> High Weightage
                  </h3>
                  <ul className="space-y-2">
                    {activePlan.revisionPlan.highWeightageChapters.map((item, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <Target size={14} className="text-blue-500" /> Frequently Tested
                  </h3>
                  <ul className="space-y-2">
                    {activePlan.revisionPlan.frequentlyTestedConcepts.map((item, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <AlertCircle size={14} className="text-red-500" /> Focus Areas
                  </h3>
                  <ul className="space-y-2">
                    {activePlan.revisionPlan.studentFocusAreas.map((item, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800 text-sm">Day-by-Day Revision Schedule</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {activePlan.revisionPlan.dailySchedule.map((day, i) => (
                    <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-2 py-0.5 rounded-full">{day.dayLabel}</span>
                          <span className="text-xs text-gray-500">{day.date}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {day.chapters.map(ch => (
                            <span key={ch} className={`text-xs px-2 py-0.5 rounded-full ${
                              activePlan.revisionPlan.highWeightageChapters.some(h => h.startsWith(ch.split(' ')[0])) 
                                ? 'bg-orange-100 text-orange-700 font-medium' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>{ch}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {day.topics.map((t, j) => (
                          <span key={j} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Activities: </span>
                        {day.activities.join(' • ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicPlannerView;
