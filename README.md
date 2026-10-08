# Lumière Dental Dubai

A bilingual (English / Arabic) website for a fictional premium dental clinic in Dubai Healthcare City. It is built as a portfolio piece, aiming for the polish of a real client launch: calm luxury design, full RTL support, an online booking wizard, and SEO and performance tuned for production.

> Demo project by Ahmad Khajeh — [ahmadkhajeh.com](https://ahmadkhajeh.com). The clinic, doctors, reviews and prices are fictional. Photos are from [Unsplash](https://unsplash.com).

## Highlights

- **True bilingual site.** Every route exists under `/en` and `/ar`. Arabic gets `dir="rtl"`, mirrored layouts and icons, Arabic typography, localized dates and times, and an Arabic-first booking flow. A language switcher keeps you on the same page.
- **Five-step booking wizard.** Service, then doctor (filtered to those who perform that service), date and time (real opening hours, closed days and a 60-day window), contact details, and a review step with edit links. It validates with react-hook-form and zod, slides between steps, moves focus for screen readers, and ends with an animated confirmation and booking reference.
- **Server actions only.** Booking and contact forms post to Next.js server actions that re-validate input, reject bots with a honeypot, and email the clinic through Resend. Without an API key they return a mock success, so the demo works anywhere.
- **Home page sections.** Hero with trust badges, services grid, a draggable and keyboard-accessible before/after slider, why choose us, doctors carousel (RTL-aware), testimonials, insurance marquee, FAQ, an interactive map of Dubai Healthcare City with opening hours, and a closing call to action.
- **Content in typed data files.** Services, doctors, testimonials, FAQs, insurers and clinic details live in `src/data/*.ts`, with English and Arabic side by side. UI copy lives in `messages/*.json`, typed through next-intl.
- **SEO.** Per-page metadata, canonical and `hreflang` alternates (including `x-default`), generated Open Graph and Twitter images per locale, JSON-LD (`Dentist`/`MedicalClinic`, `WebSite`, `FAQPage`, `Service`, `BreadcrumbList`), `sitemap.xml` with language alternates, `robots.txt` and a web manifest.
- **Performance by design.** Every page is statically generated. Scroll reveals and the FAQ accordion are pure CSS (scroll-driven animations and native `<details>`). Motion, the booking wizard and the mobile menu load only when needed. The Arabic font is self-hosted, subset, and preloaded on Arabic pages only.
- **Accessibility.** Semantic landmarks, a skip link, visible focus rings, labelled controls, error messages wired with `aria-describedby`, focus management in dialogs and the wizard, AA colour contrast in both themes, and `prefers-reduced-motion` support.
- **Dark mode** with no flash on load, a floating WhatsApp button on every page, and an animated mobile menu.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, `proxy.ts`), React 19, TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui (Radix), tw-animate-css |
| i18n | next-intl 4 (locale-prefixed routing, typed messages) |
| Motion | Motion (`LazyMotion`), CSS scroll-driven animations |
| Forms | react-hook-form, zod 4, react-day-picker |
| Email | Resend (optional) |
| Hosting | Vercel |

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). It redirects to `/en`, or to `/ar` if your browser prefers Arabic.

Other scripts:

```bash
npm run build      # production build (all pages are static)
npm start          # serve the production build
npm run lint       # ESLint
npm run typecheck  # TypeScript, no emit
```

## Environment variables

Copy `.env.example` to `.env.local`. Every variable is optional.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute site URL for canonical links, `hreflang`, sitemap, Open Graph and JSON-LD. On Vercel it falls back to the project's production domain. Locally it defaults to `http://localhost:3000`. |
| `RESEND_API_KEY` | Enables real email for booking and contact forms. Without it, forms return success and log the message on the server (demo mode). |
| `BOOKING_EMAIL_TO` | Recipient(s) for notifications, comma-separated. Required together with `RESEND_API_KEY`. |
| `RESEND_FROM` | Verified sender, e.g. `Lumière Dental <bookings@yourdomain.com>`. Defaults to Resend's onboarding sender. |

## Deploy to Vercel

One command from the project folder (the Vercel CLI asks you to log in and link the project the first time):

```bash
npx vercel --prod
```

To send real emails, add the variables above in **Vercel → Project → Settings → Environment Variables** (or `npx vercel env add RESEND_API_KEY`), then redeploy. Alternatively, push the repo to GitHub and import it at [vercel.com/new](https://vercel.com/new). No extra configuration is needed.

## Rebranding for a real clinic

| What | Where |
| --- | --- |
| Name, phone, WhatsApp, email, address, map, coordinates, hours, rating, licence, socials | `src/data/site.ts` |
| Treatments (prices, durations, steps, FAQs, images) | `src/data/services.ts` |
| Doctors | `src/data/doctors.ts` |
| Reviews, general FAQs, insurers | `src/data/testimonials.ts`, `src/data/faqs.ts`, `src/data/insurance.ts` |
| All interface copy, page titles and descriptions | `messages/en.json`, `messages/ar.json` |
| Colours, radii, fonts | `src/app/globals.css` (theme tokens at the top) |
| Images | `src/lib/images.ts` plus the `image` fields in the data files |
| Booking slots and window | `src/lib/slots.ts` |
| Footer credit | `site.credit` in `src/data/site.ts` |

Adding a service or doctor in the data files automatically creates its page, sitemap entry, structured data and booking option.

## Project structure

```
messages/                 UI copy (en, ar)
public/fonts/             Self-hosted, subset Arabic font
src/
  actions/                Server actions: booking, contact
  app/
    [locale]/             All pages, per-locale layout, OG images, not-found
    sitemap.ts robots.ts manifest.ts icon.svg apple-icon.tsx
  components/
    booking/              Wizard, success animation
    contact/              Contact form
    layout/               Header, mobile menu, footer, language switcher, WhatsApp button
    sections/             Home page sections
    shared/ forms/ seo/ theme/ motion/ ui/
  data/                   Typed bilingual content
  i18n/                   Routing, request config, navigation helpers
  lib/                    SEO helpers, schemas, slots, formatting, mailer
  proxy.ts                Locale detection and redirects
```

## Quality checks

- `npm run lint`, `npm run typecheck` and `npm run build` pass with no errors or warnings.
- Every page was checked in both languages at 375, 768, 1280 and 1536 px for layout overflow and console errors, in light and dark mode. The booking flow, contact form, mobile menu, FAQ and slider were tested end to end.
- Lighthouse on the production build scores 100 for accessibility, best practices and SEO on mobile and desktop in both languages. Desktop performance is 99–100. Mobile performance (simulated slow 4G against `localhost`) is about 93 for English and 88 for Arabic. Re-run it against the deployed URL, where assets are served from Vercel's CDN.
