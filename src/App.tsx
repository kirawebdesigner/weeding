import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Clock, Calendar, ChevronDown, CheckCircle2, QrCode } from 'lucide-react';

// --- Components ---

const FadeIn = ({ children, delay = 0, key }: { children: React.ReactNode; delay?: number; key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-charcoal text-offwhite">
      {/* Background Image Placeholder */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://picsum.photos/seed/wedding-couple/800/1200" 
          alt="Endashaw & Kalkidan" 
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="relative z-20 flex flex-col items-center text-center px-6 mt-20">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-sm tracking-[0.3em] uppercase mb-6 text-champagne font-sans"
        >
          We are getting married
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-8"
        >
          Endashaw<br />
          <span className="text-champagne italic text-4xl md:text-6xl my-2 block">&amp;</span>
          Kalkidan
        </motion.h1>

        {/* Decorative Divider */}
        <motion.div 
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "60px" }}
          transition={{ duration: 1, delay: 1 }}
          className="h-[1px] bg-champagne mb-8"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col items-center gap-2 font-sans font-light tracking-wide text-sm md:text-base"
        >
          <p>Sunday, July 19, 2026</p>
          <p>Addis Ababa, Ethiopia</p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 z-20 text-champagne"
      >
        <ChevronDown size={24} className="animate-bounce" />
      </motion.div>
    </section>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-07-19T10:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-6 bg-offwhite text-charcoal flex justify-center">
      <FadeIn>
        <div className="flex gap-8 md:gap-16 text-center">
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-serif text-champagne mb-2">{timeLeft.days}</span>
            <span className="text-xs tracking-widest uppercase font-sans text-charcoal/60">Days</span>
          </div>
          <div className="w-[1px] h-12 bg-charcoal/10 self-center" />
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-serif text-champagne mb-2">{timeLeft.hours}</span>
            <span className="text-xs tracking-widest uppercase font-sans text-charcoal/60">Hours</span>
          </div>
          <div className="w-[1px] h-12 bg-charcoal/10 self-center" />
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-serif text-champagne mb-2">{timeLeft.minutes}</span>
            <span className="text-xs tracking-widest uppercase font-sans text-charcoal/60">Mins</span>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

const InvitationMessage = () => (
  <section className="py-24 px-8 bg-offwhite text-center max-w-2xl mx-auto">
    <FadeIn>
      <div className="mb-12">
        <p className="font-serif italic text-xl md:text-2xl text-charcoal/80 leading-relaxed">
          "Therefore what God has joined together, let no one separate."
        </p>
        <p className="text-xs tracking-widest uppercase mt-4 text-champagne font-sans">Mark 10:9</p>
      </div>
      
      <div className="w-12 h-[1px] bg-champagne mx-auto mb-12" />
      
      <h2 className="text-3xl font-serif mb-6">The Invitation</h2>
      <p className="font-sans font-light text-charcoal/70 leading-loose text-sm md:text-base">
        Together with our families, we joyfully invite you to share in our happiness as we unite in marriage. Your presence, love, and prayers will make our special day complete.
      </p>
    </FadeIn>
  </section>
);

const Timeline = () => {
  const events = [
    { time: "10:00 AM", title: "Church Ceremony", location: "Ledeta Church", icon: <Clock size={20} /> },
    { time: "2:00 PM", title: "Photoshoot", location: "Selected Locations", icon: <Calendar size={20} /> },
    { time: "6:00 PM", title: "Dinner & Reception", location: "Grand Palace Hotel", icon: <CheckCircle2 size={20} /> },
  ];

  return (
    <section className="py-24 px-6 bg-charcoal text-offwhite">
      <div className="max-w-md mx-auto">
        <FadeIn>
          <h2 className="text-3xl font-serif text-center mb-16 text-champagne">Wedding Day</h2>
        </FadeIn>
        
        <div className="relative border-l border-champagne/30 ml-4 md:ml-8">
          {events.map((event, index) => (
            <FadeIn key={index} delay={index * 0.2}>
              <div className="mb-12 ml-8 relative">
                <div className="absolute -left-[41px] top-1 w-8 h-8 rounded-full bg-charcoal border border-champagne text-champagne flex items-center justify-center">
                  {event.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-champagne font-sans text-sm font-medium tracking-wider mb-1">{event.time}</span>
                  <h3 className="text-xl font-serif mb-1">{event.title}</h3>
                  <p className="text-offwhite/60 font-sans text-sm font-light">{event.location}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const LocationMap = () => (
  <section className="py-24 px-6 bg-offwhite">
    <div className="max-w-md mx-auto">
      <FadeIn>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif mb-4">The Venue</h2>
          <p className="font-sans font-light text-charcoal/70 text-sm">Ledeta Church, Addis Ababa</p>
        </div>
        
        <div className="bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-charcoal/5">
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-6 relative">
            {/* Placeholder for Map */}
            <img 
              src="https://picsum.photos/seed/map-placeholder/600/400?blur=2" 
              alt="Map Location"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-champagne">
                <MapPin size={24} />
              </div>
            </div>
          </div>
          
          <div className="text-center pb-2">
            <a 
              href="https://maps.app.goo.gl/K8oHaiM4tbP2E26g6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 rounded-full border border-champagne text-champagne font-sans text-sm tracking-widest uppercase hover:bg-champagne hover:text-white transition-colors duration-300"
            >
              Get Directions
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

const Gallery = () => {
  const images = [
    "https://picsum.photos/seed/wed1/400/600",
    "https://picsum.photos/seed/wed2/400/600",
    "https://picsum.photos/seed/wed3/400/600",
    "https://picsum.photos/seed/wed4/400/600",
  ];

  return (
    <section className="py-24 bg-charcoal overflow-hidden">
      <FadeIn>
        <h2 className="text-3xl font-serif text-center mb-12 text-champagne">Moments</h2>
        
        <div className="flex overflow-x-auto gap-4 px-6 pb-8 hide-scrollbar snap-x snap-mandatory">
          {images.map((src, i) => (
            <div key={i} className="min-w-[280px] md:min-w-[320px] aspect-[3/4] snap-center shrink-0 rounded-xl overflow-hidden">
              <img 
                src={src} 
                alt={`Gallery ${i + 1}`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
};

const RSVPForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-24 px-6 bg-offwhite">
      <div className="max-w-md mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-4">RSVP</h2>
            <p className="font-sans font-light text-charcoal/70 text-sm">Please respond by June 19, 2026</p>
          </div>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 rounded-2xl text-center border border-champagne/20 shadow-sm"
            >
              <div className="w-16 h-16 bg-champagne/10 rounded-full flex items-center justify-center mx-auto mb-4 text-champagne">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-serif mb-2">Thank You!</h3>
              <p className="font-sans text-sm text-charcoal/70">Your response has been recorded.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-charcoal/5 flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs tracking-widest uppercase text-charcoal/60">Full Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full border-b border-charcoal/20 py-2 bg-transparent font-serif text-lg focus:outline-none focus:border-champagne transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-sans text-xs tracking-widest uppercase text-charcoal/60">Will you attend?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="attendance" value="yes" required className="accent-champagne w-4 h-4" />
                    <span className="font-sans text-sm group-hover:text-champagne transition-colors">Joyfully Accept</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="attendance" value="no" className="accent-champagne w-4 h-4" />
                    <span className="font-sans text-sm group-hover:text-champagne transition-colors">Regretfully Decline</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-sans text-xs tracking-widest uppercase text-charcoal/60">Which side are you on?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="side" value="groom" required className="accent-champagne w-4 h-4" />
                    <span className="font-sans text-sm group-hover:text-champagne transition-colors">Groom</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="side" value="bride" className="accent-champagne w-4 h-4" />
                    <span className="font-sans text-sm group-hover:text-champagne transition-colors">Bride</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs tracking-widest uppercase text-charcoal/60">Message to the Couple</label>
                <textarea 
                  rows={3}
                  className="w-full border-b border-charcoal/20 py-2 bg-transparent font-serif text-base focus:outline-none focus:border-champagne transition-colors resize-none"
                  placeholder="Leave a wish..."
                />
              </div>

              <button 
                type="submit"
                className="mt-4 w-full bg-charcoal text-white py-4 rounded-full font-sans text-sm tracking-widest uppercase hover:bg-champagne transition-colors duration-300"
              >
                Send RSVP
              </button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
};

const DigitalPass = () => (
  <section className="py-24 px-6 bg-charcoal text-offwhite border-t border-offwhite/10">
    <div className="max-w-sm mx-auto text-center">
      <FadeIn>
        <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center mx-auto mb-6 text-champagne">
          <QrCode size={24} />
        </div>
        <h2 className="text-2xl font-serif mb-2">Digital Pass</h2>
        <p className="font-sans text-sm text-offwhite/60 mb-8">Show this code at the entrance</p>
        
        <div className="bg-white p-4 rounded-2xl inline-block">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WeddingPass-EndashawKalkidan`} 
            alt="QR Code" 
            className="w-48 h-48"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="mt-12 text-xs font-sans tracking-widest uppercase text-offwhite/40">
          Endashaw & Kalkidan • 2026
        </div>
      </FadeIn>
    </div>
  </section>
);

export default function App() {
  return (
    <main className="min-h-screen bg-offwhite selection:bg-champagne selection:text-white">
      <div className="max-w-[480px] mx-auto bg-offwhite shadow-2xl overflow-hidden relative">
        <Hero />
        <Countdown />
        <InvitationMessage />
        <Timeline />
        <LocationMap />
        <Gallery />
        <RSVPForm />
        <DigitalPass />
      </div>
    </main>
  );
}
