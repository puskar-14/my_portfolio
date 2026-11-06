import React, { useState } from 'react';
import { skillsData } from '../data/skills';
import { 
  Code2, 
  ArrowLeft, 
  Sparkles, 
  Monitor 
} from 'lucide-react';
import { soundManager } from '../utils/audio';

const codeSnippets = {
  python: {
    lang: "Python / FastAPI",
    code: `@app.get("/api/v1/analytics/sentiment")
async def get_sentiment_summary(sku: str, db: AsyncSession = Depends(get_db)):
    """ShopSense customer insight aggregator"""
    query = select(Review).where(Review.product_sku == sku)
    results = await db.execute(query)
    sentiment_score = analyze_sentiment_stream(results.scalars().all())
    return {"sku": sku, "score": sentiment_score, "status": "optimal"}`
  },
  java: {
    lang: "Java (DSA Pattern)",
    code: `public class LRUCache {
    // 250+ LeetCode DSA benchmark implementation
    private final int capacity;
    private final Map<Integer, Node> map = new HashMap<>();
    private final Node head = new Node(0, 0), tail = new Node(0, 0);

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        insert(node);
        return node.value;
    }
}`
  },
  react: {
    lang: "React / Vite Hook",
    code: `export function useCorridorNavigation(totalDoors = 6) {
  const [activeDoor, setActiveDoor] = useState(0);
  const [isEntering, setIsEntering] = useState(false);

  const glideToDoor = useCallback((doorIndex) => {
    setActiveDoor(doorIndex);
    soundManager.playDoorOpen();
  }, []);

  return { activeDoor, glideToDoor, isEntering };
}`
  },
  sql: {
    lang: "PostgreSQL Analytics Query",
    code: `SELECT 
    p.sku, 
    p.name,
    COUNT(r.id) AS total_reviews,
    ROUND(AVG(r.rating)::numeric, 2) AS avg_rating,
    SUM(CASE WHEN r.sentiment = 'POSITIVE' THEN 1 ELSE 0 END) * 100 / COUNT(r.id) AS satisfaction_rate
FROM products p
LEFT JOIN reviews r ON p.id = r.product_id
GROUP BY p.sku, p.name
HAVING COUNT(r.id) > 10
ORDER BY satisfaction_rate DESC;`
  }
};

export function SkillsRoom({ onBackToHallway, onNavigateRoom }) {
  const [selectedSnippet, setSelectedSnippet] = useState('python');

  return (
    <div className="relative w-full max-w-5xl mx-auto my-6 p-6 sm:p-10 bg-[#FAF7F2] sketch-card text-[#3C3630] animate-fadeIn">
      {/* Top Bar with Room Tag & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#3C3630]/20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playDoorOpen();
              onBackToHallway();
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#E0D4FC] hover:bg-[#C4B5FD] border border-[#3C3630] sketch-btn transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Exit to Hallway
          </button>
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-[#F3E8FF] text-[#6B21A8] border border-[#D8B4FE]">
            Door 02 • Pastel Purple
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => onNavigateRoom('education')}
            className="px-2.5 py-1 rounded bg-[#C2DBFE] hover:bg-[#93C5FD] border border-[#3C3630] font-medium cursor-pointer"
          >
            ← Education
          </button>
          <button
            onClick={() => onNavigateRoom('projects')}
            className="px-2.5 py-1 rounded bg-[#FFDBC2] hover:bg-[#FED7AA] border border-[#3C3630] font-medium cursor-pointer"
          >
            Projects →
          </button>
        </div>
      </div>

      {/* Room Hero / Visual Concept: The Hacker's Atelier & Coding Workspace */}
      <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#F5F0FF] to-[#E5D9FC] border-2 border-[#3C3630] shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#3C3630]/30 text-xs font-bold text-[#6B21A8] mb-3">
              <Monitor className="w-3.5 h-3.5" /> Creative Programming Workspace
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#4C1D95] tracking-tight">
              Technical Arsenal & Skills
            </h1>
            <p className="text-base sm:text-lg text-[#6D28D9] font-medium mt-1">
              Java • Python • C • React • FastAPI • PostgreSQL • SQL • Git
            </p>
            <p className="text-xs sm:text-sm text-[#5B21B6] mt-3 leading-relaxed">
              Where algorithms meet scalable architecture and interactive user interfaces.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/90 border border-[#3C3630]/30 text-center shrink-0">
            <div className="w-12 h-12 rounded-full bg-[#E0D4FC] border border-[#3C3630] flex items-center justify-center mx-auto mb-2 text-[#6B21A8]">
              <Code2 className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#6B21A8]">Stack Breadth</p>
            <p className="text-xs text-[#581C87] mt-0.5 font-mono">Full-Stack & Backend</p>
          </div>
        </div>
      </div>

      {/* Narrative */}
      <div className="my-6 p-4 rounded-xl bg-[#FFFDF9] border border-[#3C3630]/30 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm italic font-hand text-base text-[#4C1D95] leading-relaxed">
          "{skillsData.narrative}"
        </p>
      </div>

      {/* Interactive Code Workbench / Live Terminal Preview */}
      <div className="mb-8 rounded-2xl bg-[#1E1E2E] border-2 border-[#3C3630] shadow-md overflow-hidden text-slate-200">
        <div className="px-4 py-3 bg-[#181825] border-b border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F87171]" />
            <div className="w-3 h-3 rounded-full bg-[#FBBF24]" />
            <div className="w-3 h-3 rounded-full bg-[#34D399]" />
            <span className="text-xs font-mono text-slate-400 ml-2">
              puskar@workspace:~/code-samples
            </span>
          </div>

          {/* Code Tabs */}
          <div className="flex items-center gap-1.5">
            {Object.keys(codeSnippets).map((key) => (
              <button
                key={key}
                onClick={() => {
                  soundManager.playHover();
                  setSelectedSnippet(key);
                }}
                className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer transition-colors ${
                  selectedSnippet === key
                    ? 'bg-[#E0D4FC] text-[#3C3630] font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {codeSnippets[key].lang}
              </button>
            ))}
          </div>
        </div>

        {/* Code Content */}
        <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono overflow-x-auto text-[#CDD6F4] leading-relaxed">
          <code>{codeSnippets[selectedSnippet].code}</code>
        </pre>
      </div>

      {/* Skill Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillsData.categories.map((category, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border border-[#3C3630]/25 shadow-xs hover:border-[#8B5CF6] transition-colors"
          >
            <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#F1F5F9]">
              <h3 className="text-base font-bold text-[#2A241F]">{category.name}</h3>
              <span
                className="w-3 h-3 rounded-full border border-[#3C3630]"
                style={{ backgroundColor: category.pastel }}
              />
            </div>
            <p className="text-xs text-[#70675D] mb-4">{category.description}</p>

            <div className="space-y-3">
              {category.skills.map((skill, sIdx) => (
                <div key={sIdx} className="p-3 rounded-xl bg-[#FAF7F2] border border-[#3C3630]/15">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs sm:text-sm font-bold text-[#1E293B]">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#E0D4FC] text-[#581C87]">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] mb-2">{skill.experience}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-[10px] rounded bg-white border border-[#E2E8F0] text-[#475569] font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
