const scene = document.getElementById('scene');
const openButton = document.getElementById('openButton');
const heartsLayer = document.getElementById('heartsLayer');
const letterOverlay = document.getElementById('letterOverlay');
const paperScroll = document.getElementById('paperScroll');
const secretButton = document.getElementById('secretButton');
const secretMessage = document.getElementById('secretMessage');
const fakeoutChoices = document.getElementById('fakeoutChoices');
const questionOverlay = document.getElementById('questionOverlay');
const questionCard = document.getElementById('questionCard');
const yayScreen = document.getElementById('yayScreen');
const celebrationLayer = document.getElementById('celebrationLayer');
const nyanParade = document.getElementById('nyanParade');
const backToLetter = document.getElementById('backToLetter');
const celebrationMusic = document.getElementById('celebrationMusic');

let hasOpened = false;
let secretRevealed = false;
let questionShown = false;
let hasCelebrated = false;

function makeHearts(container, count = 24) {
  container.replaceChildren();
  const colors = ['#648762', '#92b38a', '#c7dabc', '#f8f7ed', '#a3b99a', '#d9c5a0'];
  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'celebration-heart';
    particle.textContent = i % 5 === 0 ? '✦' : (i % 3 === 0 ? '♡' : '♥');
    particle.style.setProperty('--x', `${Math.random() * 100}%`);
    particle.style.setProperty('--size', `${14 + Math.random() * 23}px`);
    particle.style.setProperty('--duration', `${1.8 + Math.random() * 1.7}s`);
    particle.style.setProperty('--drift', `${-45 + Math.random() * 90}px`);
    particle.style.color = colors[i % colors.length];
    particle.style.animationDelay = `${Math.random() * 0.35}s`;
    container.appendChild(particle);
  }
  window.setTimeout(() => container.replaceChildren(), 4200);
}

function makeConfetti(container, count = 58) {
  const colors = ['#648762', '#92b38a', '#c7dabc', '#f8f7ed', '#d9c5a0', '#e9b9c8'];
  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.setProperty('--x', `${Math.random() * 100}%`);
    piece.style.setProperty('--fall-time', `${2.2 + Math.random() * 2.2}s`);
    piece.style.setProperty('--spin', `${Math.random() * 900 - 450}deg`);
    piece.style.setProperty('--confetti-width', `${5 + Math.random() * 6}px`);
    piece.style.setProperty('--confetti-height', `${7 + Math.random() * 10}px`);
    piece.style.backgroundColor = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.65}s`;
    container.appendChild(piece);
  }
  window.setTimeout(() => container.querySelectorAll('.confetti-piece').forEach(piece => piece.remove()), 5200);
}

function makeEnvelopeHearts() {
  heartsLayer.replaceChildren();
  const colors = ['#71936e', '#a8c39f', '#d6e3ce', '#8dad83', '#f8f7ed'];
  for (let i = 0; i < 16; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'float-heart';
    heart.textContent = i % 5 === 0 ? '✦' : '♥';
    heart.style.setProperty('--x', `${7 + Math.random() * 86}%`);
    heart.style.setProperty('--size', `${12 + Math.random() * 19}px`);
    heart.style.setProperty('--duration', `${1.3 + Math.random() * 1.1}s`);
    heart.style.setProperty('--drift', `${-35 + Math.random() * 70}px`);
    heart.style.setProperty('--heart-color', colors[i % colors.length]);
    heart.style.animationDelay = `${Math.random() * 0.3}s`;
    heartsLayer.appendChild(heart);
  }
}

function openLetter() {
  if (hasOpened) return;
  hasOpened = true;
  openButton.disabled = true;
  scene.classList.add('opening');
  makeEnvelopeHearts();
  window.setTimeout(() => {
    scene.classList.add('opened');
    letterOverlay.hidden = false;
    letterOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    window.requestAnimationFrame(() => {
      letterOverlay.classList.add('is-open');
      paperScroll.scrollTop = 0;
      paperScroll.focus({ preventScroll: true });
    });
  }, 820);
}


document.getElementById("downloadPhotos")?.addEventListener("click", () => {
  ["at.png", "kenjme.png"].forEach((src) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = src.split("/").pop();
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
});


function revealSecret() {
  if (secretRevealed) return;
  secretRevealed = true;
  secretButton.classList.add('secret-open');
  secretButton.setAttribute('aria-expanded', 'true');
  secretButton.textContent = '👀👀👀👀👀';
  secretMessage.hidden = false;
  secretMessage.classList.add('secret-message-reveal');
  fakeoutChoices.hidden = false;
  fakeoutChoices.classList.add('choices-reveal');
}

function showOfficialQuestion() {
  if (questionShown) return;
  questionShown = true;
  questionOverlay.hidden = false;
  questionOverlay.setAttribute('aria-hidden', 'false');
  window.requestAnimationFrame(() => questionOverlay.classList.add('is-open'));
  questionCard.focus({ preventScroll: true });
}

function sayYesForReal() {
  if (hasCelebrated) return;
  hasCelebrated = true;
  nyanParade.hidden = false;
  questionOverlay.classList.remove('is-open');
  window.setTimeout(() => {
    questionOverlay.hidden = true;
    questionOverlay.setAttribute('aria-hidden', 'true');
    yayScreen.hidden = false;
    yayScreen.classList.add('yay-open');
    makeHearts(celebrationLayer, 38);
    makeConfetti(celebrationLayer, 64);
    celebrationMusic.currentTime = 0;
    celebrationMusic.play().catch(() => {
    });
  }, 260);
}

function goBackToLetter() {
  yayScreen.classList.remove('yay-open');
  yayScreen.hidden = true;
  nyanParade.hidden = true;
  celebrationLayer.replaceChildren();
  celebrationMusic.pause();
  celebrationMusic.currentTime = 0;
  hasCelebrated = false;
  questionShown = false;
  questionOverlay.classList.remove('is-open');
  questionOverlay.hidden = true;
  questionOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.add('modal-open');
  letterOverlay.hidden = false;
  letterOverlay.setAttribute('aria-hidden', 'false');
  window.requestAnimationFrame(() => letterOverlay.classList.add('is-open'));
}

openButton.addEventListener('click', openLetter);
secretButton.addEventListener('click', revealSecret);
document.getElementById('fakeoutOne').addEventListener('click', showOfficialQuestion);
document.getElementById('fakeoutTwo').addEventListener('click', showOfficialQuestion);
document.querySelectorAll('.official-button').forEach(button => button.addEventListener('click', sayYesForReal));
backToLetter.addEventListener('click', goBackToLetter);
