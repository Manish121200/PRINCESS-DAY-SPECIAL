// ============================================================
// PERSONALISE THIS FILE: edit the names, captions and messages.
// Add your own photos as photos/photo1.jpg ... photos/photo7.jpg
// ============================================================

const PHOTO_CAPTIONS = [
  "A favourite little moment ♡",
  "A memory worth keeping ✨",
  "My two favourite smiles 💗",
  "The people who make life brighter",
  "A little frame full of happiness",
  "More memories, more reasons to smile",
  "Always special, always loved ♡"
];

const photoFiles = Array.from({ length: 7 }, (_, i) => `photos/photo${i + 1}.jpg`);
let currentPhoto = 0;

const welcome = document.getElementById("welcome");
const celebration = document.getElementById("celebration");
const inviteButton = document.getElementById("openInvite");

inviteButton.addEventListener("click", () => {
  inviteButton.classList.add("open");
  setTimeout(() => {
    welcome.classList.remove("active");
    celebration.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 650);
});

// Open the selected letter and close any other open letter.
document.querySelectorAll("[data-letter]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".letter-panel").forEach(panel => panel.hidden = true);
    const panel = document.getElementById(button.dataset.letter);
    panel.hidden = false;
    panel.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
document.querySelectorAll(".close-letter").forEach(button => {
  button.addEventListener("click", () => button.closest(".letter-panel").hidden = true);
});

// Gallery: missing photo files show a helpful placeholder instead of a broken image.
const galleryImage = document.getElementById("galleryImage");
const fallback = document.getElementById("photoFallback");
const caption = document.getElementById("photoCaption");
const dots = document.getElementById("galleryDots");

function showPhoto(index) {
  currentPhoto = (index + photoFiles.length) % photoFiles.length;
  galleryImage.src = photoFiles[currentPhoto];
  caption.textContent = PHOTO_CAPTIONS[currentPhoto] || "A favourite memory ♡";
  dots.querySelectorAll("button").forEach((dot, i) => dot.classList.toggle("active", i === currentPhoto));
}
photoFiles.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Show photo ${i + 1}`);
  dot.addEventListener("click", () => showPhoto(i));
  dots.appendChild(dot);
});
galleryImage.addEventListener("load", () => { fallback.hidden = true; });
galleryImage.addEventListener("error", () => { fallback.hidden = false; });
document.getElementById("prevPhoto").addEventListener("click", () => showPhoto(currentPhoto - 1));
document.getElementById("nextPhoto").addEventListener("click", () => showPhoto(currentPhoto + 1));
showPhoto(0);

// Tap the photo to open a lightbox.
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
function openLightbox() {
  if (!fallback.hidden) return; // No photo has been added yet.
  lightboxImage.src = photoFiles[currentPhoto];
  lightbox.hidden = false;
}
function closeLightbox() { lightbox.hidden = true; }
document.getElementById("photoOpen").addEventListener("click", openLightbox);
document.getElementById("closeLightbox").addEventListener("click", closeLightbox);
document.getElementById("lightPrev").addEventListener("click", () => { showPhoto(currentPhoto - 1); lightboxImage.src = photoFiles[currentPhoto]; });
document.getElementById("lightNext").addEventListener("click", () => { showPhoto(currentPhoto + 1); lightboxImage.src = photoFiles[currentPhoto]; });
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

// Fun royal quiz.
const result = document.getElementById("gameResult");
document.getElementById("queenChoice").addEventListener("click", () => {
  result.textContent = "Correct! The Queen deserves the whole universe… and then some. 👑❤️";
});
document.getElementById("princessChoice").addEventListener("click", () => {
  result.textContent = "Absolutely! Our Princess deserves a kingdom full of happiness. 🌸";
});
document.getElementById("bothChoice").addEventListener("click", () => {
  result.textContent = "The only right answer! Two special people, double the love. 💖";
  showerOfLove(42);
});

// Sparkle and final celebration.
function showerOfLove(count = 28) {
  const symbols = ["💗", "✨", "💕", "🌸", "💖", "⭐", "♡"];
  for (let i = 0; i < count; i++) {
    const item = document.createElement("span");
    item.className = "sparkle";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.left = `${Math.random() * 100}vw`;
    item.style.bottom = "-35px";
    item.style.fontSize = `${18 + Math.random() * 23}px`;
    item.style.animationDuration = `${2.8 + Math.random() * 2.5}s`;
    document.body.appendChild(item);
    setTimeout(() => item.remove(), 5600);
  }
}
document.getElementById("sparkleButton").addEventListener("click", () => showerOfLove(22));
document.getElementById("loveButton").addEventListener("click", () => showerOfLove(65));


// Three-question playful quiz. The feedback is intentionally loving,
// so every answer gets a smile rather than a "wrong" result.
const quizQuestions = [
  {
    question: "Who has the cutest smile?",
    options: [["queen", "My Queen 👑"], ["princess", "My Princess 👸🏻"], ["both", "Both of you 💗"]],
    feedback: {
      queen: "Obviously! My Queen's smile can make an ordinary day magical. ❤️",
      princess: "Of course! Our Princess has a smile full of sunshine. 🌸",
      both: "Correct answer! Two smiles, double the happiness. 💕"
    }
  },
  {
    question: "Who deserves all the pampering today?",
    options: [["queen", "My Queen 👑"], ["princess", "My Princess 👸🏻"], ["both", "Both of you, obviously!"]],
    feedback: {
      queen: "The Queen deserves royal treatment every single day. 👑",
      princess: "Our Princess deserves a kingdom full of treats and happiness. 🍬",
      both: "Exactly! No choosing favourites here. Both get unlimited pampering! 💖"
    }
  },
  {
    question: "What's the best thing about you two together?",
    options: [["laughs", "Your silly laughs"], ["care", "Your love & care"], ["sync", "Your cute sync!"]],
    feedback: {
      laughs: "Those little laughs make every moment brighter. Keep them coming! 😄",
      care: "Your love and care are what make you both so special. ❤️",
      sync: "“I love you” — “I love you, Mr Cool!” That sync wins everything! 🥹"
    }
  }
];
let quizIndex = 0;
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const quizProgress = document.getElementById("quizProgress");
const quizNext = document.getElementById("quizNext");

function renderQuiz() {
  const item = quizQuestions[quizIndex];
  quizProgress.textContent = `QUESTION ${quizIndex + 1} OF ${quizQuestions.length}`;
  quizQuestion.textContent = item.question;
  quizFeedback.textContent = "Choose your answer, Your Highness!";
  quizNext.hidden = true;
  quizOptions.innerHTML = "";
  item.options.forEach(([key, label]) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.textContent = label;
    button.addEventListener("click", () => {
      quizOptions.querySelectorAll("button").forEach(b => b.disabled = true);
      quizFeedback.textContent = item.feedback[key] || "Every answer is a lovely answer! 💗";
      quizNext.hidden = false;
      showerOfLove(10);
    });
    quizOptions.appendChild(button);
  });
}
quizNext.addEventListener("click", () => {
  quizIndex = (quizIndex + 1) % quizQuestions.length;
  renderQuiz();
  if (quizIndex === 0) quizNext.textContent = "Play again ↻";
});
renderQuiz();

// Reveal the personal inside-joke memory.
document.getElementById("memoryReveal").addEventListener("click", () => {
  const answer = document.getElementById("memoryAnswer");
  answer.hidden = !answer.hidden;
  if (!answer.hidden) showerOfLove(14);
});

// A tiny heart-collecting activity.
let heartsCollected = 0;
const heartCount = document.getElementById("heartCount");
const heartButton = document.getElementById("collectHeart");
const heartWin = document.getElementById("heartWin");
heartButton.addEventListener("click", () => {
  if (heartsCollected >= 5) {
    heartsCollected = 0;
    heartWin.hidden = true;
    heartButton.textContent = "♡";
  }
  heartsCollected += 1;
  heartCount.textContent = `${heartsCollected} / 5 hearts`;
  heartButton.textContent = heartsCollected >= 5 ? "↻" : "♥";
  if (heartsCollected === 5) {
    heartWin.hidden = false;
    showerOfLove(24);
  }
});
