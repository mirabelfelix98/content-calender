import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DAYS, WEEKS } from './data';
import { DayContent } from './types';

export default function App() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [openDays, setOpenDays] = useState<number[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDay = (day: number) => {
    setOpenDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const filteredDays = DAYS.filter((day) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'web') return day.isWebDay;
    return day.week === parseInt(activeFilter);
  });

  const totalPosts = DAYS.length * 3;
  const webDaysCount = DAYS.filter(d => d.isWebDay).length;

  return (
    <div className="min-h-screen pb-20">
      {/* Progress Bar */}
      <div 
        className="fixed bottom-0 left-0 h-[3px] bg-linear-to-r from-gold to-gold-light transition-[width] duration-300 z-[999]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header */}
      <header className="bg-surface border-b border-border-gold p-6 pt-8 text-center sticky top-0 z-100 backdrop-blur-xl">
        <div className="font-serif text-[1rem] tracking-[0.25em] text-gold uppercase mb-1">
          Emmason Designs
        </div>
        <h1 className="font-serif text-[clamp(1.6rem,4vw,2.4rem)] font-bold text-[#E8E4DC] mb-3">
          30-Day <span className="text-gold">Content</span> Calendar
        </h1>
        <div className="flex gap-4 justify-center flex-wrap mt-3">
          <div className="flex items-center gap-1.5 text-[12px] text-muted">
            <div className="w-2 h-2 rounded-full bg-tiktok" /> TikTok
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-muted">
            <div className="w-2 h-2 rounded-full bg-instagram" /> Instagram
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-muted">
            <div className="w-2 h-2 rounded-full bg-twitter" /> Twitter/X
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-muted">
            <div className="w-2 h-2 rounded-full bg-gold" /> Web / Landing Page Day
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="p-5 flex gap-2 flex-wrap justify-center bg-bg border-b border-white/5">
        <button 
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-1.5 rounded-full border border-border-gold text-[12px] cursor-pointer transition-all ${activeFilter === 'all' ? 'bg-gold border-gold text-black font-semibold' : 'bg-transparent text-muted hover:bg-gold hover:border-gold hover:text-black'}`}
        >
          All 30 Days
        </button>
        {WEEKS.map((week) => (
          <button 
            key={week.week}
            onClick={() => setActiveFilter(week.week.toString())}
            className={`px-4 py-1.5 rounded-full border border-border-gold text-[12px] cursor-pointer transition-all ${activeFilter === week.week.toString() ? 'bg-gold border-gold text-black font-semibold' : 'bg-transparent text-muted hover:bg-gold hover:border-gold hover:text-black'}`}
          >
            Week {week.week}
          </button>
        ))}
        <button 
          onClick={() => setActiveFilter('web')}
          className={`px-4 py-1.5 rounded-full border border-border-gold text-[12px] cursor-pointer transition-all ${activeFilter === 'web' ? 'bg-gold border-gold text-black font-semibold' : 'bg-transparent text-muted hover:bg-gold hover:border-gold hover:text-black'}`}
        >
          🌐 Web Days Only
        </button>
      </div>

      <main className="p-6 max-w-[900px] mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-surface border border-border-gold rounded-xl p-4 text-center">
            <div className="font-serif text-3xl font-bold text-gold">{totalPosts}</div>
            <div className="text-[11px] text-muted uppercase tracking-wider">Total Posts</div>
          </div>
          <div className="bg-surface border border-border-gold rounded-xl p-4 text-center">
            <div className="font-serif text-3xl font-bold text-gold">{webDaysCount}</div>
            <div className="text-[11px] text-muted uppercase tracking-wider">Web-Focused Days</div>
          </div>
          <div className="bg-surface border border-border-gold rounded-xl p-4 text-center">
            <div className="font-serif text-3xl font-bold text-gold">3</div>
            <div className="text-[11px] text-muted uppercase tracking-wider">Platforms</div>
          </div>
        </div>

        {/* Pillars */}
        <div className="bg-surface border border-border-gold rounded-xl p-5 mb-8">
          <div className="text-[10px] text-muted uppercase tracking-[0.12em] mb-3">Content Pillars</div>
          <div className="flex flex-wrap gap-2">
            {[
              '🎓 Education', '✨ Before & After', '💥 Myth Busting', '🌍 Niche Education',
              '🖼️ Showcase', '💼 Client Story', '🙌 Personality', '🌐 Web & Landing Pages'
            ].map((pillar) => (
              <span key={pillar} className="text-[12px] px-2.5 py-1 rounded-full bg-gold-dim border border-border-gold text-gold">
                {pillar}
              </span>
            ))}
          </div>
        </div>

        {/* Calendar Content */}
        {WEEKS.map((week) => {
          const weekDays = filteredDays.filter(d => d.week === week.week);
          if (weekDays.length === 0) return null;

          return (
            <div key={week.week} className="mb-8">
              <div className="font-serif text-[1.3rem] text-gold tracking-wider mb-4 pb-2 border-b border-border-gold flex items-center gap-3">
                {week.title} <span className="font-sans text-[11px] tracking-[0.15em] text-muted uppercase">— {week.subtitle}</span>
              </div>
              
              <div className="space-y-3">
                {weekDays.map((day) => (
                  <div key={day.day} className={`day-card ${day.isWebDay ? 'web-day' : ''}`}>
                    <div 
                      className="day-header"
                      onClick={() => toggleDay(day.day)}
                    >
                      <div className="day-num">{day.day}</div>
                      <div className="day-meta">
                        <div className="day-theme">{day.theme}</div>
                        <div className="day-pillar">
                          {day.pillar}
                          {day.isWebDay && <span className="web-badge">WEB DAY</span>}
                        </div>
                      </div>
                      <motion.div 
                        animate={{ rotate: openDays.includes(day.day) ? 180 : 0 }}
                        className="text-muted text-lg"
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {openDays.includes(day.day) && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 flex flex-col gap-3">
                            {day.posts.map((post, idx) => (
                              <div key={idx} className={`platform-post ${post.platform}`}>
                                <div className="platform-name">{post.platform}</div>
                                <span className="post-type">{post.type}</span>
                                <div className="post-content">{post.content}</div>
                                {post.caption && <div className="post-caption">{post.caption}</div>}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
