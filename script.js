/* ============================================================
   I'M GAME – CINEMATIC MOVIE WEBSITE
   script.js
   ============================================================ */

/* ── MOVIE LINKS CONFIGURATION ───────────────────────────────
   Change these URLs to update all buttons sitewide.
   Replace with actual official authorized destinations.
   ─────────────────────────────────────────────────────────── */
const MOVIE_LINKS = {
  watchNow:    "OFFICIAL_WATCH_URL",
  watch1080:   "OFFICIAL_1080P_URL",
  watch720:    "OFFICIAL_720P_URL",
  download:    "OFFICIAL_DOWNLOAD_URL",
  newReleases: "OFFICIAL_NEW_RELEASES_URL"
};

/* ── APPLY MOVIE LINKS ───────────────────────────────────── */
function applyMovieLinks() {
  document.querySelectorAll('[data-link]').forEach(function(el) {
    const key = el.getAttribute('data-link');
    if (MOVIE_LINKS[key] && MOVIE_LINKS[key] !== ('OFFICIAL_' + key.toUpperCase().replace(/([A-Z])/g, '_$1').replace('__', '_') + '_URL')) {
      el.href = MOVIE_LINKS[key];
    }
  });

  // Also apply by ID for specific buttons
  const linkMap = {
    'btn-watch-now':  MOVIE_LINKS.watchNow,
    'btn-watch-1080': MOVIE_LINKS.watch1080,
    'btn-watch-720':  MOVIE_LINKS.watch720,
    'btn-download':   MOVIE_LINKS.download,
    'btn-new-releases': MOVIE_LINKS.newReleases
  };
  Object.entries(linkMap).forEach(function([id, url]) {
    const el = document.getElementById(id);
    if (el && url && !url.startsWith('OFFICIAL_')) {
      el.href = url;
      el.removeAttribute('onclick');
    }
  });
}

/* ── SCROLL PROGRESS BAR ─────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ── NAVBAR SCROLL EFFECT ────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const current = window.scrollY;
    if (current > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = current;
  }, { passive: true });
}

/* ── MOBILE NAV TOGGLE ───────────────────────────────────── */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function() {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav on link click
  links.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
      links.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target) && links.classList.contains('open')) {
      links.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  const navbar = document.getElementById('navbar');
}

/* ── BACK TO TOP ─────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── SCROLL REVEAL ───────────────────────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function(el) { observer.observe(el); });
  } else {
    // Fallback: show all
    els.forEach(function(el) { el.classList.add('visible'); });
  }
}

/* ── FAQ ACCORDION ───────────────────────────────────────── */
function initFAQ() {
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answerId   = btn.getAttribute('aria-controls');
      const answer     = document.getElementById(answerId);

      // Close all others
      questions.forEach(function(otherBtn) {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherId  = otherBtn.getAttribute('aria-controls');
          const otherAns = document.getElementById(otherId);
          if (otherAns) otherAns.hidden = true;
        }
      });

      // Toggle current
      const newState = !isExpanded;
      btn.setAttribute('aria-expanded', newState ? 'true' : 'false');
      if (answer) answer.hidden = !newState;
    });
  });
}

/* ── LIGHTBOX ────────────────────────────────────────────── */
function initLightbox() {
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lightboxImg');
  const lbCaption = document.getElementById('lightboxCaption');
  const lbClose   = document.getElementById('lightboxClose');
  const lbBackdrop= document.getElementById('lightboxBackdrop');
  const lbPrev    = document.getElementById('lightboxPrev');
  const lbNext    = document.getElementById('lightboxNext');
  const galleryBtns = document.querySelectorAll('.gallery-btn');

  if (!lightbox || !galleryBtns.length) return;

  const images = [];
  galleryBtns.forEach(function(btn) {
    const img     = btn.querySelector('.gallery-img');
    const figure  = btn.closest('figure');
    const caption = figure ? figure.querySelector('figcaption') : null;
    images.push({
      src: img ? img.src : '',
      alt: img ? img.alt : '',
      caption: caption ? caption.innerText : ''
    });
  });

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const data   = images[currentIndex];
    lbImg.src    = data.src;
    lbImg.alt    = data.alt;
    lbCaption.textContent = data.caption;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    lbImg.src = '';
    // Return focus to the button that opened it
    if (galleryBtns[currentIndex]) galleryBtns[currentIndex].focus();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    const data = images[currentIndex];
    lbImg.src  = data.src;
    lbImg.alt  = data.alt;
    lbCaption.textContent = data.caption;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    const data = images[currentIndex];
    lbImg.src  = data.src;
    lbImg.alt  = data.alt;
    lbCaption.textContent = data.caption;
  }

  galleryBtns.forEach(function(btn, i) {
    btn.addEventListener('click', function() { openLightbox(i); });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbBackdrop.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', showPrev);
  lbNext.addEventListener('click', showNext);

  document.addEventListener('keydown', function(e) {
    if (lightbox.hidden) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}

/* ── SOCIAL SHARING ──────────────────────────────────────── */
function initSocialShare() {
  const pageUrl   = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent("I'm Game Movie – Story, Cast, Posters, Release Updates & More");
  const pageDesc  = encodeURIComponent("Explore I'm Game movie information, story details, official posters, full cast, release date (20 August 2026), and everything about Dulquer Salmaan's upcoming action thriller.");

  const fbBtn    = document.getElementById('shareFacebook');
  const xBtn     = document.getElementById('shareTwitter');
  const waBtn    = document.getElementById('shareWhatsApp');
  const copyBtn  = document.getElementById('shareCopy');

  if (fbBtn) {
    fbBtn.addEventListener('click', function() {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + pageUrl, '_blank', 'width=600,height=400');
    });
  }

  if (xBtn) {
    xBtn.addEventListener('click', function() {
      window.open('https://twitter.com/intent/tweet?url=' + pageUrl + '&text=' + pageTitle, '_blank', 'width=600,height=400');
    });
  }

  if (waBtn) {
    waBtn.addEventListener('click', function() {
      const waUrl = 'https://wa.me/?text=' + pageTitle + '%20' + pageUrl;
      window.open(waUrl, '_blank');
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(window.location.href).then(function() {
          showCopied(copyBtn);
        }).catch(function() {
          fallbackCopy(copyBtn);
        });
      } else {
        fallbackCopy(copyBtn);
      }
    });
  }

  // Web Share API (mobile)
  if (navigator.share) {
    const shareButtons = document.querySelector('.share-buttons');
    if (shareButtons) {
      const nativeShareBtn = document.createElement('button');
      nativeShareBtn.className = 'share-btn';
      nativeShareBtn.style.cssText = 'background:linear-gradient(135deg,#5e35b1,#8b1a2a);color:#fff;';
      nativeShareBtn.setAttribute('aria-label', 'Share via native share');
      nativeShareBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> Share';
      nativeShareBtn.addEventListener('click', function() {
        navigator.share({
          title: "I'm Game Movie – Story, Cast, Posters & Updates",
          text: "Explore everything about I'm Game (2026) – the upcoming Dulquer Salmaan action thriller by Nahas Hidhayath.",
          url: window.location.href
        }).catch(function() {});
      });
      shareButtons.prepend(nativeShareBtn);
    }
  }
}

function showCopied(btn) {
  const original = btn.innerHTML;
  btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
  btn.classList.add('copied');
  setTimeout(function() {
    btn.innerHTML = original;
    btn.classList.remove('copied');
  }, 2500);
}

function fallbackCopy(btn) {
  const el = document.createElement('textarea');
  el.value = window.location.href;
  el.style.position = 'fixed';
  el.style.opacity = '0';
  document.body.appendChild(el);
  el.select();
  try {
    document.execCommand('copy');
    showCopied(btn);
  } catch (e) {}
  document.body.removeChild(el);
}

/* ── SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('navbar')
          ? document.getElementById('navbar').offsetHeight + 16
          : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }
    });
  });
}

/* ── PLACEHOLDER LINK NOTICE ─────────────────────────────── */
function initPlaceholderLinks() {
  // Intercept clicks on placeholder links and show a polite message
  document.querySelectorAll('a[href="#"], [data-link]').forEach(function(el) {
    const key = el.getAttribute('data-link');
    if (!key) return;
    const url = MOVIE_LINKS[key];
    if (!url || url.startsWith('OFFICIAL_')) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        showToast('Official link coming soon. Update MOVIE_LINKS in script.js.');
      });
    }
  });
}

/* ── TOAST NOTIFICATION ──────────────────────────────────── */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.style.cssText = [
      'position:fixed', 'bottom:5rem', 'left:50%', 'transform:translateX(-50%)',
      'background:rgba(20,20,40,0.97)', 'border:1px solid rgba(255,255,255,0.15)',
      'color:rgba(255,255,255,0.9)', 'padding:0.75rem 1.5rem',
      'border-radius:100px', 'font-size:0.82rem', 'font-weight:500',
      'z-index:9999', 'box-shadow:0 8px 32px rgba(0,0,0,0.6)',
      'max-width:90vw', 'text-align:center',
      'transition:opacity 0.3s ease', 'white-space:nowrap',
      'font-family:Inter,system-ui,sans-serif'
    ].join(';');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(function() {
    toast.style.opacity = '0';
  }, 3500);
}

/* ── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  applyMovieLinks();
  initScrollProgress();
  initNavbar();
  initMobileNav();
  initBackToTop();
  initScrollReveal();
  initFAQ();
  initLightbox();
  initSocialShare();
  initSmoothScroll();
  initPlaceholderLinks();
});
