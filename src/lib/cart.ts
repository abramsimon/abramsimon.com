export const CART_STORAGE_KEY = 'brew-groove-cart';

export interface CartItem {
	id: string;
	name: string;
	priceCents: number;
	quantity: number;
}

export type Cart = CartItem[];
