import React, { useState, useMemo, useEffect } from 'react';
import { 
  TrendingDown, 
  Calendar, 
  Target, 
  Flag, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Award, 
  Sparkles,
  Trophy,
  Flame,
  Zap
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';

export default function ProgressTracker({ profile = {}, setProfile }) {
  // Entry Form State
  const [newWeight, setNewWeight] = useState('');
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split('T')[0]);

  // Goal State initialized from profile or defaults
  const [targetWeight, setTargetWeight] = useState(profile.targetWeight || 165);
  const [targetDate, setTargetDate] = useState(
    profile.targetDate || new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  // Load weight logs strictly from profile/storage, defaulting to an EMPTY array
  const [weightLogs, setWeightLogs] = useState(() => {
    return profile.weightHistory || [];
  });

  // Fixed baseline weight anchor for steady weekly goals (locked to the first entry or initial profile weight)
  const [baselineWeight, setBaselineWeight] = useState(() => {
    if (profile.weightHistory && profile.weightHistory.length > 0) {
      return profile.weightHistory[0].weight;
    }
    return profile.currentWeight || profile.startingWeight || 180;
  });

  // Sync log changes back to profile
  const updateLogs = (newLogs) => {
    setWeightLogs(newLogs);
    if (setProfile) {
      const latestWeight = newLogs.length > 0 ? newLogs[newLogs.length - 1].weight : profile.currentWeight;
      setProfile({
        ...profile,
        weightHistory: newLogs,
        currentWeight: latestWeight,
        targetWeight,
        targetDate
      });
    }
  };

  // Determine actual current weight dynamically from latest log
  const currentWeight = useMemo(() => {
    if (weightLogs.length > 0) return weightLogs[weightLogs.length - 1].weight;
    return profile.currentWeight || baselineWeight;
  }, [weightLogs, profile, baselineWeight]);

  // Add New Weight Entry
  const handleAddWeight = (e) => {
    e.preventDefault();
    if (!newWeight || isNaN(newWeight)) return;

    const newLog = {
      date: entryDate,
      weight: parseFloat(newWeight)
    };

    const updated = [...weightLogs, newLog].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // If this is the very first log, update the baseline anchor
    if (weightLogs.length === 0) {
      setBaselineWeight(parseFloat(newWeight));
    }

    updateLogs(updated);
    setNewWeight('');
  };

  const handleRemoveLog = (indexToRemove) => {
    const updated = weightLogs.filter((_, idx) => idx !== indexToRemove);
    updateLogs(updated);
  };

  // -------------------------------------------------------------
  // Milestone & Overall Progress Logic (Locked to Baseline)
  // -------------------------------------------------------------
  const milestoneAnalysis = useMemo(() => {
    if (!baselineWeight || !targetWeight) {
      return {
        totalWeeks: 0,
        totalWeightToChange: 0,
        weightChangeSoFar: 0,
        totalRemaining: 0,
        lbsPerWeek: 0,
        progressPercent: 0,
        isSafePace: true,
        checkpoints: []
      };
    }

    const today = new Date();
    const deadline = new Date(targetDate);
    
    const diffTime = deadline - today;
    const totalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const totalWeeks = Math.max(1, Math.round(totalDays / 7));

    const totalWeightToChange = baselineWeight - targetWeight; 
    const weightChangeSoFar = baselineWeight - currentWeight; 
    const totalRemaining = currentWeight - targetWeight;

    let progressPercent = 0;
    if (totalWeightToChange > 0) {
      progressPercent = Math.min(100, Math.max(0, Math.round((weightChangeSoFar / totalWeightToChange) * 100)));
    }

    // Steady weekly drop rate based on fixed baseline to goal target over total weeks
    const totalPoundsToLose = baselineWeight - targetWeight;
    const lbsPerWeek = Math.round((totalPoundsToLose / totalWeeks) * 10) / 10;
    const isSafePace = lbsPerWeek <= 2.0 && lbsPerWeek >= -2.0;

    const checkpoints = [];
    for (let i = 1; i <= totalWeeks; i++) {
      const milestoneDate = new Date();
      milestoneDate.setDate(today.getDate() + i * 7);

      // Fixed step-down from baseline weight each week
      const targetForWeek = Math.round((baselineWeight - (lbsPerWeek * i)) * 10) / 10;
      
      checkpoints.push({
        weekNum: i,
        dateStr: milestoneDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: milestoneDate.toISOString().split('T')[0],
        suggestedWeight: targetForWeek,
        isFinal: i === totalWeeks
      });
    }

    return {
      totalWeeks,
      totalDays,
      totalWeightToChange: Math.round(totalWeightToChange * 10) / 10,
      weightChangeSoFar: Math.round(weightChangeSoFar * 10) / 10,
      totalRemaining: Math.round(totalRemaining * 10) / 10,
      lbsPerWeek,
      progressPercent,
      isSafePace,
      checkpoints
    };
  }, [baselineWeight, currentWeight, targetWeight, targetDate]);

  return (
    <section className="space-y-6">
      {/* 1. Header & Main Stats Summary */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingDown className="text-emerald-400 w-5 h-5" /> Weight & Goal Progress Tracker
            </h2>
            <p className="text-xs text-slate-400">Log your weight entries against your fixed weekly milestone plan.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-700/60">
            <span className="text-xs text-slate-400 block">Baseline Start</span>
            <span className="text-lg font-bold text-slate-300">
              {baselineWeight ? `${baselineWeight} lbs` : 'Not Set'}
            </span>
          </div>
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-700/60">
            <span className="text-xs text-slate-400 block">Current Weight</span>
            <span className="text-lg font-bold text-slate-100">
              {currentWeight ? `${currentWeight} lbs` : 'Log Weight Below'}
            </span>
          </div>
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-700/60">
            <span className="text-xs text-slate-400 block">Goal Target</span>
            <span className="text-lg font-bold text-emerald-400">{targetWeight} lbs</span>
          </div>
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-700/60">
            <span className="text-xs text-slate-400 block">Total Change</span>
            <span className="text-lg font-bold text-amber-400">
              {milestoneAnalysis.weightChangeSoFar !== 0 
                ? `${milestoneAnalysis.weightChangeSoFar > 0 ? '-' : '+'}${Math.abs(milestoneAnalysis.weightChangeSoFar)} lbs` 
                : '0 lbs'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Visual Progress Bar & Milestone Badges */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-5">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-bold text-white flex items-center gap-2">
            <Trophy className="text-amber-400 w-5 h-5" /> Overall Progress Journey
          </h3>
          <span className="text-sm font-extrabold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            {milestoneAnalysis.progressPercent}% Complete
          </span>
        </div>

        <div className="space-y-2">
          <div className="relative w-full h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-700 ease-out rounded-full"
              style={{ width: `${milestoneAnalysis.progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-slate-400 font-medium px-1">
            <span>Baseline: {baselineWeight ? `${baselineWeight} lbs` : '--'}</span>
            <span className="text-amber-400 font-bold">
              {milestoneAnalysis.totalRemaining > 0 
                ? `${milestoneAnalysis.totalRemaining} lbs remaining` 
                : currentWeight ? 'Goal Reached!' : 'Enter weight to start'}
            </span>
            <span>Target: {targetWeight} lbs</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[
            { label: 'First Step', threshold: 1, icon: Zap },
            { label: '25% Way There', threshold: 25, icon: Flame },
            { label: 'Halfway Hero', threshold: 50, icon: Sparkles },
            { label: 'Goal Champion', threshold: 100, icon: Trophy },
          ].map((badge, idx) => {
            const isUnlocked = milestoneAnalysis.progressPercent >= badge.threshold;
            const Icon = badge.icon;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex items-center gap-3 transition ${
                  isUnlocked
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-900/50 border-slate-800 text-slate-600'
                }`}
              >
                <div className={`p-2 rounded-lg ${isUnlocked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-600'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">{badge.label}</span>
                  <span className="text-[10px] opacity-75">{badge.threshold}% Mark</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Goal Timeline & Target Date Settings */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
        <h3 className="text-md font-bold text-white flex items-center gap-2">
          <Target className="text-emerald-400 w-4 h-4" /> Goal Timeline & Deadline Settings
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1 font-medium">Target Weight (lbs)</label>
            <input
              type="number"
              value={targetWeight}
              onChange={(e) => setTargetWeight(parseFloat(e.target.value) || '')}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1 font-medium">Goal Target Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {!milestoneAnalysis.isSafePace && milestoneAnalysis.lbsPerWeek > 0 && (
          <div className="bg-rose-950/40 border border-rose-800/60 p-3.5 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-200 space-y-1">
              <span className="font-bold block">Aggressive Target Pace Warning</span>
              <p>
                Losing {milestoneAnalysis.lbsPerWeek} lbs/week exceeds the standard recommended safe weight loss rate of 1.0 - 2.0 lbs/week. Consider extending your target date.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 4. Log Today's Weight & History */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
        <h3 className="text-md font-bold text-white flex items-center gap-2">
          <Plus className="text-emerald-400 w-4 h-4" /> Log Weight Entry
        </h3>

        <form onSubmit={handleAddWeight} className="flex flex-wrap gap-3">
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
          <input
            type="number"
            step="0.1"
            placeholder="Weight in lbs (e.g. 182.5)"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            className="flex-1 min-w-[180px] bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs cursor-pointer transition flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Save Log
          </button>
        </form>

        {/* Recent Logs Table */}
        <div className="space-y-1.5 pt-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Logged Entries ({weightLogs.length})
          </span>
          {weightLogs.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-2">No weight logs recorded yet. Add your first entry above!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {weightLogs.slice().reverse().map((log, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs bg-slate-900 p-2.5 rounded-lg border border-slate-700/60">
                  <div>
                    <span className="text-slate-200 font-bold block">{log.weight} lbs</span>
                    <span className="text-[10px] text-slate-400">{log.date}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveLog(weightLogs.length - 1 - idx)}
                    className="text-slate-500 hover:text-rose-400 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5. Weight Progress Chart */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
        <h3 className="text-md font-bold text-white flex items-center gap-2">
          <Sparkles className="text-emerald-400 w-4 h-4" /> Weight Progress Chart
        </h3>

        {weightLogs.length < 2 ? (
          <div className="h-44 w-full flex items-center justify-center bg-slate-900/50 rounded-xl border border-slate-700/50 text-slate-500 text-xs text-center p-4">
            Log at least 2 weight entries over time to generate your progress chart trend line.
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightLogs} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#f8fafc', fontSize: '12px' }}
                />
                <ReferenceLine y={targetWeight} stroke="#10b981" strokeDasharray="4 4" label={{ value: 'Target Goal', fill: '#10b981', fontSize: 11 }} />
                <Line type="monotone" dataKey="weight" stroke="#34d399" strokeWidth={3} dot={{ r: 5, fill: '#34d399' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* 6. Recommended Checkpoints & Weekly Milestones */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Flag className="text-emerald-400 w-5 h-5" /> Recommended Checkpoints & Milestones
            </h3>
            <p className="text-xs text-slate-400">
              {milestoneAnalysis.checkpoints.length > 0 
                ? `Your steady roadmap from baseline to goal over ${milestoneAnalysis.totalWeeks} weeks.`
                : 'Enter your target date and weight to calculate your weekly checkpoints.'}
            </p>
          </div>
          {milestoneAnalysis.checkpoints.length > 0 && (
            <span className="text-xs bg-slate-900 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
              {milestoneAnalysis.checkpoints.length} Checkpoints
            </span>
          )}
        </div>

        {milestoneAnalysis.checkpoints.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {milestoneAnalysis.checkpoints.map((checkpoint) => {
              const isAchieved = currentWeight > 0 && currentWeight <= checkpoint.suggestedWeight;

              return (
                <div
                  key={checkpoint.weekNum}
                  className={`p-4 rounded-xl border space-y-2 transition relative ${
                    checkpoint.isFinal
                      ? 'bg-gradient-to-br from-emerald-950/60 to-slate-900 border-emerald-500/60'
                      : 'bg-slate-900/80 border-slate-700/80'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                      Week {checkpoint.weekNum} · {checkpoint.dateStr}
                    </span>
                    {isAchieved ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Reached
                      </span>
                    ) : checkpoint.isFinal ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
                        <Award className="w-3.5 h-3.5" /> Goal Day
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block">Suggested Checkpoint Weight</span>
                    <span className="text-xl font-extrabold text-white">
                      {checkpoint.suggestedWeight} <span className="text-xs font-normal text-slate-400">lbs</span>
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex justify-between">
                    <span>Drop from baseline:</span>
                    <span className="font-semibold text-slate-200">
                      -{baselineWeight ? (baselineWeight - checkpoint.suggestedWeight).toFixed(1) : 0} lbs
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-500 text-xs">
            Log your current weight and target date above to generate personalized checkpoints.
          </div>
        )}
      </div>
    </section>
  );
}