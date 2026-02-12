# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/blog)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/blog)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/blog/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![blog](https://github.com/withastro/astro/assets/2244813/ff10799f-a816-4703-b967-c78997e8323d)

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Shop (ecommerce)

The site includes a shop for merch, vinyl, whole bean coffee, and accessories:

- **Product catalog**: `/shop/` and `/shop/[slug]/` (data in `src/data/products.ts`).
- **Cart**: Client-side only (localStorage). Cart drawer opens from the header; checkout uses Stripe Checkout.
- **Backend**: `POST /api/create-checkout-session` runs on Cloudflare (serverless). It creates a Stripe Checkout Session and returns the redirect URL.

### Stripe

1. Create a [Stripe](https://stripe.com) account and get your **Secret key** (Dashboard → Developers → API keys).
2. For local dev, create `.dev.vars` in the project root (git-ignored) with:
   ```ini
   STRIPE_SECRET_KEY=sk_test_...
   ```
3. For Cloudflare **Pages** (Git integration or `wrangler pages deploy`): set the secret in the dashboard so the API route can read it.
   - **Workers & Pages** → your project → **Settings** → **Environment variables**.
   - **Add variable** (Production, and Preview if needed): name `STRIPE_SECRET_KEY`, value your key.
   - Turn **Encrypt** on so it’s stored as a secret. Save and **redeploy**.
   - If you use **Workers** only (e.g. `wrangler deploy` with a worker config), you can instead run:
     ```bash
     npx wrangler secret put STRIPE_SECRET_KEY
     ```

### Cloudflare deploy

The site uses `@astrojs/cloudflare` with `output: 'server'`. Deploy with Cloudflare Pages (connect the repo and set build command `npm run build`, output directory `dist`) or:

```bash
npm run build
npx wrangler pages deploy dist --project-name=abramsimon-com
```

If you see an error about the `SESSION` KV binding, create a KV namespace and add it to `wrangler.toml`:

```bash
npx wrangler kv:namespace create SESSION
```

Then uncomment the `[[kv_namespaces]]` block in `wrangler.toml` and set `id` to the returned namespace id.

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
