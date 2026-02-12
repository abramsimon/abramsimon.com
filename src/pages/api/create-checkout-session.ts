import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { getProductById } from '../../data/products';

export const prerender = false;

interface CheckoutItem {
	id: string;
	quantity: number;
}

export const POST: APIRoute = async ({ request, locals }) => {
	const runtime = (locals as { runtime?: { env?: Record<string, string> } }).runtime;
	const env = runtime?.env ?? (runtime as unknown as Record<string, string> | undefined);
	const secretKey =
		typeof env?.STRIPE_SECRET_KEY === 'string'
			? env.STRIPE_SECRET_KEY
			: undefined;

	if (!secretKey) {
		return new Response(
			JSON.stringify({
				error: 'Stripe is not configured (missing STRIPE_SECRET_KEY)',
				hint:
					'If you deployed via Cloudflare Pages: Workers & Pages → your project → Settings → Environment variables → Add variable (Production) → name STRIPE_SECRET_KEY, value your key, then Encrypt. Redeploy after saving. If you use Workers: run wrangler secret put STRIPE_SECRET_KEY.',
			}),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}

	let body: { items?: CheckoutItem[] };
	try {
		body = await request.json();
	} catch {
		return new Response(
			JSON.stringify({ error: 'Invalid request body' }),
			{ status: 400, headers: { 'Content-Type': 'application/json' } }
		);
	}

	const items = Array.isArray(body?.items) ? body.items : [];
	if (items.length === 0) {
		return new Response(
			JSON.stringify({ error: 'Cart is empty' }),
			{ status: 400, headers: { 'Content-Type': 'application/json' } }
		);
	}

	const stripe = new Stripe(secretKey);

	const origin = new URL(request.url).origin;
	const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

	for (const { id, quantity } of items) {
		if (quantity < 1) continue;
		const product = getProductById(id);
		if (!product) continue;
		line_items.push({
			price_data: {
				currency: 'usd',
				product_data: {
					name: product.name,
					description: product.description,
					images: product.image.startsWith('http') ? [product.image] : [origin + product.image],
				},
				unit_amount: product.priceCents,
			},
			quantity,
		});
	}

	if (line_items.length === 0) {
		return new Response(
			JSON.stringify({ error: 'No valid items in cart' }),
			{ status: 400, headers: { 'Content-Type': 'application/json' } }
		);
	}

	try {
		const session = await stripe.checkout.sessions.create({
			mode: 'payment',
			line_items,
			success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${origin}/checkout/cancel`,
		});

		return new Response(
			JSON.stringify({ url: session.url }),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Stripe error';
		return new Response(
			JSON.stringify({ error: message }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
