import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, 
  BookOpen, 
  ChefHat, 
  Briefcase, 
  Droplets, 
  Navigation, 
  Sprout,
  Hourglass,
  Timer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import './index.css';

const triggerFireworks = () => {
  var duration = 10 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  var interval = setInterval(function() {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
  }, 250);
};

const nakathData = [
  {
    id: 1,
    title: 'පුණ්‍ය කාලය',
    datetime: '2026-04-14T03:08:00+05:30',
    description: 'අප්‍රේල් මස 14 වන අඟහරුවාදා පූර්වභාග 03.08 සිට එම දා අපරභාග 03.56 දක්වා පුණ්‍ය කාලය බැවින් ඊට පළමුව ආහාර පාන ගෙන සියලු වැඩ අතහැර ආගමික වතාවත්, ආධ්‍යාත්මික කටයුතු, දානමය පුණ්‍ය ක්‍රියා සහ පුණ්‍ය කාල චාරිත්‍රයන් හි නිරත වීමත් ආහාර පිසීම, අනුභවය, වැඩ ඇල්ලීම හා ගණුදෙනු කිරීම ආදී නැකැත් චාරිත්‍ර විධි පහතපරිදි ඉටුකිරීමත් මැනවි.',
    icon: BookOpen,
  },
  {
    id: 2,
    title: 'අලුත් අවුරුදු උදාව',
    datetime: '2026-04-14T09:32:00+05:30',
    description: 'අප්‍රේල් මස 14 වන අඟහරුවාදා දින පූර්වභාග 09.32 ට සිංහල අලුත් අවුරුද්ද උදාවෙයි.',
    icon: Sun,
  },
  {
    id: 3,
    title: 'ආහාර පිසීම',
    datetime: '2026-04-14T10:51:00+05:30',
    description: 'අප්‍රේල් මස 14 වන අඟහරුවාදා පූර්වභාග 10.51 ට රක්ත වර්ණ වස්ත්‍රාභරණයෙන් සැරසී දකුණු දිශාව බලා ලිප් බැඳ ගිනි මොළවා කිරිබතක් ද කැවිලි වර්ගයක් ද දී කිරි සහ විළඳ ද පිළියෙල කර ගැනීම මැනවි.',
    icon: ChefHat,
  },
  {
    id: 4,
    title: 'වැඩ ඇල්ලීම, ගණුදෙනු කිරීම හා ආහාර අනුභවය',
    datetime: '2026-04-14T12:06:00+05:30',
    description: 'අප්‍රේල් මස 14 වන අඟහරුවාදා අපරභාග 12.06 ට රක්ත වර්ණ වස්ත්‍රාභරණයෙන් සැරසී දකුණු දිශාව බලා සියලු වැඩ අල්ලා ගනුදෙනු කොට ආහාර අනුභව කිරීම මැනවි.',
    icon: Briefcase,
  },
  {
    id: 5,
    title: 'හිසතෙල් ගෑම',
    datetime: '2026-04-15T06:55:00+05:30',
    description: 'අප්‍රේල් මස 15 වන බදාදා පූර්වභාග 6.55 ට පච්ච වර්ණ හෙවත් කොළ පැහැති වස්ත්‍රාභරණයෙන් සැරසී නැගෙනහිර දිශාව බලා හිසට කොහොඹපත් ද පයට කොළොන් පත් ද තබා කොහොඹපත් යුෂ මිශ්‍ර නානු හා තෙල් ගා ස්නානය කිරීම මැනවි.',
    icon: Droplets,
  },
  {
    id: 6,
    title: 'රැකී රක්ෂා සඳහා පිටත්ව යෑම',
    datetime: '2026-04-20T06:27:00+05:30',
    description: 'අප්‍රේල් මස 20 වන සඳුදා පූර්වභාග 06.27 ට ස්වේත වර්ණ වස්ත්‍රාභරණයෙන් සැරසී කිරි බතක් ද එලකිරි මිශ්‍ර කැවිලි වර්ගයක් ද අනුභව කර දකුණු දිශාව බලා හෝ අප්‍රේල් මස 20 වන සඳුදා පූර්වභාග 06.50 ට මුතු හා ස්වේත වර්ණ වස්ත්‍රාභරණයෙන් සැරසී ගිතෙල් හා තල මිශ්‍ර කිරිබතක් ද දී කිරි සහ අග්ගලා සමග කැවිලි වර්ගයක් ද අනුභව කර නැගෙනහිර දිශාව බලා පිටත්ව යෑම මැනවි.',
    icon: Navigation,
  },
  {
    id: 7,
    title: 'පැළ සිටුවීමට',
    datetime: '2026-04-23T09:01:00+05:30',
    description: 'අප්‍රේල් මස 23 වන බ්‍රහස්පතින්දා පූර්වභාග 09.01 ට රන්වන් පැහැති වස්ත්‍රාභරණයෙන් සැරසී උතුරු දිශාව බලා පැළ සිටුවීම මැනවි.',
    icon: Sprout,
  }
];

const calculateTimeLeft = (targetDate) => {
  const difference = new Date(targetDate) - new Date();
  
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      passed: false
    };
  }
  return { passed: true };
};

const formatTimeLeft = (timeObj) => {
  if (timeObj.passed) return <span className="passed-text">මෙම නැකත පසුවී ඇත</span>;
  
  const parts = [];
  if (timeObj.days > 0) parts.push(`${timeObj.days} දින`);
  if (timeObj.hours > 0 || timeObj.days > 0) parts.push(`${timeObj.hours} පැය`);
  parts.push(`${timeObj.minutes} මිනිත්තු`);
  parts.push(`${timeObj.seconds} තත්පර`);
  
  return parts.join(' ');
};

function App() {
  const [currentTimes, setCurrentTimes] = useState({});
  const [nextNakath, setNextNakath] = useState(null);
  const firedNakathRef = useRef(new Set());

  useEffect(() => {
    const timer = setInterval(() => {
      const times = {};
      let upcoming = null;

      nakathData.forEach(item => {
        const difference = new Date(item.datetime) - new Date();
        const timeObj = calculateTimeLeft(item.datetime);
        times[item.id] = timeObj;
        
        if (difference <= 0 && !firedNakathRef.current.has(item.id)) {
          firedNakathRef.current.add(item.id);
          // Only fire if it passed within the last 3-5 seconds (don't fire for long past events on load)
          if (difference > -5000) {
            triggerFireworks();
          }
        }
        
        // Find the precise next nakath that hasn't passed
        if (!timeObj.passed && !upcoming) {
          upcoming = { ...item, timeLeft: timeObj };
        }
      });

      setCurrentTimes(times);
      setNextNakath(upcoming);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1>2026 අලුත් අවුරුදු නැකත් ලිත</h1>
        <p>ශ්‍රී ලංකා ප්‍රමිති වේලාවට අනුව (Sri Lanka Standard Time)</p>
      </header>

      {/* Main Countdown Banner */}
      <div className="main-countdown">
        {nextNakath ? (
          <>
            <div className="main-countdown-title">
              <Hourglass size={28} className="spin-icon" />
              <span>
                {nextNakath.id === 1 ? 'අලුත් අවුරුදු පළමු නැකතට තව' : `මීළඟ නැකතට තව (${nextNakath.title})`}
              </span>
            </div>
            <div className="main-countdown-timer">
              {nextNakath.timeLeft.days > 0 && <div className="time-box"><span>{nextNakath.timeLeft.days}</span><small>දින</small></div>}
              <div className="time-box"><span>{nextNakath.timeLeft.hours.toString().padStart(2, '0')}</span><small>පැය</small></div>
              <div className="time-box"><span>{nextNakath.timeLeft.minutes.toString().padStart(2, '0')}</span><small>මිනිත්තු</small></div>
              <div className="time-box highlight"><span>{nextNakath.timeLeft.seconds.toString().padStart(2, '0')}</span><small>තත්පර</small></div>
            </div>
          </>
        ) : (
          <div className="main-countdown-title">සියලුම අවුරුදු නැකත් නිමාවී ඇත</div>
        )}
      </div>

      <main className="nakath-grid">
        {nakathData.map((item) => {
          const timeObj = currentTimes[item.id];
          const isPassed = timeObj?.passed;
          
          if (isPassed) return null;

          return (
            <div key={item.id} className="nakath-card">
              <div className="card-header">
                <div className="icon-container">
                  <item.icon size={24} />
                </div>
                <h2 className="card-title">{item.title}</h2>
              </div>
              
              <div className="card-description">
                <p>{item.description}</p>
              </div>

              <div className="card-countdown">
                <Timer className="detail-icon" size={18} />
                <span className="countdown-text">
                  {timeObj ? formatTimeLeft(timeObj) : 'ගණනය කරමින්...'}
                </span>
              </div>
            </div>
          );
        })}
      </main>

      <footer className="footer">
        <p>Wishing you a prosperous Sinhala & Tamil New Year!</p>
        <p>@2026 Awurudu Nakath - Created by <a href="https://www.facebook.com/sandeesha.rukshan.3" target="_blank" rel="noreferrer" style={{color: 'var(--primary-gold)', textDecoration: 'none'}}>Sandeesha Rukshan</a></p>
      </footer>
    </div>
  );
}

export default App;
