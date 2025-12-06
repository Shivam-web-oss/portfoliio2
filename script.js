window.addEventListener("load", () => {
  const bars = document.querySelectorAll(".bar");

  bars.forEach((bar, index) => {
    const max = bar.getAttribute("data-max");  // example: 90
    const storageKey = `bar-value-${index}`;
    
    // Check if value exists in localStorage
    let randomValue = localStorage.getItem(storageKey);
    
    if (!randomValue) {
      // Generate and store the value only if it doesn't exist
      const min = Number(max) - 15;
      randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
      localStorage.setItem(storageKey, randomValue);
    }

    bar.style.width = randomValue + "%";
  });
});

// Testimonials carousel behavior
(function() {
  const track = document.querySelector('.testi-track');
  if (!track) return; // no testimonials present

  const cards = Array.from(track.querySelectorAll('.testi-card'));
  const prevBtn = document.querySelector('.testi-prev');
  const nextBtn = document.querySelector('.testi-next');
  const dotsContainer = document.querySelector('.testi-dots');
  let current = 0;
  let timer = null;

  // build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('data-index', i);
    dotsContainer.appendChild(dot);
    dot.addEventListener('click', () => goTo(i));
  });

  function update() {
    // move track by translateX
    const offset = -current * 100;
    track.style.transform = `translateX(${offset}%)`;
    // dots
    dotsContainer.querySelectorAll('.testi-dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function goTo(i) {
    current = (i + cards.length) % cards.length;
    update();
    restart();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  // autoplay
  function start() { timer = setInterval(next, 4500); }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  // pause on hover
  const container = document.querySelector('.testimonials-container');
  container.addEventListener('mouseenter', stop);
  container.addEventListener('mouseleave', start);

  // set initial styles
  track.style.transition = 'transform 0.5s cubic-bezier(.2,.8,.2,1)';
  update();
  start();
})();
