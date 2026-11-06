import React, { useEffect, useState } from 'react';
import { BIRTHDAY_CONFIG } from './config/birthdayConfig';
import { ParticleCanvas } from './components/ParticleCanvas';
import { CountdownSection, TimeRemaining } from './components/CountdownSection';
import { GiftSection } from './components/GiftSection';
import { Footer } from './components/Footer';

function calculateTimeRemaining(targetIsoDate: string): TimeRemaining {
  const targetTime = new Date(targetIsoDate).getTime();
  const now = Date.now();
  const diff = targetTime - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isBirthday: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isBirthday: false,
  };
}

export function App() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(BIRTHDAY_CONFIG.targetIsoDate)
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(BIRTHDAY_CONFIG.targetIsoDate));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#060D1A] text-[#F8FAFC]">
      {/* Efeitos subtis de luz ambiente (azul-escuro, preto e dourado) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[520px] w-[780px] -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.07] blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 h-[420px] w-[620px] rounded-full bg-[#1E3A8A]/[0.18] blur-[150px]" />
      </div>

      <ParticleCanvas isBirthday={timeRemaining.isBirthday} />

      {/* Barra de navegação superior limpa (3 zonas) */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-8 border-b border-[#D4AF37]/15 px-6 py-4 sm:px-10">
        <a
          href="#contagem"
          className="font-display text-xl font-semibold tracking-tight text-[#F3E5AB] whitespace-nowrap shrink-0"
        >
          {BIRTHDAY_CONFIG.shortName}
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 text-sm font-medium text-[#CBD5E1] md:flex"
        >
          <a
            href="#contagem"
            className="transition-colors hover:text-[#F3E5AB] whitespace-nowrap shrink-0"
          >
            Contagem
          </a>
          <a
            href="#prenda"
            className="transition-colors hover:text-[#F3E5AB] whitespace-nowrap shrink-0"
          >
            Prenda
          </a>
          <a
            href="#comprovativo"
            className="transition-colors hover:text-[#F3E5AB] whitespace-nowrap shrink-0"
          >
            Comprovativo
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <a
            href="#prenda"
            className="rounded-lg border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-4 py-2 text-xs font-semibold tracking-wide text-[#F3E5AB] transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37]/25 whitespace-nowrap shrink-0"
          >
            Oferecer Prenda
          </a>
        </div>
      </header>

      <main className="relative z-10">
        <CountdownSection timeRemaining={timeRemaining} />
        <GiftSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
