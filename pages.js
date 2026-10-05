/* ==========================================================================
   Pages: each returns { title, desc, nav, html, after }
   ========================================================================== */

const ALL_SIZES = [...SIZES, 'One size'];
const ALL_COLORS = Object.keys(COLOR_HEX).filter(c => PRODUCTS.some(p => p.colors.some(pc => pc.name === c)));
const PRICE_RANGES = [
  { v: 'all', label: 'All prices', test: () => true },
  { v: 'u75', label: 'Under $75', test: x => x < 75 },
  { v: '75-150', label: '$75 to $150', test: x => x >= 75 && x <= 150 },
  { v: 'o150', label: 'Over $150', test: x => x > 150 }
];
const SORTS = [
  { v: 'featured', label: 'Featured' },
  { v: 'newest', label: 'Newest' },
  { v: 'low', label: 'Price: low to high' },
  { v: 'high', label: 'Price: high to low' }
];

/* ---------- shared fragments ---------- */
const skeletonCard = () =>
  `<div class="card" aria-hidden="true"><div class="card-media skeleton"></div><div class="card-info"><div class="skeleton sk-line"></div><div class="skeleton sk-line short"></div></div></div>`;

function productCard(p) {
  const wished = wishlist.includes(p.id);
  const colorTxt = p.colors.length > 1 ? `${p.colors[0].name} + ${p.colors.length - 1} more` : p.colors[0].name;
  const single = p.sizes.length === 1;
  const badge = p.badge ? `<span class="badge ${p.badge === 'NEW' ? 'badge-new' : 'badge-best'}">${p.badge}</span>` : '';
  const quick = single
    ? `<button type="button" class="qa-btn" data-action="qa-add" data-id="${p.id}" data-size="${p.sizes[0]}" aria-label="Quick add ${esc(p.name)} to bag">${icon('plus', 18)}<span>Quick add</span></button>`
    : `<button type="button" class="qa-btn" data-action="qa-toggle" aria-expanded="false" aria-label="Quick add ${esc(p.name)}: choose a size">${icon('plus', 18)}<span>Quick add</span></button>
       <div class="qa-panel" role="group" aria-label="Select a size for ${esc(p.name)}">
         <div class="qa-head"><span>Select size</span><button type="button" class="qa-close" data-action="qa-toggle" aria-label="Close size picker">${icon('x', 16)}</button></div>
         <div class="sizes">${p.sizes.map(s => `<button type="button" class="chip" data-action="qa-add" data-id="${p.id}" data-size="${s}">${s}</button>`).join('')}</div>
       </div>`;
  return `<article class="card" data-id="${p.id}">
    <div class="card-media">
      <a class="card-link" href="#/product/${p.id}" tabindex="-1" aria-hidden="true">
        <img class="card-img" src="${IMG(p.images[0], 700)}" alt="" width="700" height="875" loading="lazy" decoding="async">
        <img class="card-img card-alt" src="${IMG(p.images[1], 700)}" alt="" width="700" height="875" loading="lazy" decoding="async">
      </a>
      ${badge}
      <button type="button" class="wish" data-action="wish" data-id="${p.id}" aria-pressed="${wished}" aria-label="Save ${esc(p.name)} to wishlist">${icon('heart', 18)}</button>
      ${quick}
    </div>
    <div class="card-info">
      <div class="card-row"><h3 class="card-name"><a href="#/product/${p.id}">${esc(p.name)}</a></h3><p class="card-price">${money(p.price)}</p></div>
      <p class="card-color">${colorTxt}</p>
    </div>
  </article>`;
}

const stars = r => {
  let s = '';
  for (let i = 1; i <= 5; i++) s += `<span class="${i <= Math.round(r) ? 'star on' : 'star'}">${icon('star', 14)}</span>`;
  return `<span class="stars" role="img" aria-label="Rated ${r} out of 5">${s}</span>`;
};

const sectionHead = (title, linkHref, linkLabel) =>
  `<header class="section-head reveal"><h2 class="display h2">${title}</h2>${linkHref ? `<a class="link" href="${linkHref}">${linkLabel}</a>` : ''}</header>`;

const notFoundPage = (what = 'page') => ({
  title: 'Not found', desc: 'This page could not be found.', nav: '',
  html: `<div class="wrap page-pad"><div class="empty">
    <h1 class="display page-h">We can't find that ${what}.</h1>
    <p>The link may be out of date, or the item may have sold out.</p>
    <div class="empty-actions"><a class="btn btn-solid" href="#/shop">Shop all</a><a class="btn btn-outline" href="#/">Back home</a></div>
  </div></div>`
});

/* ==========================================================================
   HOME
   ========================================================================== */
function homePage() {
  const feat = COLLECTIONS.find(c => c.slug === 'night-shift');
  const featProducts = PRODUCTS.filter(p => p.collection === feat.slug).slice(0, 3);
  const fresh = PRODUCTS.filter(p => p.badge === 'NEW').sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  const best = [...PRODUCTS].sort((a, b) => b.sold - a.sold).slice(0, 8);

  const html = `
  <section class="hero" aria-labelledby="hero-title">
    <img class="hero-img" src="${IMG(SITE_IMG.hero, 1920)}" alt="VANTA autumn editorial: model in layered black streetwear" fetchpriority="high" decoding="async">
    <div class="hero-shade"></div>
    <div class="hero-inner wrap">
      <h1 id="hero-title" class="display hero-title" aria-label="Wear your presence.">
        <span class="line" aria-hidden="true"><span>Wear</span></span>
        <span class="line" aria-hidden="true"><span>your</span></span>
        <span class="line" aria-hidden="true"><span>presence.</span></span>
      </h1>
      <div class="hero-side">
        <p>Heavyweight essentials, cut oversized and built to outlast the season. Autumn/Winter 26 is in.</p>
        <div class="hero-cta">
          <a class="btn btn-solid" href="#/shop">Shop collection</a>
          <a class="btn btn-outline" href="#/collections">Explore</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section wrap" aria-labelledby="feat-title">
    <header class="section-head reveal"><h2 id="feat-title" class="display h2">${feat.name}</h2><a class="link" href="#/shop?collection=${feat.slug}">View collection</a></header>
    <div class="feature">
      <a class="feature-media reveal" href="#/shop?collection=${feat.slug}" aria-label="Shop the ${feat.name} collection">
        <img src="${IMG(feat.image, 1400)}" alt="${feat.name} collection campaign image" loading="lazy" decoding="async">
      </a>
      <div class="feature-body">
        <div>
          <p class="feature-tag">${feat.tagline}</p>
          <p class="lead">${feat.desc}</p>
        </div>
        <ul class="feature-list">
          ${featProducts.map(p => `<li><a href="#/product/${p.id}">
            <img src="${IMG(p.images[0], 240)}" alt="${esc(p.name)}" width="80" height="100" loading="lazy" decoding="async">
            <span class="fl-name">${esc(p.name)}<small>${p.colors[0].name}</small></span>
            <span class="fl-price">${money(p.price)}</span>
          </a></li>`).join('')}
        </ul>
      </div>
    </div>
  </section>

  <section class="section-tight wrap" aria-labelledby="new-title">
    <header class="section-head reveal"><h2 id="new-title" class="display h2">New arrivals</h2><a class="link" href="#/shop?new=1">Shop new</a></header>
    <div class="product-grid grid-4">${fresh.map(productCard).join('')}</div>
  </section>

  <section class="banner" aria-labelledby="banner-title">
    <img src="${IMG(SITE_IMG.banner, 1920)}" alt="Editorial image: model in oversized monochrome layers" loading="lazy" decoding="async">
    <div class="banner-shade"></div>
    <div class="banner-copy wrap reveal">
      <h2 id="banner-title" class="display banner-title">Quiet is a statement.</h2>
      <a class="btn btn-solid" href="#/collections">View collections</a>
    </div>
  </section>

  <section class="section wrap" aria-labelledby="best-title">
    <header class="section-head reveal">
      <h2 id="best-title" class="display h2">Best sellers</h2>
      <div class="rail-controls">
        <button class="icon-btn bordered" data-action="rail" data-dir="-1" data-target="rail-best" aria-label="Scroll best sellers left">${icon('chevronLeft', 20)}</button>
        <button class="icon-btn bordered" data-action="rail" data-dir="1" data-target="rail-best" aria-label="Scroll best sellers right">${icon('chevronRight', 20)}</button>
      </div>
    </header>
    <div class="rail" id="rail-best" role="region" aria-label="Best sellers" tabindex="0">${best.map(productCard).join('')}</div>
  </section>

  <section class="light philosophy" aria-labelledby="phil-title">
    <div class="wrap philosophy-grid">
      <div class="reveal">
        <h2 id="phil-title" class="display h2">Between minimalism and expression.</h2>
        <p class="lead">VANTA makes elevated everyday pieces for people who don't need to be loud to be noticed. We cut fewer styles, in heavier fabrics, and we make them to be worn until they're yours.</p>
        <a class="link" href="#/about">Read our story</a>
      </div>
      <dl class="principles reveal">
        <div><dt>Heavyweight by default</dt><dd>Dense cotton and brushed fleece that hold their shape, wash after wash.</dd></div>
        <div><dt>Cut with room</dt><dd>Drop shoulders and boxy lines, proportioned to sit well on every body.</dd></div>
        <div><dt>Made to repeat</dt><dd>Small runs, carried over season to season, so favorites stay available.</dd></div>
      </dl>
    </div>
  </section>

  <section class="section wrap newsletter" aria-labelledby="nl-title">
    <div class="newsletter-grid">
      <div>
        <h2 id="nl-title" class="display h2">Early access to every release.</h2>
        <p class="lead">Drops, restocks and studio notes, once or twice a month.</p>
      </div>
      <form data-form="newsletter" class="nl-form" novalidate aria-label="Newsletter signup">
        <div class="field">
          <label for="nl-home">Email address</label>
          <div class="inline-submit">
            <input id="nl-home" name="email" type="email" required autocomplete="email" placeholder="name@example.com" data-label="Email" aria-describedby="nl-home-err">
            <button class="btn btn-solid" type="submit">Subscribe</button>
          </div>
          <p class="field-error" id="nl-home-err"></p>
        </div>
        <p class="fineprint">Unsubscribe anytime. Read our <a href="#/info/privacy">privacy policy</a>.</p>
      </form>
    </div>
  </section>`;

  return {
    title: 'VANTA | Premium streetwear',
    desc: 'VANTA is premium streetwear for people who don\'t need to be loud to be noticed. Heavyweight essentials, oversized fits and outerwear, designed to last.',
    nav: '', html
  };
}

/* ==========================================================================
   SHOP
   ========================================================================== */
function parseShopState(params) {
  return {
    q: (params.q || '').trim(),
    cat: CATEGORIES.some(c => c.slug === params.cat) ? params.cat : 'all',
    gender: ['men', 'women'].includes(params.gender) ? params.gender : '',
    collection: COLLECTIONS.some(c => c.slug === params.collection) ? params.collection : '',
    isNew: params.new === '1',
    sizes: (params.size || '').split(',').filter(s => ALL_SIZES.includes(s)),
    colors: (params.color || '').split(',').filter(c => ALL_COLORS.includes(c)),
    price: PRICE_RANGES.some(r => r.v === params.price) ? params.price : 'all',
    sort: SORTS.some(s => s.v === params.sort) ? params.sort : (params.new === '1' ? 'newest' : 'featured')
  };
}

function shopStateToQuery(s) {
  const p = new URLSearchParams();
  if (s.q) p.set('q', s.q);
  if (s.cat !== 'all') p.set('cat', s.cat);
  if (s.gender) p.set('gender', s.gender);
  if (s.collection) p.set('collection', s.collection);
  if (s.isNew) p.set('new', '1');
  if (s.sizes.length) p.set('size', s.sizes.join(','));
  if (s.colors.length) p.set('color', s.colors.join(','));
  if (s.price !== 'all') p.set('price', s.price);
  if (s.sort !== (s.isNew ? 'newest' : 'featured')) p.set('sort', s.sort);
  return p.toString();
}

function filterProducts(s) {
  const range = PRICE_RANGES.find(r => r.v === s.price);
  let list = (s.q ? searchProducts(s.q) : [...PRODUCTS]).filter(p =>
    (s.cat === 'all' || p.category === s.cat) &&
    (!s.gender || p.gender.includes(s.gender)) &&
    (!s.collection || p.collection === s.collection) &&
    (!s.isNew || p.badge === 'NEW') &&
    (!s.sizes.length || s.sizes.some(z => p.sizes.includes(z))) &&
    (!s.colors.length || s.colors.some(c => p.colors.some(pc => pc.name === c))) &&
    range.test(p.price));
  if (s.sort === 'newest') list.sort((a, b) => b.date.localeCompare(a.date));
  else if (s.sort === 'low') list.sort((a, b) => a.price - b.price);
  else if (s.sort === 'high') list.sort((a, b) => b.price - a.price);
  return list;
}

function shopHeading(s) {
  if (s.q) return { h: 'Search results', sub: `Showing matches for “${esc(s.q)}”.` };
  if (s.collection) { const c = COLLECTIONS.find(x => x.slug === s.collection); return { h: c.name, sub: c.desc }; }
  if (s.isNew) return { h: 'New arrivals', sub: 'The latest drops, produced in small runs.' };
  if (s.gender === 'men') return { h: 'Men', sub: 'Heavyweight tops, relaxed bottoms and outerwear.' };
  if (s.gender === 'women') return { h: 'Women', sub: 'Oversized silhouettes and tailored lines. Most of our range is unisex.' };
  return { h: 'Shop all', sub: 'Heavyweight essentials, outerwear and accessories.' };
}

function filtersHTML() {
  const btn = (f, v, label, extra = '') => `<button type="button" class="filter-btn" data-filter="${f}" data-value="${v}" aria-pressed="false" ${extra}>${label}</button>`;
  return `
  <div class="filters-head"><h2 class="filters-title">Filters</h2><button type="button" class="icon-btn" data-action="filters-close" aria-label="Close filters">${icon('x', 22)}</button></div>
  <div class="filter-group"><h3>Shop for</h3>${btn('gender', 'all', 'Everyone')}${btn('gender', 'men', 'Men')}${btn('gender', 'women', 'Women')}</div>
  <div class="filter-group"><h3>Category</h3>${btn('cat', 'all', 'All')}${CATEGORIES.map(c => btn('cat', c.slug, c.name)).join('')}</div>
  <div class="filter-group"><h3>Size</h3><div class="sizes">${ALL_SIZES.map(s => `<button type="button" class="chip" data-filter="size" data-value="${s}" aria-pressed="false">${s}</button>`).join('')}</div></div>
  <div class="filter-group"><h3>Color</h3><div class="swatches">${ALL_COLORS.map(c => `<button type="button" class="swatch" data-filter="color" data-value="${c}" aria-pressed="false" aria-label="${c}" title="${c}" style="--sw:${COLOR_HEX[c]}"></button>`).join('')}</div></div>
  <div class="filter-group"><h3>Price</h3>${PRICE_RANGES.map(r => btn('price', r.v, r.label)).join('')}</div>
  <div class="filters-foot"><button type="button" class="btn btn-solid w-full" data-action="filters-close" id="filters-show">Show results</button></div>`;
}

function shopPage(params) {
  const s0 = parseShopState(params);
  const h = shopHeading(s0);
  const html = `
  <div class="wrap page-pad">
    <header class="page-head">
      <h1 class="display page-h" id="shop-title">${h.h}</h1>
      <p class="page-sub" id="shop-sub">${h.sub}</p>
    </header>
    <div class="toolbar">
      <button type="button" class="filter-toggle" data-action="filters-open">${icon('sliders', 18)}<span>Filters</span></button>
      <p class="result-count" id="result-count" aria-live="polite"></p>
      <div class="shop-search">
        ${icon('search', 18)}
        <label class="sr-only" for="shop-q">Search products</label>
        <input id="shop-q" type="search" placeholder="Search products" value="${esc(s0.q)}" autocomplete="off">
      </div>
      <div class="sort">
        <label for="sort">Sort by</label>
        <select id="sort">${SORTS.map(o => `<option value="${o.v}">${o.label}</option>`).join('')}</select>
      </div>
    </div>
    <div id="chips" class="chips" aria-label="Active filters"></div>
    <div class="shop-layout">
      <div class="filters-scrim" data-action="filters-close"></div>
      <aside id="filters" class="filters-panel" aria-label="Product filters">${filtersHTML()}</aside>
      <section aria-label="Products">
        <div id="grid" class="product-grid grid-3" aria-busy="true"></div>
        <div id="empty" class="empty" hidden></div>
      </section>
    </div>
  </div>`;
  return {
    title: h.h + (s0.q ? ' | Search' : ''), desc: 'Shop VANTA premium streetwear: oversized tees, heavyweight hoodies, cargo pants, denim, outerwear and accessories.',
    nav: s0.isNew ? 'new' : s0.gender, html, after: () => initShop(s0)
  };
}

function initShop(s) {
  const grid = $('#grid'), empty = $('#empty'), chips = $('#chips');
  const sortEl = $('#sort'), qEl = $('#shop-q');
  sortEl.value = s.sort;
  grid.innerHTML = Array.from({ length: 8 }, skeletonCard).join('');

  const toggle = (arr, v) => { const i = arr.indexOf(v); i === -1 ? arr.push(v) : arr.splice(i, 1); };

  function syncFilterUI() {
    $$('[data-filter]').forEach(b => {
      const f = b.dataset.filter, v = b.dataset.value;
      const on = f === 'cat' ? s.cat === v
        : f === 'gender' ? (s.gender || 'all') === v
        : f === 'price' ? s.price === v
        : f === 'size' ? s.sizes.includes(v)
        : s.colors.includes(v);
      b.setAttribute('aria-pressed', on);
    });
  }

  function chipList() {
    const out = [];
    if (s.q) out.push([`Search: ${esc(s.q)}`, () => { s.q = ''; qEl.value = ''; }]);
    if (s.collection) out.push([COLLECTIONS.find(c => c.slug === s.collection).name, () => { s.collection = ''; }]);
    if (s.isNew) out.push(['New arrivals', () => { s.isNew = false; }]);
    if (s.gender) out.push([s.gender === 'men' ? 'Men' : 'Women', () => { s.gender = ''; }]);
    if (s.cat !== 'all') out.push([CATEGORIES.find(c => c.slug === s.cat).name, () => { s.cat = 'all'; }]);
    s.sizes.forEach(z => out.push([`Size ${z}`, () => toggle(s.sizes, z)]));
    s.colors.forEach(c => out.push([c, () => toggle(s.colors, c)]));
    if (s.price !== 'all') out.push([PRICE_RANGES.find(r => r.v === s.price).label, () => { s.price = 'all'; }]);
    return out;
  }

  let chipActions = [];
  function clearAll() {
    Object.assign(s, { q: '', cat: 'all', gender: '', collection: '', isNew: false, sizes: [], colors: [], price: 'all' });
    qEl.value = '';
  }

  function apply() {
    const list = filterProducts(s);
    const h = shopHeading(s);
    $('#shop-title').textContent = h.h;
    $('#shop-sub').innerHTML = h.sub;
    grid.removeAttribute('aria-busy');
    grid.innerHTML = list.map(productCard).join('');
    grid.hidden = !list.length;
    empty.hidden = !!list.length;
    const n = list.length;
    $('#result-count').textContent = `${n} ${n === 1 ? 'product' : 'products'}`;
    $('#filters-show').textContent = `Show ${n} ${n === 1 ? 'result' : 'results'}`;

    if (!n) {
      empty.innerHTML = s.q
        ? `<h2 class="empty-title">No results for “${esc(s.q)}”.</h2>
           <p>Check the spelling, or try a broader term.</p>
           <div class="suggest">${['Hoodie', 'Tee', 'Cargo', 'Denim', 'Cap'].map(t => `<button type="button" class="chip" data-suggest="${t}">${t}</button>`).join('')}</div>
           <div class="empty-actions"><button type="button" class="btn btn-outline" data-clear>Clear filters</button></div>`
        : `<h2 class="empty-title">Nothing matches those filters.</h2>
           <p>Try removing a filter or two.</p>
           <div class="empty-actions"><button type="button" class="btn btn-outline" data-clear>Clear filters</button></div>`;
    }

    chipActions = chipList();
    chips.innerHTML = chipActions.length
      ? chipActions.map(([label], i) => `<button type="button" class="filter-chip" data-chip="${i}" aria-label="Remove filter ${label}">${label}${icon('x', 14)}</button>`).join('') +
        `<button type="button" class="link chip-clear" data-clear>Clear all</button>`
      : '';
    syncFilterUI();
    const qs = shopStateToQuery(s);
    history.replaceState(null, '', '#/shop' + (qs ? '?' + qs : ''));
    setActiveNav(s.isNew ? 'new' : s.gender);
  }

  $('#filters').addEventListener('click', e => {
    const b = e.target.closest('[data-filter]');
    if (!b) return;
    const f = b.dataset.filter, v = b.dataset.value;
    if (f === 'cat') s.cat = v;
    else if (f === 'gender') s.gender = v === 'all' ? '' : v;
    else if (f === 'price') s.price = v;
    else if (f === 'size') toggle(s.sizes, v);
    else if (f === 'color') toggle(s.colors, v);
    apply();
  });
  sortEl.addEventListener('change', () => { s.sort = sortEl.value; apply(); });
  let t;
  qEl.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { s.q = qEl.value.trim(); apply(); }, 140); });
  $('.shop-layout').closest('.wrap').addEventListener('click', e => {
    const chip = e.target.closest('[data-chip]');
    if (chip) { chipActions[+chip.dataset.chip][1](); apply(); return; }
    if (e.target.closest('[data-clear]')) { clearAll(); apply(); return; }
    const sug = e.target.closest('[data-suggest]');
    if (sug) { s.q = sug.dataset.suggest.toLowerCase(); qEl.value = s.q; apply(); }
  });

  // Loading state, then real grid
  setTimeout(() => { if (document.body.contains(grid)) apply(); }, 420);
}

function setActiveNav(key) {
  $$('[data-nav]').forEach(a => {
    if (a.dataset.nav === key && key) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
}

/* ==========================================================================
   PRODUCT DETAIL
   ========================================================================== */
const pdpSkeleton = () => `<div class="pdp" aria-busy="true" aria-label="Loading product">
  <div class="gallery-wrap"><div class="gallery"><div class="g-item skeleton"></div><div class="g-item skeleton"></div></div></div>
  <div class="pdp-info"><div class="skeleton sk-line" style="height:2.4rem;width:80%"></div><div class="skeleton sk-line" style="margin-top:1rem;width:30%"></div>
  <div class="skeleton sk-line" style="margin-top:2rem;height:5rem"></div><div class="skeleton sk-line" style="margin-top:2rem;height:3.4rem"></div><div class="skeleton sk-line" style="margin-top:1rem;height:3.4rem"></div></div></div>`;

function productPage(id) {
  const p = byId(id);
  if (!p) return notFoundPage('product');
  const cat = CATEGORIES.find(c => c.slug === p.category);
  return {
    title: p.name, desc: p.desc, nav: '',
    html: `<div class="wrap page-pad">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="#/shop">Shop</a><span aria-hidden="true">/</span><a href="#/shop?cat=${cat.slug}">${cat.name}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(p.name)}</span></nav>
      <div id="pdp-root">${pdpSkeleton()}</div>
    </div>`,
    after: () => setTimeout(() => {
      const root = $('#pdp-root');
      if (!root) return;
      root.innerHTML = pdpHTML(p);
      bindPdp(p, root);
      observeReveals(root);
    }, 320)
  };
}

function pdpHTML(p) {
  const related = [...PRODUCTS.filter(x => x.id !== p.id && x.category === p.category), ...PRODUCTS.filter(x => x.id !== p.id && x.category !== p.category)].slice(0, 4);
  const wished = wishlist.includes(p.id);
  const one = p.sizes.length === 1;
  return `
  <div class="pdp">
    <div class="gallery-wrap">
      <div class="gallery" id="gallery" tabindex="0" aria-label="${esc(p.name)} images">
        ${p.images.map((img, i) => `<div class="g-item"><img src="${IMG(img, 1200)}" alt="${esc(p.name)}, view ${i + 1} of ${p.images.length}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></div>`).join('')}
      </div>
      <p class="gallery-count" id="g-count" aria-hidden="true">1 / ${p.images.length}</p>
    </div>
    <div class="pdp-info">
      ${p.badge ? `<span class="badge-inline ${p.badge === 'NEW' ? 'badge-new' : 'badge-best'}">${p.badge}</span>` : ''}
      <h1 class="display pdp-title">${esc(p.name)}</h1>
      <div class="pdp-meta"><p class="pdp-price">${money(p.price)}</p><p class="rating">${stars(p.rating)}<span>${p.rating} &middot; ${p.reviews} reviews</span></p></div>
      <p class="pdp-desc">${esc(p.desc)}</p>

      <div class="opt">
        <div class="opt-head"><span>Color: <strong id="color-label">${p.colors[0].name}</strong></span></div>
        <div class="swatches" role="group" aria-label="Color">
          ${p.colors.map((c, i) => `<button type="button" class="swatch swatch-lg" data-color="${c.name}" aria-pressed="${i === 0}" aria-label="${c.name}" title="${c.name}" style="--sw:${c.hex}"></button>`).join('')}
        </div>
      </div>

      <div class="opt">
        <div class="opt-head"><span>Size${one ? '' : ': <strong id="size-label">Select</strong>'}</span>
          ${p.category !== 'accessories' ? `<button type="button" class="link" data-action="size-guide" data-cat="${p.category}">${icon('ruler', 16)} Size guide</button>` : ''}</div>
        <div class="sizes" role="group" aria-label="Size">
          ${p.sizes.map(s => `<button type="button" class="chip" data-size="${s}" aria-pressed="${one}">${s}</button>`).join('')}
        </div>
        <p class="field-error" id="size-error" role="alert"></p>
      </div>

      <div class="opt">
        <div class="opt-head"><span>Quantity</span></div>
        <div class="qty" role="group" aria-label="Quantity">
          <button type="button" data-qty="-1" aria-label="Decrease quantity">${icon('minus', 16)}</button>
          <output id="qty-val" aria-live="polite">1</output>
          <button type="button" data-qty="1" aria-label="Increase quantity">${icon('plus', 16)}</button>
        </div>
      </div>

      <div class="pdp-actions">
        <button type="button" class="btn btn-solid" data-pdp="add">Add to bag</button>
        <button type="button" class="btn btn-outline" data-pdp="buy">Buy now</button>
        <button type="button" class="wish-btn" data-action="wish" data-id="${p.id}" aria-pressed="${wished}">${icon('heart', 18)}<span class="wish-label">${wished ? 'Saved to wishlist' : 'Save to wishlist'}</span></button>
      </div>

      <ul class="perks">
        <li>${icon('truck', 18)}<span>Free shipping on orders over $150</span></li>
        <li>${icon('returns', 18)}<span>Free 30-day returns in the US</span></li>
      </ul>

      <div class="acc">
        <details><summary>Shipping<span class="chev">${icon('chevronDown', 18)}</span></summary><div><p>Orders ship within 2 business days. Standard delivery in the US takes 3 to 5 business days and costs $9, or is free over $150. International delivery takes 6 to 10 business days.</p></div></details>
        <details><summary>Returns<span class="chev">${icon('chevronDown', 18)}</span></summary><div><p>Return unworn items with tags attached within 30 days of delivery. US returns are free, and refunds are issued within 5 business days of us receiving your parcel. <a href="#/info/shipping-returns">Full policy</a></p></div></details>
        <details><summary>Product details<span class="chev">${icon('chevronDown', 18)}</span></summary><div><ul class="detail-list">${p.details.map(d => `<li>${esc(d)}</li>`).join('')}</ul></div></details>
      </div>
    </div>
  </div>

  <section class="related reveal" aria-labelledby="related-title">
    <header class="section-head"><h2 id="related-title" class="display h2">You may also like</h2><a class="link" href="#/shop">Shop all</a></header>
    <div class="product-grid grid-4">${related.map(productCard).join('')}</div>
  </section>`;
}

function bindPdp(p, root) {
  const sel = { color: p.colors[0].name, size: p.sizes.length === 1 ? p.sizes[0] : null, qty: 1 };
  const err = $('#size-error', root);

  root.addEventListener('click', e => {
    const c = e.target.closest('[data-color]');
    if (c) {
      sel.color = c.dataset.color;
      $$('[data-color]', root).forEach(b => b.setAttribute('aria-pressed', b === c));
      $('#color-label', root).textContent = sel.color;
      return;
    }
    const z = e.target.closest('[data-size]');
    if (z) {
      sel.size = z.dataset.size;
      $$('[data-size]', root).forEach(b => b.setAttribute('aria-pressed', b === z));
      const lbl = $('#size-label', root); if (lbl) lbl.textContent = sel.size;
      err.textContent = '';
      return;
    }
    const q = e.target.closest('[data-qty]');
    if (q) {
      sel.qty = Math.max(1, Math.min(SHIPPING.maxQty, sel.qty + Number(q.dataset.qty)));
      $('#qty-val', root).textContent = sel.qty;
      return;
    }
    const act = e.target.closest('[data-pdp]');
    if (!act) return;
    if (!sel.size) {
      err.textContent = 'Select a size to continue.';
      const first = $('[data-size]', root);
      first && first.focus();
      return;
    }
    addToCart(p.id, sel);
    if (act.dataset.pdp === 'buy') { openCheckout(); return; }
    toast(`Added <strong>${esc(p.name)}</strong> (${sel.color}, ${sel.size}) to your bag.`, { actionLabel: 'View bag', onAction: openCart });
  });

  // Mobile gallery counter
  const g = $('#gallery', root), count = $('#g-count', root);
  g.addEventListener('scroll', () => {
    const i = Math.round(g.scrollLeft / g.clientWidth);
    count.textContent = `${Math.min(i + 1, p.images.length)} / ${p.images.length}`;
  }, { passive: true });
}

/* ==========================================================================
   CART (page, drawer, checkout)
   ========================================================================== */
function cartLineHTML(l) {
  const p = byId(l.id), key = esc(lineKey(l));
  return `<li class="cart-line">
    <a class="cart-thumb" href="#/product/${p.id}" tabindex="-1" aria-hidden="true"><img src="${IMG(p.images[0], 300)}" alt="" width="96" height="120" loading="lazy"></a>
    <div class="cart-meta">
      <a class="cart-name" href="#/product/${p.id}">${esc(p.name)}</a>
      <p class="cart-opts">${l.color}${l.size === 'One size' ? '' : ' / ' + l.size}</p>
      <div class="qty qty-sm" role="group" aria-label="Quantity for ${esc(p.name)}">
        <button type="button" data-action="qty-dec" data-key="${key}" aria-label="Decrease quantity" ${l.qty <= 1 ? 'disabled' : ''}>${icon('minus', 14)}</button>
        <output aria-live="polite">${l.qty}</output>
        <button type="button" data-action="qty-inc" data-key="${key}" aria-label="Increase quantity" ${l.qty >= SHIPPING.maxQty ? 'disabled' : ''}>${icon('plus', 14)}</button>
      </div>
    </div>
    <div class="cart-side">
      <p class="cart-price">${money(p.price * l.qty)}</p>
      <button type="button" class="cart-remove" data-action="remove" data-key="${key}" aria-label="Remove ${esc(p.name)} from bag">${icon('trash', 18)}</button>
    </div>
  </li>`;
}

function shippingMeter(t) {
  const pct = Math.min(100, Math.round(t.subtotal / SHIPPING.freeOver * 100));
  return `<div class="meter"><p>${t.remainingForFree > 0 ? `You're ${money(t.remainingForFree)} away from free shipping.` : 'Your order ships free.'}</p><div class="meter-bar" role="presentation"><span style="width:${pct}%"></span></div></div>`;
}

function totalsRows(t) {
  return `<dl class="totals">
    <div><dt>Subtotal</dt><dd>${money(t.subtotal)}</dd></div>
    <div><dt>Estimated shipping</dt><dd>${t.shipping === 0 ? 'Free' : money(t.shipping)}</dd></div>
    <div class="grand"><dt>Total</dt><dd>${money(t.total)}</dd></div>
  </dl>`;
}

function emptyBagHTML(withSuggestions) {
  const best = [...PRODUCTS].sort((a, b) => b.sold - a.sold).slice(0, 4);
  return `<div class="empty">
    <h2 class="empty-title">Your bag is empty.</h2>
    <p>Pieces you add will show up here.</p>
    <div class="empty-actions"><a class="btn btn-solid" href="#/shop">Continue shopping</a></div>
  </div>${withSuggestions ? `<section class="section-tight"><header class="section-head"><h2 class="display h3">Best sellers</h2></header><div class="product-grid grid-4">${best.map(productCard).join('')}</div></section>` : ''}`;
}

function cartPage() {
  return {
    title: 'Your bag', desc: 'Review the items in your VANTA bag.', nav: '',
    html: `<div class="wrap page-pad"><h1 class="display page-h">Your bag</h1><div id="cart-root"></div></div>`,
    after: renderCartPage
  };
}

function renderCartPage() {
  const root = $('#cart-root');
  if (!root) return;
  const t = cartTotals();
  if (!cart.length) { root.innerHTML = emptyBagHTML(true); return; }
  root.innerHTML = `<div class="cart-layout">
    <ul class="cart-lines" aria-label="Items in your bag">${cart.map(cartLineHTML).join('')}</ul>
    <aside class="cart-summary" aria-label="Order summary">
      <h2 class="summary-title">Order summary</h2>
      ${shippingMeter(t)}
      ${totalsRows(t)}
      <p class="fineprint">Taxes are calculated at checkout.</p>
      <button type="button" class="btn btn-solid w-full" data-action="checkout">Proceed to checkout</button>
      <a class="btn btn-outline w-full" href="#/shop">Continue shopping</a>
    </aside>
  </div>`;
}

function renderDrawer() {
  const t = cartTotals();
  $('#drawer-title').textContent = t.count ? `Bag (${t.count})` : 'Bag';
  const body = $('#drawer-body'), foot = $('#drawer-foot');
  if (!cart.length) {
    body.innerHTML = `<div class="empty empty-drawer"><h3 class="empty-title">Your bag is empty.</h3><p>Pieces you add will show up here.</p><a class="btn btn-solid" href="#/shop">Continue shopping</a></div>`;
    foot.innerHTML = '';
    return;
  }
  body.innerHTML = `${shippingMeter(t)}<ul class="cart-lines">${cart.map(cartLineHTML).join('')}</ul>`;
  foot.innerHTML = `${totalsRows(t)}
    <button type="button" class="btn btn-solid w-full" data-action="checkout">Proceed to checkout</button>
    <a class="btn btn-outline w-full" href="#/cart">View bag</a>`;
}

function updateCartBadges() {
  const { count } = cartTotals();
  $$('[data-cart-count]').forEach(el => { el.textContent = count; el.hidden = count === 0; });
  $$('.bag-btn').forEach(b => b.setAttribute('aria-label', count ? `Open bag, ${count} ${count === 1 ? 'item' : 'items'}` : 'Open bag, empty'));
}

function openCart() { renderDrawer(); Overlay.open($('#cart-dialog')); }

/* ---------- checkout (demo: no payment is processed) ---------- */
function openCheckout() {
  if (!cart.length) { toast('Your bag is empty. Add something first.'); return; }
  Overlay.closeAll(true);
  const t = cartTotals(), u = getUser();
  $('#checkout-body').innerHTML = `
  <div class="checkout">
    <form data-form="checkout" novalidate aria-label="Delivery details">
      <p class="demo-note">This is a demo store. No payment is taken and no order is shipped.</p>
      <h3 class="sub-h">Contact</h3>
      ${fieldHTML({ id: 'co-email', name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email', value: u ? u.email : '' })}
      <h3 class="sub-h">Delivery</h3>
      ${fieldHTML({ id: 'co-name', name: 'name', label: 'Full name', required: true, autocomplete: 'name', value: u ? u.name : '' })}
      ${fieldHTML({ id: 'co-address', name: 'address', label: 'Address', required: true, autocomplete: 'street-address' })}
      <div class="two-col">
        ${fieldHTML({ id: 'co-city', name: 'city', label: 'City', required: true, autocomplete: 'address-level2' })}
        ${fieldHTML({ id: 'co-zip', name: 'zip', label: 'Postal code', required: true, autocomplete: 'postal-code' })}
      </div>
      <button type="submit" class="btn btn-solid w-full">Place order &middot; ${money(t.total)}</button>
    </form>
    <aside class="checkout-summary" aria-label="Your order">
      <ul class="mini-lines">${cart.map(l => { const p = byId(l.id); return `<li><img src="${IMG(p.images[0], 160)}" alt="" width="48" height="60"><span>${esc(p.name)}<small>${l.color}${l.size === 'One size' ? '' : ' / ' + l.size} &times; ${l.qty}</small></span><span>${money(p.price * l.qty)}</span></li>`; }).join('')}</ul>
      ${totalsRows(t)}
    </aside>
  </div>`;
  Overlay.open($('#checkout-dialog'));
}

function placeOrder() {
  const ref = 'VNT-' + Math.floor(100000 + Math.random() * 900000);
  clearCart();
  $('#checkout-body').innerHTML = `<div class="order-done">
    <span class="done-icon">${icon('check', 28)}</span>
    <h3 class="display h3">Order placed.</h3>
    <p>Your reference is <strong>${ref}</strong>. A confirmation would be emailed to you in a live store.</p>
    <button type="button" class="btn btn-solid" data-action="done-shopping">Continue shopping</button>
  </div>`;
}

/* ---------- account (demo: stored in this browser only) ---------- */
function renderAccount() {
  const u = getUser();
  const saved = wishlist.map(byId).filter(Boolean);
  const savedHTML = saved.length
    ? `<ul class="mini-lines saved">${saved.map(p => `<li><a href="#/product/${p.id}"><img src="${IMG(p.images[0], 160)}" alt="" width="48" height="60"><span>${esc(p.name)}<small>${money(p.price)}</small></span></a><button type="button" class="cart-remove" data-action="wish" data-id="${p.id}" aria-label="Remove ${esc(p.name)} from wishlist">${icon('x', 16)}</button></li>`).join('')}</ul>`
    : `<p class="muted">Tap the heart on any product to save it here.</p>`;
  $('#account-body').innerHTML = `
    ${u ? `<p class="lead-sm">Signed in as <strong>${esc(u.name)}</strong> (${esc(u.email)}).</p>
           <button type="button" class="link" data-action="sign-out">Sign out</button>`
        : `<form data-form="account" novalidate aria-label="Create account">
             <p class="muted">Create an account to keep your details for next time. Stored in this browser only.</p>
             ${fieldHTML({ id: 'ac-name', name: 'name', label: 'Name', required: true, autocomplete: 'name' })}
             ${fieldHTML({ id: 'ac-email', name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' })}
             ${fieldHTML({ id: 'ac-pass', name: 'password', label: 'Password', type: 'password', required: true, autocomplete: 'new-password', minlength: 8 })}
             <button type="submit" class="btn btn-solid w-full">Create account</button>
           </form>`}
    <h3 class="sub-h">Saved items (${saved.length})</h3>
    ${savedHTML}`;
}

/* ---------- size guide ---------- */
function renderSizeGuide(cat) {
  const key = cat === 'bottoms' ? 'bottoms' : 'tops';
  const order = key === 'tops' ? ['tops', 'bottoms'] : ['bottoms', 'tops'];
  const table = k => {
    const g = SIZE_GUIDE[k];
    return `<h3 class="sub-h">${g.label}</h3><table class="size-table"><thead><tr>${g.cols.map(c => `<th scope="col">${c}</th>`).join('')}</tr></thead><tbody>${g.rows.map(r =>
      `<tr><th scope="row">${r[0]}</th><td>${r[1]} in <small>${Math.round(r[1] * 2.54)} cm</small></td><td>${r[2]} in <small>${Math.round(r[2] * 2.54)} cm</small></td></tr>`).join('')}</tbody></table>`;
  };
  $('#size-body').innerHTML = `<p class="muted">Body measurements. Most pieces are cut oversized: take your usual size for the intended fit, or size down for a closer one.</p>${order.map(table).join('')}`;
}

/* ==========================================================================
   COLLECTIONS
   ========================================================================== */
function collectionsPage() {
  const layout = ['wide', 'narrow', 'narrow', 'wide'];
  return {
    title: 'Collections', desc: 'Explore VANTA collections: Core, Night Shift, Utility and Washed.', nav: 'collections',
    html: `<div class="wrap page-pad">
      <header class="page-head"><h1 class="display page-h">Collections</h1><p class="page-sub">Four ways into the same idea: heavy, quiet and made to last.</p></header>
      <div class="coll-grid">
        ${COLLECTIONS.map((c, i) => `<a class="coll coll-${layout[i]} reveal" href="#/shop?collection=${c.slug}" aria-label="${c.name}: ${PRODUCTS.filter(p => p.collection === c.slug).length} pieces">
          <img src="${IMG(c.image, 1200)}" alt="${c.name} collection campaign image" loading="lazy" decoding="async">
          <span class="coll-shade"></span>
          <span class="coll-copy"><span class="display coll-name">${c.name}</span><span class="coll-line">${c.tagline}</span><span class="coll-count">${PRODUCTS.filter(p => p.collection === c.slug).length} pieces</span></span>
        </a>`).join('')}
      </div>
    </div>`
  };
}

/* ==========================================================================
   ABOUT
   ========================================================================== */
function aboutPage() {
  const steps = [
    ['Draw', 'Every piece starts as a silhouette on paper. We draw a lot and keep very little.'],
    ['Sample', 'We cut three or four prototypes, adjusting proportion, weight and drape until the shape is right.'],
    ['Wear-test', 'The team wears each sample for a month. Anything that stretches, pills or fades the wrong way goes back to the start.'],
    ['Release', 'We produce in small runs and carry our best pieces over, so favorites stay in stock.']
  ];
  const specs = [
    ['Tees', '240 to 320 gsm combed cotton jersey'],
    ['Hoodies and sweats', '450 to 500 gsm brushed-back or loopback cotton'],
    ['Denim', '13 oz cotton, stone washed'],
    ['Outerwear', 'Water-resistant cotton twill and recycled nylon'],
    ['Trims', 'YKK zips, corozo buttons, box-stitched seams']
  ];
  return {
    title: 'About', desc: 'VANTA exists between minimalism and expression. Learn about our philosophy, design process, materials and sustainability.', nav: 'about',
    html: `
    <div class="wrap page-pad">
      <header class="about-intro">
        <h1 class="display page-h">Between minimalism and expression.</h1>
        <p class="lead">VANTA exists between minimalism and expression. We create elevated everyday pieces designed for people who don't need to be loud to be noticed.</p>
      </header>
    </div>
    <figure class="wide-img reveal"><img src="${IMG(SITE_IMG.aboutHero, 1920)}" alt="VANTA studio editorial: model in a black overcoat" loading="lazy" decoding="async"></figure>

    <section class="section wrap two-up" aria-labelledby="phil">
      <h2 id="phil" class="display h2 reveal">What we believe</h2>
      <div class="prose reveal">
        <p>Most clothing is designed to be seen from across a room. We design for the person wearing it: how a sleeve falls, how a collar sits after a hundred washes, how a jacket feels at 6 a.m.</p>
        <p>That means fewer styles, heavier fabrics and silhouettes with room in them. It means black, bone and charcoal, because they work with everything you already own. And it means no slogans. The pieces do the talking.</p>
      </div>
    </section>

    <section class="section-tight wrap" aria-labelledby="process">
      <h2 id="process" class="display h2 reveal">Design process</h2>
      <ol class="steps">
        ${steps.map(([h, t], i) => `<li class="reveal"><span class="step-n">${i + 1}</span><div><h3>${h}</h3><p>${t}</p></div></li>`).join('')}
      </ol>
    </section>

    <section class="section wrap two-up" aria-labelledby="quality">
      <div class="reveal"><h2 id="quality" class="display h2">Quality</h2><p class="lead">We spec fabric before we draw. Weight, fibre length and finishing decide how a piece ages, so those are the first things we set.</p></div>
      <dl class="specs reveal">${specs.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    </section>

    <section class="banner banner-short" aria-label="Editorial image">
      <img src="${IMG(SITE_IMG.aboutWide, 1920)}" alt="Editorial image: model in monochrome layers against a studio wall" loading="lazy" decoding="async">
      <div class="banner-shade"></div>
    </section>

    <section class="section wrap two-up" id="sustainability" aria-labelledby="sust">
      <div class="reveal"><h2 id="sust" class="display h2">Sustainability</h2><p class="lead">The most sustainable garment is the one you keep wearing. We start there, then work on everything around it.</p></div>
      <ul class="commit reveal">
        <li><h3>Fewer, longer-lived pieces</h3><p>Small production runs and carry-over core styles reduce unsold stock and waste.</p></li>
        <li><h3>Better materials</h3><p>Organic and combed cotton for knits and tees, recycled nylon in outerwear, and no unnecessary blends.</p></li>
        <li><h3>Close, known factories</h3><p>We make in Portugal with partners we visit twice a year, within a short drive of where the fabric is milled.</p></li>
        <li><h3>Plastic-free packaging</h3><p>Recycled paper mailers and tags. Nothing in your parcel is single-use plastic.</p></li>
      </ul>
    </section>

    <section class="light cta-band"><div class="wrap cta-inner reveal"><h2 class="display h2">See what we've made.</h2><a class="btn btn-dark" href="#/shop">Shop collection</a></div></section>`
  };
}

/* ==========================================================================
   CONTACT
   ========================================================================== */
function contactPage() {
  return {
    title: 'Contact', desc: 'Contact VANTA: send us a message, find our store details, or read answers to frequently asked questions.', nav: '',
    html: `
    <div class="wrap page-pad">
      <header class="page-head"><h1 class="display page-h">Get in touch</h1><p class="page-sub">Questions about an order, a fit or a collaboration. We reply within one business day.</p></header>
      <div class="contact-grid">
        <div id="contact-form-wrap">
          <form data-form="contact" novalidate aria-label="Contact form">
            <div class="two-col">
              ${fieldHTML({ id: 'ct-name', name: 'name', label: 'Name', required: true, autocomplete: 'name' })}
              ${fieldHTML({ id: 'ct-email', name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' })}
            </div>
            ${fieldHTML({ id: 'ct-topic', name: 'topic', label: 'Topic', required: true, options: ['Order or delivery', 'Returns or exchange', 'Sizing and fit', 'Press and collaborations', 'Something else'] })}
            ${fieldHTML({ id: 'ct-msg', name: 'message', label: 'Message', required: true, rows: 5, minlength: 10 })}
            <button type="submit" class="btn btn-solid">Send message</button>
          </form>
        </div>
        <aside class="contact-info" aria-label="Contact details">
          <div><h2 class="sub-h">Email</h2><p><a class="link" href="mailto:hello@vanta.example">hello@vanta.example</a></p></div>
          <div><h2 class="sub-h">Instagram</h2><p><a class="link" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Follow on Instagram</a></p></div>
          <div id="store"><h2 class="sub-h">Store</h2>
            <p>VANTA Studio<br>214 Mercer Street<br>New York, NY 10012</p>
            <p class="muted">Tuesday to Saturday, 11 am to 7 pm<br>Sunday, 12 pm to 5 pm<br>Closed Monday</p></div>
        </aside>
      </div>
      <section class="faq" id="faq" aria-labelledby="faq-title">
        <h2 id="faq-title" class="display h2">FAQ</h2>
        <div class="acc">${FAQ.map(f => `<details><summary>${esc(f.q)}<span class="chev">${icon('chevronDown', 18)}</span></summary><div><p>${esc(f.a)}</p></div></details>`).join('')}</div>
      </section>
    </div>`
  };
}

/* ==========================================================================
   INFO (shipping, privacy, terms)
   ========================================================================== */
function infoPage(slug) {
  const page = INFO_PAGES[slug];
  if (!page) return notFoundPage();
  return {
    title: page.title, desc: `${page.title} for VANTA.`, nav: '',
    html: `<div class="wrap page-pad"><article class="info">
      <h1 class="display page-h">${page.title}</h1>
      ${page.sections.map(([h, t]) => `<section><h2>${h}</h2><p>${t}</p></section>`).join('')}
      <p class="muted">Last updated October 2026.</p>
    </article></div>`
  };
}
