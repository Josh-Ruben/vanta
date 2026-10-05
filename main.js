/* ==========================================================================
   Main: hash router, global actions, header behaviour
   ========================================================================== */

const SITE = 'VANTA';
let routeToken = 0;
let firstRender = true;
let lastPath = null;

/* ---------- router ---------- */
function parseHash() {
  const raw = location.hash.slice(1) || '/';
  const [path, qs = ''] = raw.split('?');
  return { parts: path.split('/').filter(Boolean).map(decodeURIComponent), params: Object.fromEntries(new URLSearchParams(qs)) };
}

function resolveRoute({ parts, params }) {
  switch (parts[0]) {
    case undefined: return homePage();
    case 'shop': return shopPage(params);
    case 'product': return productPage(parts[1]);
    case 'collections': return collectionsPage();
    case 'about': return aboutPage();
    case 'contact': return contactPage();
    case 'cart': return cartPage();
    case 'info': return infoPage(parts[1]);
    default: return notFoundPage();
  }
}

function setMeta(page) {
  const title = page.title === 'VANTA | Premium streetwear' ? page.title : `${page.title} | ${SITE}`;
  document.title = title;
  const set = (sel, val) => { const el = $(sel); el && el.setAttribute('content', val); };
  set('meta[name="description"]', page.desc);
  set('meta[property="og:title"]', title);
  set('meta[property="og:description"]', page.desc);
}

async function route() {
  const token = ++routeToken;
  const parsed = parseHash();
  const page = resolveRoute(parsed);
  const main = $('#main');

  closeFilters();
  Overlay.closeAll(true);

  if (!firstRender && !reducedMotion()) {
    main.classList.add('is-leaving');
    await sleep(170);
    if (token !== routeToken) return;
  }

  main.innerHTML = page.html;
  main.classList.remove('is-leaving');
  setMeta(page);
  setActiveNav(page.nav);
  hydrateIcons(main);
  window.scrollTo({ top: 0, behavior: 'instant' });

  if (!reducedMotion()) {
    main.classList.remove('is-entering');
    void main.offsetWidth; // restart animation
    main.classList.add('is-entering');
  }
  if (!firstRender) main.focus({ preventScroll: true });

  observeReveals(main);
  page.after && page.after();
  onScroll();

  // Deep link to a section (e.g. #/contact?section=faq)
  if (parsed.params.section) {
    const target = document.getElementById(parsed.params.section);
    if (target) setTimeout(() => target.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' }), 120);
  }
  firstRender = false;
  lastPath = parsed.parts.join('/');
}

/* ---------- header: scroll state + progress ---------- */
function onScroll() {
  const y = window.scrollY;
  const header = $('#site-header');
  header.classList.toggle('is-scrolled', y > 40);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  $('#progress').style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
}

/* ---------- quick add helpers ---------- */
function closeQuickAdds(except) {
  $$('.card.qa-open').forEach(c => {
    if (c === except) return;
    c.classList.remove('qa-open');
    const b = $('.qa-btn', c); b && b.setAttribute('aria-expanded', 'false');
  });
}

function syncWishButtons() {
  $$('[data-action="wish"][data-id]').forEach(b => {
    const on = wishlist.includes(b.dataset.id);
    b.setAttribute('aria-pressed', on);
    const lbl = $('.wish-label', b); if (lbl) lbl.textContent = on ? 'Saved to wishlist' : 'Save to wishlist';
  });
}

/* ---------- mobile filter drawer ---------- */
function openFilters() { document.body.classList.add('filters-open'); const c = $('#filters .icon-btn'); c && c.focus(); }
function closeFilters() { document.body.classList.remove('filters-open'); }

/* ---------- cart re-render with focus kept ---------- */
function refreshCart() {
  const active = document.activeElement;
  const snap = active && active.dataset && active.dataset.action && active.dataset.key
    ? `[data-action="${active.dataset.action}"][data-key="${CSS.escape(active.dataset.key)}"]` : null;
  const inDrawer = active && active.closest && active.closest('#cart-dialog');
  updateCartBadges();
  renderDrawer();
  renderCartPage();
  if (snap) {
    const scope = inDrawer ? $('#cart-dialog') : $('#cart-root');
    const next = scope && $(snap, scope);
    if (next && !next.disabled) next.focus();
    else if (scope) { const alt = $(snap.replace(/qty-(inc|dec)/, m => m === 'qty-inc' ? 'qty-dec' : 'qty-inc'), scope); alt && !alt.disabled && alt.focus(); }
  }
}

/* ---------- delegated clicks ---------- */
document.addEventListener('click', e => {
  const inCard = e.target.closest('.card');
  if (!inCard) closeQuickAdds();

  // skip link
  if (e.target.closest('[data-skip]')) { e.preventDefault(); $('#main').focus(); return; }

  // Any in-app link inside a dialog closes it first (router also closes dialogs)
  const link = e.target.closest('a[href^="#/"]');
  if (link && link.closest('dialog')) {
    if (link.getAttribute('href') === location.hash || (link.getAttribute('href') === '#/' && !location.hash)) Overlay.closeAll(true);
  }

  const el = e.target.closest('[data-action]');
  if (!el) return;
  const a = el.dataset.action;

  switch (a) {
    case 'open-menu': Overlay.open($('#menu-dialog')); break;
    case 'open-search':
      Overlay.closeAll(true); Overlay.open($('#search-dialog'));
      renderSearch(''); $('#search-input').value = '';
      setTimeout(() => $('#search-input').focus(), 60);
      break;
    case 'open-account': Overlay.closeAll(true); renderAccount(); Overlay.open($('#account-dialog')); break;
    case 'open-cart': Overlay.closeAll(true); openCart(); break;
    case 'close': { const d = el.closest('dialog'); d && Overlay.close(d); break; }
    case 'size-guide': renderSizeGuide(el.dataset.cat); Overlay.open($('#size-dialog')); break;

    case 'wish': {
      const id = el.dataset.id, p = byId(id);
      const added = toggleWish(id);
      toast(added ? `Saved <strong>${esc(p.name)}</strong> to your wishlist.` : `Removed ${esc(p.name)} from your wishlist.`);
      break;
    }
    case 'qa-toggle': {
      const card = el.closest('.card');
      const open = !card.classList.contains('qa-open');
      closeQuickAdds(card);
      card.classList.toggle('qa-open', open);
      const b = $('.qa-btn', card); b.setAttribute('aria-expanded', open);
      if (open) { const first = $('.chip', card); first && first.focus(); } else b.focus();
      break;
    }
    case 'qa-add': {
      const p = byId(el.dataset.id), size = el.dataset.size;
      addToCart(p.id, { color: p.colors[0].name, size, qty: 1 });
      closeQuickAdds();
      toast(`Added <strong>${esc(p.name)}</strong>${size === 'One size' ? '' : ` (${size})`} to your bag.`, { actionLabel: 'View bag', onAction: openCart });
      break;
    }
    case 'qty-inc': case 'qty-dec': {
      const line = cart.find(l => lineKey(l) === el.dataset.key);
      if (line) setLineQty(el.dataset.key, line.qty + (a === 'qty-inc' ? 1 : -1));
      break;
    }
    case 'remove': {
      const removed = removeLine(el.dataset.key);
      if (removed) {
        const p = byId(removed.line.id);
        toast(`Removed ${esc(p.name)} from your bag.`, { actionLabel: 'Undo', onAction: () => restoreLine(removed.line, removed.index) });
      }
      break;
    }
    case 'checkout': openCheckout(); break;
    case 'done-shopping': Overlay.closeAll(true); location.hash = '#/shop'; break;
    case 'sign-out': clearUser(); renderAccount(); toast('Signed out.'); break;
    case 'rail': {
      const rail = document.getElementById(el.dataset.target);
      rail && rail.scrollBy({ left: Number(el.dataset.dir) * rail.clientWidth * 0.8, behavior: reducedMotion() ? 'auto' : 'smooth' });
      break;
    }
    case 'filters-open': openFilters(); break;
    case 'filters-close': closeFilters(); break;
    case 'search-suggest': {
      const input = $('#search-input'); input.value = el.dataset.q; renderSearch(el.dataset.q); input.focus(); break;
    }
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeQuickAdds(); closeFilters(); }
});

/* ---------- search overlay ---------- */
function renderSearch(q) {
  const out = $('#search-results');
  q = q.trim();
  if (!q) {
    out.innerHTML = `<p class="search-hint">Popular searches</p><div class="suggest">${['Hoodie', 'Jacket', 'Cap', 'Chain', 'Denim', 'Cargo'].map(t => `<button type="button" class="chip" data-action="search-suggest" data-q="${t}">${t}</button>`).join('')}</div>`;
    return;
  }
  const results = searchProducts(q);
  if (!results.length) {
    out.innerHTML = `<p class="search-hint">No results for “${esc(q)}”.</p><p class="muted">Check the spelling, or try one of these.</p>
      <div class="suggest">${['Hoodie', 'Jacket', 'Cap', 'Chain', 'Denim', 'Cargo'].map(t => `<button type="button" class="chip" data-action="search-suggest" data-q="${t}">${t}</button>`).join('')}</div>`;
    return;
  }
  out.innerHTML = `<p class="search-hint">${results.length} ${results.length === 1 ? 'result' : 'results'}</p>
    <ul class="search-list">${results.slice(0, 5).map(p => `<li><a href="#/product/${p.id}"><img src="${IMG(p.images[0], 160)}" alt="" width="48" height="60"><span>${esc(p.name)}<small>${p.colors[0].name}</small></span><span>${money(p.price)}</span></a></li>`).join('')}</ul>
    <a class="link" href="#/shop?q=${encodeURIComponent(q)}">View all ${results.length} in the shop</a>`;
}

document.addEventListener('input', e => { if (e.target.id === 'search-input') renderSearch(e.target.value); });

/* ---------- forms ---------- */
document.addEventListener('submit', e => {
  const form = e.target.closest('form[data-form]');
  if (!form) return;
  e.preventDefault();
  const kind = form.dataset.form;

  if (kind === 'search') {
    const q = $('#search-input').value.trim();
    Overlay.closeAll(true);
    location.hash = q ? `#/shop?q=${encodeURIComponent(q)}` : '#/shop';
    return;
  }
  if (!validateForm(form)) return;
  const data = Object.fromEntries(new FormData(form));

  switch (kind) {
    case 'newsletter':
      form.innerHTML = `<p class="form-success" role="status">${icon('check', 18)} You're on the list. Watch your inbox for the next release.</p>`;
      break;
    case 'contact':
      // No backend: wire this to your form service (Formspree, Netlify Forms, an API route...)
      $('#contact-form-wrap').innerHTML = `<div class="form-success-block" role="status"><h2 class="display h3">Message sent.</h2><p>Thanks, ${esc(data.name.split(' ')[0])}. We'll reply to ${esc(data.email)} within one business day.</p><button type="button" class="link" onclick="route()">Send another message</button></div>`;
      break;
    case 'account':
      setUser({ name: data.name.trim(), email: data.email.trim() });
      renderAccount();
      toast(`Welcome, ${esc(data.name.trim().split(' ')[0])}.`);
      break;
    case 'checkout':
      placeOrder();
      break;
  }
});

/* ---------- init ---------- */
window.addEventListener('hashchange', route);
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', () => { onScroll(); if (window.innerWidth >= 1024) closeFilters(); });
document.addEventListener('cart:change', refreshCart);
document.addEventListener('wish:change', () => { syncWishButtons(); if ($('#account-dialog').open) renderAccount(); });

history.scrollRestoration = 'manual';
hydrateIcons();
initDialogs();
updateCartBadges();
route();
