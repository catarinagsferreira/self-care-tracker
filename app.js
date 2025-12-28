const STORAGE_KEY = "selfcare_v1";

/** Light/Dark theme (icon buttons in footer) */
const THEME_KEY = "selfcare_theme";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme; // "light" or "dark"
  localStorage.setItem(THEME_KEY, theme);
}

(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") {
    applyTheme(saved);
    return;
  }

  // Default based on system preference
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  applyTheme(prefersDark ? "dark" : "light");
})();

document.getElementById("lightBtn")?.addEventListener("click", () => applyTheme("light"));
document.getElementById("darkBtn")?.addEventListener("click", () => applyTheme("dark"));

/** Motivational quotes (random, with button to refresh) */
const QUOTES = [
  { text: "Progress, not perfection.", author: "Unknown", meta: "[Unknown]" },
  { text: "Small steps every day add up to big results.", author: "Unknown", meta: "[Unknown]" },
  { text: "You don’t have to do it all—just do what you can today.", author: "Unknown", meta: "[Unknown]" },
  { text: "Motivation gets you started. Habit keeps you going.", author: "Jim Ryun", meta: "[Olympic athlete & politician]" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Will Durant", meta: "[Philosopher & writer]" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain", meta: "[Writer]" },
  { text: "It always seems impossible until it’s done.", author: "Nelson Mandela", meta: "[Anti-apartheid leader & president]" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt", meta: "[U.S. president]" },
  { text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky", meta: "[Professional hockey player]" },
  { text: "If you’re going through hell, keep going.", author: "Winston Churchill", meta: "[Prime minister]" },
  { text: "The best way out is always through.", author: "Robert Frost", meta: "[Poet]" },
  { text: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt", meta: "[U.S. president]" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Often attributed to Abraham Lincoln", meta: "[Attributed quote]" },
  { text: "Done is better than perfect.", author: "Sheryl Sandberg", meta: "[COO & author]" },
  { text: "Simplicity is the ultimate sophistication.", author: "Often attributed to Leonardo da Vinci", meta: "[Attributed quote]" },
  { text: "What we fear doing most is usually what we most need to do.", author: "Often attributed to Ralph Waldo Emerson", meta: "[Attributed quote]" },
  { text: "Fall seven times and stand up eight.", author: "Japanese proverb", meta: "[Proverb]" },
  { text: "A year from now you may wish you had started today.", author: "Karen Lamb", meta: "[Author]" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi", meta: "[Leader & activist]" },
  { text: "If it matters to you, you’ll find a way.", author: "Unknown", meta: "[Unknown]" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe", meta: "[Tennis player & activist]" },
  { text: "If you get tired, learn to rest—not to quit.", author: "Often attributed to Banksy", meta: "[Attributed quote]" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier", meta: "[Author]" },
  { text: "Hard choices, easy life. Easy choices, hard life.", author: "Jerzy Gregorek", meta: "[Weightlifter & coach]" },
  { text: "You can’t improve what you don’t measure.", author: "Often attributed to Peter Drucker", meta: "[Attributed quote]" },
  { text: "Make it work, then make it better.", author: "Unknown", meta: "[Unknown]" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", meta: "[Entrepreneur]" },
  { text: "Courage is like a muscle. We strengthen it by use.", author: "Ruth Gordon", meta: "[Actress & writer]" },
  { text: "Little by little, a little becomes a lot.", author: "Tanzanian proverb", meta: "[Proverb]" },
  { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu", meta: "[Philosopher]" },

  { text: "Self-care is not self-indulgence, it is self-preservation.", author: "Audre Lorde", meta: "[Poet & civil rights activist]" },
  { text: "You can’t pour from an empty cup.", author: "Unknown", meta: "[Unknown]" },
  { text: "Nothing will work unless you do.", author: "Maya Angelou", meta: "[Poet & civil rights activist]" },
  { text: "If you want to go fast, go alone. If you want to go far, go together.", author: "African proverb", meta: "[Proverb]" },
  { text: "You don’t have to be perfect to be amazing.", author: "Unknown", meta: "[Unknown]" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso", meta: "[Artist]" },
  { text: "In the middle of difficulty lies opportunity.", author: "Often attributed to Albert Einstein", meta: "[Attributed quote]" },
  { text: "Make your life a masterpiece; imagine no limitations on what you can be, have, or do.", author: "Brian Tracy", meta: "[Author & motivational speaker]" },
  { text: "What you do every day matters more than what you do once in a while.", author: "Gretchen Rubin", meta: "[Author]" },
  { text: "Don’t judge each day by the harvest you reap but by the seeds that you plant.", author: "Robert Louis Stevenson", meta: "[Writer]" },
  { text: "No one can make you feel inferior without your consent.", author: "Eleanor Roosevelt", meta: "[Diplomat & activist]" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt", meta: "[U.S. president]" },
  { text: "You are allowed to be both a masterpiece and a work in progress.", author: "Often attributed to Sophia Bush", meta: "[Attributed quote]" },
  { text: "Consistency is a form of self-respect.", author: "Unknown", meta: "[Unknown]" },
  { text: "If it’s worth doing, it’s worth doing badly at first.", author: "Unknown", meta: "[Unknown]" }
];

let currentQuoteIndex = null;

function pickRandomIndex(excludeIndex) {
  if (QUOTES.length <= 1) return 0;

  let idx = Math.floor(Math.random() * QUOTES.length);
  while (idx === excludeIndex) {
    idx = Math.floor(Math.random() * QUOTES.length);
  }
  return idx;
}

function renderQuote(idx) {
  const q = QUOTES[idx];
  const textEl = document.getElementById("quoteText");
  const metaEl = document.getElementById("quoteMeta");
  if (!textEl || !metaEl) return;

  textEl.textContent = `“${q.text}”`;
  metaEl.textContent = `— ${q.author} ${q.meta}`;
  currentQuoteIndex = idx;
}

function showRandomQuote() {
  renderQuote(pickRandomIndex(currentQuoteIndex));
}

/** Self-care tracker + notes (saved locally) */
const els = {
  resetBtn: document.getElementById("resetBtn"),
  morning: document.getElementById("morning"),
  night: document.getElementById("night"),
  playlist: document.getElementById("playlist"),
  quote: document.getElementById("quote"),
  goals: document.getElementById("goals"),
};

function weekKey(date = new Date()) {
  // key per week (ISO-ish). good enough for a demo.
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${weekNo}`;
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { week: weekKey(), tracker: {}, text: {} };
  try { return JSON.parse(raw); }
  catch { return { week: weekKey(), tracker: {}, text: {} }; }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function ensureWeek(state) {
  const current = weekKey();
  if (state.week !== current) {
    state.week = current;
    state.tracker = {};
  }
}

function initTracker(state) {
  document.querySelectorAll(".row[data-habit]").forEach(row => {
    const habit = row.dataset.habit;
    const checks = row.querySelectorAll('input[type="checkbox"]');

    checks.forEach(cb => {
      const day = cb.dataset.day;
      cb.checked = !!(state.tracker?.[habit]?.[day]);

      cb.addEventListener("change", () => {
        state.tracker[habit] ??= {};
        state.tracker[habit][day] = cb.checked;
        saveState(state);
      });
    });
  });
}

function initText(state) {
  const text = state.text ?? {};
  if (text.morningHTML) els.morning.innerHTML = text.morningHTML;
  if (text.nightHTML) els.night.innerHTML = text.nightHTML;
  if (text.playlist) els.playlist.value = text.playlist;
  if (text.quote) els.quote.value = text.quote;
  if (text.goals) els.goals.value = text.goals;

  const saveText = () => {
    state.text = {
      morningHTML: els.morning.innerHTML,
      nightHTML: els.night.innerHTML,
      playlist: els.playlist.value,
      quote: els.quote.value,
      goals: els.goals.value,
    };
    saveState(state);
  };

  els.morning.addEventListener("input", saveText);
  els.night.addEventListener("input", saveText);
  els.playlist.addEventListener("input", saveText);
  els.quote.addEventListener("input", saveText);
  els.goals.addEventListener("input", saveText);
}

function initReset(state) {
  els.resetBtn.addEventListener("click", () => {
    state.tracker = {};
    saveState(state);

    document.querySelectorAll('.tracker input[type="checkbox"]').forEach(cb => {
      cb.checked = false;
    });
  });
}

(function main() {
  // Quotes
  showRandomQuote();
  document.getElementById("newQuoteBtn")?.addEventListener("click", showRandomQuote);

  // Tracker
  const state = loadState();
  ensureWeek(state);
  saveState(state);

  initTracker(state);
  initText(state);
  initReset(state);
})();
