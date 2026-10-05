/* ==========================================================================
   UI helpers: toasts, overlays (native <dialog>), forms, scroll reveal
   ========================================================================== */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- toast ---------- */
function toast(message, { actionLabel, onAction, duration = 4200 } = {}) {
  // Modal dialogs make the rest of the page inert, so while one is open the toast is shown inside it
  const dlg = $('dialog[open]');
  let host = $('#toasts');
  if (dlg) {
    host = $('.toasts-local', dlg);
    if (!host) { host = document.createElement('div'); host.className = 'toasts-local'; host.setAttribute('aria-live', 'polite'); dlg.appendChild(host); }
  }
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="toast-icon">${icon('check', 16)}</span><p>${message}</p>`;
  if (actionLabel) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'toast-action';
    btn.textContent = actionLabel;
    btn.addEventListener('click', () => { onAction && onAction(); dismiss(); });
    el.appendChild(btn);
  }
  host.appendChild(el);
  while (host.children.length > 3) host.firstElementChild.remove();
  requestAnimationFrame(() => el.classList.add('is-in'));
  const timer = setTimeout(dismiss, duration);
  function dismiss() {
    clearTimeout(timer);
    el.classList.remove('is-in');
    setTimeout(() => el.remove(), 400);
  }
}

/* ---------- overlays ---------- */
const Overlay = {
  open(dlg) {
    if (dlg.open) return;
    dlg.showModal();
    document.documentElement.classList.add('no-scroll');
    requestAnimationFrame(() => requestAnimationFrame(() => dlg.classList.add('is-open')));
  },
  close(dlg, instant = false) {
    if (!dlg.open) return;
    dlg.classList.remove('is-open');
    const finish = () => {
      if (dlg.open && !dlg.classList.contains('is-open')) dlg.close();
      if (!$('dialog[open]')) document.documentElement.classList.remove('no-scroll');
    };
    if (instant || reducedMotion()) finish(); else setTimeout(finish, 340);
  },
  closeAll(instant = false) { $$('dialog[open]').forEach(d => Overlay.close(d, instant)); }
};

function initDialogs() {
  $$('dialog.sheet').forEach(dlg => {
    dlg.addEventListener('cancel', e => { e.preventDefault(); Overlay.close(dlg); }); // Esc key
    dlg.addEventListener('click', e => { if (e.target === dlg) Overlay.close(dlg); }); // click on backdrop area
  });
}

/* ---------- forms ---------- */
function fieldHTML({ id, name, label, type = 'text', required = false, autocomplete = '', minlength, placeholder = '', rows, options, value = '' }) {
  const err = `${id}-err`;
  const attrs = [
    `id="${id}"`, `name="${name}"`, required ? 'required aria-required="true"' : '',
    autocomplete ? `autocomplete="${autocomplete}"` : '', minlength ? `minlength="${minlength}"` : '',
    placeholder ? `placeholder="${esc(placeholder)}"` : '', `data-label="${esc(label)}"`, `aria-describedby="${err}"`
  ].join(' ');
  let control;
  if (options) control = `<select ${attrs}><option value="">Select</option>${options.map(o => `<option>${esc(o)}</option>`).join('')}</select>`;
  else if (rows) control = `<textarea ${attrs} rows="${rows}">${esc(value)}</textarea>`;
  else control = `<input type="${type}" ${attrs} value="${esc(value)}">`;
  return `<div class="field"><label for="${id}">${esc(label)}</label>${control}<p class="field-error" id="${err}"></p></div>`;
}

function fieldError(el) {
  const v = el.value.trim();
  const label = el.dataset.label || 'This field';
  if (el.required && !v) return el.tagName === 'SELECT' ? `Choose ${label.toLowerCase()}.` : `${label} is required.`;
  if (el.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Enter a valid email, like name@example.com.';
  if (el.minLength > 0 && v && v.length < el.minLength) return `${label} needs at least ${el.minLength} characters.`;
  return '';
}

function showFieldError(el, msg) {
  const wrap = el.closest('.field');
  if (!wrap) return;
  const out = $('.field-error', wrap);
  if (out) out.textContent = msg;
  el.setAttribute('aria-invalid', msg ? 'true' : 'false');
  wrap.classList.toggle('has-error', !!msg);
}

function validateForm(form) {
  let first = null;
  $$('input, select, textarea', form).forEach(el => {
    if (el.type === 'hidden' || el.type === 'submit') return;
    const msg = fieldError(el);
    showFieldError(el, msg);
    if (msg && !first) first = el;
  });
  if (first) first.focus();
  return !first;
}

document.addEventListener('focusout', e => {
  const el = e.target;
  if (el.matches && el.matches('.field input, .field select, .field textarea') && (el.value || el.closest('.field').classList.contains('has-error'))) {
    showFieldError(el, fieldError(el));
  }
});
document.addEventListener('input', e => {
  const el = e.target;
  if (el.matches && el.matches('.field input, .field select, .field textarea') && el.closest('.field').classList.contains('has-error')) {
    showFieldError(el, fieldError(el));
  }
});

/* ---------- scroll reveal (used sparingly) ---------- */
const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); revealObserver.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
  : null;

function observeReveals(root = document) {
  $$('.reveal:not(.is-in)', root).forEach(el => revealObserver ? revealObserver.observe(el) : el.classList.add('is-in'));
}

/* ---------- image fallback ---------- */
document.addEventListener('error', e => {
  const img = e.target;
  if (img && img.tagName === 'IMG' && !img.dataset.fallback) {
    img.dataset.fallback = '1';
    img.src = FALLBACK_IMG;
  }
}, true);
