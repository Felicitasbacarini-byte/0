document.documentElement.classList.add('js');

/* Aparición al scrollear */
const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: .14 });

revealItems.forEach(item => observer.observe(item));

window.addEventListener('load', () => {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = Math.min(i * 0.045, .28) + 's';
  });
});

/* Circuitos: el del medio usa versión naranja, laterales negros con baja opacidad */
const circuits = [
  {
    orange: './lusail-orange.png',
    black: './lusail-black.png',
    title: 'LUSAIL',
    text: 'Un circuito de alta velocidad donde la confianza y el control en curvas rápidas son fundamentales.'
  },
  {
    orange: './melbourne-orange.png',
    black: './melbourne-black.png',
    title: 'MELBOURNE',
    text: 'Circuito técnico y desafiante donde la precisión y la constancia marcan la diferencia vuelta a vuelta.'
  },
  {
    orange: './shanghai-orange.png',
    black: './shanghai-black.png',
    title: 'SHANGAI',
    text: 'Conocido como el templo de la velocidad, premia las frenadas precisas y el máximo rendimiento en recta.'
  }
];

let current = 1;
const track = document.querySelector('.track');

function renderCircuits() {
  if (!track) return;

  const order = [(current + 2) % 3, current, (current + 1) % 3];

  track.innerHTML = order.map((i, pos) => {
    const isActive = pos === 1;
    const img = circuits[i].orange;

    return `
      <article class="circuit ${isActive ? 'active' : 'side'}">
        <img src="${img}" alt="${circuits[i].title}">
        <h3>${circuits[i].title}</h3>
        <p>${circuits[i].text}</p>
        <a>VER MÁS →</a>
      </article>
    `;
  }).join('');
}

const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

if (next) {
  next.addEventListener('click', () => {
    current = (current + 1) % 3;
    renderCircuits();
  });
}

if (prev) {
  prev.addEventListener('click', () => {
    current = (current + 2) % 3;
    renderCircuits();
  });
}

renderCircuits();

/* Pilares: al tocar uno pasa al medio */
const pillarCards = Array.from(document.querySelectorAll('.pillar-card'));
let centerPillar = 1;

function updatePillars() {
  pillarCards.forEach((card, i) => {
    card.classList.remove('is-left', 'is-center', 'is-right');

    if (i === centerPillar) {
      card.classList.add('is-center');
    } else if ((i + 1) % 3 === centerPillar) {
      card.classList.add('is-left');
    } else {
      card.classList.add('is-right');
    }
  });
}

pillarCards.forEach((card, i) => {
  card.addEventListener('click', () => {
    centerPillar = i;
    updatePillars();
  });
});

updatePillars();
