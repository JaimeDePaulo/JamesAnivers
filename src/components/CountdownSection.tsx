import React from 'react';
import { motion } from 'motion/react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isBirthday: boolean;
}

interface CountdownSectionProps {
  timeRemaining: TimeRemaining;
}

function padZero(value: number): string {
  return String(Math.max(0, value)).padStart(2, '0');
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ timeRemaining }) => {
  const units = [
    { label: 'Dias', value: padZero(timeRemaining.days) },
    { label: 'Horas', value: padZero(timeRemaining.hours) },
    { label: 'Minutos', value: padZero(timeRemaining.minutes) },
    { label: 'Segundos', value: padZero(timeRemaining.seconds) },
  ];

  return (
    <section
      id="contagem"
      aria-labelledby="hero-title"
      className="relative flex min-h-[82vh] flex-col items-center justify-center px-6 py-20 text-center sm:px-10 lg:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-3xl"
      >
        <p className="font-display text-lg italic tracking-wide text-[#D4AF37] sm:text-xl">
          {BIRTHDAY_CONFIG.kicker}
        </p>

        <h1
          id="hero-title"
          className="mt-4 font-display text-5xl font-semibold tracking-tight text-[#F8FAFC] sm:text-6xl lg:text-7xl"
          style={{ textWrap: 'balance' }}
        >
          {BIRTHDAY_CONFIG.eventTitle}
        </h1>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm font-medium tracking-wide text-[#CBD5E1] sm:text-base">
          <span>{BIRTHDAY_CONFIG.celebrantName}</span>
          <span aria-hidden="true" className="text-[#D4AF37]">
            ·
          </span>
          <time dateTime="2026-11-15">{BIRTHDAY_CONFIG.dateDisplay}</time>
          <span aria-hidden="true" className="text-[#D4AF37]">
            ·
          </span>
          <span>{BIRTHDAY_CONFIG.locationDisplay}</span>
        </div>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-[#CBD5E1] sm:text-lg">
          {BIRTHDAY_CONFIG.heroMessage}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 w-full max-w-3xl"
      >
        {timeRemaining.isBirthday ? (
          <div
            role="status"
            aria-live="polite"
            className="rounded-2xl border border-[#D4AF37]/40 bg-[#0B1528]/90 px-6 py-10 shadow-2xl sm:px-10 sm:py-12"
          >
            <p className="font-display text-3xl font-semibold text-[#F3E5AB] sm:text-4xl">
              {BIRTHDAY_CONFIG.celebrationTitle}
            </p>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#E2E8F0] sm:text-lg">
              {BIRTHDAY_CONFIG.celebrationMessage}
            </p>
          </div>
        ) : (
          <div
            role="timer"
            aria-label="Contagem regressiva para o aniversário"
            className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5"
          >
            {units.map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center justify-center rounded-2xl border border-[#D4AF37]/25 bg-[#0B1528]/85 px-4 py-6 backdrop-blur-sm transition-colors duration-200 hover:border-[#D4AF37]/50 sm:py-8"
              >
                <span className="font-mono text-4xl font-semibold tracking-tight text-[#F3E5AB] tabular-nums sm:text-5xl lg:text-6xl">
                  {unit.value}
                </span>
                <span className="mt-2 text-xs font-medium tracking-widest text-[#94A3B8] uppercase sm:text-sm">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};
