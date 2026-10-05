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
  'Stone': '#b9b1a3', 'Olive': '#4b4f3a', 'Indigo': '#27324f', 'Washed Black': '#2a2b2e', 'Ash': '#c9c9c7',
  'Navy': '#1c2438', 'Sand': '#cdbfa3', 'Slate': '#51565e', 'Forest': '#26392f', 'Rust': '#7a3b24', 'Silver': '#c0c0c4',
  'Gold': '#b79a5b', 'Off White': '#f1efe8', 'Sky': '#9db4cf', 'Lilac': '#b9aed0', 'Blush': '#e3c8c2', 'Brown': '#4a3426',
  'Grey Melange': '#9a9a9c', 'Gunmetal': '#4b4d52'
};
const C = name => ({ name, hex: COLOR_HEX[name] });

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const ONE_SIZE = ['One size'];

const CATEGORIES = [
  { slug: 'tees', name: 'Tees' },
  { slug: 'shirts', name: 'Shirts' },
  { slug: 'hoodies', name: 'Hoodies' },
  { slug: 'jackets', name: 'Jackets' },
  { slug: 'bottoms', name: 'Bottoms' },
  { slug: 'dresses', name: 'Dresses and skirts' },
  { slug: 'caps', name: 'Caps' },
  { slug: 'chains', name: 'Chains' },
  { slug: 'accessories', name: 'Bags and more' }
];

const COLLECTIONS = [
  { slug: 'core', name: 'Core', tagline: 'The everyday foundation.', desc: 'Our staple fits, refined each season. Plain on purpose, perfect in the details.', image: '1521572163474-6864f9cf17ab' },
  { slug: 'night-shift', name: 'Night Shift', tagline: 'Black, heavyweight, after dark.', desc: 'A study in black. Dense fabrics, dropped shoulders and silhouettes that hold their shape.', image: '1515886657613-9f3515b0c78f' },
  { slug: 'utility', name: 'Utility', tagline: 'Built for the commute.', desc: 'Workwear logic with a quieter finish: deep pockets, reinforced seams, easy movement.', image: '1591047139829-d91aecb6caea' },
  { slug: 'washed', name: 'Washed', tagline: 'Faded in the right places.', desc: 'Garment-washed by hand for a lived-in look from the first wear.', image: '1541099649105-f69ad21f3246' },
  { slug: 'tailored', name: 'Tailored', tagline: 'Sharp, without the effort.', desc: 'Pleats, poplin and structured layers. Dressed-up pieces that still move like streetwear.', image: '1594938298603-c8148c4dae35' },
  { slug: 'denim', name: 'Denim Works', tagline: 'Rigid, wide and made to fade.', desc: 'Heavy denim in relaxed, baggy and straight cuts, washed in small batches in Bengaluru.', image: '1542272604-787c3835535d' },
  { slug: 'chrome', name: 'Chrome', tagline: 'Chains, finished in steel.', desc: 'Cuban, rope and box chains in tarnish-resistant stainless steel. Wear one or stack three.', image: '1611591437281-460bfbe1220a' },
  { slug: 'weekend', name: 'Weekend', tagline: 'Soft, heavy, unhurried.', desc: 'Fleece, knits and easy joggers for slow mornings and long train rides.', image: '1556905055-8f358a7a47b2' },
  { slug: 'monsoon', name: 'Monsoon', tagline: 'Layers for the rain.', desc: 'Water-resistant shells, trenches and vests that handle a wet commute and look good dry.', image: '1539533018447-63fcce2678e3' },
  { slug: 'summer', name: 'Summer Heat', tagline: 'Light, loose, breathable.', desc: 'Linen, mesh and lightweight cotton for humid days. Shorts, camp shirts and caps.', image: '1509631179647-0177331693ae' }
];

const PRODUCTS = [
  {
    id: 'essential-oversized-tee', name: 'Essential Oversized Tee', price: 2499, category: 'tees',
    gender: ['men', 'women'], collection: 'core', badge: 'BESTSELLER', date: '2026-02-10', sold: 940,
    colors: [C('Black'), C('Bone'), C('Charcoal')], sizes: SIZES, rating: 4.8, reviews: 312,
    images: ['1521572163474-6864f9cf17ab', '1583743814966-8936f5b7be1a', '1618354691373-d851c5c3a990'],
    desc: 'The one we reach for every day. A drop-shoulder tee cut boxy through the body, in a dense 240 gsm cotton jersey that drapes instead of clings.',
    details: ['240 gsm combed cotton jersey', 'Oversized fit: take your usual size for the intended look', 'Ribbed collar with double-needle stitching', 'Machine wash cold, hang dry', 'Made in India']
  },
  {
    id: 'shadow-heavyweight-tee', name: 'Shadow Heavyweight Tee', price: 3199, category: 'tees',
    gender: ['men', 'women'], collection: 'night-shift', badge: 'NEW', date: '2026-09-18', sold: 410,
    colors: [C('Black'), C('Washed Grey')], sizes: SIZES, rating: 4.7, reviews: 148,
    images: ['1576566588028-4147f3842f27', '1503342217505-b0a15ec3261c', '1583743814966-8936f5b7be1a'],
    desc: 'Heavier than anything else in our tee line. Garment-dyed in a deep black that fades softly and a collar that keeps its shape wash after wash.',
    details: ['320 gsm heavyweight cotton jersey', 'Garment dyed, expect slight tonal variation', 'Wide ribbed collar', 'Machine wash cold, inside out', 'Made in India']
  },
  {
    id: 'vanta-cargo-pants', name: 'VANTA Cargo Pants', price: 6299, category: 'bottoms',
    gender: ['men', 'women'], collection: 'utility', badge: 'BESTSELLER', date: '2026-03-04', sold: 760,
    colors: [C('Black'), C('Olive'), C('Stone')], sizes: SIZES, rating: 4.9, reviews: 267,
    images: ['1624378439575-d8705ad7ae80', '1473966968600-fa801b869a1a', '1542272604-787c3835535d'],
    desc: 'A relaxed cargo with real storage. Articulated knees, a tapered leg and hardware-free pockets that sit flat when empty.',
    details: ['Cotton ripstop, 280 gsm', 'Relaxed fit, mid rise', 'Six pockets with snap closures', 'Adjustable hem drawcords', 'Machine wash cold. Made in India']
  },
  {
    id: 'relaxed-wide-leg-denim', name: 'Relaxed Wide-Leg Denim', price: 5799, category: 'bottoms',
    gender: ['men', 'women'], collection: 'washed', badge: 'NEW', date: '2026-09-25', sold: 330,
    colors: [C('Washed Black'), C('Indigo')], sizes: SIZES, rating: 4.6, reviews: 94,
    images: ['1541099649105-f69ad21f3246', '1542272604-787c3835535d', '1473966968600-fa801b869a1a'],
    desc: 'A wide, straight leg in 13 oz Japanese-milled denim. Stone-washed for a soft hand and a faded finish that is different on every pair.',
    details: ['13 oz cotton denim', 'Wide leg, high rise', 'Button fly, copper rivets', 'Wash separately the first time', 'Made in India']
  },
  {
    id: 'core-zip-hoodie', name: 'Core Zip Hoodie', price: 5399, category: 'hoodies',
    gender: ['men', 'women'], collection: 'core', badge: null, date: '2026-01-20', sold: 520,
    colors: [C('Black'), C('Charcoal'), C('Bone')], sizes: SIZES, rating: 4.7, reviews: 201,
    images: ['1556905055-8f358a7a47b2', '1578768079052-aa76e52ff62e', '1620799140408-edc6dcb6d633'],
    desc: 'A full-zip hoodie in brushed-back fleece. Structured hood, hidden media pocket and a clean front with no drawcord tips to catch the eye.',
    details: ['450 gsm brushed-back cotton fleece', 'Regular-to-relaxed fit', 'Matte YKK zip', 'Machine wash cold, tumble low', 'Made in India']
  },
  {
    id: 'signature-oversized-hoodie', name: 'Signature Oversized Hoodie', price: 6599, category: 'hoodies',
    gender: ['men', 'women'], collection: 'night-shift', badge: 'BESTSELLER', date: '2026-04-12', sold: 1180,
    colors: [C('Black'), C('Washed Grey')], sizes: SIZES, rating: 4.9, reviews: 538,
    images: ['1578768079052-aa76e52ff62e', '1552374196-1ab2a1c593e8', '1556905055-8f358a7a47b2'],
    desc: 'Our most-worn piece. A deep drop shoulder, double-layered hood and a weight that feels like a jacket. Embroidered VANTA mark at the back neck.',
    details: ['500 gsm loopback cotton', 'Oversized fit', 'Double-lined hood', 'Tonal embroidered mark', 'Machine wash cold. Made in India']
  },
  {
    id: 'utility-jacket', name: 'Utility Jacket', price: 9999, category: 'jackets',
    gender: ['men', 'women'], collection: 'utility', badge: 'NEW', date: '2026-09-30', sold: 280,
    colors: [C('Black'), C('Olive')], sizes: SIZES, rating: 4.8, reviews: 76,
    images: ['1591047139829-d91aecb6caea', '1551028719-00167b16eac5', '1539533018447-63fcce2678e3'],
    desc: 'A boxy overshirt-jacket in water-resistant cotton twill. Four large pockets, a storm placket and a collar that stands up on its own.',
    details: ['Water-resistant cotton twill', 'Boxy fit, hits at the hip', 'Four pockets, one internal', 'Corozo buttons', 'Dry clean or spot clean']
  },
  {
    id: 'boxy-long-sleeve', name: 'Boxy Long Sleeve', price: 3299, category: 'tees',
    gender: ['women'], collection: 'core', badge: null, date: '2026-02-28', sold: 355,
    colors: [C('Bone'), C('Black')], sizes: SIZES, rating: 4.6, reviews: 119,
    images: ['1618354691373-d851c5c3a990', '1521572163474-6864f9cf17ab', '1576566588028-4147f3842f27'],
    desc: 'A cropped, boxy long sleeve with a heavy rib cuff. Layers cleanly under jackets and holds its square shoulder line.',
    details: ['260 gsm cotton jersey', 'Boxy, slightly cropped', 'Ribbed cuffs and collar', 'Machine wash cold', 'Made in India']
  },
  {
    id: 'vanta-track-pants', name: 'VANTA Track Pants', price: 4999, category: 'bottoms',
    gender: ['men'], collection: 'core', badge: null, date: '2026-05-15', sold: 290,
    colors: [C('Black'), C('Charcoal')], sizes: SIZES, rating: 4.5, reviews: 88,
    images: ['1515886657613-9f3515b0c78f', '1624378439575-d8705ad7ae80', '1469334031218-e382a71b716b'],
    desc: 'Tailored like trousers, worn like sweats. A straight leg in a matte technical nylon with a hidden drawcord and zip pockets.',
    details: ['Matte nylon blend with stretch', 'Straight leg, elastic waist', 'Zip pockets', 'Machine wash cold', 'Made in India']
  },
  {
    id: 'washed-graphic-tee', name: 'Washed Graphic Tee', price: 2899, category: 'tees',
    gender: ['men', 'women'], collection: 'washed', badge: 'NEW', date: '2026-09-12', sold: 240,
    colors: [C('Washed Grey'), C('Washed Black')], sizes: SIZES, rating: 4.4, reviews: 57,
    images: ['1503342217505-b0a15ec3261c', '1583743814966-8936f5b7be1a', '1521572163474-6864f9cf17ab'],
    desc: 'A vintage-washed tee with a quiet, oversized back print. Each piece is enzyme and stone washed, so no two are identical.',
    details: ['280 gsm garment-washed cotton', 'Oversized fit', 'Water-based back print', 'Wash cold with like colors', 'Made in India']
  },
  {
    id: 'minimal-cap', name: 'Minimal Cap', price: 1899, category: 'caps',
    gender: ['men', 'women'], collection: 'core', badge: 'BESTSELLER', date: '2026-01-08', sold: 870,
    colors: [C('Black'), C('Bone'), C('Charcoal')], sizes: ONE_SIZE, rating: 4.7, reviews: 402,
    images: ['1588850561407-ed78c282e89b', '1521369909029-2afed882baee', '1534215754734-18e55d13e346'],
    desc: 'A six-panel cap with a low, unstructured crown and a tonal embroidered mark. Adjusts with a brass-free strap closure.',
    details: ['Washed cotton twill', 'Unstructured, curved brim', 'Adjustable strap, one size', 'Spot clean', 'Embroidered logo']
  },
  {
    id: 'essential-tote', name: 'Essential Tote', price: 2199, category: 'accessories',
    gender: ['men', 'women'], collection: 'core', badge: null, date: '2026-03-22', sold: 310,
    colors: [C('Black'), C('Bone')], sizes: ONE_SIZE, rating: 4.6, reviews: 133,
    images: ['1544816155-12df9643f363', '1597484662317-9bd7bdda2907', '1590874103328-eac38a683ce7'],
    desc: 'A heavy canvas tote sized for a laptop and a gym kit. Reinforced handles, an inner zip pocket and nothing you do not need.',
    details: ['16 oz organic cotton canvas', '40 x 38 x 12 cm', 'Inner zip pocket', 'Spot clean or hand wash', 'Reinforced box-stitched handles']
  },
  {
    id: 'heavyweight-crewneck', name: 'Heavyweight Crewneck', price: 5299, category: 'hoodies',
    gender: ['men', 'women'], collection: 'night-shift', badge: null, date: '2026-06-02', sold: 265,
    colors: [C('Black'), C('Ash')], sizes: SIZES, rating: 4.7, reviews: 82,
    images: ['1620799140408-edc6dcb6d633', '1556905055-8f358a7a47b2', '1578768079052-aa76e52ff62e'],
    desc: 'A crewneck sweatshirt with proper weight, a tight rib and a faintly boxy cut. Made to wear alone or under a jacket.',
    details: ['480 gsm loopback cotton', 'Relaxed fit', 'Reinforced neck tape', 'Machine wash cold', 'Made in India']
  },
  {
    id: 'nylon-coach-jacket', name: 'Nylon Coach Jacket', price: 8399, category: 'jackets',
    gender: ['men'], collection: 'night-shift', badge: 'NEW', date: '2026-09-22', sold: 215,
    colors: [C('Black')], sizes: SIZES, rating: 4.8, reviews: 41,
    images: ['1539533018447-63fcce2678e3', '1591047139829-d91aecb6caea', '1551028719-00167b16eac5'],
    desc: 'A lightweight coach jacket in a matte, wind-resistant nylon. Snap front, slanted pockets and a cut that sits over a hoodie.',
    details: ['Matte recycled nylon shell', 'Cotton-blend lining', 'Snap front closure', 'Wind resistant', 'Machine wash cold, hang dry']
  },
  {
    id: 'pleat-trouser', name: 'Pleated Trouser', price: 5999, category: 'bottoms',
    gender: ['women'], collection: 'core', badge: null, date: '2026-06-18', sold: 190,
    colors: [C('Black'), C('Stone')], sizes: SIZES, rating: 4.5, reviews: 63,
    images: ['1594938298603-c8148c4dae35', '1490481651871-ab68de25d43d', '1434389677669-e08b4cac3105'],
    desc: 'The dressed-up option. A double-pleat trouser with a high rise and a long, fluid leg in a wool-blend suiting that does not crease easily.',
    details: ['Wool-blend suiting', 'Relaxed straight leg, high rise', 'Double front pleats', 'Dry clean recommended', 'Made in India']
  },
  {
    id: 'ribbed-beanie', name: 'Ribbed Beanie', price: 1599, category: 'accessories',
    gender: ['men', 'women'], collection: 'night-shift', badge: null, date: '2026-08-10', sold: 450,
    colors: [C('Black'), C('Charcoal'), C('Bone')], sizes: ONE_SIZE, rating: 4.8, reviews: 210,
    images: ['1576871337622-98d48d1cf531', '1521369909029-2afed882baee', '1588850561407-ed78c282e89b'],
    desc: 'A dense merino-blend rib that sits close and stays put. Fold it once for a cuff or leave it long.',
    details: ['Merino and recycled wool blend', 'Stretch rib knit', 'One size', 'Hand wash cold, dry flat', 'Woven label at the cuff']
  }
];


/* ==========================================================================
   Catalogue generator: add a row to SPECS to add a product.
   [name, category, price (INR), gender m|w|u, collection, colours, flag N|B|'', oneSize?]
   N = NEW badge, B = BESTSELLER badge
   ========================================================================== */
const CHAIN_LENGTHS = ['18 in', '20 in', '24 in'];
const POOLS = {
  tees: ['1521572163474-6864f9cf17ab', '1583743814966-8936f5b7be1a', '1618354691373-d851c5c3a990', '1576566588028-4147f3842f27', '1503342217505-b0a15ec3261c'],
  shirts: ['1596755094514-f87e34085b2c', '1602810318383-e386cc2a3ccf', '1594938298603-c8148c4dae35'],
  hoodies: ['1556905055-8f358a7a47b2', '1578768079052-aa76e52ff62e', '1620799140408-edc6dcb6d633', '1552374196-1ab2a1c593e8'],
  jackets: ['1591047139829-d91aecb6caea', '1551028719-00167b16eac5', '1539533018447-63fcce2678e3'],
  bottoms: ['1541099649105-f69ad21f3246', '1542272604-787c3835535d', '1473966968600-fa801b869a1a', '1624378439575-d8705ad7ae80'],
  dresses: ['1496747611176-843222e1e57c', '1490481651871-ab68de25d43d', '1434389677669-e08b4cac3105', '1469334031218-e382a71b716b'],
  caps: ['1588850561407-ed78c282e89b', '1521369909029-2afed882baee', '1534215754734-18e55d13e346'],
  chains: ['1611591437281-460bfbe1220a', '1599643478518-a784e5dc4c8f', '1515562141207-7a88fb7ce338'],
  accessories: ['1544816155-12df9643f363', '1597484662317-9bd7bdda2907', '1590874103328-eac38a683ce7']
};
const WOMEN_POOL = ['1496747611176-843222e1e57c', '1490481651871-ab68de25d43d', '1434389677669-e08b4cac3105', '1469334031218-e382a71b716b', '1515886657613-9f3515b0c78f', '1509631179647-0177331693ae', '1445205170230-053b83016050'];

const CAT_COPY = {
  tees: ['Heavyweight cotton jersey with a clean neckline and a relaxed, drop-shoulder shape.', 'A everyday staple cut generous through the body and finished with a rib collar that holds its shape.'],
  shirts: ['A relaxed shirt with a structured collar and a fabric that softens with every wash.', 'Cut roomy and easy, made to be worn buttoned up or open over a tee.'],
  hoodies: ['Dense, brushed-back fleece with a structured hood and a boxy, oversized fit.', 'Heavy enough to work as a jacket, soft enough to live in.'],
  jackets: ['A considered outer layer with clean lines, deep pockets and a shape that sits well over a hoodie.', 'Built for the commute: structured shoulders, durable hardware and a lining that keeps its form.'],
  bottoms: ['A relaxed cut with real weight in the fabric, so it drapes instead of clinging.', 'Roomy through the leg with a clean, tapered finish and pockets that sit flat.'],
  dresses: ['A fluid, easy silhouette that works with a hoodie over the top or a jacket on top.', 'Minimal lines and a flattering drape, designed to move from day to night.'],
  caps: ['A low, unstructured crown with a curved brim and a tonal embroidered mark.', 'Washed for softness from day one, with an adjustable strap that fits most heads.'],
  chains: ['Polished 316L stainless steel with a durable PVD finish. Nickel-free, water-resistant and made not to tarnish.', 'A weighty link with a smooth finish. Wear it alone or layer it with a second length.'],
  accessories: ['A hard-wearing accessory made from the same heavy materials as the rest of the range.', 'Simple, durable and sized for everyday carry.']
};
const CAT_DETAILS = {
  tees: ['240 to 280 gsm combed cotton jersey', 'Relaxed, drop-shoulder fit', 'Pre-shrunk, ribbed collar', 'Machine wash cold, inside out', 'Made in India'],
  shirts: ['Cotton poplin or cotton-linen blend', 'Relaxed fit with a structured collar', 'Corozo buttons', 'Machine wash cold, warm iron', 'Made in India'],
  hoodies: ['450 to 500 gsm brushed-back or loopback cotton', 'Oversized fit, double-lined hood', 'Reinforced seams and rib trims', 'Machine wash cold, tumble low', 'Made in India'],
  jackets: ['Shell, twill or nylon, depending on style', 'Lined, with internal pocket', 'Heavy-duty snaps or YKK zip', 'Spot clean or dry clean', 'Made in India'],
  bottoms: ['Heavy cotton, denim or technical blend', 'Relaxed to wide fit', 'Reinforced pockets and seams', 'Wash cold, inside out', 'Made in India'],
  dresses: ['Cotton, rib-knit or viscose blend', 'Fluid, relaxed fit', 'Finished with clean, flat seams', 'Machine wash cold, hang dry', 'Made in India'],
  caps: ['Washed cotton, nylon or wool blend', 'Unstructured, curved brim', 'Adjustable strap, one size', 'Spot clean only', 'Embroidered details'],
  chains: ['316L stainless steel with PVD finish', 'Nickel-free, water-resistant', 'Lobster clasp with 2 in extender', 'Wipe clean, avoid perfume on the chain', 'Ships in a VANTA pouch'],
  accessories: ['Heavy canvas, nylon, wool or leather', 'Reinforced stitching', 'Made for everyday use', 'Spot clean', 'Made in India']
};

// name, category, price, gender, collection, colours, flag, oneSize
const SPECS = [
  /* ---------- Unisex ---------- */
  ['Core Pocket Tee', 'tees', 1999, 'u', 'core', 'Black,Bone,Olive', ''],
  ['Acid Wash Boxy Tee', 'tees', 2499, 'u', 'washed', 'Washed Grey,Washed Black', 'N'],
  ['Pigment Dyed Hoodie', 'hoodies', 5499, 'u', 'washed', 'Stone,Olive,Washed Black', 'N'],
  ['Half-Zip Fleece Pullover', 'hoodies', 4999, 'u', 'weekend', 'Charcoal,Bone', ''],
  ['Heavyweight Zip Hoodie', 'hoodies', 6299, 'u', 'night-shift', 'Black', 'B'],
  ['Quilted Liner Jacket', 'jackets', 7499, 'u', 'utility', 'Black,Olive', 'N'],
  ['Rain Shell Jacket', 'jackets', 6999, 'u', 'monsoon', 'Black,Slate', 'N'],
  ['Waxed Field Jacket', 'jackets', 9499, 'u', 'utility', 'Olive,Brown', ''],
  ['Denim Trucker Jacket', 'jackets', 6499, 'u', 'denim', 'Indigo,Washed Black', 'B'],
  ['Sweat Shorts', 'bottoms', 2999, 'u', 'weekend', 'Black,Grey Melange,Bone', ''],
  ['Wide Cargo Shorts', 'bottoms', 3499, 'u', 'summer', 'Stone,Black,Olive', 'N'],
  ['Fleece Joggers', 'bottoms', 3999, 'u', 'weekend', 'Black,Charcoal', 'B'],
  ['Washed Dad Cap', 'caps', 1299, 'u', 'washed', 'Black,Stone,Washed Grey', 'B'],
  ['Nylon Camp Cap', 'caps', 1499, 'u', 'utility', 'Black,Olive', 'N'],
  ['Five-Panel Tech Cap', 'caps', 1599, 'u', 'night-shift', 'Black,Charcoal', ''],
  ['Mesh Trucker Cap', 'caps', 1199, 'u', 'summer', 'Black,Off White', ''],
  ['Embroidered Logo Cap', 'caps', 1399, 'u', 'core', 'Black,Navy,Bone', 'B'],
  ['Corduroy Cap', 'caps', 1499, 'u', 'core', 'Brown,Black', ''],
  ['Bucket Hat', 'caps', 1799, 'u', 'summer', 'Black,Stone', 'N'],
  ['Wool Baseball Cap', 'caps', 1899, 'u', 'night-shift', 'Charcoal,Black', ''],
  ['Cuban Link Chain', 'chains', 3499, 'u', 'chrome', 'Silver,Gold', 'B'],
  ['Rope Chain', 'chains', 2999, 'u', 'chrome', 'Silver,Gold', ''],
  ['Box Chain Necklace', 'chains', 2499, 'u', 'chrome', 'Silver,Gunmetal', 'N'],
  ['Dog Tag Chain', 'chains', 2799, 'u', 'chrome', 'Silver,Black', 'N'],
  ['Chunky Curb Chain', 'chains', 3999, 'u', 'chrome', 'Silver,Gold', ''],
  ['Signature Pendant Chain', 'chains', 3299, 'u', 'chrome', 'Silver,Gold', 'B'],
  ['Layered Chain Set', 'chains', 4499, 'u', 'chrome', 'Silver,Gold', 'N'],
  ['Tennis Chain', 'chains', 5499, 'u', 'chrome', 'Silver', 'N'],
  ['Wallet Chain', 'chains', 1999, 'u', 'chrome', 'Silver,Black', '', true],
  ['Chain Link Bracelet', 'chains', 1799, 'u', 'chrome', 'Silver,Gold', 'N', true],
  ['Crossbody Utility Bag', 'accessories', 3499, 'u', 'utility', 'Black,Olive', 'N', true],
  ['Nylon Sling Bag', 'accessories', 2799, 'u', 'utility', 'Black', 'B', true],
  ['Weekender Duffle', 'accessories', 6999, 'u', 'utility', 'Black', 'N', true],
  ['Ribbed Socks 3-Pack', 'accessories', 899, 'u', 'core', 'Black,Bone', '', true],
  ['Merino Scarf', 'accessories', 2499, 'u', 'night-shift', 'Charcoal,Black', '', true],
  ['Leather Card Holder', 'accessories', 1799, 'u', 'core', 'Black,Brown', '', true],
  ['Canvas Belt', 'accessories', 1299, 'u', 'utility', 'Black,Olive', '', true],
  ['Cotton Bandana', 'accessories', 699, 'u', 'summer', 'Black,Off White,Rust', '', true],

  /* ---------- Men ---------- */
  ['Oversized Pocket Tee', 'tees', 2299, 'm', 'core', 'Black,Bone', ''],
  ['Henley Long Sleeve', 'tees', 2799, 'm', 'core', 'Black,Charcoal,Olive', ''],
  ['Mesh Panel Tee', 'tees', 2399, 'm', 'summer', 'Black,Off White', 'N'],
  ['Heavy Slub Tee', 'tees', 2199, 'm', 'core', 'Charcoal,Stone', ''],
  ['Graphic Long Sleeve', 'tees', 2999, 'm', 'washed', 'Washed Grey,Black', ''],
  ['Sleeveless Gym Tank', 'tees', 1499, 'm', 'summer', 'Black,Charcoal,Bone', ''],
  ['Cuban Collar Shirt', 'shirts', 3999, 'm', 'summer', 'Black,Sand,Off White', 'N'],
  ['Oxford Overshirt', 'shirts', 4999, 'm', 'tailored', 'Navy,Sand,Black', ''],
  ['Linen Camp Shirt', 'shirts', 3799, 'm', 'summer', 'Sand,Sky,Off White', 'B'],
  ['Flannel Check Shirt', 'shirts', 3999, 'm', 'weekend', 'Rust,Forest,Navy', ''],
  ['Merino Knit Polo', 'shirts', 4499, 'm', 'tailored', 'Black,Bone', ''],
  ['Graphic Oversized Hoodie', 'hoodies', 5799, 'm', 'night-shift', 'Black,Washed Grey', 'B'],
  ['Cropped Boxy Hoodie', 'hoodies', 4999, 'm', 'core', 'Black,Bone', ''],
  ['Utility Pocket Hoodie', 'hoodies', 5999, 'm', 'utility', 'Olive,Black', 'N'],
  ['Crewneck Sweatshirt', 'hoodies', 4299, 'm', 'weekend', 'Grey Melange,Black,Navy', ''],
  ['Chunky Knit Cardigan', 'hoodies', 5499, 'm', 'weekend', 'Charcoal,Bone', ''],
  ['Zip Knit Sweater', 'hoodies', 4999, 'm', 'weekend', 'Black,Navy', 'N'],
  ['Varsity Bomber', 'jackets', 8999, 'm', 'night-shift', 'Black,Navy', 'N'],
  ['Harrington Jacket', 'jackets', 7499, 'm', 'tailored', 'Navy,Stone,Black', ''],
  ['Padded Puffer Jacket', 'jackets', 9999, 'm', 'night-shift', 'Black', 'B'],
  ['Leather-Look Biker Jacket', 'jackets', 11999, 'm', 'night-shift', 'Black', 'N'],
  ['Overdyed Work Jacket', 'jackets', 6999, 'm', 'utility', 'Rust,Olive', ''],
  ['Track Jacket', 'jackets', 4999, 'm', 'weekend', 'Black,Charcoal', ''],
  ['Sleeveless Puffer Vest', 'jackets', 5999, 'm', 'monsoon', 'Black,Olive', ''],
  ['Straight Fit Denim', 'bottoms', 4499, 'm', 'denim', 'Indigo,Washed Black', 'B'],
  ['Baggy Carpenter Jeans', 'bottoms', 4999, 'm', 'denim', 'Washed Black,Indigo', 'N'],
  ['Distressed Black Jeans', 'bottoms', 4799, 'm', 'denim', 'Black,Washed Black', ''],
  ['Parachute Pants', 'bottoms', 4299, 'm', 'utility', 'Black,Olive,Stone', ''],
  ['Slim Taper Chinos', 'bottoms', 3999, 'm', 'tailored', 'Stone,Navy,Black', ''],
  ['Pleated Wool Trouser', 'bottoms', 6499, 'm', 'tailored', 'Charcoal,Black', ''],
  ['Ripstop Cargo Joggers', 'bottoms', 3999, 'm', 'utility', 'Black,Olive', ''],
  ['Linen Drawstring Pants', 'bottoms', 3499, 'm', 'summer', 'Sand,Black', ''],
  ['Tailored Shorts', 'bottoms', 2999, 'm', 'summer', 'Stone,Navy', ''],

  /* ---------- Women ---------- */
  ['Baby Tee', 'tees', 1799, 'w', 'core', 'Black,Bone,Blush', 'B'],
  ['Ribbed Tank', 'tees', 1499, 'w', 'core', 'Black,Bone,Charcoal', ''],
  ['Cropped Boxy Tee', 'tees', 1999, 'w', 'core', 'Black,Off White', ''],
  ['Structured Corset Top', 'tees', 3499, 'w', 'tailored', 'Black,Bone', 'N'],
  ['Off-Shoulder Knit Top', 'tees', 2799, 'w', 'weekend', 'Black,Blush', ''],
  ['Mesh Layer Top', 'tees', 2299, 'w', 'night-shift', 'Black', ''],
  ['Halter Neck Top', 'tees', 2199, 'w', 'summer', 'Black,Sand,Sky', 'N'],
  ['Poplin Shirt', 'shirts', 3499, 'w', 'tailored', 'Off White,Sky,Black', ''],
  ['Oversized Boyfriend Shirt', 'shirts', 3799, 'w', 'core', 'Off White,Black,Navy', 'B'],
  ['Satin Slip Shirt', 'shirts', 3999, 'w', 'tailored', 'Black,Blush', ''],
  ['Cropped Zip Hoodie', 'hoodies', 4999, 'w', 'core', 'Black,Bone,Lilac', 'B'],
  ['Oversized Cropped Sweatshirt', 'hoodies', 3999, 'w', 'weekend', 'Grey Melange,Blush,Black', ''],
  ['Fleece Quarter-Zip', 'hoodies', 4499, 'w', 'weekend', 'Charcoal,Bone', ''],
  ['Hooded Knit Cardigan', 'hoodies', 5499, 'w', 'weekend', 'Charcoal,Black', 'N'],
  ['Cropped Bomber', 'jackets', 7499, 'w', 'night-shift', 'Black,Olive', 'N'],
  ['Faux Leather Moto Jacket', 'jackets', 9999, 'w', 'night-shift', 'Black', 'B'],
  ['Tailored Blazer', 'jackets', 8499, 'w', 'tailored', 'Black,Charcoal,Bone', 'N'],
  ['Oversized Trench Coat', 'jackets', 11999, 'w', 'monsoon', 'Stone,Black', ''],
  ['Cropped Denim Jacket', 'jackets', 5999, 'w', 'denim', 'Indigo,Washed Black', ''],
  ['Longline Puffer', 'jackets', 10999, 'w', 'night-shift', 'Black', 'N'],
  ['Cropped Utility Jacket', 'jackets', 6499, 'w', 'utility', 'Olive,Black', ''],
  ['Packable Windbreaker', 'jackets', 4999, 'w', 'monsoon', 'Black,Lilac,Sky', ''],
  ['Low-Rise Wide Denim', 'bottoms', 4499, 'w', 'denim', 'Indigo,Washed Black', 'B'],
  ['High-Rise Straight Jeans', 'bottoms', 4299, 'w', 'denim', 'Washed Black,Indigo,Black', ''],
  ['Baggy Cargo Pants', 'bottoms', 4799, 'w', 'utility', 'Black,Olive,Stone', 'B'],
  ['Straight Tailored Trousers', 'bottoms', 4999, 'w', 'tailored', 'Black,Charcoal,Stone', ''],
  ['Flared Track Pants', 'bottoms', 3799, 'w', 'weekend', 'Black,Grey Melange', ''],
  ['Biker Shorts', 'bottoms', 1799, 'w', 'summer', 'Black,Charcoal,Bone', ''],
  ['Bermuda Shorts', 'bottoms', 2999, 'w', 'summer', 'Stone,Black', ''],
  ['Ribbed Leggings', 'bottoms', 1999, 'w', 'weekend', 'Black,Charcoal', ''],
  ['Pleated Mini Skirt', 'dresses', 2799, 'w', 'tailored', 'Black,Charcoal', ''],
  ['Denim Maxi Skirt', 'dresses', 3999, 'w', 'denim', 'Indigo,Washed Black', ''],
  ['Cargo Mini Skirt', 'dresses', 2999, 'w', 'utility', 'Black,Olive', 'N'],
  ['Slip Dress', 'dresses', 4499, 'w', 'tailored', 'Black,Blush,Sand', 'N'],
  ['Ribbed Midi Dress', 'dresses', 3999, 'w', 'core', 'Black,Charcoal,Bone', 'B'],
  ['Shirt Dress', 'dresses', 4999, 'w', 'tailored', 'Off White,Black,Sky', ''],
  ['Oversized Tee Dress', 'dresses', 2999, 'w', 'summer', 'Black,Off White', 'N'],
  ['Cargo Utility Dress', 'dresses', 5499, 'w', 'utility', 'Olive,Black', ''],
  ['Knit Mini Dress', 'dresses', 4299, 'w', 'weekend', 'Black,Bone', ''],
  ['Dainty Curb Chain', 'chains', 1999, 'w', 'chrome', 'Silver,Gold', 'B'],
  ['Mini Pendant Necklace', 'chains', 1799, 'w', 'chrome', 'Silver,Gold', 'N'],
  ['Choker Chain', 'chains', 1599, 'w', 'chrome', 'Silver,Gold', ''],
  ['Paperclip Chain', 'chains', 2199, 'w', 'chrome', 'Silver,Gold', ''],
  ['Soft Ponytail Cap', 'caps', 1399, 'w', 'core', 'Black,Blush,Bone', 'N'],
  ['Knit Beret', 'caps', 1499, 'w', 'weekend', 'Black,Charcoal,Bone', ''],
  ['Mini Shoulder Bag', 'accessories', 3999, 'w', 'core', 'Black,Bone', 'N', true],
  ['Quilted Tote', 'accessories', 3499, 'w', 'night-shift', 'Black', '', true]
];

function buildFrom(specs, offset) {
  const GENDERS = { m: ['men'], w: ['women'], u: ['men', 'women'] };
  const collName = Object.fromEntries(COLLECTIONS.map(c => [c.slug, c.name]));
  const slug = t => t.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const used = new Set(PRODUCTS.map(p => p.id));
  specs.forEach(([name, category, price, g, collection, colours, flag, one], j) => {
    const i = j + offset;
    let id = slug(name); while (used.has(id)) id += '-2'; used.add(id);
    const pool = POOLS[category];
    const images = (g === 'w' && !['caps', 'chains', 'accessories'].includes(category))
      ? [pool[i % pool.length], WOMEN_POOL[i % WOMEN_POOL.length], WOMEN_POOL[(i + 3) % WOMEN_POOL.length]]
      : [0, 1, 2].map(k => pool[(i + k) % pool.length]);
    const day = flag === 'N' ? 20 + (i % 14) : null;
    const date = flag === 'N' ? (day <= 30 ? `2026-09-${String(day).padStart(2, '0')}` : `2026-10-0${day - 30}`)
      : `2026-0${1 + (i % 8)}-${String(1 + (i * 7) % 27).padStart(2, '0')}`;
    const colors = colours.split(',').map(C);
    PRODUCTS.push({
      id, name, price, category, gender: GENDERS[g], collection,
      badge: flag === 'N' ? 'NEW' : flag === 'B' ? 'BESTSELLER' : null,
      date, sold: flag === 'B' ? 700 + (i * 53) % 500 : 40 + (i * 41) % 460,
      colors, sizes: category === 'chains' && !one ? CHAIN_LENGTHS : (one || category === 'accessories' || category === 'caps') ? ONE_SIZE : SIZES,
      rating: Math.round((4.3 + (i * 3 % 7) / 10) * 10) / 10, reviews: 18 + (i * 37) % 260 + (flag === 'B' ? 120 : 0),
      images,
      desc: `${CAT_COPY[category][i % 2]} From the ${collName[collection]} collection.`,
      details: CAT_DETAILS[category]
    });
  });
}
buildFrom(SPECS, 0);


/* ==========================================================================
   Fill every category up to MIN_PER_CATEGORY products.
   Names combine a style modifier with a base garment (e.g. "Stone-Washed Boxy Tee").
   Raise MIN_PER_CATEGORY or add bases / modifiers to grow the catalogue.
   ========================================================================== */
const MIN_PER_CATEGORY = 50;
(function fillCategories() {
  // [base name, gender m|w|u, base price INR]
  const FILL = {
    tees: {
      bases: [['Tee', 'u', 2299], ['Boxy Tee', 'u', 2499], ['Long Sleeve Tee', 'u', 2999], ['Pocket Tee', 'm', 2399], ['Raglan Tee', 'm', 2599], ['Baby Tee', 'w', 1899], ['Cropped Tee', 'w', 1999], ['Tank Top', 'u', 1599]],
      mods: ['Washed', 'Heavyweight', 'Garment-Dyed', 'Vintage', 'Acid Wash', 'Stone-Washed', 'Oversized', 'Contrast Stitch', 'Tonal Logo', 'Brushed', 'Slub', 'Waffle', 'Ribbed', 'Mesh', 'Studio', 'Faded'],
      colors: ['Black,Bone', 'Black,Charcoal,Olive', 'Washed Grey,Black', 'Off White,Black', 'Stone,Black', 'Navy,Black', 'Rust,Black', 'Bone,Sand']
    },
    shirts: {
      bases: [['Shirt', 'u', 3799], ['Overshirt', 'm', 4999], ['Camp Shirt', 'm', 3699], ['Poplin Shirt', 'w', 3499], ['Oxford Shirt', 'm', 4199], ['Flannel Shirt', 'u', 3999], ['Boyfriend Shirt', 'w', 3799], ['Cropped Shirt', 'w', 3299]],
      mods: ['Relaxed', 'Boxy', 'Linen', 'Washed', 'Striped', 'Textured', 'Garment-Dyed', 'Oversized', 'Seersucker', 'Brushed', 'Contrast', 'Heavy', 'Tonal', 'Pleated', 'Utility', 'Soft'],
      colors: ['Off White,Black', 'Sky,Off White,Navy', 'Sand,Olive', 'Black,Charcoal', 'Navy,Sand', 'Rust,Forest', 'Blush,Off White', 'Stone,Black']
    },
    hoodies: {
      bases: [['Hoodie', 'u', 5299], ['Zip Hoodie', 'u', 5599], ['Crewneck', 'u', 4399], ['Quarter-Zip', 'u', 4699], ['Cropped Hoodie', 'w', 4799], ['Knit Cardigan', 'u', 5499], ['Pullover Hoodie', 'm', 5399], ['Oversized Hoodie', 'u', 5799]],
      mods: ['Heavyweight', 'Pigment-Dyed', 'Washed', 'Boxy', 'Brushed', 'Embroidered', 'Tonal Logo', 'Panelled', 'Waffle', 'Terry', 'Utility', 'Stone-Washed', 'Contrast', 'Fleece-Lined', 'Studio', 'Faded'],
      colors: ['Black,Charcoal', 'Black,Bone,Lilac', 'Grey Melange,Black', 'Olive,Black', 'Stone,Washed Black', 'Navy,Black', 'Rust,Black', 'Bone,Charcoal']
    },
    jackets: {
      bases: [['Bomber', 'u', 7999], ['Coach Jacket', 'u', 6499], ['Puffer Jacket', 'u', 9999], ['Field Jacket', 'm', 8499], ['Trucker Jacket', 'u', 6499], ['Windbreaker', 'u', 4999], ['Work Jacket', 'm', 6999], ['Cropped Jacket', 'w', 7299], ['Blazer', 'w', 8499]],
      mods: ['Nylon', 'Quilted', 'Waxed', 'Washed', 'Padded', 'Lightweight', 'Oversized', 'Utility', 'Tonal', 'Hooded', 'Insulated', 'Ripstop', 'Corduroy', 'Heavy', 'Storm', 'Panelled'],
      colors: ['Black', 'Black,Olive', 'Navy,Black', 'Olive,Brown', 'Stone,Black', 'Charcoal,Black', 'Rust,Olive', 'Black,Slate']
    },
    bottoms: {
      bases: [['Cargo Pants', 'u', 4999], ['Wide-Leg Jeans', 'u', 4699], ['Joggers', 'u', 3799], ['Track Pants', 'u', 3999], ['Shorts', 'u', 2799], ['Straight Jeans', 'm', 4399], ['Trousers', 'u', 4999], ['Carpenter Pants', 'm', 4899], ['Flared Pants', 'w', 4299]],
      mods: ['Washed', 'Heavyweight', 'Ripstop', 'Pleated', 'Baggy', 'Relaxed', 'Tapered', 'Garment-Dyed', 'Utility', 'Brushed', 'Stone-Washed', 'Contrast', 'Tonal', 'Faded', 'Soft', 'Panelled'],
      colors: ['Black,Olive', 'Indigo,Washed Black', 'Charcoal,Black', 'Stone,Navy', 'Sand,Black', 'Washed Grey,Black', 'Olive,Stone', 'Navy,Charcoal']
    },
    dresses: {
      bases: [['Slip Dress', 'w', 4499], ['Midi Dress', 'w', 4299], ['Mini Dress', 'w', 3999], ['Shirt Dress', 'w', 4999], ['Maxi Skirt', 'w', 3699], ['Mini Skirt', 'w', 2799], ['Tee Dress', 'w', 2999], ['Pleated Skirt', 'w', 3299]],
      mods: ['Ribbed', 'Satin', 'Linen', 'Cargo', 'Denim', 'Knit', 'Washed', 'Tailored', 'Wrap', 'Tonal', 'Utility', 'Mesh', 'Poplin', 'Jersey', 'Cotton', 'Structured'],
      colors: ['Black,Blush', 'Black,Charcoal,Bone', 'Off White,Sky', 'Olive,Black', 'Indigo,Washed Black', 'Sand,Black', 'Lilac,Black', 'Navy,Black']
    },
    caps: {
      bases: [['Cap', 'u', 1399], ['Dad Cap', 'u', 1299], ['Trucker Cap', 'u', 1199], ['Bucket Hat', 'u', 1799], ['Beanie', 'u', 1499], ['Five-Panel Cap', 'u', 1599], ['Snapback', 'm', 1699], ['Beret', 'w', 1599]],
      mods: ['Washed', 'Embroidered', 'Corduroy', 'Nylon', 'Wool', 'Mesh', 'Tonal Logo', 'Canvas', 'Ripstop', 'Denim', 'Waxed', 'Ribbed', 'Vintage', 'Studio', 'Terry', 'Quilted'],
      colors: ['Black,Bone', 'Black,Navy', 'Charcoal,Black', 'Olive,Black', 'Stone,Black', 'Brown,Black', 'Off White,Black', 'Rust,Black']
    },
    chains: {
      bases: [['Cuban Chain', 'u', 3499], ['Rope Chain', 'u', 2999], ['Box Chain', 'u', 2499], ['Curb Chain', 'u', 3299], ['Pendant Chain', 'u', 3299], ['Figaro Chain', 'u', 2899], ['Franco Chain', 'u', 3199], ['Choker', 'w', 1699]],
      mods: ['Chunky', 'Slim', 'Polished', 'Brushed', 'Matte', 'Layered', 'Twisted', 'Diamond-Cut', 'Mini', 'Heavy', 'Signature', 'Studio', 'Stacked', 'Flat', 'Round', 'Fine'],
      colors: ['Silver,Gold', 'Silver', 'Gold,Silver', 'Silver,Gunmetal', 'Silver,Black', 'Gold', 'Gunmetal,Silver', 'Black,Silver']
    },
    accessories: {
      bases: [['Tote Bag', 'u', 2499], ['Sling Bag', 'u', 2799], ['Crossbody Bag', 'u', 3499], ['Belt', 'u', 1299], ['Wallet', 'u', 1899], ['Card Holder', 'u', 1499], ['Socks 3-Pack', 'u', 899], ['Scarf', 'u', 2199], ['Backpack', 'u', 4999], ['Gloves', 'u', 1999], ['Keychain', 'u', 799]],
      mods: ['Core', 'Studio', 'Night', 'Essential', 'Signature', 'Daily', 'Classic', 'Heavy', 'Tonal', 'Utility', 'Washed', 'Mini', 'Soft', 'Elevated', 'Everyday', 'Black Label'],
      colors: ['Black', 'Black,Olive', 'Black,Bone', 'Charcoal,Black', 'Black,Brown', 'Olive,Black', 'Bone,Black', 'Navy,Black']
    }
  };
  const collFor = (name, cat) => {
    if (cat === 'chains') return 'chrome';
    const rules = [[/Denim|Jeans/, 'denim'], [/Utility|Cargo|Work|Field|Carpenter|Ripstop/, 'utility'], [/Wash|Stone|Acid|Vintage|Pigment|Dyed|Faded/, 'washed'],
      [/Pleat|Tailor|Blazer|Poplin|Oxford|Satin|Trouser|Structured/, 'tailored'], [/Shorts|Linen|Mesh|Tank|Seersucker|Bucket/, 'summer'],
      [/Nylon|Coach|Wind|Storm|Rain|Waxed/, 'monsoon'], [/Fleece|Knit|Jogger|Track|Waffle|Terry|Flannel|Brushed|Soft|Cardigan/, 'weekend'],
      [/Night|Heavy|Bomber|Puffer|Black Label/, 'night-shift']];
    const hit = rules.find(([re]) => re.test(name));
    return hit ? hit[1] : 'core';
  };
  const names = new Set(PRODUCTS.map(p => p.name.toLowerCase()));
  const extra = [];
  Object.entries(FILL).forEach(([cat, { bases, mods, colors }]) => {
    let have = PRODUCTS.filter(p => p.category === cat).length, k = 0;
    while (have < MIN_PER_CATEGORY && k < bases.length * mods.length * 3) {
      const mi = k % mods.length, bi = (k + Math.floor(k / mods.length)) % bases.length;
      const [base, g, basePrice] = bases[bi];
      const name = `${mods[mi]} ${base}`;
      k++;
      if (names.has(name.toLowerCase())) continue;
      names.add(name.toLowerCase());
      const idx = SPECS.length + extra.length;
      const flag = idx % 6 === 0 ? 'N' : idx % 11 === 0 ? 'B' : '';
      const price = basePrice + ((mi * 137) % 9) * 100;
      extra.push([name, cat, price, g, collFor(name, cat), colors[(mi + bi) % colors.length], flag, cat === 'accessories' || cat === 'caps']);
      have++;
    }
  });
  buildFrom(extra, SPECS.length);
})();

const SIZE_GUIDE = {
  tops: {
    label: 'Tops, hoodies and jackets',
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
  { q: 'How long does delivery take?', a: 'Orders ship within 2 business days. Delivery within India takes 3 to 6 business days, and 2 to 4 in metro cities. International orders arrive in 7 to 12 business days.' },
  { q: 'What is your returns policy?', a: 'You have 15 days from delivery to return unworn items with tags attached. Returns within India are free. Refunds go back to your original payment method within 5 to 7 business days of us receiving the parcel.' },
  { q: 'How do your pieces fit?', a: 'Most of our range is cut oversized. If you want the intended silhouette, take your usual size. For a closer fit, size down. Our size guide has full measurements.' },
  { q: 'Are the chains safe for sensitive skin?', a: 'Our chains are 316L stainless steel with a PVD finish. They are nickel-free, water-resistant and made not to tarnish. Avoid perfume directly on the chain to keep the finish bright.' },
  { q: 'Can I change or cancel my order?', a: 'We can change or cancel an order within 2 hours of purchase. Email us with your order number and we will do what we can.' },
  { q: 'Do you offer cash on delivery?', a: 'Cash on delivery is available for orders under \u20B95,000 in most PIN codes. Prepaid orders ship free above \u20B94,999.' },
  { q: 'Do you restock sold-out pieces?', a: 'Our core pieces return each season. Limited runs do not. Join the newsletter and you will hear about drops and restocks first.' }
];

const INFO_PAGES = {
  'shipping-returns': {
    title: 'Shipping & Returns',
    sections: [
      ['Shipping', 'Orders above \u20B94,999 ship free across India. Below that, standard shipping is \u20B9199. Orders are packed and dispatched within 2 business days and arrive in 3 to 6 business days.'],
      ['International', 'We ship to most countries. Delivery takes 7 to 12 business days. Duties and taxes are calculated at checkout.'],
      ['Returns', 'You can return any unworn item with tags attached within 15 days of delivery. Returns within India are free. Start a return by emailing hello@vanta.example with your order number.'],
      ['Exchanges', 'Need a different size? Return the original and place a new order. This is the fastest way to make sure your size is held.'],
      ['Jewellery', 'Chains can be returned within 7 days if unworn and in their original packaging, for hygiene reasons.'],
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
      ['Orders and pricing', 'Prices are listed in Indian rupees (INR) and include GST unless stated otherwise. We may cancel an order if an item is mispriced or unavailable, and will refund you in full.'],
      ['Intellectual property', 'All imagery, text, logos and designs on this site belong to VANTA and may not be reused without written permission.'],
      ['Liability', 'To the extent permitted by law, VANTA is not liable for indirect or consequential loss arising from use of this site.'],
      ['Changes', 'We may update these terms from time to time. Continued use of the site means you accept the updated terms.']
    ]
  }
};
