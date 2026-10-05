/* ==========================================================================
   VANTA data. Edit products, images, collections and copy here.
   Images are Unsplash photo IDs: swap any ID for your own photography.
   ========================================================================== */

const IMG = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// Shown automatically if an image fails to load
const FALLBACK_IMG = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#151515"/>' +
  '<text x="200" y="262" fill="#3a3a3a" font-family="Arial Black,Arial,sans-serif" font-size="44" font-weight="900" text-anchor="middle" letter-spacing="6">VANTA</text></svg>'
);

// Editorial / site imagery
const SITE_IMG = {
  hero: '1529139574466-a303027c1d8b',
  banner: '1509631179647-0177331693ae',
  aboutHero: '1445205170230-053b83016050',
  aboutDetail: '1469334031218-e382a71b716b',
  aboutWide: '1507679799987-c73779587ccf',
  store: '1489987707025-afc232f7ea0f'
};

const COLOR_HEX = {
  'Black': '#0a0a0a', 'Bone': '#e8e4da', 'Charcoal': '#3a3a3c', 'Washed Grey': '#8d8d90',
  'Stone': '#b9b1a3', 'Olive': '#4b4f3a', 'Indigo': '#27324f', 'Washed Black': '#2a2b2e', 'Ash': '#c9c9c7'
};
const C = name => ({ name, hex: COLOR_HEX[name] });

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const ONE_SIZE = ['One size'];

const CATEGORIES = [
  { slug: 'tees', name: 'Tees' },
  { slug: 'hoodies', name: 'Hoodies' },
  { slug: 'bottoms', name: 'Bottoms' },
  { slug: 'outerwear', name: 'Outerwear' },
  { slug: 'accessories', name: 'Accessories' }
];

const COLLECTIONS = [
  {
    slug: 'core', name: 'Core',
    tagline: 'The everyday foundation.',
    desc: 'Our staple fits, refined each season. Plain on purpose, perfect in the details.',
    image: '1521572163474-6864f9cf17ab'
  },
  {
    slug: 'night-shift', name: 'Night Shift',
    tagline: 'Black, heavyweight, after dark.',
    desc: 'A study in black. Dense fabrics, dropped shoulders and silhouettes that hold their shape.',
    image: '1515886657613-9f3515b0c78f'
  },
  {
    slug: 'utility', name: 'Utility',
    tagline: 'Built for the commute.',
    desc: 'Workwear logic with a quieter finish: deep pockets, reinforced seams, easy movement.',
    image: '1591047139829-d91aecb6caea'
  },
  {
    slug: 'washed', name: 'Washed',
    tagline: 'Faded in the right places.',
    desc: 'Garment-washed by hand for a lived-in look from the first wear.',
    image: '1541099649105-f69ad21f3246'
  }
];

const PRODUCTS = [
  {
    id: 'essential-oversized-tee', name: 'Essential Oversized Tee', price: 58, category: 'tees',
    gender: ['men', 'women'], collection: 'core', badge: 'BESTSELLER', date: '2026-02-10', sold: 940,
    colors: [C('Black'), C('Bone'), C('Charcoal')], sizes: SIZES, rating: 4.8, reviews: 312,
    images: ['1521572163474-6864f9cf17ab', '1583743814966-8936f5b7be1a', '1618354691373-d851c5c3a990'],
    desc: 'The one we reach for every day. A drop-shoulder tee cut boxy through the body, in a dense 240 gsm cotton jersey that drapes instead of clings.',
    details: ['240 gsm combed cotton jersey', 'Oversized fit: take your usual size for the intended look', 'Ribbed collar with double-needle stitching', 'Machine wash cold, hang dry', 'Made in Portugal']
  },
  {
    id: 'shadow-heavyweight-tee', name: 'Shadow Heavyweight Tee', price: 74, category: 'tees',
    gender: ['men', 'women'], collection: 'night-shift', badge: 'NEW', date: '2026-09-18', sold: 410,
    colors: [C('Black'), C('Washed Grey')], sizes: SIZES, rating: 4.7, reviews: 148,
    images: ['1576566588028-4147f3842f27', '1503342217505-b0a15ec3261c', '1583743814966-8936f5b7be1a'],
    desc: 'Heavier than anything else in our tee line. Garment-dyed in a deep black that fades softly and a collar that keeps its shape wash after wash.',
    details: ['320 gsm heavyweight cotton jersey', 'Garment dyed, expect slight tonal variation', 'Wide ribbed collar', 'Machine wash cold, inside out', 'Made in Portugal']
  },
  {
    id: 'vanta-cargo-pants', name: 'VANTA Cargo Pants', price: 148, category: 'bottoms',
    gender: ['men', 'women'], collection: 'utility', badge: 'BESTSELLER', date: '2026-03-04', sold: 760,
    colors: [C('Black'), C('Olive'), C('Stone')], sizes: SIZES, rating: 4.9, reviews: 267,
    images: ['1624378439575-d8705ad7ae80', '1473966968600-fa801b869a1a', '1542272604-787c3835535d'],
    desc: 'A relaxed cargo with real storage. Articulated knees, a tapered leg and hardware-free pockets that sit flat when empty.',
    details: ['Cotton ripstop, 280 gsm', 'Relaxed fit, mid rise', 'Six pockets with snap closures', 'Adjustable hem drawcords', 'Machine wash cold. Made in Portugal']
  },
  {
    id: 'relaxed-wide-leg-denim', name: 'Relaxed Wide-Leg Denim', price: 138, category: 'bottoms',
    gender: ['men', 'women'], collection: 'washed', badge: 'NEW', date: '2026-09-25', sold: 330,
    colors: [C('Washed Black'), C('Indigo')], sizes: SIZES, rating: 4.6, reviews: 94,
    images: ['1541099649105-f69ad21f3246', '1542272604-787c3835535d', '1473966968600-fa801b869a1a'],
    desc: 'A wide, straight leg in 13 oz Japanese-milled denim. Stone-washed for a soft hand and a faded finish that is different on every pair.',
    details: ['13 oz cotton denim', 'Wide leg, high rise', 'Button fly, copper rivets', 'Wash separately the first time', 'Made in Portugal']
  },
  {
    id: 'core-zip-hoodie', name: 'Core Zip Hoodie', price: 128, category: 'hoodies',
    gender: ['men', 'women'], collection: 'core', badge: null, date: '2026-01-20', sold: 520,
    colors: [C('Black'), C('Charcoal'), C('Bone')], sizes: SIZES, rating: 4.7, reviews: 201,
    images: ['1556905055-8f358a7a47b2', '1578768079052-aa76e52ff62e', '1620799140408-edc6dcb6d633'],
    desc: 'A full-zip hoodie in brushed-back fleece. Structured hood, hidden media pocket and a clean front with no drawcord tips to catch the eye.',
    details: ['450 gsm brushed-back cotton fleece', 'Regular-to-relaxed fit', 'Matte YKK zip', 'Machine wash cold, tumble low', 'Made in Portugal']
  },
  {
    id: 'signature-oversized-hoodie', name: 'Signature Oversized Hoodie', price: 156, category: 'hoodies',
    gender: ['men', 'women'], collection: 'night-shift', badge: 'BESTSELLER', date: '2026-04-12', sold: 1180,
    colors: [C('Black'), C('Washed Grey')], sizes: SIZES, rating: 4.9, reviews: 538,
    images: ['1578768079052-aa76e52ff62e', '1552374196-1ab2a1c593e8', '1556905055-8f358a7a47b2'],
    desc: 'Our most-worn piece. A deep drop shoulder, double-layered hood and a weight that feels like a jacket. Embroidered VANTA mark at the back neck.',
    details: ['500 gsm loopback cotton', 'Oversized fit', 'Double-lined hood', 'Tonal embroidered mark', 'Machine wash cold. Made in Portugal']
  },
  {
    id: 'utility-jacket', name: 'Utility Jacket', price: 238, category: 'outerwear',
    gender: ['men', 'women'], collection: 'utility', badge: 'NEW', date: '2026-09-30', sold: 280,
    colors: [C('Black'), C('Olive')], sizes: SIZES, rating: 4.8, reviews: 76,
    images: ['1591047139829-d91aecb6caea', '1551028719-00167b16eac5', '1539533018447-63fcce2678e3'],
    desc: 'A boxy overshirt-jacket in water-resistant cotton twill. Four large pockets, a storm placket and a collar that stands up on its own.',
    details: ['Water-resistant cotton twill', 'Boxy fit, hits at the hip', 'Four pockets, one internal', 'Corozo buttons', 'Dry clean or spot clean']
  },
  {
    id: 'boxy-long-sleeve', name: 'Boxy Long Sleeve', price: 78, category: 'tees',
    gender: ['women'], collection: 'core', badge: null, date: '2026-02-28', sold: 355,
    colors: [C('Bone'), C('Black')], sizes: SIZES, rating: 4.6, reviews: 119,
    images: ['1618354691373-d851c5c3a990', '1521572163474-6864f9cf17ab', '1576566588028-4147f3842f27'],
    desc: 'A cropped, boxy long sleeve with a heavy rib cuff. Layers cleanly under jackets and holds its square shoulder line.',
    details: ['260 gsm cotton jersey', 'Boxy, slightly cropped', 'Ribbed cuffs and collar', 'Machine wash cold', 'Made in Portugal']
  },
  {
    id: 'vanta-track-pants', name: 'VANTA Track Pants', price: 118, category: 'bottoms',
    gender: ['men'], collection: 'core', badge: null, date: '2026-05-15', sold: 290,
    colors: [C('Black'), C('Charcoal')], sizes: SIZES, rating: 4.5, reviews: 88,
    images: ['1515886657613-9f3515b0c78f', '1624378439575-d8705ad7ae80', '1469334031218-e382a71b716b'],
    desc: 'Tailored like trousers, worn like sweats. A straight leg in a matte technical nylon with a hidden drawcord and zip pockets.',
    details: ['Matte nylon blend with stretch', 'Straight leg, elastic waist', 'Zip pockets', 'Machine wash cold', 'Made in Portugal']
  },
  {
    id: 'washed-graphic-tee', name: 'Washed Graphic Tee', price: 68, category: 'tees',
    gender: ['men', 'women'], collection: 'washed', badge: 'NEW', date: '2026-09-12', sold: 240,
    colors: [C('Washed Grey'), C('Washed Black')], sizes: SIZES, rating: 4.4, reviews: 57,
    images: ['1503342217505-b0a15ec3261c', '1583743814966-8936f5b7be1a', '1521572163474-6864f9cf17ab'],
    desc: 'A vintage-washed tee with a quiet, oversized back print. Each piece is enzyme and stone washed, so no two are identical.',
    details: ['280 gsm garment-washed cotton', 'Oversized fit', 'Water-based back print', 'Wash cold with like colors', 'Made in Portugal']
  },
  {
    id: 'minimal-cap', name: 'Minimal Cap', price: 44, category: 'accessories',
    gender: ['men', 'women'], collection: 'core', badge: 'BESTSELLER', date: '2026-01-08', sold: 870,
    colors: [C('Black'), C('Bone'), C('Charcoal')], sizes: ONE_SIZE, rating: 4.7, reviews: 402,
    images: ['1588850561407-ed78c282e89b', '1521369909029-2afed882baee', '1534215754734-18e55d13e346'],
    desc: 'A six-panel cap with a low, unstructured crown and a tonal embroidered mark. Adjusts with a brass-free strap closure.',
    details: ['Washed cotton twill', 'Unstructured, curved brim', 'Adjustable strap, one size', 'Spot clean', 'Embroidered logo']
  },
  {
    id: 'essential-tote', name: 'Essential Tote', price: 52, category: 'accessories',
    gender: ['men', 'women'], collection: 'core', badge: null, date: '2026-03-22', sold: 310,
    colors: [C('Black'), C('Bone')], sizes: ONE_SIZE, rating: 4.6, reviews: 133,
    images: ['1544816155-12df9643f363', '1597484662317-9bd7bdda2907', '1590874103328-eac38a683ce7'],
    desc: 'A heavy canvas tote sized for a laptop and a gym kit. Reinforced handles, an inner zip pocket and nothing you do not need.',
    details: ['16 oz organic cotton canvas', '40 x 38 x 12 cm', 'Inner zip pocket', 'Spot clean or hand wash', 'Reinforced box-stitched handles']
  },
  {
    id: 'heavyweight-crewneck', name: 'Heavyweight Crewneck', price: 124, category: 'hoodies',
    gender: ['men', 'women'], collection: 'night-shift', badge: null, date: '2026-06-02', sold: 265,
    colors: [C('Black'), C('Ash')], sizes: SIZES, rating: 4.7, reviews: 82,
    images: ['1620799140408-edc6dcb6d633', '1556905055-8f358a7a47b2', '1578768079052-aa76e52ff62e'],
    desc: 'A crewneck sweatshirt with proper weight, a tight rib and a faintly boxy cut. Made to wear alone or under a jacket.',
    details: ['480 gsm loopback cotton', 'Relaxed fit', 'Reinforced neck tape', 'Machine wash cold', 'Made in Portugal']
  },
  {
    id: 'nylon-coach-jacket', name: 'Nylon Coach Jacket', price: 198, category: 'outerwear',
    gender: ['men'], collection: 'night-shift', badge: 'NEW', date: '2026-09-22', sold: 215,
    colors: [C('Black')], sizes: SIZES, rating: 4.8, reviews: 41,
    images: ['1539533018447-63fcce2678e3', '1591047139829-d91aecb6caea', '1551028719-00167b16eac5'],
    desc: 'A lightweight coach jacket in a matte, wind-resistant nylon. Snap front, slanted pockets and a cut that sits over a hoodie.',
    details: ['Matte recycled nylon shell', 'Cotton-blend lining', 'Snap front closure', 'Wind resistant', 'Machine wash cold, hang dry']
  },
  {
    id: 'pleat-trouser', name: 'Pleated Trouser', price: 142, category: 'bottoms',
    gender: ['women'], collection: 'core', badge: null, date: '2026-06-18', sold: 190,
    colors: [C('Black'), C('Stone')], sizes: SIZES, rating: 4.5, reviews: 63,
    images: ['1594938298603-c8148c4dae35', '1490481651871-ab68de25d43d', '1434389677669-e08b4cac3105'],
    desc: 'The dressed-up option. A double-pleat trouser with a high rise and a long, fluid leg in a wool-blend suiting that does not crease easily.',
    details: ['Wool-blend suiting', 'Relaxed straight leg, high rise', 'Double front pleats', 'Dry clean recommended', 'Made in Portugal']
  },
  {
    id: 'ribbed-beanie', name: 'Ribbed Beanie', price: 38, category: 'accessories',
    gender: ['men', 'women'], collection: 'night-shift', badge: null, date: '2026-08-10', sold: 450,
    colors: [C('Black'), C('Charcoal'), C('Bone')], sizes: ONE_SIZE, rating: 4.8, reviews: 210,
    images: ['1576871337622-98d48d1cf531', '1521369909029-2afed882baee', '1588850561407-ed78c282e89b'],
    desc: 'A dense merino-blend rib that sits close and stays put. Fold it once for a cuff or leave it long.',
    details: ['Merino and recycled wool blend', 'Stretch rib knit', 'One size', 'Hand wash cold, dry flat', 'Woven label at the cuff']
  }
];

const SIZE_GUIDE = {
  tops: {
    label: 'Tops, hoodies and outerwear',
    cols: ['Size', 'Chest', 'Length'],
    rows: [['XS', 36, 26.5], ['S', 38, 27], ['M', 40, 28], ['L', 43, 29], ['XL', 46, 30], ['XXL', 49, 31]]
  },
  bottoms: {
    label: 'Bottoms',
    cols: ['Size', 'Waist', 'Inseam'],
    rows: [['XS', 28, 30], ['S', 30, 30.5], ['M', 32, 31], ['L', 34, 31.5], ['XL', 36, 32], ['XXL', 38, 32.5]]
  }
};

const FAQ = [
  { q: 'How long does delivery take?', a: 'Orders ship within 2 business days. Standard delivery in the US takes 3 to 5 business days. International orders arrive in 6 to 10 business days.' },
  { q: 'What is your returns policy?', a: 'You have 30 days from delivery to return unworn items with tags attached. US returns are free. Refunds go back to your original payment method within 5 business days of us receiving the parcel.' },
  { q: 'How do your pieces fit?', a: 'Most of our range is cut oversized. If you want the intended silhouette, take your usual size. For a closer fit, size down. Our size guide has full measurements.' },
  { q: 'Can I change or cancel my order?', a: 'We can change or cancel an order within 2 hours of purchase. Email us with your order number and we will do what we can.' },
  { q: 'How should I care for heavyweight cotton?', a: 'Wash cold, inside out, and hang dry or tumble on low. Heavy fabrics soften with every wash, so skipping the dryer keeps the shape longest.' },
  { q: 'Do you restock sold-out pieces?', a: 'Our core pieces return each season. Limited runs do not. Join the newsletter and you will hear about drops and restocks first.' }
];

const INFO_PAGES = {
  'shipping-returns': {
    title: 'Shipping & Returns',
    sections: [
      ['Shipping', 'Orders over $150 ship free within the US. Below that, standard shipping is $9. Orders are packed and dispatched within 2 business days and arrive in 3 to 5 business days.'],
      ['International', 'We ship to most countries. Delivery takes 6 to 10 business days. Duties and taxes are calculated at checkout.'],
      ['Returns', 'You can return any unworn item with tags attached within 30 days of delivery. US returns are free. Start a return by emailing hello@vanta.example with your order number.'],
      ['Exchanges', 'Need a different size? Return the original and place a new order. This is the fastest way to make sure your size is held.'],
      ['Damaged or incorrect items', 'If something arrives damaged or is not what you ordered, email us within 7 days with a photo and we will make it right.']
    ]
  },
  'privacy': {
    title: 'Privacy Policy',
    sections: [
      ['What we collect', 'We collect the details you give us when you order, create an account or contact us: name, email, address and order history. This demo site stores your bag, saved items and account details only in your own browser.'],
      ['How we use it', 'To process orders, answer your questions, and, only if you opt in, send you news about releases. We do not sell your data.'],
      ['Cookies and storage', 'We use your browser\'s local storage to remember your bag, wishlist and sign-in so they are there when you return.'],
      ['Your choices', 'You can ask to see, correct or delete your data at any time by emailing hello@vanta.example. You can unsubscribe from emails with one click.']
    ]
  },
  'terms': {
    title: 'Terms of Service',
    sections: [
      ['Using this site', 'By using this site you agree to these terms. Please use it lawfully and do not attempt to disrupt it.'],
      ['Orders and pricing', 'Prices are listed in US dollars. We may cancel an order if an item is mispriced or unavailable, and will refund you in full.'],
      ['Intellectual property', 'All imagery, text, logos and designs on this site belong to VANTA and may not be reused without written permission.'],
      ['Liability', 'To the extent permitted by law, VANTA is not liable for indirect or consequential loss arising from use of this site.'],
      ['Changes', 'We may update these terms from time to time. Continued use of the site means you accept the updated terms.']
    ]
  }
};
