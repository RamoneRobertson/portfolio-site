const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Turns **key term** into <mark class="term">key term</mark>. Everything else is escaped.
export const emphasize = (s: string) => escape(s).replace(/\*\*(.+?)\*\*/g, '<mark class="term">$1</mark>');

// Splits a stat like "80%" or "50+" into the number to count up to and what follows it.
export const splitStat = (value: string) => {
  const m = value.match(/^(\d+)(.*)$/);
  return m ? { n: Number(m[1]), suffix: m[2] } : null;
};
