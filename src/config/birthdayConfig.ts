export const BIRTHDAY_CONFIG = {
  celebrantName: 'Jaime Ngalelo de Paulo',
  shortName: 'Jaime de Paulo',
  eventTitle: "Jaime's Birthday",
  kicker: 'Um novo capítulo começa...',
  dateDisplay: '15 de Novembro de 2026',
  locationDisplay: 'Luanda, Angola',
  // 15/11/2026 às 00h00 no fuso horário de Angola (Africa/Luanda, UTC+1)
  targetIsoDate: '2026-11-15T00:00:00+01:00',
  heroMessage:
    'Mais um ano de vida, novas histórias, novos desafios e infinitas razões para agradecer. Quero celebrar este momento contigo!',
  celebrationTitle: 'Chegou o grande dia!',
  celebrationMessage:
    'Feliz Aniversário, Jaime Ngalelo de Paulo! Que este novo capítulo seja repleto de saúde, conquistas, luz e momentos inesquecíveis.',

  // Dados Multicaixa Express
  giftSectionTitle: 'Queres oferecer-me uma prenda especial? 🎁',
  giftSectionDescription:
    'A tua presença já é um presente, mas se quiseres fazer parte desta celebração de uma forma especial, podes oferecer uma prenda através do Multicaixa Express. Qualquer gesto será recebido com muita gratidão!',
  giftHolder: 'Jaime Ngalelo de Paulo',
  giftMethod: 'Multicaixa Express',
  multicaixaNumber: '945880831',

  // Número de WhatsApp configurável, separado do número Multicaixa Express (formato internacional sem '+')
  whatsappNumber: '244939785068',
  whatsappMessage:
    'Olá Jaime! 🎉 Já enviei a minha prenda de aniversário. Segue o comprovativo da minha contribuição. Um abraço e feliz aniversário!',

  // Rodapé
  footerMessage:
    'Obrigado por fazeres parte da minha história. Cada gesto, cada mensagem e cada demonstração de carinho tornam este dia ainda mais especial.',
  footerSignature: 'Com carinho, Jaime de Paulo.',
} as const;

export function getWhatsAppUrl(): string {
  const encodedText = encodeURIComponent(BIRTHDAY_CONFIG.whatsappMessage);
  return `https://wa.me/${BIRTHDAY_CONFIG.whatsappNumber}?text=${encodedText}`;
}
