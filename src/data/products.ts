export type ProductCategory = 'merch' | 'vinyl' | 'coffee' | 'accessories';

export interface Product {
	id: string;
	slug: string;
	name: string;
	description: string;
	priceCents: number;
	image: string;
	category: ProductCategory;
}

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
	{ value: 'coffee', label: 'Whole bean coffee' },
	{ value: 'vinyl', label: 'Vinyl records' },
	{ value: 'accessories', label: 'Accessories' },
	{ value: 'merch', label: 'Merch' },
];

export const PRODUCTS: Product[] = [
	// Coffee
	{
		id: 'ethiopian-yirgacheffe',
		slug: 'ethiopian-yirgacheffe',
		name: 'Ethiopian Yirgacheffe',
		description: 'Bright, floral, and citrusy. Single-origin whole bean, 12 oz. Perfect for pour-over.',
		priceCents: 1899,
		image: '/blog-placeholder-1.jpg',
		category: 'coffee',
	},
	{
		id: 'house-blend',
		slug: 'house-blend',
		name: 'Brew & Groove House Blend',
		description: 'Our signature blend: chocolate, nutty, smooth. 12 oz whole bean.',
		priceCents: 1699,
		image: '/blog-placeholder-2.jpg',
		category: 'coffee',
	},
	{
		id: 'decaf-colombian',
		slug: 'decaf-colombian',
		name: 'Decaf Colombian',
		description: 'Water-process decaf. Sweet and mild, 12 oz whole bean.',
		priceCents: 1799,
		image: '/blog-placeholder-3.jpg',
		category: 'coffee',
	},
	// Vinyl
	{
		id: 'vinyl-miles-kind-of-blue',
		slug: 'miles-kind-of-blue',
		name: 'Miles Davis – Kind of Blue',
		description: '180g reissue. Classic jazz, remastered for vinyl.',
		priceCents: 3499,
		image: '/blog-placeholder-4.jpg',
		category: 'vinyl',
	},
	{
		id: 'vinyl-lo-fi-beats',
		slug: 'lo-fi-beats-vol-1',
		name: 'Lo-Fi Beats Vol. 1 (curated)',
		description: 'Various artists. Chill beats to brew to. Double LP.',
		priceCents: 2999,
		image: '/blog-placeholder-5.jpg',
		category: 'vinyl',
	},
	// Accessories
	{
		id: 'cleaning-kit',
		slug: 'vinyl-cleaning-kit',
		name: 'Vinyl cleaning kit',
		description: 'Brush, cloth, and solution. Gentle on records, long-lasting.',
		priceCents: 2499,
		image: '/blog-placeholder-about.jpg',
		category: 'accessories',
	},
	{
		id: 'aeropress',
		slug: 'aeropress-go',
		name: 'AeroPress Go',
		description: 'Portable coffee maker. Great for travel or desk.',
		priceCents: 3499,
		image: '/blog-placeholder-1.jpg',
		category: 'accessories',
	},
	{
		id: 'mug-brew',
		slug: 'mug-brew-groove',
		name: 'Brew & Groove ceramic mug',
		description: '12 oz ceramic mug with logo. Dishwasher safe.',
		priceCents: 1899,
		image: '/blog-placeholder-2.jpg',
		category: 'merch',
	},
	{
		id: 'tee-vinyl',
		slug: 'tee-spin-the-record',
		name: '“Spin the record” tee',
		description: 'Unisex cotton tee. Fits true to size.',
		priceCents: 2799,
		image: '/blog-placeholder-3.jpg',
		category: 'merch',
	},
];

export function getProductBySlug(slug: string): Product | undefined {
	return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
	return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
	return PRODUCTS.filter((p) => p.category === category);
}
