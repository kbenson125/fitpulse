import React, { useState, useMemo } from 'react';
import { 
  Dumbbell, 
  Clock, 
  CheckCircle2, 
  RefreshCw,
  X,
  Footprints,
  Flame,
  Target,
  Trophy,
  Activity,
  HeartPulse,
  FileText,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function WorkoutSection({ profile = {}, setProfile }) {
  const daysPerWeek = profile?.daysPerWeek || 4;
  const [selectedDay, setSelectedDay] = useState(1);
  
  // Initialize state strictly from profile storage for persistence across tab changes
  const [completedExercises, setCompletedExercises] = useState(() => profile?.completedExercises || {});
  const [swappedExercises, setSwappedExercises] = useState(() => profile?.swappedExercises || {});
  const [swapTarget, setSwapTarget] = useState(null);
  const [cardioLogs, setCardioLogs] = useState(() => profile?.cardioLogs || {});
  const [cardioInput, setCardioInput] = useState({ type: 'Running', duration: '', distance: '' });
  const [mobilityLogs, setMobilityLogs] = useState(() => profile?.mobilityLogs || {});

  // Weekly Summary Modal state
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // Helper to sync state changes back to profile
  const updateWorkoutState = (updates) => {
    const nextCompleted = updates.completedExercises !== undefined ? updates.completedExercises : completedExercises;
    const nextCardio = updates.cardioLogs !== undefined ? updates.cardioLogs : cardioLogs;
    const nextMobility = updates.mobilityLogs !== undefined ? updates.mobilityLogs : mobilityLogs;
    const nextSwapped = updates.swappedExercises !== undefined ? updates.swappedExercises : swappedExercises;

    setCompletedExercises(nextCompleted);
    setCardioLogs(nextCardio);
    setMobilityLogs(nextMobility);
    setSwappedExercises(nextSwapped);

    if (setProfile) {
      const completedCount = Object.values(nextCompleted).filter(Boolean).length;
      let calories = completedCount * 35;
      
      Object.values(nextCardio).forEach((log) => {
        const rate = log.type === 'Running' ? 11 : log.type === 'Cycling' ? 9 : 7;
        calories += (log.duration || 30) * rate;
      });

      setProfile({
        ...profile,
        completedExercises: nextCompleted,
        cardioLogs: nextCardio,
        mobilityLogs: nextMobility,
        swappedExercises: nextSwapped,
        totalActiveCalories: calories
      });
    }
  };

  // Calculate dynamic daily cardio recommendation based on profile goals
  const cardioTarget = useMemo(() => {
    const current = profile?.currentWeight || 180;
    const target = profile?.targetWeight || 165;
    const goal = profile?.goal || 'weight_loss';

    let recommendedMiles = 2.0; 
    if (goal === 'weight_loss' && current > target) {
      const diff = current - target;
      recommendedMiles = diff > 20 ? 3.5 : 2.5;
    } else if (goal === 'muscle_gain') {
      recommendedMiles = 1.5;
    }

    const estimatedSteps = Math.round(recommendedMiles * 2200);
    return { miles: recommendedMiles, steps: estimatedSteps };
  }, [profile]);

  // Dynamic workout templates based on user's saved profile preference
  const workoutTemplates = useMemo(() => {
    switch (daysPerWeek) {
      case 1:
        return [
          { day: 1, title: 'Full Body Foundational Routine', focus: 'Full Body', isRest: false },
          { day: 2, title: 'Rest & Active Recovery', focus: 'Recovery', isRest: true },
          { day: 3, title: 'Rest & Recovery', focus: 'Recovery', isRest: true },
          { day: 4, title: 'Rest & Recovery', focus: 'Recovery', isRest: true },
          { day: 5, title: 'Rest & Recovery', focus: 'Recovery', isRest: true },
          { day: 6, title: 'Rest & Recovery', focus: 'Recovery', isRest: true },
          { day: 7, title: 'Rest & Recovery', focus: 'Recovery', isRest: true },
        ];
      case 2:
        return [
          { day: 1, title: 'Full Body A - Strength Focus', focus: 'Full Body', isRest: false },
          { day: 2, title: 'Rest & Active Recovery', focus: 'Recovery', isRest: true },
          { day: 3, title: 'Rest Day', focus: 'Recovery', isRest: true },
          { day: 4, title: 'Full Body B - Hypertrophy Focus', focus: 'Full Body', isRest: false },
          { day: 5, title: 'Rest & Active Recovery', focus: 'Recovery', isRest: true },
          { day: 6, title: 'Rest Day', focus: 'Recovery', isRest: true },
          { day: 7, title: 'Rest Day', focus: 'Recovery', isRest: true },
        ];
      case 3:
        return [
          { day: 1, title: 'Full Body Day 1', focus: 'Full Body', isRest: false },
          { day: 2, title: 'Rest / Active Recovery', focus: 'Recovery', isRest: true },
          { day: 3, title: 'Full Body Day 2', focus: 'Full Body', isRest: false },
          { day: 4, title: 'Rest Day', focus: 'Recovery', isRest: true },
          { day: 5, title: 'Full Body Day 3', focus: 'Full Body', isRest: false },
          { day: 6, title: 'Rest / Light Cardio', focus: 'Recovery', isRest: true },
          { day: 7, title: 'Rest Day', focus: 'Recovery', isRest: true },
        ];
      case 4:
      default:
        return [
          { day: 1, title: 'Upper Body Power', focus: 'Upper Body', isRest: false },
          { day: 2, title: 'Lower Body Strength', focus: 'Lower Body', isRest: false },
          { day: 3, title: 'Active Recovery', focus: 'Recovery', isRest: true },
          { day: 4, title: 'Upper Body Hypertrophy', focus: 'Upper Body', isRest: false },
          { day: 5, title: 'Lower Body & Core', focus: 'Lower Body', isRest: false },
          { day: 6, title: 'Light Cardio / Rest', focus: 'Recovery', isRest: true },
          { day: 7, title: 'Rest Day', focus: 'Recovery', isRest: true },
        ];
      case 5:
        return [
          { day: 1, title: 'Push Day', focus: 'Push', isRest: false },
          { day: 2, title: 'Pull Day', focus: 'Pull', isRest: false },
          { day: 3, title: 'Legs & Core', focus: 'Legs', isRest: false },
          { day: 4, title: 'Rest & Active Recovery', focus: 'Recovery', isRest: true },
          { day: 5, title: 'Upper Body Conditioning', focus: 'Upper Body', isRest: false },
          { day: 6, title: 'Lower Body & Core Focus', focus: 'Lower Body', isRest: false },
          { day: 7, title: 'Rest Day', focus: 'Recovery', isRest: true },
        ];
      case 6:
        return [
          { day: 1, title: 'Push Day 1', focus: 'Push', isRest: false },
          { day: 2, title: 'Pull Day 1', focus: 'Pull', isRest: false },
          { day: 3, title: 'Legs Day 1', focus: 'Legs', isRest: false },
          { day: 4, title: 'Push Day 2', focus: 'Push', isRest: false },
          { day: 5, title: 'Pull Day 2', focus: 'Pull', isRest: false },
          { day: 6, title: 'Legs Day 2', focus: 'Legs', isRest: false },
          { day: 7, title: 'Rest Day', focus: 'Recovery', isRest: true },
        ];
      case 7:
        return [
          { day: 1, title: 'Push Day', focus: 'Push', isRest: false },
          { day: 2, title: 'Pull Day', focus: 'Pull', isRest: false },
          { day: 3, title: 'Legs & Core', focus: 'Legs', isRest: false },
          { day: 4, title: 'Active Mobility & Core', focus: 'Full Body', isRest: false },
          { day: 5, title: 'Upper Body Pump', focus: 'Upper Body', isRest: false },
          { day: 6, title: 'Lower Body Focus', focus: 'Lower Body', isRest: false },
          { day: 7, title: 'Zone 2 Cardio & Stretch', focus: 'Recovery', isRest: false },
        ];
    }
  }, [daysPerWeek]);

  // Exercise Database categorized by workout focus area
  const exerciseDatabase = {
    'Upper Body': [
      { id: 'u1', name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '90s', alternatives: [{ name: 'Dumbbell Bench Press', sets: 4, reps: '8-10', rest: '90s' }, { name: 'Push-ups', sets: 4, reps: '12-15', rest: '60s' }] },
      { id: 'u2', name: 'Bent-Over Barbell Row', sets: 4, reps: '8-10', rest: '90s', alternatives: [{ name: 'Single-Arm Dumbbell Row', sets: 4, reps: '10 per arm', rest: '60s' }, { name: 'Seated Cable Row', sets: 4, reps: '10-12', rest: '60s' }] },
      { id: 'u3', name: 'Standing Overhead Dumbbell Press', sets: 3, reps: '10-12', rest: '60s', alternatives: [{ name: 'Seated Barbell Military Press', sets: 3, reps: '8-10', rest: '90s' }] },
      { id: 'u4', name: 'Lat Pulldowns', sets: 3, reps: '10-12', rest: '60s', alternatives: [{ name: 'Pull-ups or Chin-ups', sets: 3, reps: 'Max Reps', rest: '90s' }] },
      { id: 'u5', name: 'Incline Dumbbell Curl / Tricep Pushdowns', sets: 3, reps: '12-15', rest: '45s', alternatives: [{ name: 'EZ Bar Bicep Curls', sets: 3, reps: '12-15', rest: '45s' }] },
    ],
    'Lower Body': [
      { id: 'l1', name: 'Barbell Back Squat', sets: 4, reps: '8-10', rest: '120s', alternatives: [{ name: 'Goblet Squat', sets: 4, reps: '10-12', rest: '90s' }, { name: 'Leg Press Machine', sets: 4, reps: '10-12', rest: '90s' }] },
      { id: 'l2', name: 'Romanian Deadlift (RDL)', sets: 3, reps: '10-12', rest: '90s', alternatives: [{ name: 'Dumbbell Deadlifts', sets: 3, reps: '10-12', rest: '90s' }] },
      { id: 'l3', name: 'Walking Dumbbell Lunges', sets: 3, reps: '12 per leg', rest: '60s', alternatives: [{ name: 'Reverse Lunges', sets: 3, reps: '10 per leg', rest: '60s' }] },
      { id: 'l4', name: 'Seated Leg Curls', sets: 3, reps: '12-15', rest: '60s', alternatives: [{ name: 'Lying Hamstring Curls', sets: 3, reps: '12-15', rest: '60s' }] },
      { id: 'l5', name: 'Hanging Leg Raises', sets: 3, reps: '15', rest: '45s', alternatives: [{ name: 'Cable Crunches', sets: 3, reps: '12-15', rest: '45s' }] },
    ],
    'Push': [
      { id: 'p1', name: 'Incline Dumbbell Bench Press', sets: 4, reps: '8-10', rest: '90s', alternatives: [{ name: 'Incline Barbell Press', sets: 4, reps: '8-10', rest: '90s' }] },
      { id: 'p2', name: 'Seated Overhead Dumbbell Press', sets: 3, reps: '10-12', rest: '60s', alternatives: [{ name: 'Machine Shoulder Press', sets: 3, reps: '10-12', rest: '60s' }] },
      { id: 'p3', name: 'Cable Chest Flyes', sets: 3, reps: '12-15', rest: '60s', alternatives: [{ name: 'Dumbbell Floor Flyes', sets: 3, reps: '12-15', rest: '60s' }] },
      { id: 'p4', name: 'Dumbbell Lateral Raises', sets: 4, reps: '12-15', rest: '45s', alternatives: [{ name: 'Cable Lateral Raises', sets: 4, reps: '12-15', rest: '45s' }] },
      { id: 'p5', name: 'Tricep Rope Pushdowns', sets: 3, reps: '12-15', rest: '45s', alternatives: [{ name: 'Overhead Tricep Extension', sets: 3, reps: '12-15', rest: '45s' }] },
    ],
    'Pull': [
      { id: 'pull1', name: 'Conventional Deadlift', sets: 3, reps: '6-8', rest: '120s', alternatives: [{ name: 'Trap Bar Deadlift', sets: 3, reps: '6-8', rest: '120s' }] },
      { id: 'pull2', name: 'Wide-Grip Lat Pulldown', sets: 4, reps: '8-10', rest: '90s', alternatives: [{ name: 'Neutral-Grip Pulldowns', sets: 4, reps: '8-10', rest: '90s' }] },
      { id: 'pull3', name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: '60s', alternatives: [{ name: 'Chest-Supported Row', sets: 3, reps: '10-12', rest: '60s' }] },
      { id: 'pull4', name: 'Face Pulls', sets: 4, reps: '15', rest: '45s', alternatives: [{ name: 'Band Pull-Aparts', sets: 4, reps: '15-20', rest: '30s' }] },
      { id: 'pull5', name: 'Incline Dumbbell Bicep Curls', sets: 3, reps: '12', rest: '45s', alternatives: [{ name: 'Hammer Curls', sets: 3, reps: '12', rest: '45s' }] },
    ],
    'Legs': [
      { id: 'leg1', name: 'Leg Press', sets: 4, reps: '10-12', rest: '90s', alternatives: [{ name: 'Barbell Back Squat', sets: 4, reps: '8-10', rest: '120s' }] },
      { id: 'leg2', name: 'Bulgarian Split Squats', sets: 3, reps: '10 per leg', rest: '90s', alternatives: [{ name: 'Walking Lunges', sets: 3, reps: '12 per leg', rest: '60s' }] },
      { id: 'leg3', name: 'Leg Extensions', sets: 3, reps: '12-15', rest: '60s', alternatives: [{ name: 'Sissy Squats', sets: 3, reps: '10-12', rest: '60s' }] },
      { id: 'leg4', name: 'Lying Hamstring Curls', sets: 3, reps: '12-15', rest: '60s', alternatives: [{ name: 'Seated Curls', sets: 3, reps: '12-15', rest: '60s' }] },
      { id: 'leg5', name: 'Standing Calf Raises', sets: 4, reps: '15', rest: '45s', alternatives: [{ name: 'Seated Calf Raises', sets: 4, reps: '15-20', rest: '45s' }] },
    ],
    'Full Body': [
      { id: 'fb1', name: 'Goblet Squats', sets: 4, reps: '10-12', rest: '90s', alternatives: [{ name: 'Bodyweight Air Squats', sets: 4, reps: '15-20', rest: '60s' }] },
      { id: 'fb2', name: 'Dumbbell Flat Bench Press', sets: 3, reps: '10-12', rest: '60s', alternatives: [{ name: 'Push-ups', sets: 3, reps: '12-15', rest: '60s' }] },
      { id: 'fb3', name: 'Single-Arm Dumbbell Row', sets: 3, reps: '10 per side', rest: '60s', alternatives: [{ name: 'Resistance Band Rows', sets: 3, reps: '15', rest: '45s' }] },
      { id: 'fb4', name: 'Dumbbell Shoulder Press', sets: 3, reps: '12', rest: '60s', alternatives: [{ name: 'Pike Push-ups', sets: 3, reps: '10', rest: '60s' }] },
      { id: 'fb5', name: 'Plank Hold', sets: 3, reps: '45-60 sec', rest: '45s', alternatives: [{ name: 'Dead Bugs', sets: 3, reps: '12 total', rest: '45s' }] }
    ]
  };

  const restDayChecklist = [
    { id: 'm1', title: '5-Min Full Body Foam Rolling (Calves, IT Bands, Lats)' },
    { id: 'm2', title: "World's Greatest Stretch & Hip Openers (2 mins per side)" },
    { id: 'm3', title: 'Hydration Goal: Drink at least 80oz of water with electrolytes' },
    { id: 'm4', title: 'Light Outdoor Walk (15-20 minutes casual pace)' }
  ];

  const toggleExercise = (exKey) => {
    const updated = { ...completedExercises, [exKey]: !completedExercises[exKey] };
    updateWorkoutState({ completedExercises: updated });
  };

  const toggleMobilityTask = (dayNum, taskId) => {
    const dayTasks = mobilityLogs[dayNum] || {};
    const updatedMobility = {
      ...mobilityLogs,
      [dayNum]: { ...dayTasks, [taskId]: !dayTasks[taskId] }
    };
    updateWorkoutState({ mobilityLogs: updatedMobility });
  };

  const handleApplySwap = (targetExId, newAlt) => {
    const key = `d${selectedDay}_${targetExId}`;
    const updatedSwapped = { ...swappedExercises, [key]: newAlt };
    updateWorkoutState({ swappedExercises: updatedSwapped });
    setSwapTarget(null);
  };

  const handleSaveCardio = (e) => {
    e.preventDefault();
    if (!cardioInput.duration) return;
    const updatedCardio = {
      ...cardioLogs,
      [selectedDay]: {
        type: cardioInput.type,
        duration: parseFloat(cardioInput.duration) || 0,
        distance: parseFloat(cardioInput.distance) || 0,
      }
    };
    updateWorkoutState({ cardioLogs: updatedCardio });
  };

  const handleRemoveCardio = () => {
    const copy = { ...cardioLogs };
    delete copy[selectedDay];
    updateWorkoutState({ cardioLogs: copy });
  };

  const currentDayPlan = workoutTemplates.find((t) => t.day === selectedDay) || workoutTemplates[0];
  const baseExercises = exerciseDatabase[currentDayPlan.focus] || exerciseDatabase['Full Body'];
  const currentCardio = cardioLogs[selectedDay];
  
  const loggedDistance = currentCardio?.distance || 0;
  const progressPercent = Math.min(Math.round((loggedDistance / cardioTarget.miles) * 100), 100);

  // --- CALCULATION FOR STREAKS & ACTIVE CALORIES ---
  const completedWorkoutCount = Object.values(completedExercises).filter(Boolean).length;
  const totalCardioLogged = Object.keys(cardioLogs).length;
  const currentStreak = Math.min(completedWorkoutCount + totalCardioLogged, 7);

  const totalActiveCalories = useMemo(() => {
    let calories = completedWorkoutCount * 35;
    Object.values(cardioLogs).forEach((log) => {
      const rate = log.type === 'Running' ? 11 : log.type === 'Cycling' ? 9 : 7;
      calories += (log.duration || 30) * rate;
    });
    return calories;
  }, [completedWorkoutCount, cardioLogs]);

  const totalMilesWeekly = useMemo(() => {
    return Object.values(cardioLogs).reduce((acc, curr) => acc + (curr.distance || 0), 0).toFixed(1);
  }, [cardioLogs]);

  return (
    <section className="space-y-6">
      {/* Header with Streak Counter & Summary Button */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Dumbbell className="text-emerald-400 w-5 h-5" /> Workout & Cardio Hub
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track daily routines, hit target goal mileage, and maintain your active streak.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-700/80 px-3.5 py-2 rounded-xl flex items-center gap-2.5">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Streak</span>
              <span className="text-xs font-extrabold text-white">{currentStreak} Active Days</span>
            </div>
          </div>

          <button
            onClick={() => setShowSummaryModal(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer"
          >
            <FileText className="w-4 h-4" /> Weekly Summary
          </button>
        </div>
      </div>

      {/* Active Calorie Burn Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-emerald-500/30 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Estimated Active Energy Burn</span>
            <span className="text-[11px] text-slate-400">Combined output synced for nutrition net calorie calculations.</span>
          </div>
        </div>
        <div className="bg-emerald-950 border border-emerald-800 px-4 py-2 rounded-xl text-right">
          <span className="text-[10px] text-emerald-400 font-bold uppercase block">Total Burned</span>
          <span className="text-base font-extrabold text-white">{totalActiveCalories} <span className="text-xs text-emerald-400 font-normal">kcal</span></span>
        </div>
      </div>

      {/* Days Navigation Bar */}
      <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          Select Day
        </span>
        <div className="grid grid-cols-7 gap-1.5">
          {workoutTemplates.map((item) => (
            <button
              key={item.day}
              onClick={() => setSelectedDay(item.day)}
              className={`p-2 rounded-xl text-center border transition cursor-pointer ${
                selectedDay === item.day
                  ? 'bg-slate-700 border-emerald-400 text-white shadow-md'
                  : 'bg-slate-900 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-[10px] uppercase font-bold block">Day</span>
              <span className="text-sm font-extrabold">{item.day}</span>
              <span className={`block text-[9px] mt-0.5 ${item.isRest ? 'text-slate-500' : 'text-emerald-400'}`}>
                {item.isRest ? 'Rest' : 'Active'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Day Workout Details */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-6">
        <div className="flex justify-between items-start border-b border-slate-700/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-slate-900 text-emerald-400 font-bold px-2.5 py-0.5 rounded border border-slate-700">
                Day {currentDayPlan.day}
              </span>
              <span className="text-xs text-slate-400 font-medium">{currentDayPlan.focus} Focus</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">{currentDayPlan.title}</h3>
          </div>

          <span
            className={`text-xs px-3 py-1 rounded-full font-bold border ${
              currentDayPlan.isRest
                ? 'bg-slate-900 text-slate-400 border-slate-700'
                : 'bg-emerald-950 text-emerald-400 border-emerald-800'
            }`}
          >
            {currentDayPlan.isRest ? 'Rest Day' : 'Workout Day'}
          </span>
        </div>

        {currentDayPlan.isRest ? (
          <div className="bg-slate-900/80 border border-slate-700/80 p-5 rounded-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                <HeartPulse className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Active Recovery & Mobility Checklist</h4>
                <p className="text-[11px] text-slate-400">Complete these restorative actions to accelerate muscle repair.</p>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              {restDayChecklist.map((task) => {
                const isChecked = mobilityLogs[selectedDay]?.[task.id] || false;
                return (
                  <div
                    key={task.id}
                    onClick={() => toggleMobilityTask(selectedDay, task.id)}
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
                      isChecked
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-300'
                        : 'bg-slate-950 border-slate-800 text-white hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                      isChecked ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700 bg-slate-900'
                    }`}>
                      {isChecked && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <span className={`text-xs ${isChecked ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                      {task.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Target Exercises</h4>
              <span className="text-xs text-slate-400">Click item to log, or use swap icon</span>
            </div>

            <div className="space-y-2">
              {baseExercises.map((baseEx) => {
                const exKey = `d${currentDayPlan.day}_${baseEx.id}`;
                const activeEx = swappedExercises[exKey] || baseEx;
                const isDone = completedExercises[exKey];

                return (
                  <div
                    key={baseEx.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition ${
                      isDone
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-300'
                        : 'bg-slate-900 border-slate-700/80 text-white'
                    }`}
                  >
                    <div 
                      onClick={() => toggleExercise(exKey)}
                      className="flex items-center gap-3 flex-1 cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                          isDone
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                            : 'border-slate-600 bg-slate-800'
                        }`}
                      >
                        {isDone && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                      </div>
                      <div>
                        <span className={`text-xs font-bold block ${isDone ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                          {activeEx.name}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {activeEx.sets} Sets × {activeEx.reps} reps · {activeEx.rest} rest
                          {swappedExercises[exKey] && <span className="text-emerald-400 ml-1.5 font-semibold">(Swapped)</span>}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSwapTarget({ baseEx, exKey });
                      }}
                      className="p-2 ml-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition cursor-pointer"
                      title="Substitute Exercise"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Goal-Based Daily Cardio Tracker Section */}
        <div className="border-t border-slate-700/80 pt-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-900 border border-slate-700/60 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Goal Weight Cardio Target</span>
                <span className="text-[10px] text-slate-400">
                  Recommended: <strong className="text-emerald-400">{cardioTarget.miles} miles</strong> daily to reach your target weight.
                </span>
              </div>
            </div>

            {currentCardio && (
              <button
                onClick={handleRemoveCardio}
                className="text-[11px] text-red-400 hover:underline cursor-pointer self-end sm:self-center"
              >
                Reset Cardio Log
              </button>
            )}
          </div>

          <div className="space-y-1.5 px-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Today's Progress</span>
              <span className="font-bold text-emerald-400">{loggedDistance} / {cardioTarget.miles} Miles ({progressPercent}%)</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-700/60">
              <div 
                className="bg-emerald-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {currentCardio ? (
            <div className="bg-slate-900 border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">{currentCardio.type} Completed</span>
                  <span className="text-[10px] text-slate-400">
                    {currentCardio.duration} mins {currentCardio.distance > 0 ? `· ${currentCardio.distance} miles` : ''}
                  </span>
                </div>
              </div>
              <span className="text-xs bg-emerald-950 text-emerald-400 font-bold px-2.5 py-1 rounded-lg border border-emerald-800">
                Logged ✓
              </span>
            </div>
          ) : (
            <form onSubmit={handleSaveCardio} className="bg-slate-900 border border-slate-700/80 p-4 rounded-xl space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-semibold text-slate-400 block mb-1">Cardio Type</label>
                  <select
                    value={cardioInput.type}
                    onChange={(e) => setCardioInput({ ...cardioInput, type: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Running">Running</option>
                    <option value="Walking">Walking</option>
                    <option value="Cycling">Cycling</option>
                    <option value="Rowing">Rowing</option>
                    <option value="Elliptical">Elliptical</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-400 block mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    placeholder="e.g. 30"
                    value={cardioInput.duration}
                    onChange={(e) => setCardioInput({ ...cardioInput, duration: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-400 block mb-1">Distance (Miles)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 2.5"
                    value={cardioInput.distance}
                    onChange={(e) => setCardioInput({ ...cardioInput, distance: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition cursor-pointer"
                >
                  Log Cardio Session
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Swap Modal */}
      {swapTarget && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white">Substitute Exercise</h3>
              <button 
                onClick={() => setSwapTarget(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-xs text-slate-400">
              Select an alternative exercise for <strong className="text-slate-200">{swapTarget.baseEx.name}</strong>:
            </p>

            <div className="space-y-2">
              {swapTarget.baseEx.alternatives.map((alt, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleApplySwap(swapTarget.baseEx.id, alt)}
                  className="p-3 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500/50 cursor-pointer transition flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-white block">{alt.name}</span>
                    <span className="text-[10px] text-slate-400">{alt.sets} Sets × {alt.reps} reps</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Weekly Summary Modal */}
      {showSummaryModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl p-6 space-y-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Weekly Training Summary</h3>
              </div>
              <button 
                onClick={() => setShowSummaryModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-xl">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Workouts Finished</span>
                <span className="text-xl font-extrabold text-white mt-0.5 block">{completedWorkoutCount} <span className="text-xs font-normal text-slate-400">Sessions</span></span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-xl">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Cardio Distance</span>
                <span className="text-xl font-extrabold text-white mt-0.5 block">{totalMilesWeekly} <span className="text-xs font-normal text-emerald-400">Miles</span></span>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Trophy className="w-4 h-4" /> Coach's Performance Note
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {completedWorkoutCount >= 3 
                  ? "Outstanding consistency this week! Your progressive overload and active calorie expenditure are hitting target thresholds for body recomposition."
                  : "You're building momentum. Complete remaining workouts and daily cardio targets to maximize net calorie deficit goals."}
              </p>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setShowSummaryModal(false)}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}