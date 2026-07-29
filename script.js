// ===== Mobile nav toggle =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('nav--open');
    burger.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.nav__links a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('nav--open'));
  });
}

// ===== Scroll progress bar =====
const roadFill = document.getElementById('roadFill');
if (roadFill) {
  function updateProgress(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    roadFill.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress);
  updateProgress();
}

// ===== Animated stat counters =====
const statEls = document.querySelectorAll('.stat__num');
if (statEls.length) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statEls.forEach(el => statObserver.observe(el));
}

function animateCount(el){
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimal || '0', 10);
  const divisor = decimals ? 10 : 1;
  const duration = 1200;
  const start = performance.now();

  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = (target * eased) / divisor;
    el.textContent = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ===== Smooth-scroll for on-page anchors =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });
});

// ===== Course filter chips (courses.html) =====
document.querySelectorAll('.chip-row[data-filter-group="school"], .chip-row[data-filter-group="career"]').forEach(row => {
  const group = row.dataset.filterGroup;
  const grid = document.getElementById(group === 'school' ? 'schoolGrid' : 'careerGrid');
  row.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip || !grid) return;
    row.querySelectorAll('.chip').forEach(c => c.classList.remove('chip--active'));
    chip.classList.add('chip--active');
    const subject = chip.dataset.subject;
    grid.querySelectorAll('.course-card').forEach(card => {
      card.style.display = (subject === 'all' || card.dataset.subject === subject) ? '' : 'none';
    });
  });
});

// ===== Live class filter chips (live-classes.html) =====
const liveRow = document.querySelector('.chip-row[data-filter-group="live"]');
const liveGrid = document.getElementById('liveGrid');
if (liveRow && liveGrid) {
  liveRow.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    liveRow.querySelectorAll('.chip').forEach(c => c.classList.remove('chip--active'));
    chip.classList.add('chip--active');
    const price = chip.dataset.price;
    liveGrid.querySelectorAll('.live-card').forEach(card => {
      card.style.display = (price === 'all' || card.dataset.price === price) ? '' : 'none';
    });
  });
}

// ===== Course search (courses.html) =====
const courseSearch = document.getElementById('courseSearch');
if (courseSearch) {
  const allCards = document.querySelectorAll('.course-card');
  const emptyState = document.getElementById('emptyState');
  courseSearch.addEventListener('input', () => {
    const q = courseSearch.value.trim().toLowerCase();
    let visibleCount = 0;
    // reset chip filters to "all" while searching
    if (q) {
      document.querySelectorAll('.chip-row[data-filter-group]').forEach(row => {
        row.querySelectorAll('.chip').forEach(c => c.classList.remove('chip--active'));
        row.querySelector('.chip[data-subject="all"]')?.classList.add('chip--active');
      });
    }
    allCards.forEach(card => {
      const name = (card.dataset.name || card.textContent).toLowerCase();
      const match = !q || name.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });
    if (emptyState) emptyState.hidden = visibleCount !== 0;
  });
}

// ===== Deep-link handling: courses.html?track=school|career, ?filter=free =====
(function handleCourseDeepLinks(){
  const params = new URLSearchParams(window.location.search);
  const track = params.get('track');
  if (track === 'school') document.getElementById('school')?.scrollIntoView();
  if (track === 'career') document.getElementById('career')?.scrollIntoView();
  if (params.get('filter') === 'free') {
    document.querySelectorAll('.course-card').forEach(card => {
      if (card.dataset.free !== 'true') card.style.display = 'none';
    });
  }
})();

// ===== Login / signup tabs (login.html) =====
const tabLogin = document.getElementById('tabLogin');
const tabSignup = document.getElementById('tabSignup');
const formLogin = document.getElementById('formLogin');
const formSignup = document.getElementById('formSignup');
function showAuthTab(mode){
  const isSignup = mode === 'signup';
  tabLogin?.classList.toggle('is-active', !isSignup);
  tabSignup?.classList.toggle('is-active', isSignup);
  if (formLogin) formLogin.hidden = isSignup;
  if (formSignup) formSignup.hidden = !isSignup;
}
if (tabLogin && tabSignup) {
  tabLogin.addEventListener('click', () => showAuthTab('login'));
  tabSignup.addEventListener('click', () => showAuthTab('signup'));
  const params = new URLSearchParams(window.location.search);
  if (params.get('mode') === 'signup') showAuthTab('signup');
}
