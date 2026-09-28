import React, { useState, useEffect, useRef } from 'react';
import { Subject, CORE_SUBJECTS } from '../types';
import { getSubjectMeta } from '../utils/subjectStyles';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Volume2, 
  VolumeX,
  Coffee,
  Brain
} from 'lucide-react';

export const FocusTimer: React.FC = () => {
  const [mode, setMode] = useState<'study' | 'shortBreak' | 'longBreak'>('study');
  const [selectedSubject, setSelectedSubject] = useState<Subject>('DSA');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Time in seconds
  const DURATION_MAP = {
    study: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  const [timeLeft, setTimeLeft] = useState<number>(DURATION_MAP['study']);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('studyflow_pomodoro_count') || '0', 10);
    } catch {
      return 0;
    }
  });

  const timerRef = useRef<any>(null);

  // Audio beep synthesized via Web Audio API (safe, no external audio file failure)
  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 note
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      // AudioContext fallback
    }
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsActive(false);
            playBeep();

            if (mode === 'study') {
              const nextCount = completedSessions + 1;
              setCompletedSessions(nextCount);
              localStorage.setItem('studyflow_pomodoro_count', String(nextCount));
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, mode, soundEnabled, completedSessions]);

  const switchMode = (newMode: 'study' | 'shortBreak' | 'longBreak') => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(DURATION_MAP[newMode]);
  };

  const toggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(DURATION_MAP[mode]);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(DURATION_MAP[mode]);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const currentMeta = getSubjectMeta(selectedSubject);
  const totalDuration = DURATION_MAP[mode];
  const progressPercent = Math.round(((totalDuration - timeLeft) / totalDuration) * 100);

  return (
    <div className="space-y-6 pb-12 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Focus Study Timer
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          25-minute Pomodoro sessions designed for high-intensity problem solving and deep code analysis.
        </p>
      </div>

      {/* Main Focus Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs text-center space-y-8">
        {/* Mode Selector */}
        <div className="flex items-center justify-center gap-1.5 p-1 bg-slate-100 rounded-xl max-w-sm mx-auto">
          <button
            onClick={() => switchMode('study')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${
              mode === 'study'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Study Focus (25m)
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${
              mode === 'shortBreak'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Short Break (5m)
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${
              mode === 'longBreak'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Long Break (15m)
          </button>
        </div>

        {/* Subject selector for current session */}
        {mode === 'study' && (
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Focusing on:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value as Subject)}
              className="text-xs font-bold px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CORE_SUBJECTS.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Big Digit Timer Display */}
        <div className="space-y-4">
          <div className="text-6xl sm:text-7xl font-extrabold font-mono tabular-nums tracking-tight text-slate-900">
            {formattedTime}
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-md mx-auto bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: mode === 'study' ? currentMeta.colorHex : '#10b981',
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={resetTimer}
            className="p-3 text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
            title="Reset timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTimer}
            className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white shadow-xs transition-all ${
              isActive
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-white" />
                <span>{timeLeft === 0 ? 'Restart' : 'Start Focus'}</span>
              </>
            )}
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-3 text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
            title={soundEnabled ? 'Mute notification sound' : 'Enable notification sound'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>
        </div>

        {/* Session Counter */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-blue-600" />
            <span>Completed Sessions Today:</span>
            <strong className="font-mono tabular-nums text-slate-900 text-sm">{completedSessions}</strong>
          </div>
          <span className="font-mono tabular-nums text-slate-400">
            {(completedSessions * 25) / 60 >= 1 
              ? `${((completedSessions * 25) / 60).toFixed(1)} hrs focused`
              : `${completedSessions * 25} mins focused`}
          </span>
        </div>
      </div>
    </div>
  );
};
