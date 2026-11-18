import React, { useState, useEffect } from 'react';

const roadmapData = [
  // Phase 1: Physics & Maths (18 Nov - 7 Dec)
  { date: '18 Nov', day: 'Day 1', physics: 'Work, Energy and Power', maths: 'Permutation and Combination' },
  { date: '19 Nov', day: 'Day 2', physics: 'Circular Motion', maths: 'Trigonometric Equations' },
  { date: '20 Nov', day: 'Day 3', physics: 'Centre of Mass', maths: 'Trigonometric Functions and Identities' },
  { date: '21 Nov', day: 'Day 4', physics: 'Rotational Motion', maths: 'Straight Lines' },
  { date: '22 Nov', day: 'Day 5', physics: 'Mechanical Properties of Solids + Fluids', maths: 'Circle' },
  { date: '23 Nov', day: 'Day 6', physics: 'Gravitation', maths: 'Parabola + Ellipse' },
  { date: '24 Nov', day: 'Day 7', physics: 'SHM + Waves', maths: 'Hyperbola' },
  { date: '25 Nov', day: 'Day 8', physics: 'Thermodynamics', maths: 'Statistics + Probability' },
  { date: '26 Nov', day: 'Day 9', physics: 'Ray Optics', maths: 'Matrices' },
  { date: '27 Nov', day: 'Day 10', physics: 'Wave Optics', maths: 'Determinants' },
  { date: '28 Nov', day: 'Day 11', physics: 'Modern Physics (Dual Nature + Atoms + Nuclei)', maths: 'Relations and Functions + Sets' },
  { date: '29 Nov', day: 'Day 12', physics: 'Electric Charges and Fields', maths: 'Inverse Trigonometric Functions' },
  { date: '30 Nov', day: 'Day 13', physics: 'Electrostatic Potential and Capacitance', maths: 'Limits, Continuity and Differentiability' },
  { date: '1 Dec', day: 'Day 14', physics: 'Current Electricity', maths: 'Differentiation Methods' },
  { date: '2 Dec', day: 'Day 15', physics: 'Moving Charges and Magnetism', maths: 'Applications of Derivatives' },
  { date: '3 Dec', day: 'Day 16', physics: 'Magnetism and Matter', maths: 'Indefinite Integration' },
  { date: '4 Dec', day: 'Day 17', physics: 'Electromagnetic Induction', maths: 'Definite Integration' },
  { date: '5 Dec', day: 'Day 18', physics: 'Alternating Current', maths: 'Area Under the Curve' },
  { date: '6 Dec', day: 'Day 19', physics: 'Electromagnetic Waves', maths: 'Applications of Integrals' },
  { date: '7 Dec', day: 'Day 20', physics: 'Semiconductors', maths: 'Complex Numbers' },

  // Phase 2A: Physical + Inorganic Chem (8 Dec - 15 Dec)
  { date: '8 Dec', day: 'Day 21', chemistry: 'Mole Concept (Physical)', chem2: 'Classification of Elements (Inorganic)' },
  { date: '9 Dec', day: 'Day 22', chemistry: 'Redox Reactions (Physical)', chem2: 'Chemical Bonding (Inorganic)' },
  { date: '10 Dec', day: 'Day 23', chemistry: 'Solutions (Physical)', chem2: 'Coordination Compounds (Inorganic)' },
  { date: '11 Dec', day: 'Day 24', chemistry: 'Chemical Kinetics (Physical)', chem2: 'Qualitative + Quantitative (Inorganic)' },
  { date: '12 Dec', day: 'Day 25', chemistry: 'Thermodynamics (Physical)', chem2: 'P-block (Inorganic)' },
  { date: '13 Dec', day: 'Day 26', chemistry: 'Chemical Eq + Ionic Eq (Physical)' },
  { date: '14 Dec', day: 'Day 27', chemistry: 'Electrochemistry (Physical)' },
  { date: '15 Dec', day: 'Day 28', chemistry: 'Structure of Atom (Physical)' },

  // Phase 2B: Pure Organic Chem (16 Dec - 20 Dec)
  { date: '16 Dec', day: 'Day 29', organic: 'IUPAC Nomenclature + GOC' },
  { date: '17 Dec', day: 'Day 30', organic: 'Isomerism + Hydrocarbons' },
  { date: '18 Dec', day: 'Day 31', organic: 'Haloalkanes & Haloarenes + Alcohols, Phenols & Ethers' },
  { date: '19 Dec', day: 'Day 32', organic: 'Aldehydes, Ketones, Carboxylic Acids + Amines' },
  { date: '20 Dec', day: 'Day 33', organic: 'Biomolecules + Organic Revision & Pending Work' },

  // Phase 3 & 4: Practice & Final Revision (21 Dec - 20 Jan)
  { date: '21 Dec - 14 Jan', day: 'Phase 3', practice: 'Full-length Mocks, PYQs, Mock Analysis, Targeted Weak-Topic Drills' },
  { date: '15 Jan - 20 Jan', day: 'Final Phase', practice: 'Maha Tandav Sessions, Formula/Reaction Recall, Alternate-day Mocks' },
];

export default function App() {
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('jee2027Tracker');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('jee2027Tracker', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const toggleTask = (taskId) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const getCardStyle = (subjectType, isCompleted) => {
    // Glowing green when completed
    if (isCompleted) return 'bg-green-600 text-white border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]'; 
    
    // Neon dark mode styles
    switch (subjectType) {
      case 'physics': return 'bg-slate-800 text-red-400 border-red-900/50 hover:bg-slate-700 hover:border-red-500';
      case 'maths': return 'bg-slate-800 text-blue-400 border-blue-900/50 hover:bg-slate-700 hover:border-blue-500';
      case 'chemistry':
      case 'chem2': 
      case 'organic': return 'bg-slate-800 text-emerald-400 border-emerald-900/50 hover:bg-slate-700 hover:border-emerald-500';
      case 'practice': return 'bg-slate-800 text-purple-400 border-purple-900/50 hover:bg-slate-700 hover:border-purple-500';
      default: return 'bg-slate-800 text-slate-300';
    }
  };

  // Calculate Progress
  const totalTasks = roadmapData.reduce((acc, day) => {
    return acc + ['physics', 'maths', 'chemistry', 'chem2', 'organic', 'practice'].filter(key => day[key]).length;
  }, 0);
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100) || 0;

  return (
    <div className="min-h-screen bg-slate-950 pb-12 font-sans relative text-slate-200"
         style={{ backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      
      {/* Sticky Header & Progress Bar */}
      <div className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-lg p-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">JEE MAIN 2027 ROADMAP</h1>
        <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mt-1">Syllabus Completion & Practice Planner</p>
        
        <div className="max-w-2xl mx-auto mt-4 bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700 shadow-inner">
          <div className="bg-green-500 h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(34,197,94,0.8)]" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <p className="text-xs font-bold text-slate-400 mt-2">{progressPercent}% COMPLETED ({completedCount}/{totalTasks} TARGETS)</p>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto mt-8 px-4 space-y-6">
        {roadmapData.map((dayPlan, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-3 items-stretch relative">
            
            {/* Date/Day Badge */}
            <div className="md:w-28 flex-shrink-0 flex flex-col justify-center items-center bg-slate-900 text-slate-300 rounded-xl p-3 border-b-4 border-slate-950 shadow-md">
              <span className="text-xs font-bold text-slate-500 uppercase">{dayPlan.day}</span>
              <span className="text-sm font-bold mt-1 text-center leading-tight text-slate-200">{dayPlan.date}</span>
            </div>

            {/* Task Cards */}
            <div className="flex-1 flex flex-col gap-2">
              {['physics', 'maths', 'chemistry', 'chem2', 'organic', 'practice'].map((subjectKey) => {
                if (!dayPlan[subjectKey]) return null;
                
                const taskId = `${dayPlan.date}-${subjectKey}`;
                const isCompleted = completedTasks[taskId];
                
                return (
                  <button
                    key={taskId}
                    onClick={() => toggleTask(taskId)}
                    className={`w-full text-left p-4 rounded-xl border-b-4 shadow-sm transition-all duration-200 active:scale-[0.99] flex items-center justify-between group ${getCardStyle(subjectKey, isCompleted)}`}
                  >
                    <div>
                      <div className="text-xs font-bold opacity-70 uppercase tracking-wider mb-1">
                        {subjectKey.replace('chem2', 'chemistry')}
                      </div>
                      <div className={`font-bold text-lg leading-tight ${isCompleted ? 'text-white' : 'text-slate-200'}`}>
                        {dayPlan[subjectKey]}
                      </div>
                    </div>
                    
                    {/* Checkbox Icon */}
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isCompleted ? 'bg-white border-transparent text-green-600 shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'border-slate-600 text-transparent group-hover:border-slate-400'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}