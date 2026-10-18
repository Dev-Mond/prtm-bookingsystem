# Booking System

Laravel 12, Inertia 3, React 19, JavaScript, and SCSS with Vite 8. Laravel owns the
routes and sends props to React pages. This deploys to one PHP host and domain;
production serves compiled assets without a Node server. SSR is disabled.

## Requirements and first setup

PHP 8.2+ with Laravel's required extensions, Composer 2, and Node 20.19+ or 22.12+
(use a supported Node LTS release). Local verification used PHP 8.2.12 and Node
22.16.0. The lockfiles select the actual dependency versions.

```powershell
composer install
# Only when .env does not already exist:
Copy-Item .env.example .env
php artisan key:generate
npm ci
npm run build
```

Generate the application key only for a new environment; preserve existing keys.
On this machine, ZIP is disabled in PHP configuration. If Composer cannot extract
archives, use `php -d extension=zip C:/ProgramData/ComposerSetup/bin/composer.phar install`.
No global PHP configuration change is required.

The initialized workspace already has a local `.env` and generated key. File
sessions/cache and synchronous queues allow the starter pages to run without
migrations, a database, or a worker. Default Laravel migrations/models are present
but have not been run; configure a database deliberately before adding features.
Authentication and booking functionality are not implemented.

## Development

Run these in separate terminals:

```powershell
php artisan serve
```

```powershell
npm run dev
```

Open <http://localhost:8000>. Vite serves development modules and hot reload on
port 5173. The Home and About links demonstrate Inertia navigation. Alternatively,
stop Vite and run `npm run build` to use built assets from the PHP server alone.
An abandoned `public/hot` file makes Laravel look for Vite; remove that local file
if a crashed development server left it behind.

## Verification

```powershell
php artisan test --compact
npm run build
composer validate --strict
composer check-platform-reqs
php vendor/laravel/pint/builds/pint --test
```

With the PHP server running and Vite stopped:

```powershell
npm run check:http
# Optional alternate local URL:
npm run check:http -- http://127.0.0.1:8001
```

Feature tests cover the initial HTML payload, Inertia JSON navigation, stale asset
reloads, and missing routes. HTTP smoke checks also verify built JS/CSS delivery
and that `/.env` is inaccessible. Tests use an in-memory database configuration
and array session/cache drivers, with no production database access.
Visual, keyboard, and responsive browser checks remain separate from these checks.

## Single-host deployment

1. Run `npm ci` and `npm run build` locally or in CI.
2. Deploy the Laravel application and `public/build/`; install production PHP
   dependencies with `composer install --no-dev --optimize-autoloader` on the
   target or a compatible build machine. Exclude `.git/`, tests,
   `tools/`, `node_modules/`, and `public/hot` from the deployment artifact.
3. Point the domain document root at `public/`, with requests routed to
   `public/index.php`. Keep application source and `.env` outside the public web
   root; never expose the repository root or move the front controller into it.
4. Set a private production `.env`: `APP_ENV=production`, `APP_DEBUG=false`,
   `APP_URL=https://yourdomain.com`, and a unique, persistent `APP_KEY`.
   Configure any database and mail services when those features are introduced.
5. Allow the PHP process to write to `storage/` and `bootstrap/cache/`. After
   configuration is in place, run `php artisan optimize` and verify the deployed
   page and asset URLs. Enable HTTPS and secure session cookies on the host.

Shared hosting must support Laravel's PHP/extensions, URL rewrites, writable
runtime directories, and a secure `public/` document root layout. Node runs at
build time only. No deployment has been performed by this initialization.

## Homepage preview

The homepage is an original React/SCSS recreation inspired by the
[Easybook demo](https://easybook.kwst.net/index.html). Photos are local replacement
assets from Unsplash, not the paid template. Nunito and Montserrat are bundled
under their included OFL licenses in `resources/fonts/`.

Destination/name search filters six sample stays; dates and guest counts are
preview controls, not availability checks. Saved stays last only while the page
is mounted. Listing/article previews, mobile navigation, and informational dialogs
do not create bookings or accounts. Newsletter submissions are not stored or sent.
Run `npm test` for the sample-search tests and `npm run build` for compilation.

## Account and dashboard previews

The header's **Sign In** button opens the login/register dialog. **My account**
opens `/dashboard/profile`; **Add Your Hotel** opens `/dashboard/add-listing`.
The dashboard sidebar also links to `/dashboard/bookings` and `/dashboard/reviews`.

All four routes are public UI previews using fictional data, not protected account
pages. Use dummy form values, never real credentials. Form validation is for UX
only; no authentication or persistence is implemented. Selected photos are local
object-URL previews (JPEG/PNG/WebP, up to 5 MB each, six listing photos maximum),
never uploads. Booking cancellations and review replies change local page state
only and reset on navigation. Maps, password reset, and social sign-in are not
connected. Real backend features require server validation and authorization
before exposing actual account or booking data.

## Project guidance and memory

`AGENTS.md` holds coding and skill-selection guidance. `plan.md` tracks decisions,
progress, verified results, and lessons for future sessions; it does not train the
model. `tools/skills/prompt-optimizer/` preserves the custom skill's source.

- [Laravel deployment requirements](https://laravel.com/docs/12.x/deployment)
- [Inertia server setup](https://inertiajs.com/docs/v3/installation/server-side-setup)
- [Codex project instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
