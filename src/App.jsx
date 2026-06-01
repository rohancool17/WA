import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Smartphone, 
  Download, 
  RotateCcw, 
  Activity, 
  Sparkles, 
  Battery, 
  Wifi, 
  Clock, 
  FileText, 
  Info,
  ChevronRight,
  Maximize2,
  Minimize2
} from 'lucide-react';

// Questions Configuration
const QUESTIONS = [
  {
    id: 1,
    title: "Q1: The Physical Toll",
    question: "How do you spend the majority of your time during peak consulting hours?",
    options: [
      { 
        value: "A", 
        label: "Sedentary Routine", 
        desc: "Hours of continuous sitting during intense OPD and case reviews.",
        meta: "Focus: Hip & lower back strain"
      },
      { 
        value: "B", 
        label: "On the Move", 
        desc: "Constant standing, walking wards, or rushing between OT calls.",
        meta: "Focus: Leg fatigue & spinal compression"
      }
    ]
  },
  {
    id: 2,
    title: "Q2: The Stress Profile",
    question: "Which element of your schedule contributes most to daily cognitive fatigue?",
    options: [
      { 
        value: "A", 
        label: "The Volume Surge", 
        desc: "Influx of back-to-back patients and constant decision-making.",
        meta: "Focus: Mental overload & stress response"
      },
      { 
        value: "B", 
        label: "The Erratic Timing", 
        desc: "Late-night emergency cases, broken sleep, or disrupted meals.",
        meta: "Focus: Circadian rhythm & grounding"
      }
    ]
  },
  {
    id: 3,
    title: "Q3: The Physical Symptom",
    question: "Where do you physically lock in tension at the end of a long day?",
    options: [
      { 
        value: "A", 
        label: "Upper Body", 
        desc: "Tight neck, stiff shoulders, and heavy tension headaches.",
        meta: "Focus: Cervical spine & neck decompression"
      },
      { 
        value: "B", 
        label: "Lower Body", 
        desc: "Lumbar spine ache, heavy legs, and tight hip joints.",
        meta: "Focus: Lumbar & sacral decompression"
      }
    ]
  }
];

// Routines Configuration
const ROUTINES = {
  ALPHA: {
    title: "THE DESK RESTORATOR",
    focus: "Sitting Relief, Computer Eye-Strain, Neck Decompression",
    exercises: [
      {
        id: 1,
        name: "Sukhasana Neck Rolls",
        duration: "1 Min",
        desc: "Slow, mindful rotations of the neck, coordinating with deep inhales and exhales.",
        purpose: "Releases suboccipital strain from hours of writing prescriptions and reviewing charts.",
        icon: (
          <svg className="w-12 h-12 text-teal-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="30" r="10" stroke="currentColor" strokeWidth="3" />
            <path d="M50 40C38 40 30 50 30 65H70C70 50 62 40 50 40Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M50 30M40 30C40 24.48 44.48 20 50 20C55.52 20 60 24.48 60 30" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M70 30C75 35 75 45 70 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
          </svg>
        )
      },
      {
        id: 2,
        name: "Chair Eagle Pose (Garudasana)",
        duration: "2 Min",
        desc: "Interlace forearms in front of chest and cross thighs, pulling shoulders downwards away from ears.",
        purpose: "Unknots tight rhomboids, opens scapulae, and releases deep upper back tension.",
        icon: (
          <svg className="w-12 h-12 text-teal-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="25" r="8" stroke="currentColor" strokeWidth="3" />
            <path d="M50 33V60M35 45C35 45 45 40 50 48C55 40 65 45 65 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M42 60C42 60 48 65 50 78M58 60C58 60 52 65 50 78" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )
      },
      {
        id: 3,
        name: "Box Breathing (Sama Vritti)",
        duration: "2 Min",
        desc: "Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold empty for 4 seconds.",
        purpose: "Standardized tactical breathing cycle to rapidly lower cognitive fatigue and cortisol spikes.",
        icon: (
          <svg className="w-12 h-12 text-teal-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="25" width="50" height="50" rx="4" stroke="currentColor" strokeWidth="3" />
            <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" className="animate-subtle-pulse" />
            <path d="M25 25H75V75H25V25" stroke="#f5cf66" strokeWidth="3" strokeLinecap="round" strokeDasharray="20 180" className="animate-subtle-pulse" />
          </svg>
        )
      }
    ]
  },
  BETA: {
    title: "THE WARD WARRIOR",
    focus: "Lower Spine Decompression, Heavy Leg Relief, Grounding Erratic Schedules",
    exercises: [
      {
        id: 1,
        name: "Standing Uttanasana (Forward Fold)",
        duration: "1 Min",
        desc: "Hinge from the hips, letting the crown of the head hang heavy. Micro-bend knees as needed.",
        purpose: "Lengthens hamstrings, opens lower back fascia, and unloads heavy lumbar pressure.",
        icon: (
          <svg className="w-12 h-12 text-teal-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="65" r="8" stroke="currentColor" strokeWidth="3" />
            <path d="M50 80C50 80 40 50 35 57M65 80C65 80 50 50 35 57" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M35 57C30 50 25 35 30 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )
      },
      {
        id: 2,
        name: "Seated Figure-4 Glute Stretch",
        duration: "2 Min",
        desc: "Cross one ankle over the opposite knee while sitting. Flex foot, and gently hinge torso forward.",
        purpose: "Instantly releases piriformis and outer glute muscles directly on any clinic chair.",
        icon: (
          <svg className="w-12 h-12 text-teal-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="22" r="8" stroke="currentColor" strokeWidth="3" />
            <path d="M50 30V55H35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M35 55L45 75M50 55L50 78" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M35 55H60V45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
          </svg>
        )
      },
      {
        id: 3,
        name: "Chandra Bhedana Pranayama",
        duration: "2 Min",
        desc: "Close the right nostril, inhale deeply through the left, close left, and exhale through the right.",
        purpose: "Left-nostril breathing triggers the parasympathetic nervous system to simulate deep rest.",
        icon: (
          <svg className="w-12 h-12 text-teal-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="3" />
            <path d="M50 20C33.43 20 20 33.43 20 50C20 66.57 33.43 80 50 80" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="3" />
            <path d="M55 35C45 40 45 60 55 65" stroke="#f5cf66" strokeWidth="3" strokeLinecap="round" className="animate-subtle-pulse" />
          </svg>
        )
      }
    ]
  },
  GAMMA: {
    title: "THE HARMONIZER",
    focus: "Total Spinal Mobilization, Nervous System Balancing, Mixed Postural Stress",
    exercises: [
      {
        id: 1,
        name: "Seated Cat-Cow (Marjaryasana)",
        duration: "2 Min",
        desc: "Inhale, arch the back and look up (Cow). Exhale, round the spine and tuck chin to chest (Cat).",
        purpose: "Fluid spinal flexion and extension to instantly reverse static desk slouching.",
        icon: (
          <svg className="w-12 h-12 text-teal-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="20" r="8" stroke="currentColor" strokeWidth="3" />
            <path d="M30 45C30 45 45 35 50 50C55 35 70 45 70 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M50 28V60M35 75C40 68 45 60 50 60C55 60 60 68 65 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M50 40C40 40 38 48 38 48" stroke="#f5cf66" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
          </svg>
        )
      },
      {
        id: 2,
        name: "Seated Ardha Matsyendrasana Twist",
        duration: "2 Min",
        desc: "Place left hand on right knee. Inhale to lengthen spine, exhale to twist torso back. Repeat other side.",
        purpose: "Squeezes out physical core tension, decompresses vertebrae, and opens chest.",
        icon: (
          <svg className="w-12 h-12 text-teal-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="22" r="8" stroke="currentColor" strokeWidth="3" />
            <path d="M50 30V60" stroke="currentColor" strokeWidth="3" />
            <path d="M35 45C38 35 62 35 65 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M30 65C30 65 40 70 50 65C60 60 70 65 70 65" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M68 35C73 40 73 50 68 55" stroke="#f5cf66" strokeWidth="2" className="animate-pulse" />
          </svg>
        )
      },
      {
        id: 3,
        name: "Extended Exhalations",
        duration: "1 Min",
        desc: "Inhale silently for a count of 3, then exhale slowly for a count of 6. Keep breathing steady.",
        purpose: "Doubles the length of expiration, stimulating the vagus nerve to slow down a racing heart.",
        icon: (
          <svg className="w-12 h-12 text-teal-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="10" fill="currentColor" fillOpacity="0.1" />
            <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" className="animate-subtle-pulse" />
            <path d="M50 50H85" stroke="#f5cf66" strokeWidth="3" strokeLinecap="round" className="origin-center animate-spin" style={{ animationDuration: '6s' }} />
          </svg>
        )
      }
    ]
  }
};

export default function App() {
  const [screen, setScreen] = useState('welcome'); // welcome | quiz | prescription
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [whatsappStatus, setWhatsappStatus] = useState('idle'); // idle | loading | sent
  const [pdfStatus, setPdfStatus] = useState('idle'); // idle | loading | progress | saved
  const [pdfPercent, setPdfPercent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Clock in iPad Status Bar
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleBegin = () => {
    setScreen('quiz');
    setCurrentQ(0);
    setAnswers([]);
  };

  const handleSelectOption = (val) => {
    const nextAnswers = [...answers];
    nextAnswers[currentQ] = val;
    setAnswers(nextAnswers);

    // Give a slight delay for touch feedback before proceeding
    setTimeout(() => {
      if (currentQ < 2) {
        setCurrentQ(currentQ + 1);
      } else {
        setScreen('prescription');
      }
    }, 250);
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    } else {
      setScreen('welcome');
    }
  };

  const handleReset = () => {
    setScreen('welcome');
    setCurrentQ(0);
    setAnswers([]);
    setWhatsappStatus('idle');
    setPdfStatus('idle');
    setPdfPercent(0);
  };

  // Algorithmic Routing Map
  const getPrescriptionRoutine = () => {
    if (answers.length < 3) return ROUTINES.ALPHA;
    const path = answers.join('');
    
    // AAA, AAB -> ALPHA
    if (path === 'AAA' || path === 'AAB') {
      return { ...ROUTINES.ALPHA, code: 'ALPHA', pathCode: path };
    }
    // BBB, BBA, BAB -> BETA
    if (path === 'BBB' || path === 'BBA' || path === 'BAB') {
      return { ...ROUTINES.BETA, code: 'BETA', pathCode: path };
    }
    // ABA, ABB, BAA -> GAMMA (Mixed/Residual States)
    // We also treat any default fallback as GAMMA
    return { ...ROUTINES.GAMMA, code: 'GAMMA', pathCode: path };
  };

  // Mock Share Actions
  const shareWhatsApp = () => {
    if (whatsappStatus !== 'idle') return;
    setWhatsappStatus('loading');
    setTimeout(() => {
      setWhatsappStatus('sent');
    }, 1500);
  };

  const downloadPDF = () => {
    if (pdfStatus !== 'idle') return;
    setPdfStatus('loading');
    setPdfPercent(0);
    
    // Animate loading percentage
    const interval = setInterval(() => {
      setPdfPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPdfStatus('saved');
          return 100;
        }
        return prev + 20;
      });
    }, 250);
  };

  const currentRoutine = getPrescriptionRoutine();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-luxury-indigo-950 p-4 font-sans select-none overflow-hidden relative">
      
      {/* Background Graphic Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[70vw] h-[70vw] rounded-full bg-radial from-teal-900/20 to-transparent blur-3xl animate-wave-slow" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[70vw] h-[70vw] rounded-full bg-radial from-indigo-900/25 to-transparent blur-3xl animate-wave-medium" />
      </div>

      {/* Control Buttons for Mock Container */}
      <div className="absolute top-4 right-6 flex items-center gap-3 z-50">
        <button 
          onClick={() => setIsFullscreen(!isFullscreen)} 
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 bg-glass hover:text-white border border-slate-700/50 rounded-full cursor-pointer transition-all duration-300"
          title={isFullscreen ? "Exit iPad Mockup View" : "Enter iPad Mockup View"}
        >
          {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          <span>{isFullscreen ? "Standard View" : "iPad Frame"}</span>
        </button>
      </div>

      {/* Standalone iPad Outer Frame */}
      <div className={`
        ${isFullscreen 
          ? 'w-full h-full max-w-none max-h-none rounded-none border-0' 
          : 'w-[1024px] h-[768px] rounded-[40px] border-[14px] border-slate-800 shadow-2xl ring-1 ring-slate-700/50'
        }
        relative flex flex-col bg-luxury-indigo-900 overflow-hidden transition-all duration-500 ease-in-out z-10
      `}>
        
        {/* iPad Bezel Notch camera (Visible only in Framed mode) */}
        {!isFullscreen && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-50 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-950 ml-3" />
          </div>
        )}

        {/* iPad Status Bar */}
        <div className="h-9 px-8 flex items-center justify-between text-xs text-slate-400 font-medium bg-luxury-indigo-950/40 select-none z-40 border-b border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-300">Vylda Care</span>
            <Activity className="w-3.5 h-3.5 text-teal-500" />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-1 text-slate-300">
            <Clock className="w-3 h-3 text-teal-500/80" />
            <span>{currentTime || "12:00 PM"}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Wifi size={13} className="text-slate-400" />
              <span className="text-[10px] text-slate-500">OPD-Secured</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px]">100%</span>
              <Battery size={16} className="text-teal-400 fill-teal-400/20" />
            </div>
          </div>
        </div>

        {/* Interactive App Canvas */}
        <div className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-b from-luxury-indigo-900 to-luxury-indigo-950">
          
          {/* Header Bar */}
          <header className="h-16 px-8 flex items-center justify-between bg-glass-light border-b border-glass select-none z-30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-500/20 flex items-center justify-center border border-teal-500/40">
                <span className="font-display font-extrabold text-teal-400 text-lg">V</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-white text-base tracking-wider leading-tight">Vylda</span>
                <span className="text-[10px] text-teal-400 font-semibold tracking-widest leading-none">BEHIND THE MASK</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-slate-400">Campaign Initiative:</span>
              <div className="px-3 py-1 bg-gradient-to-r from-teal-500/10 to-teal-500/20 border border-teal-500/30 rounded-full">
                <span className="text-xs font-bold text-teal-300 tracking-wide font-display">VOV</span>
              </div>
            </div>
          </header>

          {/* Core Screens with Animations */}
          <main className="flex-1 relative p-8 flex flex-col justify-between overflow-hidden z-20">
            
            {/* Screen 1: Welcome Screen */}
            {screen === 'welcome' && (
              <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-8 h-full fade-in">
                {/* Visual Graphics - Rotating Mandala */}
                <div className="flex-1 flex items-center justify-center relative w-full h-[320px] md:h-[400px]">
                  {/* Subtle Background Glow circles */}
                  <div className="absolute w-72 h-72 rounded-full bg-teal-500/10 filter blur-xl animate-subtle-pulse" />
                  <div className="absolute w-96 h-96 rounded-full border border-teal-500/5" />
                  
                  {/* Glowing Waves Mandala SVG */}
                  <svg className="w-64 h-64 md:w-80 md:h-80 text-teal-500/20 animate-float-mandala" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                    <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="0.5" />
                    {/* Glowing outer petal rings */}
                    {[0, 30, 60, 90, 120, 150].map((angle, idx) => (
                      <g transform={`rotate(${angle} 100 100)`} key={idx}>
                        <path d="M100 5C125 40 125 160 100 195C75 160 75 40 100 5Z" stroke="currentColor" strokeWidth="1" />
                        <path d="M100 25C118 55 118 145 100 175C82 145 82 55 100 25Z" stroke="#14b8a6" strokeWidth="0.5" strokeOpacity="0.4" />
                      </g>
                    ))}
                    {/* Core Sun / Star symbol */}
                    <circle cx="100" cy="100" r="15" stroke="#f5cf66" strokeWidth="1.5" className="animate-pulse" />
                    <circle cx="100" cy="100" r="6" fill="#14b8a6" />
                  </svg>
                  
                  <div className="absolute bottom-6 px-4 py-2 bg-glass border border-slate-700/50 rounded-lg text-center backdrop-blur-md">
                    <p className="text-xs text-slate-400 font-medium">World Yoga Day Special</p>
                    <p className="text-sm font-bold text-teal-300 font-display">Care for the Caregiver</p>
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 flex flex-col justify-center text-left max-w-lg">
                  <span className="text-xs font-bold text-teal-400 tracking-widest uppercase mb-1">Behind The Mask</span>
                  <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-white leading-tight mb-2 tracking-tight">
                    Vylda Honors <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-300 text-shadow-glow">
                      the Healers
                    </span>
                  </h1>
                  <h2 className="text-lg font-medium text-slate-300 mb-5 leading-snug">
                    World Yoga Day: Finding Your Inner Balance
                  </h2>
                  <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                    Doctor, you spend every single day stabilizing your patients' profiles. Let's take 30 seconds to focus on your routine and uncover your personal wellness prescription.
                  </p>
                  
                  <div>
                    <button
                      onClick={handleBegin}
                      className="px-8 py-4 bg-teal-600 hover:bg-teal-500 active:scale-95 text-white font-bold text-base rounded-xl transition-all duration-300 shadow-lg shadow-teal-950/40 border border-teal-400/20 cursor-pointer flex items-center gap-3 animate-pulse"
                    >
                      <span>Begin Wellness Assessment</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Screen 2: Lifestyle Questions */}
            {screen === 'quiz' && (
              <div className="flex-1 flex flex-col justify-between h-full fade-in">
                {/* Top Stepper Indicator */}
                <div className="w-full max-w-xl mx-auto flex items-center justify-between mb-8 relative select-none">
                  {/* Connection Line */}
                  <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-800 -translate-y-1/2 z-0" />
                  <div 
                    className="absolute top-1/2 left-0 h-[2px] bg-teal-500/80 -translate-y-1/2 transition-all duration-500 z-0"
                    style={{ width: `${(currentQ / 2) * 100}%` }}
                  />

                  {QUESTIONS.map((q, idx) => {
                    const isActive = idx === currentQ;
                    const isCompleted = idx < currentQ;
                    return (
                      <div key={q.id} className="relative z-10 flex flex-col items-center">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center border font-display font-bold text-sm transition-all duration-300
                          ${isActive 
                            ? 'bg-teal-500 text-white border-teal-400 ring-4 ring-teal-500/20 scale-110 shadow-lg' 
                            : isCompleted 
                              ? 'bg-luxury-indigo-800 text-teal-400 border-teal-500/50' 
                              : 'bg-luxury-indigo-950 text-slate-500 border-slate-800'
                          }
                        `}>
                          {isCompleted ? <Check size={16} strokeWidth={3} /> : idx + 1}
                        </div>
                        <span className={`text-[10px] mt-2 font-medium tracking-wide uppercase transition-all duration-300 ${isActive ? 'text-teal-400 font-bold' : isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
                          {idx === 0 ? "Physical" : idx === 1 ? "Cognitive" : "Tension"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Question Area */}
                <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full my-auto">
                  <div className="text-center mb-6">
                    <span className="text-xs font-bold text-teal-400 tracking-widest uppercase mb-1 block">
                      {QUESTIONS[currentQ].title}
                    </span>
                    <h2 className="font-display font-bold text-2xl lg:text-3xl text-white leading-snug">
                      {QUESTIONS[currentQ].question}
                    </h2>
                  </div>

                  {/* Option Tap Rows */}
                  <div className="w-full flex flex-col gap-4">
                    {QUESTIONS[currentQ].options.map((opt) => {
                      const isSelected = answers[currentQ] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectOption(opt.value)}
                          className={`
                            w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative group flex items-start gap-4
                            ${isSelected 
                              ? 'bg-glass border-teal-500/60 shadow-lg shadow-teal-950/20' 
                              : 'bg-glass-light border-glass hover:bg-white/[0.03] hover:border-slate-700/60'
                            }
                          `}
                        >
                          <div className={`
                            w-6 h-6 rounded-full border flex items-center justify-center mt-1 transition-all duration-300
                            ${isSelected 
                              ? 'bg-teal-500 text-white border-teal-400' 
                              : 'border-slate-600 group-hover:border-slate-500'
                            }
                          `}>
                            {isSelected && <Check size={12} strokeWidth={3} />}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-0.5">
                              <span className="font-display font-bold text-lg text-white">
                                {opt.label}
                              </span>
                              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                                Option {opt.value}
                              </span>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed mb-2">
                              {opt.desc}
                            </p>
                            <span className="inline-block text-[11px] font-semibold text-teal-400 tracking-wider">
                              {opt.meta}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Back Button / Quick Control */}
                <div className="w-full flex justify-between items-center mt-6 pt-4 border-t border-glass">
                  <button
                    onClick={handleBack}
                    className="px-5 py-2.5 text-xs text-slate-400 hover:text-white border border-slate-700/50 rounded-lg bg-glass cursor-pointer transition-all duration-300"
                  >
                    ← Back
                  </button>
                  <span className="text-xs text-slate-600 font-medium select-none">
                    Assessment ID: VY-2026-A
                  </span>
                </div>
              </div>
            )}

            {/* Screen 3: Custom Wellness Rx Card & Climax */}
            {screen === 'prescription' && (
              <div className="flex-1 flex flex-col justify-between h-full overflow-y-auto custom-scrollbar pr-1 fade-in">
                <div className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row gap-6 items-stretch justify-center">
                  
                  {/* Left Column: Personalized Prescription Card */}
                  <div className="flex-1 flex flex-col">
                    
                    {/* The Premium Rx Card Container */}
                    <div className="flex-1 relative rounded-2xl overflow-hidden p-0.5 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light shadow-2xl">
                      <div className="h-full w-full bg-luxury-indigo-900 rounded-[14px] p-6 flex flex-col justify-between relative overflow-hidden">
                        
                        {/* Decorative Premium Gold Corners & Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-luxury-gold/10 to-transparent pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-radial from-teal-500/5 to-transparent pointer-events-none" />
                        
                        {/* Gold Border Shimmer Accent Accent on Top */}
                        <div className="absolute top-0 left-0 right-0 h-[3px] gold-border-shimmer" />

                        {/* Card Header */}
                        <div className="flex justify-between items-start border-b border-slate-800 pb-4 mb-4">
                          <div>
                            <span className="text-[9px] font-extrabold text-luxury-gold uppercase tracking-widest font-display">
                              Custom Wellness Card
                            </span>
                            <h3 className="font-display font-extrabold text-2xl text-white tracking-tight leading-none mt-1">
                              {currentRoutine.title}
                            </h3>
                            <p className="text-xs text-teal-400 font-medium mt-1">
                              Target focus: {currentRoutine.focus}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">RX NUMBER</div>
                            <div className="text-xs text-luxury-gold font-bold font-display tracking-wider">VY-#{currentRoutine.pathCode}-{currentRoutine.code}</div>
                          </div>
                        </div>

                        {/* Customized Exercises List */}
                        <div className="flex-1 flex flex-col gap-4 mb-5">
                          {currentRoutine.exercises.map((ex, index) => (
                            <div 
                              key={ex.id} 
                              className="flex items-start gap-4 p-3.5 rounded-xl bg-glass border border-glass hover:border-teal-500/20 transition-all duration-300"
                            >
                              <div className="w-12 h-12 rounded-lg bg-teal-950/40 flex items-center justify-center border border-teal-500/20 shrink-0">
                                {ex.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-display font-bold text-sm text-white">
                                    {index + 1}. {ex.name}
                                  </h4>
                                  <span className="px-2 py-0.5 text-[9px] font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 rounded-full">
                                    {ex.duration}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                                  {ex.desc}
                                </p>
                                <div className="flex items-center gap-1.5 mt-1.5">
                                  <Info size={10} className="text-teal-400/80 shrink-0" />
                                  <p className="text-[10px] text-slate-400 leading-tight">
                                    {ex.purpose}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Brand Placement & VOV Message Container */}
                        <div className="mt-auto border-t border-luxury-gold/20 pt-4 relative">
                          {/* Inner glowing accent */}
                          <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent" />
                          <div className="p-3.5 rounded-lg bg-luxury-gold/5 border border-luxury-gold/20">
                            <p className="text-xs text-slate-300 text-justify leading-relaxed italic">
                              "Doctor, while you work tirelessly to bring stability and routine to your life, let Vylda protect your patients. Just as these targeted micro-asanas restore your physical harmony, Vylda ensures true <strong className="text-teal-300 not-italic font-bold">VOV: Victory Over Glycemic Variability</strong> by smoothing out sharp daily spikes and crashes."
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Right Column: Interaction Console */}
                  <div className="w-full lg:w-[320px] flex flex-col justify-between gap-6">
                    
                    {/* Diagnostics Details */}
                    <div className="p-5 rounded-2xl bg-glass border border-glass">
                      <h4 className="font-display font-bold text-sm text-white mb-4 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-teal-500" />
                        <span>Diagnostic Routing Context</span>
                      </h4>
                      <div className="space-y-3.5 text-xs text-slate-400">
                        <div className="flex justify-between py-1.5 border-b border-white/5">
                          <span>Physical Demand:</span>
                          <span className="font-semibold text-white">
                            {answers[0] === 'A' ? 'Sedentary Consulting' : 'On the Move Wards'}
                          </span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-white/5">
                          <span>Primary Stressor:</span>
                          <span className="font-semibold text-white">
                            {answers[1] === 'A' ? 'Patient Volume Surge' : 'Erratic Shift Timings'}
                          </span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-white/5">
                          <span>Tension Accumulation:</span>
                          <span className="font-semibold text-white">
                            {answers[2] === 'A' ? 'Upper Body / Neck' : 'Lower Body / Lumbar'}
                          </span>
                        </div>
                        <div className="flex justify-between py-1.5">
                          <span>Binary Path Signature:</span>
                          <span className="px-2 py-0.5 bg-slate-800 rounded font-mono font-bold text-teal-400">
                            {currentRoutine.pathCode}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Simulation Console Actions */}
                    <div className="p-5 rounded-2xl bg-glass border border-glass flex-1 flex flex-col justify-center">
                      <div className="text-center mb-6">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                          Medical Representative Console
                        </span>
                        <h4 className="font-display font-bold text-base text-white">
                          Wellness Deliverables
                        </h4>
                      </div>

                      <div className="space-y-4">
                        {/* WhatsApp Share Button */}
                        <div>
                          <button
                            onClick={shareWhatsApp}
                            disabled={whatsappStatus !== 'idle'}
                            className={`
                              w-full py-3.5 px-4 rounded-xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-300 border
                              ${whatsappStatus === 'idle' 
                                ? 'bg-[#25D366] hover:bg-[#20ba59] text-white border-green-400/20 active:scale-95 shadow-md shadow-green-950/20' 
                                : whatsappStatus === 'loading'
                                  ? 'bg-[#25D366]/40 text-green-200 border-green-600/30 cursor-wait'
                                  : 'bg-green-950/40 text-green-400 border-green-500/40'
                              }
                            `}
                          >
                            {whatsappStatus === 'idle' && (
                              <>
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12.018 0C5.396 0 .02 5.366.02 11.974c0 2.112.551 4.17 1.6 6.002L.02 24l6.19-1.618a11.96 11.96 0 0 0 5.808 1.498c6.623 0 12.003-5.366 12.003-11.973C24.02 5.37 18.64 0 12.018 0zm0 21.996c-1.892 0-3.748-.507-5.374-1.467l-.386-.23-3.694.965.985-3.593-.252-.4a10.02 10.02 0 0 1-1.536-5.3C1.296 6.945 5.642 2.6 12.02 2.6c6.376 0 10.718 4.345 10.718 9.38 0 5.034-4.342 9.38-10.72 9.38zM17.5 14.77c-.3-.15-1.782-.876-2.057-.976-.276-.1-.476-.15-.676.15-.2.3-.776.976-.95 1.176-.176.2-.35.226-.65.076-1.127-.563-1.922-.98-2.686-1.296-.763-.315-1.22-.27-1.676.257-.45.526-1.75 1.752-1.75 1.752s-.025.075-.075.1c-.2.15-.45.2-.676.05-.3-.15-1.272-.47-2.422-1.497-.895-.8-1.5-1.79-1.676-2.09-.175-.3-.02-.46.13-.61.136-.135.3-.35.45-.526.15-.175.2-.3.3-.5.1-.2.05-.376-.025-.526-.075-.15-.676-1.627-.926-2.227-.244-.588-.49-.508-.676-.518-.175-.01-.376-.01-.576-.01-.2 0-.526.075-.802.376-.276.3-1.052 1.026-1.052 2.502 0 1.478 1.077 2.905 1.227 3.105.15.2 2.12 3.23 5.132 4.53 3.012 1.3 3.012.867 3.563.817.55-.05 1.78-.727 2.03-1.428.25-.7.25-1.3.175-1.428-.075-.125-.275-.2-.575-.35z"/>
                                </svg>
                                <span>Share on WhatsApp</span>
                              </>
                            )}
                            {whatsappStatus === 'loading' && (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Dispatching Routine...</span>
                              </div>
                            )}
                            {whatsappStatus === 'sent' && (
                              <div className="flex items-center gap-2">
                                <Check size={18} strokeWidth={3} className="animate-bounce" />
                                <span>Routine Sent to Doctor's Phone!</span>
                              </div>
                            )}
                          </button>
                          <p className="text-[10px] text-slate-500 text-center mt-1.5 leading-tight">
                            Sends an interactive micro-wellness link directly via secure API simulation.
                          </p>
                        </div>

                        {/* Download PDF Button */}
                        <div>
                          <button
                            onClick={downloadPDF}
                            disabled={pdfStatus !== 'idle'}
                            className={`
                              w-full py-3.5 px-4 rounded-xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-300 border
                              ${pdfStatus === 'idle' 
                                ? 'bg-luxury-indigo-800 hover:bg-luxury-indigo-700 hover:border-teal-500/50 text-white border-slate-700/60 active:scale-95 shadow-md shadow-indigo-950/20' 
                                : pdfStatus === 'loading' || pdfStatus === 'progress'
                                  ? 'bg-luxury-indigo-950/60 text-slate-500 border-slate-800 cursor-wait'
                                  : 'bg-teal-950/30 text-teal-400 border-teal-500/40'
                              }
                            `}
                          >
                            {pdfStatus === 'idle' && (
                              <>
                                <Download size={18} />
                                <span>Download Wellness PDF</span>
                              </>
                            )}
                            {(pdfStatus === 'loading' || pdfStatus === 'progress') && (
                              <div className="flex items-center gap-2.5">
                                <div className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
                                <span>Compiling {pdfPercent}%</span>
                              </div>
                            )}
                            {pdfStatus === 'saved' && (
                              <div className="flex items-center gap-2">
                                <Check size={18} strokeWidth={3} className="animate-bounce" />
                                <span>PDF Saved to Local Storage!</span>
                              </div>
                            )}
                          </button>
                          <p className="text-[10px] text-slate-500 text-center mt-1.5 leading-tight">
                            Generates a high-resolution, print-ready digital medical wellness asset.
                          </p>
                        </div>

                        {/* Reset button to start over */}
                        <div className="pt-2 border-t border-glass">
                          <button
                            onClick={handleReset}
                            className="w-full py-3 px-4 rounded-xl bg-glass border border-slate-700/50 hover:bg-white/[0.02] text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                          >
                            <RotateCcw size={14} />
                            <span>Conduct New Assessment</span>
                          </button>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>

                {/* Back to Quiz controls */}
                <div className="w-full flex justify-between items-center mt-6 pt-4 border-t border-glass shrink-0 select-none">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 text-xs text-slate-400 hover:text-white border border-slate-700/50 rounded-lg bg-glass cursor-pointer transition-all duration-300"
                  >
                    ← Welcome Screen
                  </button>
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Sparkles size={11} className="text-luxury-gold" />
                    <span>Yoga Wellness powered by Vylda</span>
                  </span>
                </div>
              </div>
            )}

          </main>

          {/* iPad Home Indicator pill (Visible only in Framed mode) */}
          {!isFullscreen && (
            <div className="h-4 w-full flex items-center justify-center pointer-events-none select-none">
              <div className="w-36 h-1 bg-slate-700 rounded-full" />
            </div>
          )}

        </div>
      </div>

      {/* Footer Info context */}
      <div className="mt-4 text-[11px] text-slate-600 select-none text-center pointer-events-none">
        <p>© 2026 Vylda Glycemic Variability Solutions (VOV Campaign). All rights reserved.</p>
        <p className="mt-0.5">Optimized for Doctor consult chamber tablet presentations. Standard 4:3 Aspect Ratio Container.</p>
      </div>

    </div>
  );
}
