export const PRODUCT_CATEGORIES = [
  { label: 'Hoodies', slug: 'hoodies' },
  { label: 'Sneakers', slug: 'sneakers' },
  { label: 'Accessories', slug: 'accessories' },
  { label: 'T-Shirts', slug: 't-shirts' },
];

export const GENDER_COLLECTIONS = [
  { label: 'Men', slug: 'men' },
  { label: 'Women', slug: 'women' },
];

export const CATEGORY_SLUGS = PRODUCT_CATEGORIES.map((c) => c.slug);
export const COLLECTION_SLUGS = GENDER_COLLECTIONS.map((c) => c.slug);
