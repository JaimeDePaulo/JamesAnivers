import React from 'react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-[#D4AF37]/15 bg-[#030711]/80 px-6 py-14 text-center sm:px-10">
      <div className="mx-auto max-w-2xl">
        <p className="text-base leading-relaxed text-[#CBD5E1] sm:text-lg">
          {BIRTHDAY_CONFIG.footerMessage}
        </p>
        <p className="mt-5 font-display text-xl font-medium italic text-[#D4AF37] sm:text-2xl">
          {BIRTHDAY_CONFIG.footerSignature}
        </p>
      </div>
    </footer>
  );
};
