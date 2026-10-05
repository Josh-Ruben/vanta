/* ==========================================================================
   Store: cart, wishlist, user. Persisted to localStorage.
   ========================================================================== */

const KEYS = { cart: 'vanta.cart', wish: 'vanta.wishlist', user: 'vanta.user' };
const SHIPPING = { freeOver: 150, flat: 9, maxQty: 10 };

const LS = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* private mode / quota */ }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
  }
};

/* ---------- helpers ---------- */
const money = n => {
  const v = Math.round(n * 100) / 100;
  return '$' + v.toLocaleString('en-US', { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 });
};
const byId = id => PRODUCTS.find(p => p.id === id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const lineKey = l => `${l.id}|${l.color}|${l.size}`;

/* ---------- cart ---------- */
function sanitizeCart(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter(l => {
    const p = l && byId(l.id);
    return p && p.colors.some(c => c.name === l.color) && p.sizes.includes(l.size) && Number.isInteger(l.qty) && l.qty > 0;
  }).map(l => ({ id: l.id, color: l.color, size: l.size, qty: Math.min(l.qty, SHIPPING.maxQty) }));
}

let cart = sanitizeCart(LS.get(KEYS.cart, []));

function persistCart() {
  LS.set(KEYS.cart, cart);
  document.dispatchEvent(new CustomEvent('cart:change'));
}

function addToCart(id, { color, size, qty = 1 }) {
  const p = byId(id);
  if (!p) return null;
  const line = { id, color: color || p.colors[0].name, size: size || p.sizes[0], qty };
  const existing = cart.find(l => lineKey(l) === lineKey(line));
  if (existing) existing.qty = Math.min(SHIPPING.maxQty, existing.qty + qty);
  else cart.push({ ...line, qty: Math.min(SHIPPING.maxQty, qty) });
  persistCart();
  return line;
}

function setLineQty(key, qty) {
  const line = cart.find(l => lineKey(l) === key);
  if (!line) return;
  line.qty = Math.max(1, Math.min(SHIPPING.maxQty, qty));
  persistCart();
}

function removeLine(key) {
  const idx = cart.findIndex(l => lineKey(l) === key);
  if (idx === -1) return null;
  const [removed] = cart.splice(idx, 1);
  persistCart();
  return { line: removed, index: idx };
}

function restoreLine(line, index) {
  cart.splice(Math.min(index, cart.length), 0, line);
  persistCart();
}

function clearCart() {
  cart = [];
  persistCart();
}

function cartTotals() {
  const subtotal = cart.reduce((s, l) => s + byId(l.id).price * l.qty, 0);
  const count = cart.reduce((s, l) => s + l.qty, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= SHIPPING.freeOver ? 0 : SHIPPING.flat;
  return { subtotal, count, shipping, total: subtotal + shipping, remainingForFree: Math.max(0, SHIPPING.freeOver - subtotal) };
}

// Keep multiple tabs in sync
window.addEventListener('storage', e => {
  if (e.key === KEYS.cart) { cart = sanitizeCart(LS.get(KEYS.cart, [])); document.dispatchEvent(new CustomEvent('cart:change')); }
  if (e.key === KEYS.wish) { wishlist = LS.get(KEYS.wish, []); document.dispatchEvent(new CustomEvent('wish:change')); }
});

/* ---------- wishlist ---------- */
let wishlist = (LS.get(KEYS.wish, []) || []).filter(id => byId(id));

function toggleWish(id) {
  const i = wishlist.indexOf(id);
  if (i === -1) wishlist.push(id); else wishlist.splice(i, 1);
  LS.set(KEYS.wish, wishlist);
  document.dispatchEvent(new CustomEvent('wish:change'));
  return i === -1;
}

/* ---------- user (demo only, stored locally) ---------- */
const getUser = () => LS.get(KEYS.user, null);
const setUser = u => LS.set(KEYS.user, u);
const clearUser = () => LS.remove(KEYS.user);

/* ---------- search ---------- */
function searchProducts(query) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  const colls = Object.fromEntries(COLLECTIONS.map(c => [c.slug, c.name]));
  return PRODUCTS.map(p => {
    const name = p.name.toLowerCase();
    const hay = `${name} ${p.category} ${p.colors.map(c => c.name).join(' ')} ${colls[p.collection] || ''}`.toLowerCase();
    if (!tokens.every(t => hay.includes(t))) return null;
    const score = tokens.reduce((s, t) => s + (name.includes(t) ? 2 : 1), 0);
    return { p, score };
  }).filter(Boolean).sort((a, b) => b.score - a.score).map(r => r.p);
}
