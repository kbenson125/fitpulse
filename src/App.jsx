import React, { useState, useEffect } from 'react';
import { Dumbbell, Utensils, TrendingUp, Settings, X } from 'lucide-react';
import Header from './components/Header';
import WorkoutSection from './components/WorkoutSection';
import NutritionSection from './components/NutritionSection';
import ProgressTracker from './components/ProgressTracker';

export default function App() {
  const [activeTab, setActiveTab] = useState('workout');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize Profile from LocalStorage or expanded defaults
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('fitpulse_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Alex',
      age: 28,
      gender: 'male',
      startWeight: 185,
      currentWeight: 180,
      targetWeight: 165,
      targetDate: '',
      goal: 'weight_loss',
      activityLevel: 'moderately_active', // <-- Added default activity level
      isAtHome: false,
      daysPerWeek: 4
    };
  });

  // Initialize Weight Logs from LocalStorage or fallback defaults
  const [weightLogs, setWeightLogs] = useState(() => {
    const saved = localStorage.getItem('fitpulse_logs');
    return saved ? JSON.parse(saved) : [
      { id: 1, date: '2026-09-01', weight: 185 },
      { id: 2, date: '2026-09-08', weight: 182 },
      { id: 3, date: '2026-09-15', weight: 180 }
    ];
  });

  // Auto-save Profile to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('fitpulse_profile', JSON.stringify(profile));
  }, [profile]);

  // Auto-save Weight Logs to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('fitpulse_logs', JSON.stringify(weightLogs));
  }, [weightLogs]);

  // Handle modal form changes
  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? checked 
        : (name === 'age' || name === 'startWeight' || name === 'currentWeight' || name === 'targetWeight'
            ? parseFloat(value) || ''
            : value)
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Header Bar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenSettings={() => setIsModalOpen(true)}
        profile={profile}
      />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === 'workout' && (
          <WorkoutSection profile={profile} setProfile={setProfile} />
        )}

        {activeTab === 'nutrition' && (
          <NutritionSection profile={profile} setProfile={setProfile} />
        )}

        {activeTab === 'progress' && (
          <ProgressTracker 
            profile={profile} 
            setProfile={setProfile} 
            weightLogs={weightLogs} 
            setWeightLogs={setWeightLogs} 
          />
        )}
      </main>

      {/* Settings / Profile Setup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-emerald-400" /> Edit Profile & Preferences
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }} className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name || ''}
                  onChange={handleProfileChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Age & Gender Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={profile.age || ''}
                    onChange={handleProfileChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Gender</label>
                  <select
                    name="gender"
                    value={profile.gender || 'male'}
                    onChange={handleProfileChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              {/* Fitness Goal */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Primary Fitness Goal</label>
                <select
                  name="goal"
                  value={profile.goal || 'weight_loss'}
                  onChange={handleProfileChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="weight_loss">Weight Loss</option>
                  <option value="muscle_gain">Muscle Gain</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="endurance">Endurance & Conditioning</option>
                </select>
              </div>

              {/* Activity Level Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Activity Level</label>
                <select
                  name="activityLevel"
                  value={profile.activityLevel || 'moderately_active'}
                  onChange={handleProfileChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="sedentary">Sedentary (little or no exercise)</option>
                  <option value="lightly_active">Lightly Active (light exercise/sports 1-3 days/week)</option>
                  <option value="moderately_active">Moderately Active (moderate exercise/sports 3-5 days/week)</option>
                  <option value="very_active">Very Active (hard exercise/sports 6-7 days a week)</option>
                  <option value="extra_active">Extra Active (very hard exercise/physical job)</option>
                </select>
              </div>

              {/* Target Weight */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Target Weight (lbs)</label>
                <input
                  type="number"
                  name="targetWeight"
                  value={profile.targetWeight || ''}
                  onChange={handleProfileChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* At-Home Mode Toggle */}
              <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-lg p-3">
                <div>
                  <span className="text-xs font-semibold text-slate-300 block">At-Home Workout Mode</span>
                  <span className="text-[10px] text-slate-500">Adapt routines for bodyweight or minimal equipment</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isAtHome"
                    checked={!!profile.isAtHome}
                    onChange={handleProfileChange}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {/* Workout Frequency Selector */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-slate-300 block">
                  Workout Days Per Week
                </label>
                <div className="grid grid-cols-7 gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setProfile(prev => ({ ...prev, daysPerWeek: num }))}
                      className={`py-2 rounded-lg text-xs font-bold border transition cursor-pointer ${
                        profile.daysPerWeek === num
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {num}d
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-lg text-xs transition cursor-pointer"
                >
                  Save Profile Preferences
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}