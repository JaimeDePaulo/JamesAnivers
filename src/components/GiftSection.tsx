import React, { useState } from 'react';
import { Check, Copy, MessageCircle, Info } from 'lucide-react';
import { BIRTHDAY_CONFIG, getWhatsAppUrl } from '../config/birthdayConfig';

export const GiftSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyNumber = async () => {
    const numberToCopy = BIRTHDAY_CONFIG.multicaixaNumber;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(numberToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = numberToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(false);
    }
  };

  const whatsappUrl = getWhatsAppUrl();

  return (
    <section
      id="prenda"
      aria-labelledby="gift-title"
      className="relative mx-auto max-w-3xl px-6 py-16 sm:px-10 lg:py-24"
    >
      <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#0B1528]/90 p-6 backdrop-blur-sm sm:p-10 lg:p-12">
        <div className="text-center">
          <h2
            id="gift-title"
            className="font-display text-3xl font-semibold tracking-tight text-[#F8FAFC] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            {BIRTHDAY_CONFIG.giftSectionTitle}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#CBD5E1]">
            {BIRTHDAY_CONFIG.giftSectionDescription}
          </p>
        </div>

        {/* Dados Multicaixa Express */}
        <div className="mt-10 border-t border-b border-[#D4AF37]/20 py-7">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
            <div>
              <dt className="text-xs font-medium tracking-wider text-[#94A3B8] uppercase">
                Titular
              </dt>
              <dd className="mt-1.5 text-base font-medium text-[#F8FAFC]">
                {BIRTHDAY_CONFIG.giftHolder}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium tracking-wider text-[#94A3B8] uppercase">
                Método
              </dt>
              <dd className="mt-1.5 text-base font-medium text-[#F8FAFC]">
                {BIRTHDAY_CONFIG.giftMethod}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium tracking-wider text-[#94A3B8] uppercase">
                Número
              </dt>
              <dd className="mt-1.5 font-mono text-lg font-semibold tracking-wide text-[#F3E5AB] tabular-nums">
                {BIRTHDAY_CONFIG.multicaixaNumber}
              </dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleCopyNumber}
              className={`inline-flex min-h-[44px] w-full items-center justify-center gap-2.5 rounded-xl border px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] sm:w-auto whitespace-nowrap shrink-0 cursor-pointer ${
                copied
                  ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#F3E5AB]'
                  : 'border-[#D4AF37]/50 bg-[#101E36] text-[#F3E5AB] hover:border-[#D4AF37] hover:bg-[#D4AF37]/15'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
                  <span>Número copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
                  <span>Copiar número</span>
                </>
              )}
            </button>
          </div>

          <div aria-live="polite" className="sr-only">
            {copied ? 'Número Multicaixa Express copiado para a área de transferência.' : ''}
          </div>
        </div>

        {/* Secção Enviar Comprovativo */}
        <div id="comprovativo" className="mt-10 text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl bg-[#16A34A] px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#15803D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22C55E] sm:w-auto whitespace-nowrap shrink-0"
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>Enviar comprovativo pelo WhatsApp</span>
          </a>

          <p className="mx-auto mt-4 flex max-w-lg items-start justify-center gap-2 text-xs leading-relaxed text-[#94A3B8] sm:text-sm">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
            <span>
              O WhatsApp não permite anexar ficheiros automaticamente através deste link. Depois de
              abrir a conversa, selecciona manualmente a imagem ou PDF do comprovativo e envia a
              mensagem.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
