const icons = [
  `<svg viewBox="0 0 64 64" aria-hidden="true">
     <rect x="6" y="6" width="52" height="52" rx="14" fill="#ff6b6b"/>
     <path d="M32 44s-12-7.8-12-16a6.5 6.5 0 0 1 12-3.7A6.5 6.5 0 0 1 44 28c0 8.2-12 16-12 16z" fill="#fff"/>
   </svg>`,
  `<svg viewBox="0 0 64 64" aria-hidden="true">
     <rect x="6" y="6" width="52" height="52" rx="14" fill="#4dabf7"/>
     <circle cx="32" cy="32" r="12" fill="#fff"/>
     <rect x="18" y="18" width="28" height="6" rx="3" fill="#fff"/>
   </svg>`,
  `<svg viewBox="0 0 64 64" aria-hidden="true">
     <rect x="6" y="6" width="52" height="52" rx="14" fill="#51cf66"/>
     <path d="M20 22h24a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6H28l-8 6v-6h-4a6 6 0 0 1-6-6V28a6 6 0 0 1 6-6z" fill="#fff"/>
   </svg>`,
  `<svg viewBox="0 0 64 64" aria-hidden="true">
     <rect x="6" y="6" width="52" height="52" rx="14" fill="#ffd43b"/>
     <path d="M32 18l4.2 8.6 9.4 1.4-6.8 6.6 1.6 9.4L32 39.6 23.6 44l1.6-9.4-6.8-6.6 9.4-1.4z" fill="#fff"/>
   </svg>`,
  `<svg viewBox="0 0 64 64" aria-hidden="true">
     <rect x="6" y="6" width="52" height="52" rx="14" fill="#845ef7"/>
     <rect x="18" y="20" width="28" height="20" rx="4" fill="#fff"/>
     <circle cx="32" cy="30" r="6" fill="#845ef7"/>
     <circle cx="32" cy="30" r="4" fill="#fff"/>
   </svg>`,
  `<svg viewBox="0 0 64 64" aria-hidden="true">
     <rect x="6" y="6" width="52" height="52" rx="14" fill="#ff922b"/>
     <path d="M36 18v18.5a6.5 6.5 0 1 1-3-5.6V22l13-3v13.5a6.5 6.5 0 1 1-3-5.6V18z" fill="#fff"/>
   </svg>`,
];

const steps = [
  {
    title: "Я люблю тебя",
    text: "Ты - мой самый любимый человек. Я хочу, чтобы этот квест напомнил тебе: я рядом.",
    img: "assets/1.png",
  },
  {
    title: "Первые приветствия",
    text: "29 декабря, наше первое знакомство, я рад что нашел тебя в подборе в этот день",
    img: "assets/2.png",
  },
  {
    title: "Милая улыбка",
    text: "Твоя улыбка — мой самый любимый свет.",
    img: "assets/3.png",
  },
  {
    title: "Разговор с любимой",
    text: "Это было наш самый длинный разговор, я очень ценю время которое мы проводим вместе",
    img: "assets/4.png",
  },
  {
    title: "Альпака",
    text: "Иногда я косячу, я не хочу повторять свои ошибки, мне важно чтобы тебе было хорошо",
    game: true,
  },
  {
    title: "Я тебя Люблю",
    text: "Ты вдохновляешь меня быть лучше — и я горжусь, что рядом с тобой.",
    final: true,
  },
];

const grid = document.getElementById("grid");
const home = document.getElementById("home");
const app = document.getElementById("app");
const appContent = document.getElementById("appContent");
const back = document.getElementById("back");

let unlockedIndex = 0;
let currentIndex = null;

function renderGrid() {
  grid.innerHTML = "";
  steps.forEach((step, index) => {
    const icon = document.createElement("button");
    icon.className = "icon" + (index > unlockedIndex ? " locked" : "");
    icon.type = "button";
    icon.setAttribute("data-index", index);
    const iconSvg = icons[index % icons.length];
    icon.innerHTML = `${iconSvg}`;

    if (index <= unlockedIndex) {
      icon.addEventListener("click", () => openStep(index));
    }

    grid.appendChild(icon);
  });
}

function openStep(index) {
  const step = steps[index];
  currentIndex = index;
  const img = step.img
    ? `<img src="${step.img}" alt="${step.title}" />`
    : "";
  const game = step.game
    ? `
      <div class="game">
        <p class="game-hint">Собери 3 одинаковые карточки.</p>
        <div class="cards" id="cards"></div>
        <div class="game-win hidden" id="gameWin">
          Альпака с тобой для меня чудесное проведение времени
          <div class="pulse-hearts" aria-hidden="true">
            <span>❤</span><span>❤</span><span>❤</span>
          </div>
        </div>
      </div>
    `
    : "";
  const finalBtn = step.final
    ? `<button class="love-btn" id="loveBtn" type="button">Нажми меня</button>
       <div class="hearts" id="hearts"></div>`
    : "";

  appContent.innerHTML = `
    <h2>${step.title}</h2>
    ${img}
    <p>${step.text}</p>
    ${game}
    ${finalBtn}
  `;

  home.classList.add("hidden");
  app.classList.remove("hidden");

  if (step.final) {
    const loveBtn = document.getElementById("loveBtn");
    const hearts = document.getElementById("hearts");
    loveBtn.addEventListener("click", () => spawnHearts(hearts, 18));
  }

  if (step.game) {
    const cards = document.getElementById("cards");
    const win = document.getElementById("gameWin");
    initGame(cards, win);
  }
}

function closeStep() {
  if (currentIndex !== null && currentIndex === unlockedIndex) {
    unlockedIndex = Math.min(unlockedIndex + 1, steps.length - 1);
  }

  currentIndex = null;
  app.classList.add("hidden");
  home.classList.remove("hidden");
  renderGrid();
}

back.addEventListener("click", closeStep);

renderGrid();

function spawnHearts(container, count) {
  if (!container) return;
  const colors = ["#ff6b6b", "#ff8787", "#ffa8a8", "#ffd6d6"];
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "❤";
    heart.style.left = `${Math.random() * 90 + 5}%`;
    heart.style.animationDuration = `${2 + Math.random() * 2}s`;
    heart.style.fontSize = `${14 + Math.random() * 16}px`;
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
}

function initGame(cardsEl, winEl) {
  if (!cardsEl) return;
  const symbols = ["🦙", "🌿", "⭐"];
  const deck = [...symbols, ...symbols, ...symbols];
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  cardsEl.innerHTML = "";
  const state = {
    open: [],
    matched: new Set(),
    lock: false,
    shownWin: false,
  };

  deck.forEach((symbol, index) => {
    const card = document.createElement("button");
    card.className = "card";
    card.type = "button";
    card.setAttribute("data-index", index);
    card.setAttribute("data-symbol", symbol);
    card.innerHTML = `<span class="card-face">${symbol}</span>`;
    card.addEventListener("click", () => onCardClick(card, state, winEl));
    cardsEl.appendChild(card);
  });
}

function onCardClick(card, state, winEl) {
  if (state.lock) return;
  if (card.classList.contains("matched")) return;
  if (card.classList.contains("open")) return;

  card.classList.add("open");
  state.open.push(card);

  if (state.open.length < 3) return;

  state.lock = true;
  const [a, b, c] = state.open;
  const same =
    a.dataset.symbol === b.dataset.symbol &&
    b.dataset.symbol === c.dataset.symbol;

  if (same) {
    [a, b, c].forEach((el) => el.classList.add("matched"));
    if (!state.shownWin && winEl) {
      winEl.classList.remove("hidden");
      state.shownWin = true;
    }
    resetOpen(state);
  } else {
    setTimeout(() => {
      [a, b, c].forEach((el) => el.classList.remove("open"));
      resetOpen(state);
    }, 600);
  }
}

function resetOpen(state) {
  state.open = [];
  state.lock = false;
}
